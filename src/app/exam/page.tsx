"use client";

import { useState, useMemo, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Question } from "@/types";
import { getRandomDel1Questions, getRandomDel2Questions } from "@/lib/questions";
import { scoreQuestion, calculateGrade, getWeakTopics } from "@/lib/scoring";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

const DEL1_COUNT = 12;
const DEL2_COUNT = 8;

type Del2Grade = "riktig" | "delvis" | "feil";

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ExamPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const { del1Questions, del2Questions, allQuestions } = useMemo(() => {
    const recentIds = new Set<string>(
      JSON.parse(typeof window !== "undefined" ? (localStorage.getItem("recentExamIds") ?? "[]") : "[]")
    );
    const d1 = getRandomDel1Questions(DEL1_COUNT, recentIds);
    const d2 = getRandomDel2Questions(DEL2_COUNT);
    return { del1Questions: d1, del2Questions: d2, allQuestions: [...d1, ...d2] };
  }, []);

  const QUESTION_COUNT = allQuestions.length;

  const [current, setCurrent] = useState(0);
  // Del 1 state
  const [answers, setAnswers] = useState<Map<string, Set<string>>>(new Map());
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  // Del 2 state
  const [del2TextAnswers, setDel2TextAnswers] = useState<Map<string, string>>(new Map());
  const [del2Revealed, setDel2Revealed] = useState<Set<string>>(new Set());
  const [del2Grades, setDel2Grades] = useState<Map<string, Del2Grade>>(new Map());

  const [submitting, setSubmitting] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [entering, setEntering] = useState(false);
  const [direction, setDirection] = useState<"right" | "left">("right");

  const q = allQuestions[current];
  const isDel2 = q.source === "del2";
  const currentSelected = answers.get(q.id) ?? new Set<string>();
  const isRevealed = del2Revealed.has(q.id);
  const currentGrade = del2Grades.get(q.id);

  const del1Remaining = del1Questions.filter((dq) => !answers.has(dq.id)).length;
  const del2Remaining = del2Questions.filter((dq) => !del2Grades.has(dq.id)).length;
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

  function revealDel2() {
    setDel2Revealed((prev) => new Set([...prev, q.id]));
  }

  function gradeDel2(grade: Del2Grade) {
    setDel2Grades((prev) => new Map(prev).set(q.id, grade));
  }

  function updateDel2Text(text: string) {
    setDel2TextAnswers((prev) => new Map(prev).set(q.id, text));
  }

  async function handleSubmit() {
    setSubmitting(true);

    const del1Results = del1Questions.map((question) => {
      const sel = [...(answers.get(question.id) ?? [])];
      const score = scoreQuestion(question, sel);
      const pct = (score / question.maxPoints) * 100;
      return { topic: question.topic, score, maxScore: question.maxPoints, percent: pct };
    });

    const del2Results = del2Questions.map((question) => {
      const grade = del2Grades.get(question.id) ?? "feil";
      const score = grade === "riktig" ? question.maxPoints : grade === "delvis" ? question.maxPoints / 2 : 0;
      const pct = (score / question.maxPoints) * 100;
      return { topic: question.topic, score, maxScore: question.maxPoints, percent: pct };
    });

    const results = [...del1Results, ...del2Results];
    const totalScore = results.reduce((s, r) => s + r.score, 0);
    const maxScore = results.reduce((s, r) => s + r.maxScore, 0);
    const grade = calculateGrade(totalScore, maxScore);
    const weakTopics = getWeakTopics(results);

    if (session?.user?.id) {
      await fetch("/api/exam-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: totalScore, maxScore, grade, topics: weakTopics }),
      }).catch(() => {});
    }

    const seenIds = allQuestions.map((q) => q.id);
    const existing: string[] = JSON.parse(localStorage.getItem("recentExamIds") ?? "[]");
    localStorage.setItem("recentExamIds", JSON.stringify([...new Set([...seenIds, ...existing])].slice(0, 24)));

    sessionStorage.setItem(
      "examResults",
      JSON.stringify({
        questions: [
          ...del1Questions.map((question) => ({
            id: question.id, topic: question.topic, stem: question.stem,
            code: question.code, maxPoints: question.maxPoints, options: question.options,
            source: question.source, selectedOptionIds: [...(answers.get(question.id) ?? [])],
            score: scoreQuestion(question, [...(answers.get(question.id) ?? [])]),
          })),
          ...del2Questions.map((question) => {
            const g = del2Grades.get(question.id) ?? "feil";
            const score = g === "riktig" ? question.maxPoints : g === "delvis" ? question.maxPoints / 2 : 0;
            return {
              id: question.id, topic: question.topic, stem: question.stem,
              code: question.code, maxPoints: question.maxPoints, options: [],
              source: "del2", selectedOptionIds: [], score,
              modelAnswer: question.modelAnswer,
              textAnswer: del2TextAnswers.get(question.id) ?? "",
              selfGrade: g,
            };
          }),
        ],
        totalScore, maxScore, grade, weakTopics,
      })
    );

    router.push("/results");
  }

  useEffect(() => {
    setEntering(true);
    const t = setTimeout(() => setEntering(false), 500);
    return () => clearTimeout(t);
  }, []);

  const anim = direction === "left" ? "slide-from-left" : "slide-from-right";
  const enterStyle = (delay: string) => entering
    ? { animation: `${anim} 0.26s cubic-bezier(0.25, 0, 0.2, 1) both`, animationDelay: delay }
    : {};

  // Footer button logic
  const isLastQuestion = current === QUESTION_COUNT - 1;
  const footerButton = (() => {
    if (isDel2 && !isRevealed) {
      return (
        <button onClick={revealDel2} className="btn-primary" style={{ flex: 1 }}>
          Sjekk svar
        </button>
      );
    }
    if (isLastQuestion) {
      return (
        <button onClick={handleSubmit} disabled={submitting} className="btn-primary" style={{ flex: 1 }}>
          {submitting ? "Sender..." : remaining > 0 ? `Lever (${remaining} ubesvart)` : "Lever eksamen"}
        </button>
      );
    }
    return (
      <button
        onClick={() => navigateTo(current + 1)}
        disabled={isDel2 && isRevealed && !currentGrade}
        className="btn-primary"
        style={{ flex: 1 }}
      >
        Neste →
      </button>
    );
  })();

  return (
    <main className="page-shell-learn">
      <div className="app-card app-card-learn">

        {/* Scrollable question */}
        <div className={`question-content${exiting ? " exiting" : ""}`} style={{ flex: 1, overflowY: "auto", padding: "20px 20px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", flexWrap: "wrap", ...enterStyle("0ms") }}>
            <span className="tag">{q.topic}</span>
            <span className="label">{q.maxPoints}p</span>
            {isDel2 && <span className="label" style={{ color: "var(--text-tertiary)" }}>Del 2</span>}
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
          {!isDel2 && (
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

          {/* Del 2: text input + reveal */}
          {isDel2 && (
            <div style={{ marginTop: q.code ? "14px" : "0", ...enterStyle("55ms") }}>
              <textarea
                value={del2TextAnswers.get(q.id) ?? ""}
                onChange={(e) => updateDel2Text(e.target.value)}
                disabled={isRevealed}
                placeholder="Skriv svaret ditt..."
                rows={4}
                style={{
                  width: "100%", boxSizing: "border-box",
                  padding: "12px 14px", borderRadius: "var(--radius-sm)",
                  border: "1.5px solid var(--border)", background: isRevealed ? "var(--surface)" : "var(--card)",
                  fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.6,
                  color: "var(--text-primary)", resize: "vertical", outline: "none",
                  opacity: isRevealed ? 0.7 : 1, transition: "background 0.15s",
                }}
              />

              {/* Model answer + grade buttons */}
              <div style={{
                display: "grid",
                gridTemplateRows: isRevealed ? "1fr" : "0fr",
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
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "14px", lineHeight: 1.5, margin: 0, color: "var(--text-primary)" }}>
                      {q.modelAnswer}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
                    {(["feil", "delvis", "riktig"] as const).map((grade) => (
                      <button
                        key={grade}
                        onClick={() => gradeDel2(grade)}
                        style={{
                          flex: 1, padding: "11px 6px", borderRadius: "var(--radius-sm)",
                          border: `1.5px solid ${grade === "riktig" ? "var(--correct-border)" : grade === "delvis" ? "var(--partial-border)" : "var(--wrong-border)"}`,
                          background: currentGrade === grade
                            ? (grade === "riktig" ? "var(--correct-bg)" : grade === "delvis" ? "var(--partial-bg)" : "var(--wrong-bg)")
                            : "var(--card)",
                          color: grade === "riktig" ? "var(--correct)" : grade === "delvis" ? "var(--partial)" : "var(--wrong)",
                          fontWeight: 600, fontSize: "13px", cursor: "pointer",
                          fontFamily: "var(--font-sans)", transition: "background 0.15s",
                          outline: currentGrade === grade ? `2px solid ${grade === "riktig" ? "var(--correct)" : grade === "delvis" ? "var(--partial)" : "var(--wrong)"}` : "none",
                          outlineOffset: "-2px",
                        }}
                      >
                        {grade === "riktig" ? "Riktig" : grade === "delvis" ? "Delvis" : "Feil"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
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
          <div className="exam-nav-dots" style={{ display: "flex", gap: "4px", flexWrap: "wrap", justifyContent: "center" }}>
            {allQuestions.map((aq, i) => {
              const isActive = i === current;
              const isFlagged = flagged.has(aq.id);
              const isDel2Q = aq.source === "del2";
              const isAnswered = isDel2Q ? del2Grades.has(aq.id) : answers.has(aq.id);
              const isInProgress = isDel2Q && del2Revealed.has(aq.id) && !del2Grades.has(aq.id);
              const dotClass = `nav-dot${isActive ? " active" : isFlagged ? " flagged" : isAnswered ? " answered" : isInProgress ? " flagged" : ""}`;
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
        </div>
      </div>
    </main>
  );
}
