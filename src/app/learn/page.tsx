"use client";

import { useState, useEffect, useLayoutEffect, useRef, Suspense } from "react";
import confetti from "canvas-confetti";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Question, QuestionProgress } from "@/types";
import { scoreQuestion, scorePercent, getBucket } from "@/lib/scoring";
import { questions as allQuestions } from "@/lib/questions";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";
import PageLoader from "@/components/PageLoader";
import FireBar from "@/components/FireBar";
import { useFireStreak } from "@/hooks/useFireStreak";

type State = "answering" | "revealed";

function shuffleOptions(q: Question): Question {
  return { ...q, options: [...q.options].sort(() => Math.random() - 0.5) };
}

function pickNextQuestion(
  allQs: Question[],
  progress: Map<string, QuestionProgress>,
  masteredIds: Set<string>,
  priorityId?: string | null,
  blocked?: Set<string>
): Question | null {
  // Expand mastery to whole variant group: if any twin is mastered, the whole group is done.
  const masteredGroups = new Set<string>();
  for (const id of masteredIds) {
    const q = allQuestions.find(x => x.id === id);
    if (q) masteredGroups.add(q.variantGroupId);
  }
  const isMastered = (q: Question) => masteredIds.has(q.id) || masteredGroups.has(q.variantGroupId);

  if (priorityId) {
    const p = allQs.find((q) => q.id === priorityId && !isMastered(q));
    if (p) return p;
  }
  const active = allQs.filter((q) => !isMastered(q) && !blocked?.has(q.id));
  if (active.length === 0) return null;

  const bucket0 = active.filter((q) => (progress.get(q.id)?.bucket ?? 0) === 0);
  const bucket1 = active.filter((q) => (progress.get(q.id)?.bucket ?? 0) === 1);
  const bucket2 = active.filter((q) => (progress.get(q.id)?.bucket ?? 0) === 2);

  const pool: Question[] = [];
  for (let i = 0; i < 6; i++) pool.push(...bucket0);
  for (let i = 0; i < 3; i++) pool.push(...bucket1);
  for (let i = 0; i < 1; i++) pool.push(...bucket2);

  if (pool.length === 0) return active[Math.floor(Math.random() * active.length)];
  return pool[Math.floor(Math.random() * pool.length)];
}

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

function findTwin(questionId: string): Question | undefined {
  const q = allQuestions.find((x) => x.id === questionId);
  if (!q) return undefined;
  return allQuestions.find((x) => x.variantGroupId === q.variantGroupId && x.id !== questionId);
}

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


const CONFETTI_COLORS = ["#FF3B5C", "#FFD60A", "#0A84FF", "#30D158", "#FF9500", "#BF5AF2", "#5AC8FA"];

function fireConfetti(canvas: HTMLCanvasElement, light = false) {
  const fire = confetti.create(canvas, { resize: true });
  fire({
    particleCount: light ? 55 : 90,
    angle: 210,
    spread: 80,
    startVelocity: light ? 48 : 58,
    origin: { x: 1, y: 0 },
    colors: CONFETTI_COLORS,
    shapes: ["square"],
    gravity: 0.85,
    scalar: light ? 1.1 : 1.3,
    drift: -0.4,
  });
  setTimeout(() => {
    fire({
      particleCount: light ? 30 : 55,
      angle: 265,
      spread: 65,
      startVelocity: light ? 28 : 38,
      origin: { x: 0.65, y: 0 },
      colors: CONFETTI_COLORS,
      shapes: ["square"],
      gravity: 1.0,
      scalar: light ? 0.9 : 1.1,
    });
  }, 120);
}

const BUCKET_ITEMS = [
  { color: "var(--wrong)",    label: "Øving",  idx: 0  },
  { color: "var(--correct)",  label: "Klart",  idx: 2  },
  { color: "var(--mastered)", label: "Ferdig", idx: -1 },
] as const;

export default function LearnPageWrapper() {
  return (
    <Suspense fallback={
      <main className="page-shell"><div className="app-card"><div style={{ padding: "48px 28px", textAlign: "center" }}><p className="body-text">Laster...</p></div></div></main>
    }>
      <LearnPage />
    </Suspense>
  );
}

function LearnPage() {
  const searchParams = useSearchParams();
  const isDel2 = searchParams.get("del2") === "1";
  const { data: session } = useSession();
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [progress, setProgress] = useState<Map<string, QuestionProgress>>(new Map());
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [current, setCurrent] = useState<Question | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [nedtrekkAnswers, setNedtrekkAnswers] = useState<Map<number, string>>(new Map());
  const [state, setState] = useState<State>("answering");
  const [score, setScore] = useState<number>(0);
  const [done, setDone] = useState(false);
  const [openExplanations, setOpenExplanations] = useState<Set<string>>(new Set());
  const [animatingBucket, setAnimatingBucket] = useState<number | null>(null);
  const [bucketFlipRevision, setBucketFlipRevision] = useState<Record<number, number>>({ 0: 0, 1: 0, 2: 0, [-1]: 0 });
  const [hintOpen, setHintOpen] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [entering, setEntering] = useState(false);
  const [flyingScore, setFlyingScore] = useState<{
    sx: number; sy: number;
    label: string; color: string;
    keyframes: { transform: string; opacity: number; filter: string }[];
  } | null>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  const flyingScoreRef = useRef<HTMLSpanElement>(null);
  const pendingUpdateRef = useRef<{
    questionId: string;
    newProgress: QuestionProgress;
    bucket: number;
    shouldMaster: boolean;
  } | null>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const bucketDotRefs = useRef<Record<number, HTMLSpanElement | null>>({});
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const flipTops = useRef<number[]>([]);
  const scoreHiddenRef = useRef(false);
  const twinPriorityRef = useRef<string | null>(null);
  const blockedIdsRef = useRef<Set<string>>(new Set());
  const twinMapRef = useRef<Map<string, string>>(new Map());
  const celebrationCanvasRef = useRef<HTMLCanvasElement>(null);
  const [resettingProgress, setResettingProgress] = useState(false);
  const { fireStreak, fireWarning, fireActivating, isOnFire,
          setFireStreak, setFireWarning } = useFireStreak("del1");
  const [showOvingZero, setShowOvingZero] = useState(false);
  const prevOvingRef = useRef(-1);

  useEffect(() => {
    const pool = isDel2
      ? allQuestions.filter((q) => q.source === "del2")
      : allQuestions.filter((q) => q.source !== "del2");
    const deduped = deduplicateGroups(pool).map(shuffleOptions);
    setActiveQuestions(deduped);

    if (session?.user?.id) {
      fetch("/api/progress")
        .then((r) => r.json())
        .then((data: QuestionProgress[]) => {
          const map = new Map<string, QuestionProgress>();
          const mastered = new Set<string>();
          for (const p of data) {
            map.set(p.questionId, p);
            if (p.bucket === 2 && p.timesInBucket2 >= 2) mastered.add(p.questionId);
          }
          setProgress(map);
          setMasteredIds(mastered);
        })
        .catch(() => {});
    }
  }, [session, isDel2]);

  useEffect(() => {
    if (activeQuestions.length > 0 && !current) {
      setCurrent(pickNextQuestion(activeQuestions, progress, masteredIds));
    }
  }, [activeQuestions, current, progress, masteredIds]);


  useEffect(() => {
    if (done) fireConfetti(confettiCanvasRef.current!);
  }, [done]);

  useEffect(() => {
    if (!flyingScore || !flyingScoreRef.current) return;
    const anim = flyingScoreRef.current.animate(
      flyingScore.keyframes as Keyframe[],
      { duration: 480, easing: "linear", fill: "forwards" }
    );
    return () => anim.cancel();
  }, [flyingScore]);

  useLayoutEffect(() => {
    const tops = flipTops.current;
    if (!tops.length || state !== "revealed") return;
    flipTops.current = [];
    optionRefs.current.forEach((el, i) => {
      if (!el || tops[i] == null) return;
      const delta = tops[i] - el.getBoundingClientRect().top;
      if (Math.abs(delta) < 1) return;
      el.animate(
        [{ transform: `translateY(${delta}px)` }, { transform: "translateY(0)" }],
        { duration: 280, easing: "cubic-bezier(0.25, 0, 0.2, 1)" }
      );
    });
  }, [state]);

  const router = useRouter();

  // Group-based mastery: a variant group is mastered if any question in it is mastered.
  // This makes in-game counts consistent with twin questions and with the homepage.
  const masteredVariantGroups = new Set(
    allQuestions.filter(q => masteredIds.has(q.id)).map(q => q.variantGroupId)
  );
  const isGroupMastered = (q: Question) => masteredVariantGroups.has(q.variantGroupId);

  const bucketCounts = {
    0: activeQuestions.filter((q) => (progress.get(q.id)?.bucket ?? 0) === 0 && !isGroupMastered(q)).length,
    1: activeQuestions.filter((q) => (progress.get(q.id)?.bucket ?? 0) === 1 && !isGroupMastered(q)).length,
    2: activeQuestions.filter((q) => (progress.get(q.id)?.bucket ?? 0) === 2 && !isGroupMastered(q)).length,
    mastered: activeQuestions.filter(isGroupMastered).length,
  };

  const isAllDone = done || (activeQuestions.length > 0 && activeQuestions.every(isGroupMastered));

  useEffect(() => {
    if (!isAllDone) return;
    const canvas = celebrationCanvasRef.current;
    if (!canvas) return;
    const fire = confetti.create(canvas, { resize: true });
    const endTime = Date.now() + 10000;
    const interval = setInterval(() => {
      if (Date.now() >= endTime) { clearInterval(interval); return; }
      [
        { x: Math.random(), y: Math.random() * 0.65 },
        { x: Math.random(), y: Math.random() * 0.65 },
        { x: Math.random(), y: Math.random() * 0.65 },
      ].forEach(origin => {
        fire({
          particleCount: 90,
          angle: Math.random() * 360,
          spread: 140,
          startVelocity: 30 + Math.random() * 35,
          origin,
          colors: CONFETTI_COLORS,
          shapes: ["square", "circle"],
          gravity: 0.55,
          scalar: 0.85 + Math.random() * 0.7,
          ticks: 320,
          drift: (Math.random() - 0.5) * 0.8,
        });
      });
    }, 220);
    return () => clearInterval(interval);
  }, [isAllDone]);

  const ovingCount = bucketCounts[0];
  useEffect(() => {
    if (prevOvingRef.current > 0 && ovingCount === 0 && !isAllDone && activeQuestions.length > 0) {
      setShowOvingZero(true);
      prevOvingRef.current = 0;
      const t = setTimeout(() => setShowOvingZero(false), 4500);
      return () => clearTimeout(t);
    }
    if (ovingCount > 0) prevOvingRef.current = ovingCount;
  }, [ovingCount, isAllDone, activeQuestions.length]);

  function toggleOption(id: string) {
    if (state === "revealed") return;
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleExplanation(optId: string) {
    setOpenExplanations((prev) => {
      const next = new Set(prev);
      next.has(optId) ? next.delete(optId) : next.add(optId);
      return next;
    });
  }

  function checkAnswer() {
    if (!current) return;
    const isNedtrekk = current.subtype === "nedtrekk";
    if (!isNedtrekk && selected.size === 0) return;
    if (isNedtrekk && nedtrekkAnswers.size === 0) return;

    scoreHiddenRef.current = false;

    let pct: number;
    let rawScore: number;

    if (isNedtrekk) {
      const lines = current.nedtrekkLines ?? [];
      const pointsPerLine = lines.length > 0 ? current.maxPoints / lines.length : 0;
      let s = 0;
      for (const line of lines) {
        if (nedtrekkAnswers.get(line.lineNumber) === line.correctAnswer) s += pointsPerLine;
      }
      rawScore = Math.round(s * 100) / 100;
      pct = lines.length > 0 ? (rawScore / current.maxPoints) * 100 : 0;
    } else {
      flipTops.current = optionRefs.current.map(el => el?.getBoundingClientRect().top ?? 0);
      pct = scorePercent(current, [...selected]);
      rawScore = scoreQuestion(current, [...selected]);
    }

    setScore(rawScore);
    setState("revealed");
    if (rawScore === current.maxPoints) fireConfetti(confettiCanvasRef.current!, true);

    const bucket = getBucket(pct);
    const prevProgress = progress.get(current.id);
    const prevBucket = prevProgress?.bucket ?? 0;
    const prevTimes = prevProgress?.timesInBucket2 ?? 0;
    const newTimes = bucket === 2 ? (prevBucket === 2 ? prevTimes + 1 : 1) : 0;

    const newProgress: QuestionProgress = {
      questionId: current.id,
      bucket,
      timesInBucket2: newTimes,
      lastScore: pct,
      attempts: (prevProgress?.attempts ?? 0) + 1,
    };

    // Stage the update — applied with animation when user clicks "Neste spørsmål"
    pendingUpdateRef.current = {
      questionId: current.id,
      newProgress,
      bucket,
      shouldMaster: bucket === 2 && newTimes >= 2,
    };

    if (!isNedtrekk) {
      // Default open: wrong selections + correct answers the user missed
      const defaultOpen = new Set(
        current.options
          .filter((o) => (!o.isCorrect && selected.has(o.id)) || (o.isCorrect && !selected.has(o.id)))
          .map((o) => o.id)
      );
      setOpenExplanations(defaultOpen);
    }
  }

  function nextQuestion() {
    const pending = pendingUpdateRef.current;
    const lastScore = pending?.newProgress.lastScore ?? 0;
    const wasPerf    = lastScore >= 100;
    const wasPartial = !wasPerf && lastScore > 0;
    const curStreak  = fireStreak;
    const curWarning = fireWarning;
    const targetIdx = pending ? (pending.shouldMaster ? -1 : pending.bucket) : null;
    const dotEl = targetIdx !== null ? bucketDotRefs.current[targetIdx] : null;
    const scoreEl = scoreRef.current;

    // Compute updated progress/mastered locally so setTimeout closures can use them
    const progressMap = pending ? (() => {
      const m = new Map(progress);
      m.set(pending.questionId, pending.newProgress);
      return m;
    })() : progress;
    const newMastered = pending?.shouldMaster
      ? new Set([...masteredIds, pending.questionId])
      : masteredIds;

    function applyAndTransition() {
      if (pending) {
        setBucketFlipRevision(prev => ({ ...prev, [targetIdx!]: (prev[targetIdx!] ?? 0) + 1 }));
        setProgress(progressMap);
        if (pending.shouldMaster) setMasteredIds(newMastered);
        if (session?.user?.id) {
          const p = pending.newProgress;
          fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ questionId: p.questionId, bucket: p.bucket, timesInBucket2: p.timesInBucket2, lastScore: p.lastScore }),
          }).catch(() => {});
        }
        pendingUpdateRef.current = null;
      }
      setExiting(true);
      setTimeout(() => {
        const remaining = activeQuestions.filter((q) => !newMastered.has(q.id));
        if (remaining.length === 0) { setDone(true); return; }

        // If current question was the forced twin → unblock the original
        if (current && twinPriorityRef.current === current.id) {
          const originalId = twinMapRef.current.get(current.id);
          if (originalId) blockedIdsRef.current.delete(originalId);
          twinMapRef.current.delete(current.id);
          twinPriorityRef.current = null;
        }

        // If just failed (bucket 0) → force the twin next (del2 only)
        if (pending?.bucket === 0 && isDel2) {
          const twin = findTwin(pending.questionId);
          if (twin) {
            twinPriorityRef.current = twin.id;
            blockedIdsRef.current.add(pending.questionId);
            twinMapRef.current.set(twin.id, pending.questionId);
            setActiveQuestions((prev) =>
              prev.find((q) => q.id === twin.id) ? prev : [...prev, shuffleOptions(twin)]
            );
          }
        }

        const next = pickNextQuestion(
          activeQuestions,
          progressMap,
          newMastered,
          twinPriorityRef.current,
          blockedIdsRef.current
        );
        setCurrent(next ? shuffleOptions(next) : null);
        setSelected(new Set());
        setNedtrekkAnswers(new Map());
        setState("answering");
        setOpenExplanations(new Set());
        setHintOpen(false);
        setExiting(false);
        setEntering(true);
        const newStreak = wasPerf
          ? curStreak + 1
          : (wasPartial && curStreak >= 3 && !curWarning)
            ? curStreak   // first partial while on fire — keep streak
            : 0;
        const newWarning = !wasPerf && wasPartial && curStreak >= 3 && !curWarning;
        setFireStreak(newStreak);
        setFireWarning(newWarning);
        setTimeout(() => setEntering(false), 300);
      }, 110);
    }

    // Flying score arc animation
    if (pending && scoreEl && dotEl) {
      const sr = scoreEl.getBoundingClientRect();
      const dr = dotEl.getBoundingClientRect();
      const sx = sr.left;
      const sy = sr.top;
      const dx = (dr.left + dr.width / 2 - sr.width / 2) - sx;
      const dy = (dr.top  + dr.height / 2 - sr.height / 2) - sy;
      const len = Math.sqrt(dx * dx + dy * dy);
      const arcH = Math.min(len * 0.28, 80);

      // Perpendicular to chord — pick the direction with the more upward component
      const pa = { x: -dy / len, y:  dx / len };
      const pb = { x:  dy / len, y: -dx / len };
      const perp = pa.y <= pb.y ? pa : pb;
      const cpx = dx / 2 + perp.x * arcH;
      const cpy = dy / 2 + perp.y * arcH;

      // Sample 31 points along the quadratic Bézier into Web Animation keyframes
      const keyframes = Array.from({ length: 31 }, (_, i) => {
        const t = i / 30;
        const bx = 2 * t * (1 - t) * cpx + t * t * dx;
        const by = 2 * t * (1 - t) * cpy + t * t * dy;
        const scale = 0.18 + (1 - 0.18) * (1 - t) * (1 - t);
        const opacity = t < 0.78 ? 1 : Math.max(0, (1 - t) / 0.22);
        const blur = 6 * Math.sin(Math.PI * Math.min(t / 0.85, 1));
        return {
          transform: `translate(${bx.toFixed(1)}px,${by.toFixed(1)}px) scale(${scale.toFixed(3)})`,
          opacity: +opacity.toFixed(3),
          filter: `blur(${blur.toFixed(1)}px)`,
        };
      });

      setFlyingScore({ sx, sy, label: scoreLabel, color: scoreColor, keyframes });

      const FLY = 600;
      // Dot pop just before landing
      setTimeout(() => {
        setAnimatingBucket(targetIdx!);
        setTimeout(() => setAnimatingBucket(null), 420);
      }, FLY - 60);

      // On landing: remove clone, apply updates, transition
      setTimeout(() => {
        scoreHiddenRef.current = true;
        setFlyingScore(null);
        applyAndTransition();
      }, FLY);
      return;
    }

    // Fallback — no fly animation (e.g. skip pressed, or refs not ready)
    if (pending) {
      setAnimatingBucket(targetIdx!);
      setTimeout(() => setAnimatingBucket(null), 420);
    }
    applyAndTransition();
  }

  function skipQuestion() {
    pendingUpdateRef.current = null;
    setExiting(true);
    setTimeout(() => {
      const remaining = activeQuestions.filter((q) => !masteredIds.has(q.id));
      if (remaining.length === 0) { setDone(true); return; }
      const next = pickNextQuestion(activeQuestions, progress, masteredIds);
      setCurrent(next ? shuffleOptions(next) : null);
      setSelected(new Set());
      setNedtrekkAnswers(new Map());
      setState("answering");
      setOpenExplanations(new Set());
      setHintOpen(false);
      setExiting(false);
    }, 140);
  }

  if (isAllDone) {
    const handleResetProgress = async () => {
      setResettingProgress(true);
      try {
        await fetch("/api/progress", { method: "DELETE" });
        router.push("/");
      } finally {
        setResettingProgress(false);
      }
    };

    return (
      <main className="page-shell-learn">
        <div className="app-card app-card-learn" style={{ position: "relative", overflow: "hidden" }}>
          <canvas
            ref={celebrationCanvasRef}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
          />
          <div style={{
            position: "absolute", inset: 0, display: "flex",
            alignItems: "center", justifyContent: "center",
            zIndex: 10, padding: "20px",
          }}>
            <div style={{
              background: "var(--card)",
              borderRadius: "var(--radius-lg)",
              padding: "28px 24px",
              maxWidth: "320px",
              width: "100%",
              boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "17px", fontWeight: 700, letterSpacing: "-0.2px", color: "var(--text-primary)", marginBottom: "10px", lineHeight: 1.3 }}>
                Du har lært deg alle læringskortene.
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "20px", lineHeight: 1.5 }}>
                Alle {activeQuestions.length} spørsmål er mestret.
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <Link href="/" className="btn-secondary" style={{ flex: 1, textAlign: "center" }}>
                  Hjem
                </Link>
                {session?.user?.id && (
                  <button
                    className="btn-primary"
                    onClick={handleResetProgress}
                    disabled={resettingProgress}
                    style={{ flex: 1, background: "var(--wrong)" }}
                  >
                    {resettingProgress ? "Resetter..." : "Reset kortstokk"}
                  </button>
                )}
              </div>
            </div>
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

  const correctIds = new Set(current.options.filter((o) => o.isCorrect).map((o) => o.id));
  const pointsPerOption = correctIds.size > 0 ? current.maxPoints / correctIds.size : 0;

  function fmtOptionPts(isCorrect: boolean): string {
    const raw = isCorrect ? pointsPerOption : -pointsPerOption;
    const abs = Math.abs(raw);
    const digits = Number.isInteger(abs) ? String(abs) : abs.toFixed(1).replace(".", ",");
    return (raw >= 0 ? "+" : "−") + digits + "p";
  }

  function optionClass(optId: string): string {
    if (state === "answering") {
      return selected.has(optId) ? "option-btn selected" : "option-btn";
    }
    const isSelected = selected.has(optId);
    const isCorrect = correctIds.has(optId);
    if (isCorrect && isSelected) return "option-btn correct-selected";
    if (isCorrect && !isSelected) return "option-btn correct-missed";
    if (!isCorrect && isSelected) return "option-btn wrong-selected";
    return "option-btn default-revealed";
  }

  function checkClass(optId: string): string {
    if (state === "answering") return selected.has(optId) ? "opt-check checked" : "opt-check";
    const isCorrect = correctIds.has(optId);
    const isSelected = selected.has(optId);
    if (isCorrect && isSelected) return "opt-check correct";
    if (isCorrect && !isSelected) return "opt-check correct-hint";
    if (isSelected) return "opt-check wrong";
    return "opt-check";
  }

  const pillClass = score === current.maxPoints ? "perfect" : score > 0 ? "partial" : "wrong";
  const pillLabel = score === current.maxPoints ? "Perfekt" : score > 0 ? "Delvis riktig" : "Feil";
  const totalCorrect = correctIds.size;
  const selectedCorrect = [...selected].filter((id) => correctIds.has(id)).length;

  const scoreColor = score === current.maxPoints ? "var(--correct)" : score > 0 ? "var(--partial)" : "var(--wrong)";
  const scoreLabel = score === Math.floor(score)
    ? `${Math.round(score)}/${current.maxPoints}p`
    : `${score.toFixed(1)}/${current.maxPoints}p`;

  return (
    <main className="page-shell-learn">
      <div className="fire-wrap">

        {/* Flames — behind the card (zIndex 0), card sits on top (zIndex 1) */}
        {isOnFire && (
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 0, overflow: "visible", pointerEvents: "none", zIndex: 0, opacity: fireWarning ? 0.38 : 1, transition: "opacity 0.5s ease" }}>
            <FireBar />
          </div>
        )}

        {/* ON FIRE! label — always in front */}
        {isOnFire && (
          <div style={{ position: "absolute", top: -24, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", pointerEvents: "none", zIndex: 3, opacity: fireWarning ? 0.45 : 1, transition: "opacity 0.5s ease", animation: "fire-label-in 0.45s cubic-bezier(0.34,1.56,0.64,1) both" }}>
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
        <canvas ref={confettiCanvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 50 }} />

        {/* Activation flash */}
        {fireActivating && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,80,0,0.1)", zIndex: 10, pointerEvents: "none", animation: "fire-flash 0.65s ease-out both" }} />
        )}

        {/* Øving = 0 toast */}
        {showOvingZero && (
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20, pointerEvents: "none", animation: "toast-slide-in 0.4s cubic-bezier(0.34,1.4,0.64,1) both" }}>
            <div style={{ background: "var(--correct)", padding: "12px 20px 14px", borderBottomLeftRadius: "var(--radius-md)", borderBottomRightRadius: "var(--radius-md)" }}>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "3px" }}>
                Du har gått gjennom og klart alle!
              </div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.82)", lineHeight: 1.4 }}>
                Nå mangler du bare å klare resten én gang til!
              </div>
            </div>
          </div>
        )}

        {/* Score — flush top-right corner, white background */}
        {state === "revealed" && (
          <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 2,
            pointerEvents: "none",
            opacity: (flyingScore || scoreHiddenRef.current) ? 0 : 1,
            transition: "none",
            background: "var(--card)",
            borderBottomLeftRadius: "var(--radius-md)",
            padding: "13px 18px 11px",
          }}>
            <span ref={scoreRef} style={{
              fontFamily: "var(--font-mono)",
              fontSize: "30px",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-1px",
              color: scoreColor,
              animation: "reveal 0.25s ease",
              display: "block",
              textAlign: "right",
            }}>
              {scoreLabel}
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
              <p key={i} className="heading-sm" style={{ marginTop: i > 0 ? "4px" : 0 }}>
                {part}
              </p>
            ))}
          </div>

          {current.code && (
            <div style={entering ? { animation: "slide-from-right 0.15s cubic-bezier(0.25, 0, 0.2, 1) both", animationDelay: "35ms" } : {}}>
              <CodeBlock
                code={state === "revealed" && score < current.maxPoints && current.codeAnnotated
                  ? current.codeAnnotated
                  : current.code}
              />
            </div>
          )}

          {/* Nedtrekk (dropdown) questions */}
          {current.subtype === "nedtrekk" && (
            <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {current.nedtrekkLines?.map((line) => {
                const val = nedtrekkAnswers.get(line.lineNumber) ?? "";
                const isRevealed = state === "revealed";
                const isCorrect = val === line.correctAnswer;
                return (
                  <div key={line.lineNumber} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-tertiary)", minWidth: "52px", flexShrink: 0 }}>
                      Linje {line.lineNumber}:
                    </span>
                    {isRevealed ? (
                      <div style={{
                        flex: 1, padding: "7px 10px",
                        borderRadius: "var(--radius-sm)",
                        border: `1.5px solid ${isCorrect ? "var(--correct)" : "var(--wrong)"}`,
                        background: isCorrect ? "rgba(48,209,88,0.08)" : "rgba(255,69,58,0.06)",
                        fontFamily: "var(--font-sans)", fontSize: "13px",
                        color: isCorrect ? "var(--correct)" : "var(--text-primary)",
                      }}>
                        {isCorrect ? val : (
                          <span>
                            <span style={{ color: "var(--wrong)", textDecoration: "line-through", opacity: 0.7 }}>
                              {val || "Ikke valgt"}
                            </span>
                            <span style={{ color: "var(--text-tertiary)", margin: "0 6px" }}>→</span>
                            <span style={{ color: "var(--correct)" }}>{line.correctAnswer}</span>
                          </span>
                        )}
                      </div>
                    ) : (
                      <select
                        value={val}
                        onChange={(e) =>
                          setNedtrekkAnswers((prev) => new Map(prev).set(line.lineNumber, e.target.value))
                        }
                        style={{
                          flex: 1, padding: "7px 10px",
                          borderRadius: "var(--radius-sm)",
                          border: "1.5px solid var(--border)",
                          background: val ? "var(--surface)" : "var(--card)",
                          fontFamily: "var(--font-sans)", fontSize: "13px",
                          color: val ? "var(--text-primary)" : "var(--text-tertiary)",
                          outline: "none", cursor: "pointer",
                        }}
                      >
                        <option value="">Velg...</option>
                        {current.nedtrekkOptions?.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Options */}
          {current.subtype !== "nedtrekk" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: current.code ? "14px" : "0" }}>
            {current.options.map((opt, i) => {
              const isCorrect = correctIds.has(opt.id);
              const isOpen = openExplanations.has(opt.id);

              return (
                <div
                  key={opt.id}
                  ref={(el) => { optionRefs.current[i] = el; }}
                  className={optionClass(opt.id)}
                  onClick={() => state === "answering" && toggleOption(opt.id)}
                  style={{
                    position: "relative",
                    cursor: state === "answering" ? "pointer" : "default",
                    ...(entering ? { animation: "slide-from-right 0.15s cubic-bezier(0.25, 0, 0.2, 1) both", animationDelay: `${55 + i * 32}ms` } : {}),
                  }}
                >
                  <div className={checkClass(opt.id)} style={{ flexShrink: 0 }}>
                    {state === "answering" && selected.has(opt.id) && <CheckIcon />}
                    {state === "revealed" && isCorrect && <CheckIcon />}
                    {state === "revealed" && !isCorrect && selected.has(opt.id) && <XIcon />}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span>{opt.text}</span>

                    {state === "revealed" && (
                      <div style={{ marginTop: "8px" }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleExplanation(opt.id); }}
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
                              {isCorrect && !selected.has(opt.id)
                                ? opt.explanation.replace(/^Riktig\.\s*/i, "")
                                : opt.explanation}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Points badge — absolute top-right corner */}
                  {state === "revealed" && selected.has(opt.id) && (
                    <span style={{
                      position: "absolute",
                      top: "10px",
                      right: "12px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "-0.3px",
                      lineHeight: 1,
                      color: isCorrect ? "var(--correct)" : "var(--wrong)",
                      opacity: isCorrect ? 1 : 0.75,
                      pointerEvents: "none",
                    }}>
                      {fmtOptionPts(isCorrect)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          )}

          {/* Hint toggle — only shown while answering */}
          {state === "answering" && current.hint && (
            <div style={{ marginTop: "18px" }}>
              <button
                onClick={() => setHintOpen((v) => !v)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "none",
                  border: "none",
                  padding: "0",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-tertiary)",
                }}
              >
                <span style={{
                  display: "inline-block",
                  transform: hintOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.15s",
                  lineHeight: 1,
                }}>↓</span>
                {hintOpen ? "Skjul hint" : "Vis hint"}
              </button>

              {hintOpen && (
                <div style={{
                  marginTop: "8px",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderLeft: "3px solid var(--border-strong)",
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: "var(--text-secondary)",
                  fontStyle: "italic",
                }}>
                  {current.hint}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ flexShrink: 0, padding: "14px 20px 18px", background: "var(--card)" }}>
          {/* Main button row — square icon btns visible on mobile only */}
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <Link href="/" className="learn-sq-btn" aria-label="Hjem">
              <svg width="22" height="22" viewBox="0 0 17 17" fill="none">
                <path d="M2.5 7.5L8.5 2L14.5 7.5V15H11V10.5H6V15H2.5V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
              </svg>
            </Link>

            {state === "answering" ? (
              <button
                onClick={checkAnswer}
                disabled={current.subtype === "nedtrekk" ? nedtrekkAnswers.size === 0 : selected.size === 0}
                className="btn-primary"
                style={{ flex: 1 }}
              >
                Sjekk svar
              </button>
            ) : (
              <button onClick={nextQuestion} className="btn-primary" style={{ flex: 1 }}>
                Neste spørsmål →
              </button>
            )}

          </div>

          {/* Bottom row: bucket counts */}
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
                        className={animatingBucket === idx ? "num-flip" : ""}
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

      {/* Flying score arc clone — fixed overlay, animates to bucket dot */}
      {flyingScore && (
        <span
          ref={flyingScoreRef}
          style={{
            position: "fixed",
            left: flyingScore.sx,
            top: flyingScore.sy,
            fontFamily: "var(--font-mono)",
            fontSize: "30px",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-1px",
            color: flyingScore.color,
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          {flyingScore.label}
        </span>
      )}
    </main>
  );
}
