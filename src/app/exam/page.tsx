"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Question } from "@/types";
import { getRandomDel1Questions, getRandomDel2Questions, getExamSetDel1Questions, getExamSetDel2Questions } from "@/lib/questions";
import { scoreQuestion } from "@/lib/scoring";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";
import PageLoader from "@/components/PageLoader";

const DEL1_COUNT = 12;
const DEL2_COUNT = 8;

const EXAM_SET_LABELS: Record<string, string> = {
  V25V1: "Eksamen Vår 2025 v1",
  V25V2: "Eksamen Vår 2025 v2",
  V24V1: "Eksamen Vår 2024 v1",
  V24V2: "Eksamen Vår 2024 v2",
  K24:   "Eksamen Sommer 2024",
  INSP:  "Insperaøving 26",
  random: "Tilfeldig eksamen",
};

function examDraftKey(userId: string, set: string) {
  return `examDraft_${userId}_${set}`;
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExamPageInner() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const examSet = searchParams.get("set") ?? "random";

  const [examReady, setExamReady] = useState(false);
  const [del1Questions, setDel1Questions] = useState<Question[]>([]);
  const [del2Questions, setDel2Questions] = useState<Question[]>([]);
  const allQuestions = useMemo(() => [...del1Questions, ...del2Questions], [del1Questions, del2Questions]);
  const QUESTION_COUNT = allQuestions.length;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Map<string, Set<string>>>(new Map());
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [del2TextAnswers, setDel2TextAnswers] = useState<Map<string, string>>(new Map());

  const [submitting, setSubmitting] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [entering, setEntering] = useState(false);
  const [direction, setDirection] = useState<"right" | "left">("right");

  // Initialize exam: restore draft for logged-in users, otherwise generate fresh
  useEffect(() => {
    if (status === "loading") return;

    const userId = session?.user?.id;
    const saved = userId ? localStorage.getItem(examDraftKey(userId, examSet)) : null;

    if (saved) {
      try {
        const draft = JSON.parse(saved);
        setDel1Questions(draft.del1Questions);
        setDel2Questions(draft.del2Questions);
        setCurrent(draft.current ?? 0);
        setAnswers(new Map((draft.answers ?? []).map(([k, v]: [string, string[]]) => [k, new Set(v)])));
        setFlagged(new Set(draft.flagged ?? []));
        setDel2TextAnswers(new Map(draft.del2TextAnswers ?? []));
        setExamReady(true);
        return;
      } catch {
        localStorage.removeItem(examDraftKey(userId!, examSet));
      }
    }

    if (examSet !== "random") {
      const d1 = getExamSetDel1Questions(examSet);
      const d2 = getExamSetDel2Questions(examSet);
      setDel1Questions(d1);
      setDel2Questions(d2);
    } else {
      const recentIds = new Set<string>(JSON.parse(localStorage.getItem("recentExamIds") ?? "[]"));
      const d1 = getRandomDel1Questions(DEL1_COUNT, recentIds);
      const d2 = getRandomDel2Questions(DEL2_COUNT);
      setDel1Questions(d1);
      setDel2Questions(d2);
    }
    setExamReady(true);
  }, [status, session?.user?.id, examSet]);

  // Save draft to localStorage on every state change (logged-in users only)
  const isMounted = useRef(false);
  useEffect(() => {
    if (!examReady) return;
    if (!isMounted.current) { isMounted.current = true; return; }
    const userId = session?.user?.id;
    if (!userId) return;

    localStorage.setItem(examDraftKey(userId, examSet), JSON.stringify({
      del1Questions,
      del2Questions,
      current,
      answers: [...answers.entries()].map(([k, v]) => [k, [...v]]),
      flagged: [...flagged],
      del2TextAnswers: [...del2TextAnswers.entries()],
    }));
  }, [examReady, del1Questions, del2Questions, current, answers, flagged, del2TextAnswers, session?.user?.id]);

  // Entrance animation after exam is ready
  useEffect(() => {
    if (!examReady) return;
    setEntering(true);
    const t = setTimeout(() => setEntering(false), 500);
    return () => clearTimeout(t);
  }, [examReady]);

  if (!examReady || allQuestions.length === 0) {
    return (
      <main className="page-shell-learn">
        <div className="app-card app-card-learn" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "var(--text-tertiary)", fontSize: "14px" }}>Laster eksamen…</span>
        </div>
      </main>
    );
  }

  const q = allQuestions[current];
  const isDel2 = q.source === "del2";
  const isNedtrekk = !isDel2 && q.subtype === "nedtrekk";
  const currentSelected = answers.get(q.id) ?? new Set<string>();

  function stemHasSubParts(stem: string) {
    return stem.includes("(a)") && stem.includes("(b)");
  }

  function isDel2Answered(dq: typeof q) {
    if (stemHasSubParts(dq.stem)) {
      return !!del2TextAnswers.get(`${dq.id}-a`)?.trim() && !!del2TextAnswers.get(`${dq.id}-b`)?.trim();
    }
    return !!del2TextAnswers.get(dq.id)?.trim();
  }

  function isNedtrekkAnswered(dq: typeof q) {
    const lines = dq.nedtrekkLines?.filter(l => l.isQuestion) ?? [];
    return lines.length > 0 && lines.every(l => !!del2TextAnswers.get(`${dq.id}-line-${l.lineNumber}`)?.trim());
  }

  const del1Remaining = del1Questions.filter((dq) => {
    if (dq.subtype === "nedtrekk") return !isNedtrekkAnswered(dq);
    return !answers.has(dq.id);
  }).length;
  const del2Remaining = del2Questions.filter((dq) => !isDel2Answered(dq)).length;
  const remaining = del1Remaining + del2Remaining;

  function navigateTo(idx: number) {
    if (idx === current) return;
    setDirection(idx > current ? "right" : "left");
    setExiting(true);
    setTimeout(() => {
      setCurrent(idx);
      setExiting(false);
      setEntering(true);
      setTimeout(() => setEntering(false), 500);
    }, 140);
  }

  function toggleFlag() {
    setFlagged((prev) => {
      const next = new Set(prev);
      next.has(q.id) ? next.delete(q.id) : next.add(q.id);
      return next;
    });
  }

  function toggleOption(optId: string) {
    setAnswers((prev) => {
      const next = new Map(prev);
      const sel = new Set(next.get(q.id) ?? []);
      sel.has(optId) ? sel.delete(optId) : sel.add(optId);
      next.set(q.id, sel);
      return next;
    });
  }

  function updateDel2Text(text: string) {
    setDel2TextAnswers((prev) => new Map(prev).set(q.id, text));
  }

  function updateDel2SubText(part: "a" | "b", text: string) {
    setDel2TextAnswers((prev) => new Map(prev).set(`${q.id}-${part}`, text));
  }

  async function handleSubmit() {
    setSubmitting(true);

    if (session?.user?.id) {
      localStorage.removeItem(examDraftKey(session.user.id, examSet));
    }

    const seenIds = allQuestions.map((q) => q.id);
    const existing: string[] = JSON.parse(localStorage.getItem("recentExamIds") ?? "[]");
    localStorage.setItem("recentExamIds", JSON.stringify([...new Set([...seenIds, ...existing])].slice(0, 24)));

    sessionStorage.setItem(
      "examResults",
      JSON.stringify({
        examSet,
        del1Questions: del1Questions.map((question) => {
          if (question.subtype === "nedtrekk") {
            const lines = question.nedtrekkLines?.filter(l => l.isQuestion) ?? [];
            const total = lines.length;
            const correct = lines.filter(l =>
              del2TextAnswers.get(`${question.id}-line-${l.lineNumber}`) === l.correctAnswer
            ).length;
            const score = total > 0 ? Math.round((correct / total) * question.maxPoints * 10) / 10 : 0;
            return {
              id: question.id, topic: question.topic, stem: question.stem,
              code: question.code, maxPoints: question.maxPoints, options: question.options,
              source: question.source, selectedOptionIds: [],
              score,
            };
          }
          return {
            id: question.id, topic: question.topic, stem: question.stem,
            code: question.code, maxPoints: question.maxPoints, options: question.options,
            source: question.source, selectedOptionIds: [...(answers.get(question.id) ?? [])],
            score: scoreQuestion(question, [...(answers.get(question.id) ?? [])]),
          };
        }),
        del2Questions: del2Questions.map((question) => {
          const isSub = stemHasSubParts(question.stem);
          return {
            id: question.id, topic: question.topic, stem: question.stem,
            code: question.code, maxPoints: question.maxPoints,
            source: "del2", modelAnswer: question.modelAnswer,
            textAnswer: isSub ? "" : del2TextAnswers.get(question.id) ?? "",
            textAnswerA: isSub ? del2TextAnswers.get(`${question.id}-a`) ?? "" : undefined,
            textAnswerB: isSub ? del2TextAnswers.get(`${question.id}-b`) ?? "" : undefined,
            selfGrade: null,
            score: 0,
          };
        }),
      })
    );

    router.push("/results");
  }

  const anim = direction === "left" ? "slide-from-left" : "slide-from-right";
  const enterStyle = (delay: string) => entering
    ? { animation: `${anim} 0.26s cubic-bezier(0.25, 0, 0.2, 1) both`, animationDelay: delay }
    : {};

  // Footer button logic
  const isLastQuestion = current === QUESTION_COUNT - 1;
  const footerButton = isLastQuestion ? (
    <button onClick={handleSubmit} disabled={submitting} className="btn-primary" style={{ flex: 1 }}>
      {submitting ? "Sender..." : remaining > 0 ? `Lever (${remaining} ubesvart)` : "Lever eksamen"}
    </button>
  ) : (
    <button onClick={() => navigateTo(current + 1)} className="btn-primary" style={{ flex: 1 }}>
      Neste →
    </button>
  );

  return (
    <main className="page-shell-learn">
      <div className="app-card app-card-learn" style={{ position: "relative" }}>
        <PageLoader />

        {/* Scrollable question */}
        <div className={`question-content${exiting ? " exiting" : ""}`} style={{ flex: 1, overflowY: "auto", padding: "20px 20px 16px" }}>
          <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-tertiary)", marginBottom: "10px", letterSpacing: "0.3px" }}>
            {EXAM_SET_LABELS[examSet] ?? examSet} · {isDel2 ? "Del 2" : "Del 1"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", flexWrap: "wrap", ...enterStyle("0ms") }}>
            <span className="tag">{q.topic}</span>
            <span className="label">{q.maxPoints}p</span>
          </div>

          <p className="heading-sm" style={{ marginBottom: "14px", whiteSpace: "pre-line", ...enterStyle("0ms") }}>
            {q.stem}
          </p>

          {q.code && (
            <div style={enterStyle("35ms")}>
              <CodeBlock code={q.code} />
            </div>
          )}

          {/* Del 1: multiple choice */}
          {!isDel2 && !isNedtrekk && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: q.code ? "14px" : "0" }}>
              {q.options.map((opt, i) => (
                <button
                  key={opt.id}
                  onClick={() => toggleOption(opt.id)}
                  className={currentSelected.has(opt.id) ? "option-btn selected" : "option-btn"}
                  style={enterStyle(`${55 + i * 32}ms`)}
                >
                  <div className={currentSelected.has(opt.id) ? "opt-check checked" : "opt-check"}>
                    {currentSelected.has(opt.id) && <CheckIcon />}
                  </div>
                  <span>{opt.text}</span>
                </button>
              ))}
            </div>
          )}

          {/* Del 1: Nedtrekk — per-line dropdowns */}
          {isNedtrekk && (
            <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px", ...enterStyle("55ms") }}>
              {q.nedtrekkLines?.map((line) => {
                const val = del2TextAnswers.get(`${q.id}-line-${line.lineNumber}`) ?? "";
                return (
                  <div key={line.lineNumber} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: "12px",
                      color: "var(--text-tertiary)", minWidth: "52px", flexShrink: 0,
                    }}>
                      Linje {line.lineNumber}:
                    </span>
                    <select
                      value={val}
                      onChange={(e) =>
                        setDel2TextAnswers(prev => new Map(prev).set(`${q.id}-line-${line.lineNumber}`, e.target.value))
                      }
                      style={{
                        flex: 1, padding: "7px 10px",
                        borderRadius: "var(--radius-sm)",
                        border: `1.5px solid ${val ? "var(--border)" : "var(--border)"}`,
                        background: val ? "var(--surface)" : "var(--card)",
                        fontFamily: "var(--font-sans)", fontSize: "13px",
                        color: val ? "var(--text-primary)" : "var(--text-tertiary)",
                        outline: "none", cursor: "pointer",
                      }}
                    >
                      <option value="">Velg...</option>
                      {q.nedtrekkOptions?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          )}

          {/* Del 2: text input(s) — grading happens after submission */}
          {isDel2 && (() => {
            const isCoding = q.subtype === "coding";
            const isSubParts = !isCoding && stemHasSubParts(q.stem);
            const baseTextareaStyle: React.CSSProperties = {
              width: "100%", boxSizing: "border-box",
              padding: "12px 14px", borderRadius: "var(--radius-sm)",
              border: "1.5px solid var(--border)", background: "var(--card)",
              fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.6,
              color: "var(--text-primary)", resize: "vertical", outline: "none",
            };
            const codeTextareaStyle: React.CSSProperties = {
              ...baseTextareaStyle,
              fontFamily: "var(--font-mono)", fontSize: "13px", lineHeight: 1.6,
              background: "#1a1b26", color: "#c0caf5", border: "1.5px solid #2a2b3d",
              minHeight: "200px",
            };
            const labelStyle: React.CSSProperties = {
              fontSize: "12px", fontWeight: 700, fontFamily: "var(--font-mono)",
              color: "var(--text-secondary)", marginBottom: "6px",
            };
            return (
              <div style={{ marginTop: q.code ? "14px" : "0", ...enterStyle("55ms") }}>
                {isCoding ? (
                  <textarea
                    value={del2TextAnswers.get(q.id) ?? ""}
                    onChange={(e) => updateDel2Text(e.target.value)}
                    placeholder="// Skriv C++-kode her..."
                    rows={10}
                    style={codeTextareaStyle}
                    spellCheck={false}
                  />
                ) : isSubParts ? (
                  <>
                    <div style={{ marginBottom: "12px" }}>
                      <div style={labelStyle}>a)</div>
                      <textarea
                        value={del2TextAnswers.get(`${q.id}-a`) ?? ""}
                        onChange={(e) => updateDel2SubText("a", e.target.value)}
                        placeholder="Skriv svar på a)..."
                        rows={3}
                        style={baseTextareaStyle}
                      />
                    </div>
                    <div>
                      <div style={labelStyle}>b)</div>
                      <textarea
                        value={del2TextAnswers.get(`${q.id}-b`) ?? ""}
                        onChange={(e) => updateDel2SubText("b", e.target.value)}
                        placeholder="Skriv svar på b)..."
                        rows={3}
                        style={baseTextareaStyle}
                      />
                    </div>
                  </>
                ) : (
                  <textarea
                    value={del2TextAnswers.get(q.id) ?? ""}
                    onChange={(e) => updateDel2Text(e.target.value)}
                    placeholder="Skriv svaret ditt..."
                    rows={4}
                    style={baseTextareaStyle}
                  />
                )}
              </div>
            );
          })()}
        </div>

        {/* Footer */}
        <div style={{ flexShrink: 0, padding: "14px 20px 18px", background: "var(--card)" }}>
          <div style={{ display: "flex", gap: "5px", alignItems: "center", marginBottom: "12px" }}>
            <Link href="/" className="learn-sq-btn" aria-label="Hjem">
              <svg width="22" height="22" viewBox="0 0 17 17" fill="none">
                <path d="M2.5 7.5L8.5 2L14.5 7.5V15H11V10.5H6V15H2.5V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
              </svg>
            </Link>

            {footerButton}

            <button
              onClick={toggleFlag}
              className="learn-sq-btn"
              aria-label="Flagg spørsmål"
              style={{
                color: flagged.has(q.id) ? "#3B82F6" : undefined,
                borderColor: flagged.has(q.id) ? "#3B82F6" : undefined,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 17 17" fill="none">
                <line x1="4.5" y1="2" x2="4.5" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M4.5 3L13 5.5L4.5 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity={flagged.has(q.id) ? 1 : 0}/>
              </svg>
            </button>
          </div>

          {/* Nav dots */}
          <div className="exam-nav-dots" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {[del1Questions, del2Questions].map((group, gi) => (
              <div key={gi} style={{ display: "flex", gap: "4px", flexWrap: "wrap", justifyContent: "center" }}>
                {group.map((aq) => {
                  const i = allQuestions.indexOf(aq);
                  const isActive = i === current;
                  const isFlagged = flagged.has(aq.id);
                  const isDel2Q = aq.source === "del2";
                  const isAnswered = isDel2Q
                    ? isDel2Answered(aq)
                    : aq.subtype === "nedtrekk"
                      ? isNedtrekkAnswered(aq)
                      : answers.has(aq.id);
                  const dotClass = `nav-dot${isActive ? " active" : isFlagged ? " flagged" : isAnswered ? " answered" : ""}`;
                  return (
                    <button
                      key={i}
                      onClick={() => navigateTo(i)}
                      className={dotClass}
                      style={isActive && isFlagged ? { boxShadow: "inset 0 0 0 2px #3B82F6" } : undefined}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ExamPage() {
  return (
    <Suspense
      fallback={
        <main className="page-shell-learn">
          <div className="app-card app-card-learn" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "var(--text-tertiary)", fontSize: "14px" }}>Laster eksamen…</span>
          </div>
        </main>
      }
    >
      <ExamPageInner />
    </Suspense>
  );
}
