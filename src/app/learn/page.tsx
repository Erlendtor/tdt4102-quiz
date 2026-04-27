"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Question, QuestionProgress } from "@/types";
import { scoreQuestion, scorePercent, getBucket } from "@/lib/scoring";
import { questions as allQuestions } from "@/lib/questions";
import CodeBlock from "@/components/CodeBlock";
import BucketIndicator from "@/components/BucketIndicator";
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

  const bucket0 = active.filter(
    (q) => (progress.get(q.id)?.bucket ?? 0) === 0
  );
  const bucket1 = active.filter(
    (q) => (progress.get(q.id)?.bucket ?? 0) === 1
  );
  const bucket2 = active.filter(
    (q) => (progress.get(q.id)?.bucket ?? 0) === 2
  );

  const pool: Question[] = [];
  for (let i = 0; i < 6; i++) pool.push(...bucket0);
  for (let i = 0; i < 3; i++) pool.push(...bucket1);
  for (let i = 0; i < 1; i++) pool.push(...bucket2);

  if (pool.length === 0) return active[Math.floor(Math.random() * active.length)];
  return pool[Math.floor(Math.random() * pool.length)];
}

// Deduplicate variant groups – pick one per group
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

export default function LearnPage() {
  const { data: session } = useSession();
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [progress, setProgress] = useState<Map<string, QuestionProgress>>(
    new Map()
  );
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [current, setCurrent] = useState<Question | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [state, setState] = useState<State>("answering");
  const [score, setScore] = useState<number>(0);
  const [done, setDone] = useState(false);

  // Load progress from server if logged in
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
            if (p.bucket === 2 && p.timesInBucket2 >= 2) {
              mastered.add(p.questionId);
            }
          }
          setProgress(map);
          setMasteredIds(mastered);
        })
        .catch(() => {});
    }
  }, [session]);

  // Pick initial question
  useEffect(() => {
    if (activeQuestions.length > 0 && !current) {
      const next = pickNextQuestion(activeQuestions, progress, masteredIds);
      setCurrent(next);
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

  async function checkAnswer() {
    if (!current || selected.size === 0) return;
    const pct = scorePercent(current, [...selected]);
    const rawScore = scoreQuestion(current, [...selected]);
    setScore(rawScore);
    setState("revealed");

    const bucket = getBucket(pct);
    const prevProgress = progress.get(current.id);
    const prevBucket = prevProgress?.bucket ?? 0;
    const prevTimes = prevProgress?.timesInBucket2 ?? 0;

    const newTimes =
      bucket === 2 ? (prevBucket === 2 ? prevTimes + 1 : 1) : 0;

    const newProgress: QuestionProgress = {
      questionId: current.id,
      bucket,
      timesInBucket2: newTimes,
      lastScore: pct,
      attempts: (prevProgress?.attempts ?? 0) + 1,
    };

    const newMap = new Map(progress);
    newMap.set(current.id, newProgress);
    setProgress(newMap);

    // Mark as mastered (seen 2+ times in bucket 2)
    if (bucket === 2 && newTimes >= 2) {
      setMasteredIds((prev) => new Set([...prev, current.id]));
    }

    if (session?.user?.id) {
      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: current.id,
          bucket,
          timesInBucket2: newTimes,
          lastScore: pct,
        }),
      }).catch(() => {});
    }
  }

  function nextQuestion() {
    const remaining = activeQuestions.filter((q) => !masteredIds.has(q.id));
    if (remaining.length === 0) {
      setDone(true);
      return;
    }
    const next = pickNextQuestion(activeQuestions, progress, masteredIds);
    setCurrent(next ? shuffleOptions(next) : null);
    setSelected(new Set());
    setState("answering");
  }

  if (done || (activeQuestions.length > 0 && masteredIds.size >= activeQuestions.length)) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Alle spørsmål mestret!
          </h2>
          <p className="text-gray-400 mb-6">
            Du har mestret alle {activeQuestions.length} spørsmålene.
          </p>
          <Link
            href="/"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl inline-block transition-colors"
          >
            Tilbake til start
          </Link>
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400 animate-pulse">Laster spørsmål...</div>
      </div>
    );
  }

  const correctIds = new Set(
    current.options.filter((o) => o.isCorrect).map((o) => o.id)
  );

  function optionStyle(optId: string): string {
    const base =
      "w-full text-left px-4 py-3 rounded-xl border transition-all text-sm";
    if (state === "answering") {
      return selected.has(optId)
        ? `${base} border-indigo-500 bg-indigo-900/30 text-white`
        : `${base} border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-800 active:bg-gray-700`;
    }
    const isSelected = selected.has(optId);
    const isCorrect = correctIds.has(optId);
    if (isCorrect && isSelected)
      return `${base} border-green-500 bg-green-900/30 text-green-100`;
    if (isCorrect && !isSelected)
      return `${base} border-green-500/60 bg-green-900/10 text-green-200`;
    if (!isCorrect && isSelected)
      return `${base} border-red-500 bg-red-900/30 text-red-200`;
    return `${base} border-gray-700 bg-gray-800/30 text-gray-500`;
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center gap-3">
        <Link href="/" className="text-gray-400 hover:text-white transition-colors text-xl">
          ←
        </Link>
        <div className="flex-1">
          <BucketIndicator
            bucket0={bucketCounts[0]}
            bucket1={bucketCounts[1]}
            bucket2={bucketCounts[2]}
            mastered={bucketCounts.mastered}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 overflow-auto p-4 max-w-2xl w-full mx-auto">
        <div className="mb-4">
          <span className="inline-block text-xs font-medium bg-gray-800 text-gray-300 px-3 py-1 rounded-full border border-gray-700">
            {current.topic}
          </span>
          <span className="ml-2 text-xs text-gray-500">
            {current.maxPoints} poeng · {current.source}
          </span>
        </div>

        <p className="text-white font-medium mb-3 leading-relaxed whitespace-pre-line">
          {current.stem}
        </p>

        {current.code && <CodeBlock code={current.code} />}

        <div className="space-y-2 mt-4">
          {current.options.map((opt) => (
            <div key={opt.id}>
              <button
                onClick={() => toggleOption(opt.id)}
                className={optionStyle(opt.id)}
                disabled={state === "revealed"}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-colors ${
                      state === "answering"
                        ? selected.has(opt.id)
                          ? "border-indigo-500 bg-indigo-500"
                          : "border-gray-600"
                        : correctIds.has(opt.id)
                        ? "border-green-500 bg-green-500"
                        : selected.has(opt.id)
                        ? "border-red-500 bg-red-500"
                        : "border-gray-600"
                    }`}
                  >
                    {(state === "answering"
                      ? selected.has(opt.id)
                      : correctIds.has(opt.id) || selected.has(opt.id)) && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span>{opt.text}</span>
                </div>
              </button>

              {/* Explanation shown after reveal */}
              {state === "revealed" && (
                <div
                  className={`mt-1 mb-1 px-4 py-2 rounded-lg text-xs ${
                    correctIds.has(opt.id)
                      ? "bg-green-900/20 text-green-300 border border-green-800"
                      : "bg-gray-800/50 text-gray-400 border border-gray-700"
                  }`}
                >
                  {correctIds.has(opt.id) ? "✓ " : "✗ "}
                  {opt.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Score feedback */}
        {state === "revealed" && (
          <div
            className={`mt-4 p-4 rounded-xl border ${
              score === current.maxPoints
                ? "bg-green-900/20 border-green-700 text-green-300"
                : score > 0
                ? "bg-yellow-900/20 border-yellow-700 text-yellow-300"
                : "bg-red-900/20 border-red-700 text-red-300"
            }`}
          >
            <div className="font-semibold text-base">
              {score === current.maxPoints
                ? "🎉 Perfekt!"
                : score > 0
                ? "👍 Delvis riktig"
                : "❌ Feil"}
            </div>
            <div className="text-sm opacity-80 mt-0.5">
              {score.toFixed(1)} / {current.maxPoints} poeng
            </div>
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div className="sticky bottom-0 p-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-2xl mx-auto">
          {state === "answering" ? (
            <button
              onClick={checkAnswer}
              disabled={selected.size === 0}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors"
            >
              Sjekk svar
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3.5 rounded-xl transition-colors"
            >
              Neste spørsmål →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
