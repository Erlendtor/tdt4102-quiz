"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Option } from "@/types";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";
import { calculateGrade, getWeakTopics } from "@/lib/scoring";

const CONFETTI_COLORS = ["#FF3B5C", "#FFD60A", "#0A84FF", "#30D158", "#FF9500", "#BF5AF2", "#5AC8FA"];

type SelfGrade = "riktig" | "delvis" | "feil";

type Del1Question = {
  id: string;
  topic: string;
  stem: string;
  code?: string;
  maxPoints: number;
  options: Option[];
  selectedOptionIds: string[];
  score: number;
  source?: string;
};

type Del2Question = {
  id: string;
  topic: string;
  stem: string;
  code?: string;
  maxPoints: number;
  source: string;
  modelAnswer?: string;
  textAnswer: string;
  textAnswerA?: string;
  textAnswerB?: string;
  selfGrade: SelfGrade | null;
  score: number;
};

function stemHasSubParts(stem: string) {
  return stem.includes("(a)") && stem.includes("(b)");
}

type QuestionResult = Del1Question | (Del2Question & { options: Option[] });

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

// ─── Del 2 Grading Phase ─────────────────────────────────────────────────────

interface GradingPhaseProps {
  del2Questions: Del2Question[];
  onDone: (grades: Map<string, SelfGrade>) => void;
}

function GradeButtons({ value, onChange, half }: { value: SelfGrade | undefined; onChange: (g: SelfGrade) => void; half?: number }) {
  return (
    <div style={{ display: "flex", gap: "6px" }}>
      {(["feil", "delvis", "riktig"] as const).map((g) => (
        <button
          key={g}
          onClick={() => onChange(g)}
          style={{
            flex: 1, padding: "11px 6px", borderRadius: "var(--radius-sm)",
            border: `1.5px solid ${g === "riktig" ? "var(--correct-border)" : g === "delvis" ? "var(--partial-border)" : "var(--wrong-border)"}`,
            background: value === g
              ? (g === "riktig" ? "var(--correct-bg)" : g === "delvis" ? "var(--partial-bg)" : "var(--wrong-bg)")
              : "var(--card)",
            color: g === "riktig" ? "var(--correct)" : g === "delvis" ? "var(--partial)" : "var(--wrong)",
            fontWeight: 600, fontSize: "13px", cursor: "pointer",
            fontFamily: "var(--font-sans)", transition: "background 0.15s",
            outline: value === g ? `2px solid ${g === "riktig" ? "var(--correct)" : g === "delvis" ? "var(--partial)" : "var(--wrong)"}` : "none",
            outlineOffset: "-2px",
          }}
        >
          {g === "riktig" ? `Riktig${half !== undefined ? ` (${half}p)` : ""}` : g === "delvis" ? `Delvis${half !== undefined ? ` (${half / 2}p)` : ""}` : "Feil (0p)"}
        </button>
      ))}
    </div>
  );
}

function GradingPhase({ del2Questions, onDone }: GradingPhaseProps) {
  const [index, setIndex] = useState(0);
  const [grades, setGrades] = useState<Map<string, SelfGrade>>(new Map());
  const [exiting, setExiting] = useState(false);
  const [entering, setEntering] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setEntering(false), 300);
    return () => clearTimeout(t);
  }, []);

  const q = del2Questions[index];
  const isSub = stemHasSubParts(q.stem);
  const gradeA = grades.get(`${q.id}-a`);
  const gradeB = grades.get(`${q.id}-b`);
  const currentGrade = isSub ? undefined : grades.get(q.id);
  const canProceed = isSub ? !!(gradeA && gradeB) : !!currentGrade;
  const isLast = index === del2Questions.length - 1;

  function selectGrade(g: SelfGrade) {
    setGrades((prev) => new Map(prev).set(q.id, g));
  }

  function selectSubGrade(part: "a" | "b", g: SelfGrade) {
    setGrades((prev) => new Map(prev).set(`${q.id}-${part}`, g));
  }

  function go(next: number) {
    setExiting(true);
    setTimeout(() => {
      setIndex(next);
      setExiting(false);
      setEntering(true);
      setTimeout(() => setEntering(false), 300);
    }, 120);
  }

  function handleNext() {
    if (!canProceed) return;
    if (isLast) onDone(grades);
    else go(index + 1);
  }

  const anim = { animation: "page-enter 0.26s cubic-bezier(0.25, 0, 0.2, 1) both" };
  const answerBoxStyle: React.CSSProperties = {
    padding: "12px 14px", borderRadius: "var(--radius-sm)",
    border: "1.5px solid var(--border)", background: "var(--surface)",
    fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.6,
    whiteSpace: "pre-wrap", marginBottom: "8px",
  };

  return (
    <main className="page-shell-learn">
      <div className="app-card app-card-learn">

        {/* Scrollable content */}
        <div
          className={`question-content${exiting ? " exiting" : ""}`}
          style={{ flex: 1, overflowY: "auto", padding: "20px 20px 16px" }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", flexWrap: "wrap", ...(entering ? anim : {}) }}>
            <span className="tag">{q.topic}</span>
            <span className="label">{q.maxPoints}p</span>
            <span className="label" style={{ color: "var(--text-tertiary)" }}>Del 2</span>
          </div>

          <p className="heading-sm" style={{ marginBottom: "14px", whiteSpace: "pre-line", ...(entering ? anim : {}) }}>
            {q.stem}
          </p>

          {q.code && (
            <div style={entering ? anim : {}}>
              <CodeBlock code={q.code} />
            </div>
          )}

          {/* Fasit */}
          <div style={{ marginTop: q.code ? "14px" : "0", ...(entering ? anim : {}), padding: "12px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--surface)", borderLeft: "3px solid var(--correct-border)", marginBottom: "16px" }}>
            <div className="label" style={{ marginBottom: "6px" }}>Fasit</div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "14px", lineHeight: 1.5, margin: 0, color: "var(--text-primary)", whiteSpace: "pre-wrap" }}>
              {q.modelAnswer}
            </p>
          </div>

          {isSub ? (
            /* a/b sub-part grading */
            <div style={{ ...(entering ? anim : {}), display: "flex", flexDirection: "column", gap: "16px" }}>
              {(["a", "b"] as const).map((part) => {
                const textAns = part === "a" ? q.textAnswerA : q.textAnswerB;
                const partGrade = part === "a" ? gradeA : gradeB;
                const half = q.maxPoints / 2;
                return (
                  <div key={part} style={{ border: "1.5px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "12px 14px" }}>
                    <div className="label" style={{ marginBottom: "8px", fontSize: "13px", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{part})</div>
                    <div style={{ ...answerBoxStyle, color: textAns ? "var(--text-primary)" : "var(--text-tertiary)" }}>
                      {textAns || "(tomt svar)"}
                    </div>
                    <div className="label" style={{ marginBottom: "6px" }}>Vurder {part})</div>
                    <GradeButtons value={partGrade} onChange={(g) => selectSubGrade(part, g)} half={half} />
                  </div>
                );
              })}
            </div>
          ) : (
            /* Single-part grading */
            <div style={entering ? anim : {}}>
              <div className="label" style={{ marginBottom: "6px" }}>Ditt svar</div>
              <div style={{ ...answerBoxStyle, color: q.textAnswer ? "var(--text-primary)" : "var(--text-tertiary)" }}>
                {q.textAnswer || "(tomt svar)"}
              </div>
              <div className="label" style={{ marginBottom: "8px" }}>Vurder svaret ditt</div>
              <GradeButtons value={currentGrade} onChange={selectGrade} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ flexShrink: 0, padding: "14px 20px 18px", background: "var(--card)" }}>
          <div style={{ display: "flex", gap: "5px", alignItems: "center", marginBottom: "12px" }}>
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="btn-primary"
              style={{ flex: 1 }}
            >
              {isLast ? "Se karakter" : "Neste →"}
            </button>
          </div>

          {/* Progress dots */}
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", justifyContent: "center" }}>
            {del2Questions.map((dq, i) => {
              const isActive = i === index;
              const isDqSub = stemHasSubParts(dq.stem);
              const isGraded = isDqSub
                ? (grades.has(`${dq.id}-a`) && grades.has(`${dq.id}-b`))
                : grades.has(dq.id);
              const dotClass = `nav-dot${isActive ? " active" : isGraded ? " answered" : ""}`;
              return (
                <button
                  key={i}
                  onClick={() => { if (i < index || isGraded) go(i); }}
                  className={dotClass}
                  disabled={i > index}
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

// ─── Results Phase ────────────────────────────────────────────────────────────

export default function ResultsPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [phase, setPhase] = useState<"grading" | "results">("grading");
  const [del2Questions, setDel2Questions] = useState<Del2Question[]>([]);
  const [results, setResults] = useState<Results | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [openExplanations, setOpenExplanations] = useState<Set<string>>(new Set());
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const gradeRef = useRef<HTMLDivElement>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);

  // Load data from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem("examResults");
    if (!stored) { router.push("/exam"); return; }

    const data = JSON.parse(stored);

    // New format: { del1Questions, del2Questions }
    if (data.del1Questions) {
      setDel2Questions(data.del2Questions ?? []);
      // If del2 is empty (no del2 questions), skip grading
      if (!data.del2Questions?.length) {
        finalizeResults(data.del1Questions, [], new Map());
      }
      return;
    }

    // Legacy format: { questions, totalScore, ... } — go straight to results
    setResults(data);
    setPhase("results");
    initExpandedState(data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  function initExpandedState(r: Results) {
    const defaultOpen = new Set<string>();
    const defaultExpanded = new Set<string>();
    for (const q of r.questions) {
      const selectedIds = new Set((q as Del1Question).selectedOptionIds ?? []);
      const qPct = (q.score / q.maxPoints) * 100;
      if (qPct < 100) defaultExpanded.add(q.id);
      if ((q as Del1Question).source === "del2") continue;
      for (const opt of (q as Del1Question).options ?? []) {
        const isWrongSelected = !opt.isCorrect && selectedIds.has(opt.id);
        const isMissedCorrect = opt.isCorrect && !selectedIds.has(opt.id);
        if (isWrongSelected || isMissedCorrect) defaultOpen.add(opt.id);
      }
    }
    setOpenExplanations(defaultOpen);
    setExpandedQuestions(defaultExpanded);
  }

  const finalizeResults = useCallback(async (
    del1Qs: Del1Question[],
    del2Qs: Del2Question[],
    grades: Map<string, SelfGrade>
  ) => {
    const stored = sessionStorage.getItem("examResults");
    const data = stored ? JSON.parse(stored) : {};
    const actualDel1 = del1Qs.length ? del1Qs : (data.del1Questions ?? []);

    const del1Results = actualDel1.map((q: Del1Question) => ({
      topic: q.topic, score: q.score, maxScore: q.maxPoints,
      percent: (q.score / q.maxPoints) * 100,
    }));

    const gradedDel2: (Del2Question & { options: Option[] })[] = del2Qs.map((q) => {
      if (stemHasSubParts(q.stem)) {
        const gA = grades.get(`${q.id}-a`) ?? "feil";
        const gB = grades.get(`${q.id}-b`) ?? "feil";
        const half = q.maxPoints / 2;
        const sA = gA === "riktig" ? half : gA === "delvis" ? half / 2 : 0;
        const sB = gB === "riktig" ? half : gB === "delvis" ? half / 2 : 0;
        return { ...q, options: [], selfGrade: gA, score: sA + sB };
      }
      const g = grades.get(q.id) ?? "feil";
      const score = g === "riktig" ? q.maxPoints : g === "delvis" ? q.maxPoints / 2 : 0;
      return { ...q, options: [], selfGrade: g, score };
    });

    const del2Results = gradedDel2.map((q) => ({
      topic: q.topic, score: q.score, maxScore: q.maxPoints,
      percent: (q.score / q.maxPoints) * 100,
    }));

    const allResults = [...del1Results, ...del2Results];
    const totalScore = allResults.reduce((s, r) => s + r.score, 0);
    const maxScore = allResults.reduce((s, r) => s + r.maxScore, 0);
    const grade = calculateGrade(totalScore, maxScore);
    const weakTopics = getWeakTopics(allResults);

    if (session?.user?.id) {
      await fetch("/api/exam-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: totalScore, maxScore, grade, topics: weakTopics, set: data.examSet ?? "random" }),
      }).catch(() => {});
    }

    const fullResults: Results = {
      questions: [
        ...actualDel1.map((q: Del1Question) => ({ ...q, source: q.source ?? "" })),
        ...gradedDel2,
      ],
      totalScore, maxScore, grade, weakTopics,
    };

    setResults(fullResults);
    setPhase("results");
    initExpandedState(fullResults);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  function handleGradingDone(grades: Map<string, SelfGrade>) {
    const stored = sessionStorage.getItem("examResults");
    const data = stored ? JSON.parse(stored) : {};
    finalizeResults(data.del1Questions ?? [], del2Questions, grades);
  }

  // Confetti
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
        setTimeout(() => fire({ particleCount: 55, spread: 60, startVelocity: 26, origin: { x: ox, y: oy }, colors: CONFETTI_COLORS, scalar: 1.0 }), 200);
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
          fire({ particleCount: 45, spread: 360, startVelocity: 28 + Math.random() * 18, ticks: 90, origin: { x: bx + (Math.random() - 0.5) * 0.28, y: by + (Math.random() - 0.5) * 0.15 }, colors: CONFETTI_COLORS, shapes: ["square"], gravity: 0.65, scalar: 1.2, drift: (Math.random() - 0.5) * 0.4 });
          setTimeout(burst, 150);
        };
        burst();
      }
    };
    requestAnimationFrame(shoot);
  }, [results]);

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

  // Grading phase
  if (phase === "grading" && del2Questions.length > 0) {
    return <GradingPhase del2Questions={del2Questions} onDone={handleGradingDone} />;
  }

  if (!results) {
    return (
      <main className="page-shell">
        <div className="app-card">
          <div style={{ padding: "48px 28px", textAlign: "center" }}>
            <p className="body-text">Beregner karakter...</p>
          </div>
        </div>
      </main>
    );
  }

  const pct = Math.round((results.totalScore / results.maxScore) * 100);

  return (
    <main className="page-shell-learn">
      <div className="app-card app-card-learn">
        <canvas ref={confettiCanvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 50 }} />

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>

        {/* Grade hero */}
        <div style={{ padding: "28px 28px 20px", textAlign: "center" }}>
          <div className="label" style={{ marginBottom: "12px" }}>Eksamensresultat</div>
          <div ref={gradeRef} style={{
            fontSize: "96px", fontWeight: 700, lineHeight: 1, letterSpacing: "-4px",
            color: gradeColor[results.grade] ?? "var(--text-primary)", marginBottom: "10px",
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
                <div key={q.id} style={{ background: bg, border: `1px solid ${border}`, borderRadius: "6px", padding: "6px 4px", textAlign: "center" }}>
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
          <button onClick={() => setShowDetails((v) => !v)} className="btn-secondary">
            {showDetails ? "Skjul" : "Vis"} detaljert gjennomgang
          </button>

          <div style={{ display: "grid", gridTemplateRows: showDetails ? "1fr" : "0fr", transition: "grid-template-rows 0.3s ease" }}>
            <div style={{ overflow: "hidden", minHeight: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "14px" }}>
                {results.questions.map((q, i) => {
                  const dl1q = q as Del1Question;
                  const dl2q = q as Del2Question;
                  const isDel2 = dl2q.source === "del2";
                  const correctIds = new Set((dl1q.options ?? []).filter((o) => o.isCorrect).map((o) => o.id));
                  const selectedIds = new Set(dl1q.selectedOptionIds ?? []);
                  const qPct = (q.score / q.maxPoints) * 100;
                  const isExpanded = expandedQuestions.has(q.id);

                  return (
                    <div key={q.id} style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
                      <div
                        onClick={() => toggleQuestion(q.id)}
                        style={{
                          padding: "10px 14px", background: "var(--surface)",
                          borderBottom: isExpanded ? "1px solid var(--border)" : "none",
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                          gap: "8px", cursor: "pointer", userSelect: "none",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span className="label">Spørsmål {i + 1}</span>
                          <span className="tag">{q.topic}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 600, color: qPct === 100 ? "var(--correct)" : qPct > 0 ? "var(--partial)" : "var(--wrong)" }}>
                            {q.score.toFixed(1)}/{q.maxPoints}p
                          </span>
                          <span style={{ color: "var(--text-tertiary)", fontSize: "12px", display: "inline-block", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", lineHeight: 1 }}>↓</span>
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateRows: isExpanded ? "1fr" : "0fr", transition: "grid-template-rows 0.22s ease" }}>
                        <div style={{ overflow: "hidden", minHeight: 0 }}>
                          <div style={{ padding: "12px 14px" }}>
                            <div style={{ marginBottom: "10px" }}>
                              {q.stem.split("\n\n").map((part, pi) => (
                                <p key={pi} className="heading-sm" style={{ fontSize: "14px", marginTop: pi > 0 ? "3px" : 0 }}>{part}</p>
                              ))}
                            </div>
                            {q.code && <CodeBlock code={q.code} />}

                            {isDel2 ? (
                              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: q.code ? "10px" : "0" }}>
                                <div>
                                  <div className="label" style={{ marginBottom: "5px" }}>Ditt svar</div>
                                  <div style={{ padding: "10px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--surface)", fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.6, color: dl2q.textAnswer ? "var(--text-primary)" : "var(--text-tertiary)", whiteSpace: "pre-wrap" }}>
                                    {dl2q.textAnswer || "(tomt svar)"}
                                  </div>
                                </div>
                                <div style={{ padding: "10px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--surface)", borderLeft: "3px solid var(--correct-border)" }}>
                                  <div className="label" style={{ marginBottom: "5px" }}>Fasit</div>
                                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "14px", lineHeight: 1.5, margin: 0, color: "var(--text-primary)", whiteSpace: "pre-wrap" }}>
                                    {dl2q.modelAnswer}
                                  </p>
                                </div>
                                {dl2q.selfGrade && (
                                  <div>
                                    <div className="label" style={{ marginBottom: "5px" }}>Egenvurdering</div>
                                    <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: "99px", fontSize: "12px", fontWeight: 600, fontFamily: "var(--font-sans)", background: dl2q.selfGrade === "riktig" ? "var(--correct-bg)" : dl2q.selfGrade === "delvis" ? "var(--partial-bg)" : "var(--wrong-bg)", color: dl2q.selfGrade === "riktig" ? "var(--correct)" : dl2q.selfGrade === "delvis" ? "var(--partial)" : "var(--wrong)", border: `1px solid ${dl2q.selfGrade === "riktig" ? "var(--correct-border)" : dl2q.selfGrade === "delvis" ? "var(--partial-border)" : "var(--wrong-border)"}` }}>
                                      {dl2q.selfGrade === "riktig" ? "Riktig" : dl2q.selfGrade === "delvis" ? "Delvis riktig" : "Feil"}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: q.code ? "10px" : "0" }}>
                                {(dl1q.options ?? []).map((opt) => {
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
                                            style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "inherit", opacity: 0.7 }}
                                          >
                                            Se begrunnelse
                                            <span style={{ display: "inline-block", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s", lineHeight: 1 }}>↓</span>
                                          </button>
                                          <div className={`explanation-wrapper${isOpen ? " open" : ""}`}>
                                            <div className="explanation-inner">
                                              <div className={isCorrect ? "explanation correct-exp" : "explanation"} style={{ marginTop: "6px" }}>
                                                {isCorrect && !selectedIds.has(opt.id) ? opt.explanation.replace(/^Riktig\.\s*/i, "") : opt.explanation}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
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

        {/* Del 2 self-grading summary */}
        {results.questions.some((q) => (q as Del2Question).source === "del2") && (
          <>
            <div className="divider" />
            <div style={{ padding: "14px 20px 20px" }}>
              <div className="label" style={{ marginBottom: "12px" }}>Egenevaluering Del 2</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {results.questions
                  .filter((q) => (q as Del2Question).source === "del2")
                  .map((q, i) => {
                    const dq = q as Del2Question;
                    const selfGrade = dq.selfGrade;
                    const isExpanded = expandedQuestions.has(q.id);
                    const isSub = stemHasSubParts(q.stem);
                    return (
                      <div key={q.id} style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
                        <div
                          onClick={() => toggleQuestion(q.id)}
                          style={{ padding: "10px 14px", background: "var(--surface)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", cursor: "pointer", userSelect: "none", borderBottom: isExpanded ? "1px solid var(--border)" : "none" }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: 0 }}>
                            <span className="label" style={{ flexShrink: 0 }}>Del 2 · {i + 1}</span>
                            <span className="tag" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.topic}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 600, color: (q.score / q.maxPoints) === 1 ? "var(--correct)" : q.score > 0 ? "var(--partial)" : "var(--wrong)" }}>
                              {q.score.toFixed(1)}/{q.maxPoints}p
                            </span>
                            {selfGrade && (
                              <span style={{
                                display: "inline-block", padding: "3px 10px",
                                borderRadius: "99px", fontSize: "11px", fontWeight: 600, fontFamily: "var(--font-sans)",
                                background: selfGrade === "riktig" ? "var(--correct-bg)" : selfGrade === "delvis" ? "var(--partial-bg)" : "var(--wrong-bg)",
                                color: selfGrade === "riktig" ? "var(--correct)" : selfGrade === "delvis" ? "var(--partial)" : "var(--wrong)",
                                border: `1px solid ${selfGrade === "riktig" ? "var(--correct-border)" : selfGrade === "delvis" ? "var(--partial-border)" : "var(--wrong-border)"}`,
                              }}>
                                {selfGrade === "riktig" ? "Riktig" : selfGrade === "delvis" ? "Delvis" : "Feil"}
                              </span>
                            )}
                            <span style={{ color: "var(--text-tertiary)", fontSize: "12px", display: "inline-block", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", lineHeight: 1 }}>↓</span>
                          </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateRows: isExpanded ? "1fr" : "0fr", transition: "grid-template-rows 0.22s ease" }}>
                          <div style={{ overflow: "hidden", minHeight: 0 }}>
                            <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                              <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0, whiteSpace: "pre-line" }}>{q.stem}</p>
                              {isSub ? (
                                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                  {(["a", "b"] as const).map((part) => {
                                    const ans = part === "a" ? dq.textAnswerA : dq.textAnswerB;
                                    return (
                                      <div key={part}>
                                        <div className="label" style={{ marginBottom: "4px" }}>{part})</div>
                                        <div style={{ padding: "8px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--surface)", fontSize: "13px", lineHeight: 1.6, color: ans ? "var(--text-primary)" : "var(--text-tertiary)", whiteSpace: "pre-wrap" }}>
                                          {ans || "(tomt svar)"}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div>
                                  <div className="label" style={{ marginBottom: "4px" }}>Ditt svar</div>
                                  <div style={{ padding: "8px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--surface)", fontSize: "13px", lineHeight: 1.6, color: dq.textAnswer ? "var(--text-primary)" : "var(--text-tertiary)", whiteSpace: "pre-wrap" }}>
                                    {dq.textAnswer || "(tomt svar)"}
                                  </div>
                                </div>
                              )}
                              <div style={{ padding: "8px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--surface)", borderLeft: "3px solid var(--correct-border)" }}>
                                <div className="label" style={{ marginBottom: "4px" }}>Fasit</div>
                                <p style={{ fontFamily: "var(--font-mono)", fontSize: "13px", lineHeight: 1.5, margin: 0, color: "var(--text-primary)", whiteSpace: "pre-wrap" }}>
                                  {dq.modelAnswer}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        )}

        </div>{/* end scrollable content */}

        {/* Sticky footer actions */}
        <div style={{ flexShrink: 0, padding: "12px 20px 16px", background: "var(--card)", borderTop: "1px solid var(--border)", display: "flex", gap: "8px" }}>
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
