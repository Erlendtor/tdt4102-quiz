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

const gradeColors: Record<string, string> = {
  A: "text-green-400",
  B: "text-emerald-400",
  C: "text-yellow-400",
  D: "text-orange-400",
  E: "text-red-400",
  F: "text-red-600",
};

const gradeMessages: Record<string, string> = {
  A: "Utmerket! Du er godt forberedt til eksamen.",
  B: "Meget bra! Noen få emner å pusse på.",
  C: "Bra! Jobb litt mer med svake emner.",
  D: "Godkjent, men det er rom for forbedring.",
  E: "Bestått – fortsett å øve!",
  F: "Ikke bestått – mer øving anbefales.",
};

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<Results | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("examResults");
    if (!stored) {
      router.push("/exam");
      return;
    }
    setResults(JSON.parse(stored));
  }, [router]);

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400 animate-pulse">Laster resultater...</div>
      </div>
    );
  }

  const pct = Math.round((results.totalScore / results.maxScore) * 100);

  return (
    <div className="min-h-screen bg-gray-950 pb-8">
      {/* Hero */}
      <div className="bg-gray-900 border-b border-gray-800 p-6 text-center">
        <div className="text-5xl mb-2">
          {results.grade === "A"
            ? "🏆"
            : results.grade === "F"
            ? "📚"
            : "🎯"}
        </div>
        <div
          className={`text-7xl font-black mb-2 ${
            gradeColors[results.grade] ?? "text-white"
          }`}
        >
          {results.grade}
        </div>
        <p className="text-gray-300 text-lg font-medium">
          {gradeMessages[results.grade]}
        </p>

        <div className="mt-4 inline-flex items-center gap-3 bg-gray-800 rounded-2xl px-6 py-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {results.totalScore.toFixed(1)}
            </div>
            <div className="text-xs text-gray-400">poeng</div>
          </div>
          <div className="text-gray-600 text-xl">/</div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {results.maxScore}
            </div>
            <div className="text-xs text-gray-400">maks</div>
          </div>
          <div className="text-gray-600 text-xl">·</div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{pct}%</div>
            <div className="text-xs text-gray-400">riktige</div>
          </div>
        </div>

        {/* NTNU grade scale */}
        <div className="mt-4 flex justify-center gap-1 text-xs">
          {["A", "B", "C", "D", "E", "F"].map((g) => (
            <div
              key={g}
              className={`px-2 py-1 rounded-lg font-semibold ${
                g === results.grade
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-500"
              }`}
            >
              {g}
            </div>
          ))}
        </div>
        <p className="text-gray-600 text-xs mt-1">
          A≥89% · B≥77% · C≥63% · D≥49% · E≥35%
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-6 space-y-4">
        {/* Weak topics */}
        {results.weakTopics.length > 0 && (
          <div className="bg-orange-900/20 border border-orange-800 rounded-2xl p-4">
            <h3 className="font-semibold text-orange-300 mb-2">
              📌 Øv mer på disse emnene:
            </h3>
            <div className="flex flex-wrap gap-2">
              {results.weakTopics.map((t) => (
                <span
                  key={t}
                  className="bg-orange-900/40 text-orange-200 text-xs px-3 py-1 rounded-full border border-orange-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Per-question summary */}
        <div className="grid grid-cols-6 gap-1.5">
          {results.questions.map((q, i) => {
            const pctQ = (q.score / q.maxPoints) * 100;
            return (
              <div
                key={q.id}
                className={`rounded-lg p-2 text-center text-xs font-medium border ${
                  pctQ === 100
                    ? "bg-green-900/30 border-green-700 text-green-300"
                    : pctQ > 0
                    ? "bg-yellow-900/30 border-yellow-700 text-yellow-300"
                    : "bg-red-900/30 border-red-700 text-red-300"
                }`}
              >
                <div className="font-bold">{i + 1}</div>
                <div>{q.score.toFixed(0)}/{q.maxPoints}</div>
              </div>
            );
          })}
        </div>

        {/* Detailed review toggle */}
        <button
          onClick={() => setShowDetails((v) => !v)}
          className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium py-3 rounded-xl transition-colors border border-gray-700"
        >
          {showDetails ? "Skjul" : "Vis"} detaljert gjennomgang
        </button>

        {showDetails && (
          <div className="space-y-4">
            {results.questions.map((q, i) => {
              const correctIds = new Set(
                q.options.filter((o) => o.isCorrect).map((o) => o.id)
              );
              const selectedIds = new Set(q.selectedOptionIds);
              const pctQ = (q.score / q.maxPoints) * 100;

              return (
                <div
                  key={q.id}
                  className="bg-gray-900 rounded-2xl p-4 border border-gray-800"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xs text-gray-400 font-medium">
                        Spørsmål {i + 1} · {q.topic}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        pctQ === 100
                          ? "text-green-400"
                          : pctQ > 0
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {q.score.toFixed(1)}/{q.maxPoints}p
                    </span>
                  </div>

                  <p className="text-white text-sm mb-2 whitespace-pre-line">
                    {q.stem}
                  </p>
                  {q.code && <CodeBlock code={q.code} />}

                  <div className="space-y-2 mt-3">
                    {q.options.map((opt) => {
                      const isSelected = selectedIds.has(opt.id);
                      const isCorrect = correctIds.has(opt.id);
                      let bg = "bg-gray-800/30 border-gray-700 text-gray-400";
                      if (isCorrect && isSelected)
                        bg = "bg-green-900/30 border-green-600 text-green-200";
                      else if (isCorrect && !isSelected)
                        bg = "bg-green-900/10 border-green-700/50 text-green-300";
                      else if (!isCorrect && isSelected)
                        bg = "bg-red-900/30 border-red-600 text-red-200";

                      return (
                        <div
                          key={opt.id}
                          className={`rounded-xl border px-3 py-2 text-xs ${bg}`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span>
                              {isCorrect ? "✓" : isSelected ? "✗" : "○"}
                            </span>
                            <span>{opt.text}</span>
                          </div>
                          <p className="text-xs opacity-70 pl-5">
                            {opt.explanation}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Link
            href="/exam"
            className="flex-1 text-center bg-emerald-700 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Ta eksamen igjen
          </Link>
          <Link
            href="/"
            className="flex-1 text-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-colors border border-gray-700"
          >
            Til start
          </Link>
        </div>
      </div>
    </div>
  );
}
