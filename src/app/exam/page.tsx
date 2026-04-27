"use client";

import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Question } from "@/types";
import { getRandomQuestions } from "@/lib/questions";
import { scoreQuestion, calculateGrade, getWeakTopics } from "@/lib/scoring";
import CodeBlock from "@/components/CodeBlock";
import ProgressBar from "@/components/ProgressBar";
import Link from "next/link";

const QUESTION_COUNT = 12;

export default function ExamPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const questions = useMemo(() => getRandomQuestions(QUESTION_COUNT), []);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Map<string, Set<string>>>(new Map());
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const q = questions[current];
  const currentSelected = answers.get(q.id) ?? new Set<string>();

  function toggleOption(optId: string) {
    if (submitted) return;
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

    // Store results in sessionStorage for results page
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

    setSubmitted(true);
    router.push("/results");
  }

  const answeredCount = answers.size;
  const allAnswered = answeredCount === QUESTION_COUNT;

  function optionStyle(optId: string): string {
    const base =
      "w-full text-left px-4 py-3 rounded-xl border transition-all text-sm";
    return currentSelected.has(optId)
      ? `${base} border-indigo-500 bg-indigo-900/30 text-white`
      : `${base} border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-800 active:bg-gray-700`;
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors text-xl">
              ←
            </Link>
            <div className="flex-1">
              <ProgressBar current={current + 1} total={QUESTION_COUNT} />
            </div>
          </div>

          {/* Question navigation dots */}
          <div className="flex gap-1.5 flex-wrap">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                  i === current
                    ? "bg-indigo-600 text-white"
                    : answers.has(questions[i].id)
                    ? "bg-gray-600 text-gray-200"
                    : "bg-gray-800 text-gray-500 hover:bg-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-500">
            {answeredCount} / {QUESTION_COUNT} besvart
          </p>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 overflow-auto p-4 max-w-2xl w-full mx-auto">
        <div className="mb-4">
          <span className="inline-block text-xs font-medium bg-gray-800 text-gray-300 px-3 py-1 rounded-full border border-gray-700">
            {q.topic}
          </span>
          <span className="ml-2 text-xs text-gray-500">
            {q.maxPoints} poeng
          </span>
        </div>

        <p className="text-white font-medium mb-3 leading-relaxed whitespace-pre-line">
          {q.stem}
        </p>

        {q.code && <CodeBlock code={q.code} />}

        <div className="space-y-2 mt-4">
          {q.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => toggleOption(opt.id)}
              className={optionStyle(opt.id)}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-colors ${
                    currentSelected.has(opt.id)
                      ? "border-indigo-500 bg-indigo-500"
                      : "border-gray-600"
                  }`}
                >
                  {currentSelected.has(opt.id) && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span>{opt.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="sticky bottom-0 p-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-2xl mx-auto flex gap-3">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="px-4 py-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 text-white rounded-xl transition-colors font-medium"
          >
            ←
          </button>

          {current < QUESTION_COUNT - 1 ? (
            <button
              onClick={() => setCurrent((c) => c + 1)}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Neste →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered || submitting}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {submitting
                ? "Sender..."
                : !allAnswered
                ? `Besvar alle (${QUESTION_COUNT - answeredCount} igjen)`
                : "Lever eksamen 🎯"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
