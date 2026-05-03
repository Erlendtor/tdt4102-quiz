"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Question, QuestionProgress } from "@/types";
import { questions as allQuestions } from "@/lib/questions";
import { getBucket } from "@/lib/scoring";
import CodeBlock from "@/components/CodeBlock";
import PageLoader from "@/components/PageLoader";
import FireBar from "@/components/FireBar";
import { useFireStreak } from "@/hooks/useFireStreak";

type LearnMode = "input";
type InputState = "answering" | "revealed";

const BUCKET_ITEMS = [
  { color: "var(--wrong)",    label: "Øving",  idx: 0  },
  { color: "var(--correct)",  label: "Klart",  idx: 2  },
  { color: "var(--mastered)", label: "Ferdig", idx: -1 },
] as const;

function pickNext(
  allQs: Question[],
  progress: Map<string, QuestionProgress>,
  masteredIds: Set<string>
): Question | null {
  const active = allQs.filter((q) => !masteredIds.has(q.id));
  if (active.length === 0) return null;
  const b0 = active.filter((q) => (progress.get(q.id)?.bucket ?? 0) === 0);
  const b1 = active.filter((q) => (progress.get(q.id)?.bucket ?? 0) === 1);
  const b2 = active.filter((q) => (progress.get(q.id)?.bucket ?? 0) === 2);
  const pool: Question[] = [];
  for (let i = 0; i < 6; i++) pool.push(...b0);
  for (let i = 0; i < 3; i++) pool.push(...b1);
  for (let i = 0; i < 1; i++) pool.push(...b2);
  if (pool.length === 0) return active[Math.floor(Math.random() * active.length)];
  return pool[Math.floor(Math.random() * pool.length)];
}

function HintToggle({ hint }: { hint: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: "18px" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          background: "none", border: "none", padding: 0, cursor: "pointer",
          fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 500,
          letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)",
        }}
      >
        <span style={{ display: "inline-block", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s", lineHeight: 1 }}>↓</span>
        {open ? "Skjul hint" : "Vis hint"}
      </button>
      {open && (
        <div style={{
          marginTop: "8px", padding: "10px 14px", borderRadius: "var(--radius-sm)",
          background: "var(--surface)", border: "1px solid var(--border)",
          borderLeft: "3px solid var(--border-strong)", fontSize: "14px",
          lineHeight: 1.6, color: "var(--text-secondary)", fontStyle: "italic",
        }}>
          {hint}
        </div>
      )}
    </div>
  );
}

function LearnDel2Inner() {
  const { data: session } = useSession();
  const [mode] = useState<LearnMode>("input");

  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [progress, setProgress] = useState<Map<string, QuestionProgress>>(new Map());
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [current, setCurrent] = useState<Question | null>(null);
  const [inputText, setInputText] = useState("");
  const [inputState, setInputState] = useState<InputState>("answering");
  const [selectedGrade, setSelectedGrade] = useState<"riktig" | "delvis" | "feil" | null>(null);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [entering, setEntering] = useState(false);
  const [animatingBucket, setAnimatingBucket] = useState<number | null>(null);
  const [bucketFlipRevision, setBucketFlipRevision] = useState<Record<number, number>>({ 0: 0, 1: 0, 2: 0, [-1]: 0 });
  const [scoreDisplay, setScoreDisplay] = useState<{ label: string; color: string } | null>(null);

  const bucketDotRefs = useRef<Record<number, HTMLSpanElement | null>>({});
  const firstQuestionLoaded = useRef(false);
  const { fireStreak, fireWarning, fireActivating, isOnFire,
          setFireStreak, setFireWarning } = useFireStreak("del2");

  useEffect(() => {
    if (mode !== "input") return;
    firstQuestionLoaded.current = false;
    const del2Qs = [...allQuestions.filter((q) => q.source === "del2")].sort(() => Math.random() - 0.5);
    setActiveQuestions(del2Qs);
    setCurrent(null);
    setDone(false);
  }, [mode]);

  useEffect(() => {
    if (mode !== "input" || !session?.user?.id || activeQuestions.length === 0) return;
    fetch("/api/progress")
      .then((r) => r.json())
      .then((data: QuestionProgress[]) => {
        const map = new Map<string, QuestionProgress>();
        const mastered = new Set<string>();
        for (const p of data) {
          if (activeQuestions.find((q) => q.id === p.questionId)) {
            map.set(p.questionId, p);
            if (p.bucket === 2 && p.timesInBucket2 >= 2) mastered.add(p.questionId);
          }
        }
        setProgress(map);
        setMasteredIds(mastered);
      })
      .catch(() => {});
  }, [mode, session?.user?.id, activeQuestions]);

  useEffect(() => {
    if (mode !== "input" || activeQuestions.length === 0 || current) return;
    setCurrent(pickNext(activeQuestions, progress, masteredIds));
  }, [mode, activeQuestions, current, progress, masteredIds]);

  useEffect(() => {
    if (mode !== "input" || !current || firstQuestionLoaded.current) return;
    firstQuestionLoaded.current = true;
    setEntering(true);
    const t = setTimeout(() => setEntering(false), 300);
    return () => clearTimeout(t);
  }, [mode, current]);

  function gradeInput(grade: "riktig" | "delvis" | "feil") {
    if (!current || selectedGrade !== null) return;
    setSelectedGrade(grade);

    const scorePct = grade === "riktig" ? 100 : grade === "delvis" ? 60 : 0;
    const bucket = getBucket(scorePct);
    const score = grade === "riktig" ? current.maxPoints : grade === "delvis" ? current.maxPoints * 0.6 : 0;
    const scoreLabel = Number.isInteger(score)
      ? `${score}/${current.maxPoints}p`
      : `${score.toFixed(1).replace(".", ",")}/${current.maxPoints}p`;
    const scoreColor = grade === "riktig" ? "var(--correct)" : grade === "delvis" ? "var(--partial)" : "var(--wrong)";

    if (grade === "riktig") {
      confetti({
        particleCount: 70,
        spread: 80,
        startVelocity: 32,
        origin: { x: 0.5, y: 0.55 },
        colors: ["#30D158", "#0A84FF", "#FFD60A", "#FF9500", "#BF5AF2"],
        scalar: 0.95,
      });
    }

    const existing = progress.get(current.id);
    const newProgress: QuestionProgress = {
      questionId: current.id,
      bucket,
      timesInBucket2: bucket === 2 ? (existing?.timesInBucket2 ?? 0) + 1 : (existing?.timesInBucket2 ?? 0),
      lastScore: score,
      attempts: (existing?.attempts ?? 0) + 1,
    };
    const shouldMaster = bucket === 2 && newProgress.timesInBucket2 >= 2;
    const targetIdx = shouldMaster ? -1 : bucket;

    if (session?.user?.id) {
      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: current.id, bucket, timesInBucket2: newProgress.timesInBucket2, lastScore: score }),
      }).catch(() => {});
    }

    const progressMap = new Map(progress);
    progressMap.set(current.id, newProgress);
    const newMastered = shouldMaster ? new Set([...masteredIds, current.id]) : masteredIds;

    setProgress(progressMap);
    if (shouldMaster) setMasteredIds(newMastered);
    setBucketFlipRevision((prev) => ({ ...prev, [targetIdx]: (prev[targetIdx] ?? 0) + 1 }));
    setAnimatingBucket(targetIdx);
    setTimeout(() => setAnimatingBucket(null), 420);
    setScoreDisplay({ label: scoreLabel, color: scoreColor });

    setTimeout(() => {
      setScoreDisplay(null);
      setExiting(true);
      setTimeout(() => {
        const remaining = activeQuestions.filter((q) => !newMastered.has(q.id));
        if (remaining.length === 0) { setDone(true); return; }
        const next = pickNext(activeQuestions, progressMap, newMastered);
        setCurrent(next);
        setInputText("");
        setInputState("answering");
        setSelectedGrade(null);
        setExiting(false);
        setEntering(true);
        {
          const isPerf    = grade === "riktig";
          const isPartial = grade === "delvis";
          const newStreak = isPerf
            ? fireStreak + 1
            : (isPartial && fireStreak >= 3 && !fireWarning)
              ? fireStreak
              : 0;
          const newWarning = !isPerf && isPartial && fireStreak >= 3 && !fireWarning;
          setFireStreak(newStreak);
          setFireWarning(newWarning);
        }
        setTimeout(() => setEntering(false), 300);
      }, 110);
    }, 280);
  }

  const bucketCounts = {
    0: activeQuestions.filter((q) => (progress.get(q.id)?.bucket ?? 0) === 0 && !masteredIds.has(q.id)).length,
    1: activeQuestions.filter((q) => (progress.get(q.id)?.bucket ?? 0) === 1 && !masteredIds.has(q.id)).length,
    2: activeQuestions.filter((q) => (progress.get(q.id)?.bucket ?? 0) === 2 && !masteredIds.has(q.id)).length,
    mastered: masteredIds.size,
  };

  // ── DONE ────────────────────────────────────────────────────────────────────
  if (done) {
    return (
      <main className="page-shell">
        <div className="app-card">
          <div style={{ padding: "48px 28px", textAlign: "center" }}>
            <h2 className="heading-lg" style={{ marginBottom: "8px" }}>Alle spørsmål mestret</h2>
            <p className="body-text" style={{ marginBottom: "28px" }}>
              Du har gått gjennom alle {activeQuestions.length} del 2-spørsmålene.
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

  // ── INPUT MODE ──────────────────────────────────────────────────────────────
  return (
    <main className="page-shell-learn">
      <div className="fire-wrap">

        {isOnFire && (
          <div className="fire-flames" style={{ position: "absolute", top: "220px", left: "-65px", right: "-65px", height: 0, overflow: "visible", pointerEvents: "none", zIndex: 0, opacity: fireWarning ? 0.38 : 1, transition: "opacity 0.5s ease" }}>
            <FireBar />
          </div>
        )}

        {isOnFire && (
          <div className="fire-label" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", pointerEvents: "none", zIndex: 3, opacity: fireWarning ? 0.45 : 1, transition: "opacity 0.5s ease", animation: "fire-label-in 0.45s cubic-bezier(0.34,1.56,0.64,1) both" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "#ff7700", animation: "fire-label-glow 1.3s ease-in-out 0.4s infinite" }}>
              ON FIRE!
            </span>
            <span key={fireStreak} style={{ fontFamily: "var(--font-mono)", fontSize: "17px", fontWeight: 700, color: "#ffaa00", lineHeight: 1, animation: "fire-streak-pop 0.3s cubic-bezier(0.34,1.56,0.64,1) both, fire-label-glow 1.3s ease-in-out 0.3s infinite" }}>
              {fireStreak}×
            </span>
          </div>
        )}

        <div className={`app-card app-card-learn${isOnFire ? (fireWarning ? " on-fire on-fire-dim" : " on-fire") : ""}${fireActivating ? " on-fire-activating" : ""}`} style={{ position: "relative", zIndex: 1 }}>
        <PageLoader />

        {fireActivating && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,80,0,0.1)", zIndex: 10, pointerEvents: "none", animation: "fire-flash 0.65s ease-out both" }} />
        )}

        {/* Score badge — shown briefly after grading */}
        {scoreDisplay && (
          <div style={{
            position: "absolute", top: 0, right: 0, zIndex: 2,
            background: "var(--card)", borderBottomLeftRadius: "var(--radius-md)",
            padding: "13px 18px 11px", pointerEvents: "none",
          }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "30px", fontWeight: 700,
              lineHeight: 1, letterSpacing: "-1px", color: scoreDisplay.color,
              animation: "reveal 0.25s ease", display: "block", textAlign: "right",
            }}>
              {scoreDisplay.label}
            </span>
          </div>
        )}

        {/* Question area */}
        <div className={`question-content${exiting ? " exiting" : ""}`} style={{ flex: 1, overflowY: "auto", padding: "20px 20px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            <span className="tag">{current.topic}</span>
          </div>

          <div style={{ marginBottom: "14px", ...(entering ? { animation: "slide-from-right 0.15s cubic-bezier(0.25, 0, 0.2, 1) both" } : {}) }}>
            {current.stem.split("\n\n").map((part, i) => (
              <p key={i} className="heading-sm" style={{ marginTop: i > 0 ? "4px" : 0 }}>{part}</p>
            ))}
          </div>

          {current.code && (
            <div style={entering ? { animation: "slide-from-right 0.15s cubic-bezier(0.25, 0, 0.2, 1) both", animationDelay: "35ms" } : {}}>
              <CodeBlock code={current.code} />
            </div>
          )}

          {/* Textarea */}
          <div style={{ marginTop: current.code ? "14px" : "0", ...(entering ? { animation: "slide-from-right 0.15s cubic-bezier(0.25, 0, 0.2, 1) both", animationDelay: "55ms" } : {}) }}>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={inputState === "revealed"}
              placeholder="Skriv svaret ditt..."
              rows={3}
              style={{
                width: "100%", boxSizing: "border-box",
                padding: "12px 14px", borderRadius: "var(--radius-sm)",
                border: "1.5px solid var(--border)", background: inputState === "revealed" ? "var(--surface)" : "var(--card)",
                fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.6,
                color: "var(--text-primary)", resize: "vertical", outline: "none",
                transition: "border-color 0.15s, background 0.15s",
                opacity: inputState === "revealed" ? 0.7 : 1,
              }}
            />
          </div>

          {/* Model answer + grade buttons (animated height reveal) */}
          <div style={{
            display: "grid",
            gridTemplateRows: inputState === "revealed" ? "1fr" : "0fr",
            transition: "grid-template-rows 0.28s ease",
            marginTop: "10px",
          }}>
            <div style={{ overflow: "hidden", minHeight: 0 }}>
              <div style={{
                padding: "12px 14px", borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)", background: "var(--surface)",
                borderLeft: "3px solid var(--correct-border)",
              }}>
                <div className="label" style={{ marginBottom: "6px" }}>Fasit</div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "14px", lineHeight: 1.5, color: "var(--text-primary)", margin: 0 }}>
                  {current.modelAnswer}
                </p>
              </div>

              <div style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
                {(["feil", "delvis", "riktig"] as const).map((grade) => {
                  const isSelected = selectedGrade === grade;
                  const isDisabled = selectedGrade !== null;
                  return (
                    <button
                      key={grade}
                      onClick={() => gradeInput(grade)}
                      disabled={isDisabled}
                      style={{
                        flex: 1, padding: "11px 6px", borderRadius: "var(--radius-sm)",
                        border: `1.5px solid ${grade === "riktig" ? "var(--correct-border)" : grade === "delvis" ? "var(--partial-border)" : "var(--wrong-border)"}`,
                        background: isSelected
                          ? (grade === "riktig" ? "var(--correct-bg)" : grade === "delvis" ? "var(--partial-bg)" : "var(--wrong-bg)")
                          : "var(--card)",
                        color: grade === "riktig" ? "var(--correct)" : grade === "delvis" ? "var(--partial)" : "var(--wrong)",
                        fontWeight: 600, fontSize: "13px", cursor: isDisabled ? "default" : "pointer",
                        fontFamily: "var(--font-sans)", transition: "background 0.15s, opacity 0.15s",
                        opacity: isDisabled && !isSelected ? 0.35 : 1,
                        outline: isSelected ? `2px solid ${grade === "riktig" ? "var(--correct)" : grade === "delvis" ? "var(--partial)" : "var(--wrong)"}` : "none",
                        outlineOffset: "-2px",
                      }}
                    >
                      {grade === "riktig" ? "Riktig" : grade === "delvis" ? "Delvis" : "Feil"}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {inputState === "answering" && current.hint && <HintToggle hint={current.hint} />}
        </div>

        {/* Footer */}
        <div style={{ flexShrink: 0, padding: "14px 20px 18px", background: "var(--card)" }}>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <Link href="/" className="learn-sq-btn" aria-label="Hjem">
              <svg width="22" height="22" viewBox="0 0 17 17" fill="none">
                <path d="M2.5 7.5L8.5 2L14.5 7.5V15H11V10.5H6V15H2.5V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
              </svg>
            </Link>
            {inputState === "answering" ? (
              <button
                onClick={() => setInputState("revealed")}
                disabled={inputText.trim().length === 0}
                className="btn-primary"
                style={{ flex: 1 }}
              >
                Sjekk svar
              </button>
            ) : (
              <div
                className="btn-primary"
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.45, cursor: "default", userSelect: "none" }}
              >
                Velg vurdering ovenfor ↑
              </div>
            )}
          </div>

          <div className="learn-bucket-row" style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center", marginTop: "14px" }}>
            {BUCKET_ITEMS.map(({ color, label, idx }) => {
              const count = idx === -1 ? bucketCounts.mastered : bucketCounts[idx as 0 | 1 | 2];
              const isAnimating = animatingBucket === idx;
              return (
                <span key={label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <span
                    ref={(el) => { bucketDotRefs.current[idx] = el; }}
                    style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, flexShrink: 0, display: "inline-block" }}
                    className={isAnimating ? "bucket-pop" : ""}
                  />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--text-secondary)" }}>
                    {label}{" "}
                    <strong
                      key={`${label}-${bucketFlipRevision[idx] ?? 0}`}
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
        </div>
        </div>
      </div>
    </main>
  );
}

export default function LearnDel2Page() {
  return <LearnDel2Inner />;
}
