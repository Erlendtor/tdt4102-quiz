"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Question, QuestionProgress } from "@/types";
import { scoreQuestion, scorePercent, getBucket } from "@/lib/scoring";
import { questions as allQuestions } from "@/lib/questions";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

type State = "answering" | "revealed";

function shuffleOptions(q: Question): Question {
  return { ...q, options: [...q.options].sort(() => Math.random() - 0.5) };
}

function pickNextQuestion(
  allQs: Question[],
  progress: Map<string, QuestionProgress>,
  masteredIds: Set<string>
): Question | null {
  const active = allQs.filter((q) => !masteredIds.has(q.id));
  if (active.length === 0) return null;

  const bucket0 = active.filter((q) => (progress.get(q.id)?.bucket ?? 0) === 0);
  const bucket1 = active.filter((q) => (progress.get(q.id)?.bucket ?? 0) === 1);
  const bucket2 = active.filter((q) => (progress.get(q.id)?.bucket ?? 0) === 2);

  const pool: Question[] = [];
  for (let i = 0; i < 6; i++) pool.push(...bucket0);
  for (let i = 0; i < 3; i++) pool.push(...bucket1);
  for (let i = 0; i < 1; i++) pool.push(...bucket2);

  if (pool.length === 0) return active[Math.floor(Math.random() * active.length)];
  return pool[Math.floor(Math.random() * pool.length)];
}

function deduplicateGroups(qs: Question[]): Question[] {
  const seen = new Set<string>();
  const result: Question[] = [];
  const shuffled = [...qs].sort(() => Math.random() - 0.5);
  for (const q of shuffled) {
    if (!seen.has(q.variantGroupId)) {
      seen.add(q.variantGroupId);
      result.push(q);
    }
  }
  return result;
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 2L8 8M8 2L2 8" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const BUCKET_ITEMS = [
  { color: "var(--wrong)",         label: "Øving",  idx: 0 },
  { color: "var(--partial)",       label: "Nesten", idx: 1 },
  { color: "var(--correct)",       label: "Bra",    idx: 2 },
  { color: "var(--border-strong)", label: "Ferdig", idx: -1 },
] as const;

export default function LearnPage() {
  const { data: session } = useSession();
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [progress, setProgress] = useState<Map<string, QuestionProgress>>(new Map());
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [current, setCurrent] = useState<Question | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [state, setState] = useState<State>("answering");
  const [score, setScore] = useState<number>(0);
  const [done, setDone] = useState(false);
  const [openExplanations, setOpenExplanations] = useState<Set<string>>(new Set());
  const [animatingBucket, setAnimatingBucket] = useState<number | null>(null);
  const [hintOpen, setHintOpen] = useState(false);
  const [exiting, setExiting] = useState(false);
  const pendingUpdateRef = useRef<{
    questionId: string;
    newProgress: QuestionProgress;
    bucket: number;
    shouldMaster: boolean;
  } | null>(null);

  useEffect(() => {
    const deduped = deduplicateGroups(allQuestions).map(shuffleOptions);
    setActiveQuestions(deduped);

    if (session?.user?.id) {
      fetch("/api/progress")
        .then((r) => r.json())
        .then((data: QuestionProgress[]) => {
          const map = new Map<string, QuestionProgress>();
          const mastered = new Set<string>();
          for (const p of data) {
            map.set(p.questionId, p);
            if (p.bucket === 2 && p.timesInBucket2 >= 2) mastered.add(p.questionId);
          }
          setProgress(map);
          setMasteredIds(mastered);
        })
        .catch(() => {});
    }
  }, [session]);

  useEffect(() => {
    if (activeQuestions.length > 0 && !current) {
      setCurrent(pickNextQuestion(activeQuestions, progress, masteredIds));
    }
  }, [activeQuestions, current, progress, masteredIds]);

  const bucketCounts = {
    0: activeQuestions.filter((q) => (progress.get(q.id)?.bucket ?? 0) === 0 && !masteredIds.has(q.id)).length,
    1: activeQuestions.filter((q) => (progress.get(q.id)?.bucket ?? 0) === 1 && !masteredIds.has(q.id)).length,
    2: activeQuestions.filter((q) => (progress.get(q.id)?.bucket ?? 0) === 2 && !masteredIds.has(q.id)).length,
    mastered: masteredIds.size,
  };

  function toggleOption(id: string) {
    if (state === "revealed") return;
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleExplanation(optId: string) {
    setOpenExplanations((prev) => {
      const next = new Set(prev);
      next.has(optId) ? next.delete(optId) : next.add(optId);
      return next;
    });
  }

  function checkAnswer() {
    if (!current || selected.size === 0) return;
    const pct = scorePercent(current, [...selected]);
    const rawScore = scoreQuestion(current, [...selected]);
    setScore(rawScore);
    setState("revealed");

    const bucket = getBucket(pct);
    const prevProgress = progress.get(current.id);
    const prevBucket = prevProgress?.bucket ?? 0;
    const prevTimes = prevProgress?.timesInBucket2 ?? 0;
    const newTimes = bucket === 2 ? (prevBucket === 2 ? prevTimes + 1 : 1) : 0;

    const newProgress: QuestionProgress = {
      questionId: current.id,
      bucket,
      timesInBucket2: newTimes,
      lastScore: pct,
      attempts: (prevProgress?.attempts ?? 0) + 1,
    };

    // Stage the update — applied with animation when user clicks "Neste spørsmål"
    pendingUpdateRef.current = {
      questionId: current.id,
      newProgress,
      bucket,
      shouldMaster: bucket === 2 && newTimes >= 2,
    };

    // Default open: wrong selections + correct answers the user missed
    const defaultOpen = new Set(
      current.options
        .filter((o) => (!o.isCorrect && selected.has(o.id)) || (o.isCorrect && !selected.has(o.id)))
        .map((o) => o.id)
    );
    setOpenExplanations(defaultOpen);
  }

  function nextQuestion() {
    // Apply staged bucket update with animation before transitioning
    const pending = pendingUpdateRef.current;
    let nextProgress = progress;
    let nextMastered = masteredIds;

    if (pending) {
      const progressMap = new Map(progress);
      progressMap.set(pending.questionId, pending.newProgress);
      nextProgress = progressMap;
      setProgress(progressMap);

      if (pending.shouldMaster) {
        nextMastered = new Set([...masteredIds, pending.questionId]);
        setMasteredIds(nextMastered);
      }

      setAnimatingBucket(pending.bucket);
      setTimeout(() => setAnimatingBucket(null), 500);

      if (session?.user?.id) {
        const p = pending.newProgress;
        fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questionId: p.questionId, bucket: p.bucket, timesInBucket2: p.timesInBucket2, lastScore: p.lastScore }),
        }).catch(() => {});
      }

      pendingUpdateRef.current = null;
    }

    setExiting(true);
    setTimeout(() => {
      const remaining = activeQuestions.filter((q) => !nextMastered.has(q.id));
      if (remaining.length === 0) { setDone(true); return; }
      const next = pickNextQuestion(activeQuestions, nextProgress, nextMastered);
      setCurrent(next ? shuffleOptions(next) : null);
      setSelected(new Set());
      setState("answering");
      setOpenExplanations(new Set());
      setHintOpen(false);
      setExiting(false);
    }, 140);
  }

  if (done || (activeQuestions.length > 0 && masteredIds.size >= activeQuestions.length)) {
    return (
      <main className="page-shell">
        <div className="app-card">
          <div style={{ padding: "48px 28px", textAlign: "center" }}>
            <h2 className="heading-lg" style={{ marginBottom: "8px" }}>Alle spørsmål mestret</h2>
            <p className="body-text" style={{ marginBottom: "28px" }}>
              Du har gått gjennom alle {activeQuestions.length} spørsmålene.
            </p>
            <Link href="/" className="btn-primary" style={{ maxWidth: "220px", margin: "0 auto" }}>
              Tilbake til start
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!current) {
    return (
      <main className="page-shell">
        <div className="app-card">
          <div style={{ padding: "48px 28px", textAlign: "center" }}>
            <p className="body-text">Laster spørsmål...</p>
          </div>
        </div>
      </main>
    );
  }

  const correctIds = new Set(current.options.filter((o) => o.isCorrect).map((o) => o.id));

  function optionClass(optId: string): string {
    if (state === "answering") {
      return selected.has(optId) ? "option-btn selected" : "option-btn";
    }
    const isSelected = selected.has(optId);
    const isCorrect = correctIds.has(optId);
    if (isCorrect && isSelected) return "option-btn correct-selected";
    if (isCorrect && !isSelected) return "option-btn correct-missed";
    if (!isCorrect && isSelected) return "option-btn wrong-selected";
    return "option-btn default-revealed";
  }

  function checkClass(optId: string): string {
    if (state === "answering") return selected.has(optId) ? "opt-check checked" : "opt-check";
    const isCorrect = correctIds.has(optId);
    const isSelected = selected.has(optId);
    if (isCorrect && isSelected) return "opt-check correct";
    if (isCorrect && !isSelected) return "opt-check correct-hint";
    if (isSelected) return "opt-check wrong";
    return "opt-check";
  }

  const pillClass = score === current.maxPoints ? "perfect" : score > 0 ? "partial" : "wrong";
  const pillLabel = score === current.maxPoints ? "Perfekt" : score > 0 ? "Delvis riktig" : "Feil";
  const totalCorrect = correctIds.size;
  const selectedCorrect = [...selected].filter((id) => correctIds.has(id)).length;

  return (
    <main className="page-shell-learn">
      <div className="app-card app-card-learn">

        {/* Question area */}
        <div className={`question-content${exiting ? " exiting" : ""}`} style={{ flex: 1, overflowY: "auto", padding: "20px 20px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            <span className="tag">{current.topic}</span>
          </div>

          <div style={{ marginBottom: "14px" }}>
            {current.stem.split("\n\n").map((part, i) => (
              <p key={i} className="heading-sm" style={{ marginTop: i > 0 ? "4px" : 0 }}>
                {part}
              </p>
            ))}
          </div>

          {current.code && (
            <CodeBlock
              code={state === "revealed" && score < current.maxPoints && current.codeAnnotated
                ? current.codeAnnotated
                : current.code}
            />
          )}

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: current.code ? "14px" : "0" }}>
            {current.options.map((opt) => {
              const isCorrect = correctIds.has(opt.id);
              const isOpen = openExplanations.has(opt.id);

              return (
                <div
                  key={opt.id}
                  className={optionClass(opt.id)}
                  onClick={() => state === "answering" && toggleOption(opt.id)}
                  style={{ cursor: state === "answering" ? "pointer" : "default" }}
                >
                  <div className={checkClass(opt.id)} style={{ flexShrink: 0 }}>
                    {state === "answering" && selected.has(opt.id) && <CheckIcon />}
                    {state === "revealed" && isCorrect && <CheckIcon />}
                    {state === "revealed" && !isCorrect && selected.has(opt.id) && <XIcon />}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span>{opt.text}</span>

                    {state === "revealed" && (
                      <div style={{ marginTop: "8px" }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleExplanation(opt.id); }}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            background: "none",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                            fontFamily: "var(--font-mono)",
                            fontSize: "10px",
                            fontWeight: 500,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: "inherit",
                            opacity: 0.7,
                          }}
                        >
                          Se begrunnelse
                          <span style={{
                            display: "inline-block",
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.15s",
                            lineHeight: 1,
                          }}>↓</span>
                        </button>

                        {isOpen && (
                          <div
                            className={isCorrect ? "explanation correct-exp" : "explanation"}
                            style={{ marginTop: "6px", marginBottom: 0 }}
                          >
                            {opt.explanation}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hint toggle — only shown while answering */}
          {state === "answering" && current.hint && (
            <div style={{ marginTop: "18px" }}>
              <button
                onClick={() => setHintOpen((v) => !v)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "none",
                  border: "none",
                  padding: "0",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-tertiary)",
                }}
              >
                <span style={{
                  display: "inline-block",
                  transform: hintOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.15s",
                  lineHeight: 1,
                }}>↓</span>
                {hintOpen ? "Skjul hint" : "Vis hint"}
              </button>

              {hintOpen && (
                <div style={{
                  marginTop: "8px",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderLeft: "3px solid var(--border-strong)",
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: "var(--text-secondary)",
                  fontStyle: "italic",
                }}>
                  {current.hint}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ flexShrink: 0, padding: "14px 20px 18px", background: "var(--card)" }}>
          {state === "answering" ? (
            <button onClick={checkAnswer} disabled={selected.size === 0} className="btn-primary">
              Sjekk svar
            </button>
          ) : (
            <button onClick={nextQuestion} className="btn-primary">
              Neste spørsmål →
            </button>
          )}

          {/* Bottom row: Avslutt left, bucket status center */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", marginTop: "14px" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 16px",
                border: "1px solid var(--border-strong)",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--text-secondary)",
                textDecoration: "none",
                justifySelf: "start",
              }}
            >
              Avslutt
            </Link>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
              {BUCKET_ITEMS.map(({ color, label, idx }) => {
                const count = idx === -1 ? bucketCounts.mastered : bucketCounts[idx as 0 | 1 | 2];
                const isAnimating = animatingBucket === idx;
                return (
                  <span key={label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <span
                      style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, flexShrink: 0, display: "inline-block" }}
                      className={isAnimating ? "bucket-pop" : ""}
                    />
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--text-secondary)" }}>
                      {label}{" "}
                      <strong
                        key={isAnimating ? `${count}-anim` : count}
                        className={isAnimating ? "num-flip" : ""}
                        style={{ color: "var(--text-primary)", fontWeight: 600 }}
                      >
                        {count}
                      </strong>
                    </span>
                  </span>
                );
              })}
            </div>

            <div
              className={state === "revealed" ? `result-pill ${pillClass}` : ""}
              style={{
                justifySelf: "end",
                opacity: state === "revealed" ? 1 : 0,
                transition: "opacity 0.2s ease",
                padding: "10px 16px",
                fontSize: "13px",
                animation: state === "revealed" ? undefined : "none",
                whiteSpace: "nowrap",
              }}
            >
              {state === "revealed" && (
                <>
                  {pillLabel} · {selectedCorrect}/{totalCorrect} riktige · {score.toFixed(1)}/{current.maxPoints}p
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
