"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Option } from "@/types";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

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
  // Per-option explanation toggles in the detailed review
  const [openExplanations, setOpenExplanations] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = sessionStorage.getItem("examResults");
    if (!stored) { router.push("/exam"); return; }
    const parsed: Results = JSON.parse(stored);
    setResults(parsed);

    // Default open: wrong selections + missed correct answers
    const defaultOpen = new Set<string>();
    for (const q of parsed.questions) {
      const selectedIds = new Set(q.selectedOptionIds);
      for (const opt of q.options) {
        const isWrongSelected = !opt.isCorrect && selectedIds.has(opt.id);
        const isMissedCorrect = opt.isCorrect && !selectedIds.has(opt.id);
        if (isWrongSelected || isMissedCorrect) defaultOpen.add(opt.id);
      }
    }
    setOpenExplanations(defaultOpen);
  }, [router]);

  function toggleExplanation(optId: string) {
    setOpenExplanations((prev) => {
      const next = new Set(prev);
      next.has(optId) ? next.delete(optId) : next.add(optId);
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
    <main className="page-shell-top">
      <div className="app-card">
        {/* Grade hero */}
        <div style={{ padding: "28px 28px 20px", textAlign: "center" }}>
          <div className="label" style={{ marginBottom: "12px" }}>Eksamensresultat</div>
          <div style={{
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

        {/* NTNU scale */}
        <div style={{ padding: "0 20px 14px", display: "flex", justifyContent: "center", gap: "4px" }}>
          {["A", "B", "C", "D", "E", "F"].map((g) => (
            <div
              key={g}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 600,
                background: g === results.grade ? "var(--text-primary)" : "var(--surface)",
                color: g === results.grade ? "#FFFFFF" : "var(--text-tertiary)",
                border: `1px solid ${g === results.grade ? "var(--text-primary)" : "var(--border)"}`,
              }}
            >
              {g}
            </div>
          ))}
        </div>
        <p className="label" style={{ textAlign: "center", paddingBottom: "16px" }}>
          A≥89% · B≥77% · C≥63% · D≥49% · E≥35%
        </p>

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
            style={{ marginBottom: showDetails ? "14px" : "0" }}
          >
            {showDetails ? "Skjul" : "Vis"} detaljert gjennomgang
          </button>

          {showDetails && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {results.questions.map((q, i) => {
                const correctIds = new Set(q.options.filter((o) => o.isCorrect).map((o) => o.id));
                const selectedIds = new Set(q.selectedOptionIds);
                const qPct = (q.score / q.maxPoints) * 100;

                return (
                  <div
                    key={q.id}
                    style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}
                  >
                    {/* Question header */}
                    <div style={{
                      padding: "10px 14px",
                      background: "var(--surface)",
                      borderBottom: "1px solid var(--border)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "8px",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span className="label">Spørsmål {i + 1}</span>
                        <span className="tag">{q.topic}</span>
                      </div>
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: qPct === 100 ? "var(--correct)" : qPct > 0 ? "var(--partial)" : "var(--wrong)",
                        flexShrink: 0,
                      }}>
                        {q.score.toFixed(1)}/{q.maxPoints}p
                      </span>
                    </div>

                    {/* Stem */}
                    <div style={{ padding: "12px 14px" }}>
                      <p className="heading-sm" style={{ marginBottom: "10px", whiteSpace: "pre-line", fontSize: "14px" }}>
                        {q.stem}
                      </p>
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
                            <div
                              key={opt.id}
                              className={cls}
                              style={{ cursor: "default" }}
                            >
                              <div className={`opt-check${isCorrect ? " correct" : isSelected ? " wrong" : ""}`}>
                                {isCorrect && <CheckIcon />}
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

                                  {isOpen && (
                                    <div
                                      className={isCorrect ? "explanation correct-exp" : "explanation"}
                                      style={{ marginTop: "6px", marginBottom: 0 }}
                                    >
                                      {opt.explanation}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="divider" />

        {/* Actions */}
        <div style={{ padding: "14px 20px", display: "flex", gap: "8px" }}>
          <Link href="/exam" className="btn-primary" style={{ flex: 1 }}>
            Ta eksamen igjen
          </Link>
          <Link href="/" className="btn-secondary" style={{ flex: 1 }}>
            Til start
          </Link>
        </div>
      </div>
    </main>
  );
}
