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
  const [submitting, setSubmitting] = useState(false);

  const q = questions[current];
  const currentSelected = answers.get(q.id) ?? new Set<string>();

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
  const pct = Math.round(((current + 1) / QUESTION_COUNT) * 100);

  return (
    <main className="page-shell-top">
      <div className="app-card" style={{ height: "calc(100dvh - 40px)" }}>
        {/* Header */}
        <div style={{
          flexShrink: 0,
          padding: "10px 16px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <Link href="/" style={{ color: "var(--text-tertiary)", textDecoration: "none", fontSize: "18px", lineHeight: 1 }}>
            ←
          </Link>
          <span className="label">Spørsmål {current + 1} av {QUESTION_COUNT}</span>
        </div>

        {/* Scrollable question */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px 16px" }}>
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

        {/* Footer nav */}
        <div style={{
          flexShrink: 0,
          padding: "12px 16px",
          borderTop: "1px solid var(--border)",
        }}>
          {/* Prev / Next / Submit */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="btn-secondary"
              style={{ width: "auto", padding: "13px 18px" }}
            >
              ←
            </button>

            {current < QUESTION_COUNT - 1 ? (
              <button
                onClick={() => setCurrent((c) => c + 1)}
                className="btn-primary"
                style={{ flex: 1 }}
              >
                Neste →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered || submitting}
                className="btn-primary"
                style={{ flex: 1 }}
              >
                {submitting
                  ? "Sender..."
                  : !allAnswered
                  ? `${QUESTION_COUNT - answeredCount} spørsmål gjenstår`
                  : "Lever eksamen"}
              </button>
            )}
          </div>

          {/* Nav dots centered */}
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", justifyContent: "center" }}>
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`nav-dot${i === current ? " active" : answers.has(questions[i].id) ? " answered" : ""}`}
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
