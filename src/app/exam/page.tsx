"use client";

import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Question } from "@/types";
import { getRandomQuestions } from "@/lib/questions";
import { scoreQuestion, calculateGrade, getWeakTopics } from "@/lib/scoring";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

const QUESTION_COUNT = 12;

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
  const questions = useMemo(() => getRandomQuestions(QUESTION_COUNT), []);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Map<string, Set<string>>>(new Map());
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);

  const q = questions[current];
  const currentSelected = answers.get(q.id) ?? new Set<string>();

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

  async function handleSubmit() {
    setSubmitting(true);

    const results = questions.map((question) => {
      const sel = [...(answers.get(question.id) ?? [])];
      const score = scoreQuestion(question, sel);
      const pct = (score / question.maxPoints) * 100;
      return { topic: question.topic, score, maxScore: question.maxPoints, percent: pct };
    });

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

    sessionStorage.setItem(
      "examResults",
      JSON.stringify({
        questions: questions.map((question) => ({
          id: question.id,
          topic: question.topic,
          stem: question.stem,
          code: question.code,
          maxPoints: question.maxPoints,
          options: question.options,
          selectedOptionIds: [...(answers.get(question.id) ?? [])],
          score: scoreQuestion(question, [...(answers.get(question.id) ?? [])]),
        })),
        totalScore,
        maxScore,
        grade,
        weakTopics,
      })
    );

    router.push("/results");
  }

  const answeredCount = answers.size;
  const allAnswered = answeredCount === QUESTION_COUNT;

  return (
    <main className="page-shell-learn">
      <div className="app-card app-card-learn">

        {/* Scrollable question */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            <span className="tag">{q.topic}</span>
            <span className="label">{q.maxPoints}p</span>
          </div>

          <p className="heading-sm" style={{ marginBottom: "14px", whiteSpace: "pre-line" }}>
            {q.stem}
          </p>

          {q.code && <CodeBlock code={q.code} />}

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: q.code ? "14px" : "0" }}>
            {q.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => toggleOption(opt.id)}
                className={currentSelected.has(opt.id) ? "option-btn selected" : "option-btn"}
              >
                <div className={currentSelected.has(opt.id) ? "opt-check checked" : "opt-check"}>
                  {currentSelected.has(opt.id) && <CheckIcon />}
                </div>
                <span>{opt.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ flexShrink: 0, padding: "14px 20px 18px", background: "var(--card)" }}>
          {/* Main action row — home/flag sq buttons visible on mobile only */}
          <div style={{ display: "flex", gap: "5px", alignItems: "center", marginBottom: "12px" }}>
            <Link href="/" className="learn-sq-btn" aria-label="Hjem">
              <svg width="22" height="22" viewBox="0 0 17 17" fill="none">
                <path d="M2.5 7.5L8.5 2L14.5 7.5V15H11V10.5H6V15H2.5V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
              </svg>
            </Link>

{current < QUESTION_COUNT - 1 ? (
              <button onClick={() => setCurrent((c) => c + 1)} className="btn-primary" style={{ flex: 1 }}>
                Neste →
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={!allAnswered || submitting} className="btn-primary" style={{ flex: 1 }}>
                {submitting ? "Sender..." : !allAnswered ? `${QUESTION_COUNT - answeredCount} gjenstår` : "Lever eksamen"}
              </button>
            )}

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

          {/* Bottom row: nav dots */}
          <div className="exam-nav-dots" style={{ display: "flex", gap: "4px", flexWrap: "wrap", justifyContent: "center" }}>
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`nav-dot${i === current ? " active" : flagged.has(questions[i].id) ? " flagged" : answers.has(questions[i].id) ? " answered" : ""}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
