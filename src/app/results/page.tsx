"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { Option } from "@/types";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

const CONFETTI_COLORS = ["#FF3B5C", "#FFD60A", "#0A84FF", "#30D158", "#FF9500", "#BF5AF2", "#5AC8FA"];

type QuestionResult = {
  id: string;
  topic: string;
  stem: string;
  code?: string;
  maxPoints: number;
  options: Option[];
  selectedOptionIds: string[];
  score: number;
};

type Results = {
  questions: QuestionResult[];
  totalScore: number;
  maxScore: number;
  grade: string;
  weakTopics: string[];
};

const gradeColor: Record<string, string> = {
  A: "var(--correct)",
  B: "var(--correct)",
  C: "var(--partial)",
  D: "var(--partial)",
  E: "var(--wrong)",
  F: "var(--wrong)",
};

const gradePill: Record<string, string> = {
  A: "result-pill perfect",
  B: "result-pill perfect",
  C: "result-pill partial",
  D: "result-pill partial",
  E: "result-pill wrong",
  F: "result-pill wrong",
};

const gradeMessage: Record<string, string> = {
  A: "Utmerket! Du er godt forberedt.",
  B: "Meget bra! Noen få emner å pusse på.",
  C: "Bra! Jobb litt mer med svake emner.",
  D: "Godkjent, men det er rom for forbedring.",
  E: "Bestått – fortsett å øve!",
  F: "Ikke bestått – mer øving anbefales.",
};

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

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<Results | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [openExplanations, setOpenExplanations] = useState<Set<string>>(new Set());
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const gradeRef = useRef<HTMLDivElement>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!results) return;
    const grade = results.grade;
    if (!["A", "B", "C"].includes(grade)) return;

    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const fire = confetti.create(canvas, { resize: true });

    const shoot = () => {
      const el = gradeRef.current;
      const rect = el?.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();
      const ox = rect ? (rect.left + rect.width / 2 - canvasRect.left) / canvasRect.width : 0.5;
      const oy = rect ? (rect.top + rect.height / 2 - canvasRect.top) / canvasRect.height : 0.3;

      if (grade === "C") {
        fire({ particleCount: 35, spread: 70, origin: { x: ox, y: oy }, colors: CONFETTI_COLORS, scalar: 0.9, startVelocity: 28 });
      }

      if (grade === "B") {
        fire({ particleCount: 90, spread: 80, startVelocity: 38, origin: { x: ox, y: oy }, colors: CONFETTI_COLORS, scalar: 1.1 });
        setTimeout(() => {
          fire({ particleCount: 55, spread: 60, startVelocity: 26, origin: { x: ox, y: oy }, colors: CONFETTI_COLORS, scalar: 1.0 });
        }, 200);
      }

      if (grade === "A") {
        const end = Date.now() + 1800;
        const burst = () => {
          if (Date.now() > end) return;
          const el2 = gradeRef.current;
          const rect2 = el2?.getBoundingClientRect();
          const cRect = canvas.getBoundingClientRect();
          const bx = rect2 ? (rect2.left + rect2.width / 2 - cRect.left) / cRect.width : 0.5;
          const by = rect2 ? (rect2.top + rect2.height / 2 - cRect.top) / cRect.height : 0.3;
          fire({
            particleCount: 45,
            spread: 360,
            startVelocity: 28 + Math.random() * 18,
            ticks: 90,
            origin: { x: bx + (Math.random() - 0.5) * 0.28, y: by + (Math.random() - 0.5) * 0.15 },
            colors: CONFETTI_COLORS,
            shapes: ["square"],
            gravity: 0.65,
            scalar: 1.2,
            drift: (Math.random() - 0.5) * 0.4,
          });
          setTimeout(burst, 150);
        };
        burst();
      }
    };

    requestAnimationFrame(shoot);
  }, [results]);

  useEffect(() => {
    const stored = sessionStorage.getItem("examResults");
    if (!stored) { router.push("/exam"); return; }
    const parsed: Results = JSON.parse(stored);
    setResults(parsed);

    // Open explanations for wrong selections + missed correct answers
    const defaultOpen = new Set<string>();
    // Expand body for wrong/partial questions; collapse correct ones
    const defaultExpanded = new Set<string>();
    for (const q of parsed.questions) {
      const selectedIds = new Set(q.selectedOptionIds);
      const qPct = (q.score / q.maxPoints) * 100;
      if (qPct < 100) defaultExpanded.add(q.id);
      for (const opt of q.options) {
        const isWrongSelected = !opt.isCorrect && selectedIds.has(opt.id);
        const isMissedCorrect = opt.isCorrect && !selectedIds.has(opt.id);
        if (isWrongSelected || isMissedCorrect) defaultOpen.add(opt.id);
      }
    }
    setOpenExplanations(defaultOpen);
    setExpandedQuestions(defaultExpanded);
  }, [router]);

  function toggleExplanation(optId: string) {
    setOpenExplanations((prev) => {
      const next = new Set(prev);
      next.has(optId) ? next.delete(optId) : next.add(optId);
      return next;
    });
  }

  function toggleQuestion(id: string) {
    setExpandedQuestions((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  if (!results) {
    return (
      <main className="page-shell">
        <div className="app-card">
          <div style={{ padding: "48px 28px", textAlign: "center" }}>
            <p className="body-text">Laster resultater...</p>
          </div>
        </div>
      </main>
    );
  }

  const pct = Math.round((results.totalScore / results.maxScore) * 100);

  return (
    <main className="page-shell">
      <div className="app-card">
        <canvas ref={confettiCanvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 50 }} />

        {/* Grade hero */}
        <div style={{ padding: "28px 28px 20px", textAlign: "center" }}>
          <div className="label" style={{ marginBottom: "12px" }}>Eksamensresultat</div>
          <div ref={gradeRef} style={{
            fontSize: "96px",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-4px",
            color: gradeColor[results.grade] ?? "var(--text-primary)",
            marginBottom: "10px",
          }}>
            {results.grade}
          </div>
          <p className="body-text" style={{ marginBottom: "14px" }}>
            {gradeMessage[results.grade]}
          </p>
          <div className={gradePill[results.grade] ?? "result-pill"}>
            {results.totalScore.toFixed(1)} / {results.maxScore}p · {pct}%
          </div>
        </div>

        <div className="divider" />

        {/* Weak topics */}
        {results.weakTopics.length > 0 && (
          <>
            <div style={{ padding: "14px 20px" }}>
              <div className="label" style={{ marginBottom: "8px" }}>Øv mer på disse emnene</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {results.weakTopics.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="divider" />
          </>
        )}

        {/* Question overview grid */}
        <div style={{ padding: "14px 20px" }}>
          <div className="label" style={{ marginBottom: "8px" }}>Oversikt</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "6px" }}>
            {results.questions.map((q, i) => {
              const qPct = (q.score / q.maxPoints) * 100;
              const bg = qPct === 100 ? "var(--correct-bg)" : qPct > 0 ? "var(--partial-bg)" : "var(--wrong-bg)";
              const border = qPct === 100 ? "var(--correct-border)" : qPct > 0 ? "var(--partial-border)" : "var(--wrong-border)";
              const color = qPct === 100 ? "var(--correct)" : qPct > 0 ? "var(--partial)" : "var(--wrong)";
              return (
                <div
                  key={q.id}
                  style={{ background: bg, border: `1px solid ${border}`, borderRadius: "6px", padding: "6px 4px", textAlign: "center" }}
                >
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 600, color }}>{i + 1}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color, opacity: 0.8 }}>{q.score.toFixed(0)}/{q.maxPoints}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="divider" />

        {/* Detailed review */}
        <div style={{ padding: "14px 20px" }}>
          <button
            onClick={() => setShowDetails((v) => !v)}
            className="btn-secondary"
          >
            {showDetails ? "Skjul" : "Vis"} detaljert gjennomgang
          </button>

          {/* Animated container — always rendered, height controlled by grid */}
          <div style={{
            display: "grid",
            gridTemplateRows: showDetails ? "1fr" : "0fr",
            transition: "grid-template-rows 0.3s ease",
          }}>
            <div style={{ overflow: "hidden", minHeight: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "14px" }}>
                {results.questions.map((q, i) => {
                  const correctIds = new Set(q.options.filter((o) => o.isCorrect).map((o) => o.id));
                  const selectedIds = new Set(q.selectedOptionIds);
                  const qPct = (q.score / q.maxPoints) * 100;
                  const isExpanded = expandedQuestions.has(q.id);

                  return (
                    <div
                      key={q.id}
                      style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}
                    >
                      {/* Clickable question header */}
                      <div
                        onClick={() => toggleQuestion(q.id)}
                        style={{
                          padding: "10px 14px",
                          background: "var(--surface)",
                          borderBottom: isExpanded ? "1px solid var(--border)" : "none",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "8px",
                          cursor: "pointer",
                          userSelect: "none",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span className="label">Spørsmål {i + 1}</span>
                          <span className="tag">{q.topic}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            fontWeight: 600,
                            color: qPct === 100 ? "var(--correct)" : qPct > 0 ? "var(--partial)" : "var(--wrong)",
                          }}>
                            {q.score.toFixed(1)}/{q.maxPoints}p
                          </span>
                          <span style={{
                            color: "var(--text-tertiary)",
                            fontSize: "12px",
                            display: "inline-block",
                            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s ease",
                            lineHeight: 1,
                          }}>↓</span>
                        </div>
                      </div>

                      {/* Animated question body */}
                      <div style={{
                        display: "grid",
                        gridTemplateRows: isExpanded ? "1fr" : "0fr",
                        transition: "grid-template-rows 0.22s ease",
                      }}>
                        <div style={{ overflow: "hidden", minHeight: 0 }}>
                          <div style={{ padding: "12px 14px" }}>
                            <div style={{ marginBottom: "10px" }}>
                              {q.stem.split("\n\n").map((part, pi) => (
                                <p key={pi} className="heading-sm" style={{ fontSize: "14px", marginTop: pi > 0 ? "3px" : 0 }}>
                                  {part}
                                </p>
                              ))}
                            </div>
                            {q.code && <CodeBlock code={q.code} />}

                            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: q.code ? "10px" : "0" }}>
                              {q.options.map((opt) => {
                                const isSelected = selectedIds.has(opt.id);
                                const isCorrect = correctIds.has(opt.id);
                                const isOpen = openExplanations.has(opt.id);

                                let cls = "option-btn default-revealed";
                                if (isCorrect && isSelected) cls = "option-btn correct-selected";
                                else if (isCorrect && !isSelected) cls = "option-btn correct-missed";
                                else if (!isCorrect && isSelected) cls = "option-btn wrong-selected";

                                return (
                                  <div key={opt.id} className={cls} style={{ cursor: "default" }}>
                                    <div className={`opt-check${isCorrect && isSelected ? " correct" : isCorrect && !isSelected ? " correct-hint" : isSelected ? " wrong" : ""}`}>
                                      {isCorrect && isSelected && <CheckIcon />}
                                      {!isCorrect && isSelected && <XIcon />}
                                    </div>

                                    <div style={{ flex: 1, minWidth: 0 }}>
                                      <span>{opt.text}</span>

                                      <div style={{ marginTop: "8px" }}>
                                        <button
                                          onClick={() => toggleExplanation(opt.id)}
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

                                        <div className={`explanation-wrapper${isOpen ? " open" : ""}`}>
                                          <div className="explanation-inner">
                                            <div
                                              className={isCorrect ? "explanation correct-exp" : "explanation"}
                                              style={{ marginTop: "6px" }}
                                            >
                                              {isCorrect && !selectedIds.has(opt.id)
                                                ? opt.explanation.replace(/^Riktig\.\s*/i, "")
                                                : opt.explanation}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Actions — no divider, tight spacing */}
        <div style={{ padding: "4px 20px 16px", display: "flex", gap: "8px" }}>
          <Link href="/" className="learn-sq-btn" aria-label="Hjem">
            <svg width="22" height="22" viewBox="0 0 17 17" fill="none">
              <path d="M2.5 7.5L8.5 2L14.5 7.5V15H11V10.5H6V15H2.5V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
          </Link>
          <Link href="/exam" className="btn-primary" style={{ flex: 1 }}>
            Ta en ny eksamen
          </Link>
        </div>
      </div>
    </main>
  );
}
