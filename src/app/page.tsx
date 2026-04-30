import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { questions } from "@/lib/questions";
import HomeFooter from "@/components/HomeFooter";
import HomeLoader from "@/components/HomeLoader";
import HomeCardReveal from "@/components/HomeCardReveal";
import ExamCardWithModal from "@/components/ExamCardWithModal";

const BUCKET_ITEMS = [
  { color: "var(--wrong)",    label: "Øving",  key: 0  },
  { color: "var(--correct)",  label: "Klart",  key: 2  },
  { color: "var(--mastered)", label: "Ferdig", key: -1 },
] as const;

const GRADE_COLORS: Record<string, string> = {
  A: "var(--correct)",
  B: "var(--correct)",
  C: "var(--partial)",
  D: "var(--partial)",
  E: "var(--wrong)",
  F: "var(--wrong)",
};

function PersonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 13.5c0-3.038 2.462-4.5 5.5-4.5s5.5 1.462 5.5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

const glassStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backdropFilter: "blur(18px) saturate(130%)",
  WebkitBackdropFilter: "blur(18px) saturate(130%)",
  background: "rgba(255, 255, 255, 0.72)",
  padding: "16px 16px 28px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
};

const cardWrapStyle: React.CSSProperties = {
  flex: 1,
  aspectRatio: "5 / 6",
};

const cardStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  padding: 0,
  overflow: "hidden",
  background: "var(--surface)",
  display: "block",
  borderRadius: "var(--radius-md)",
  clipPath: "inset(0 round var(--radius-md))",
};

export default async function Home() {
  const session = await auth();

  type BucketStats = { 0: number; 1: number; 2: number; mastered: number };
  let bucketStats: BucketStats | null = null;
  let recentGrades: string[] = [];
  let examSetGrades: Record<string, string> = {};

  if (session?.user?.id) {
    const [progressData, examResults] = await Promise.all([
      prisma.questionProgress.findMany({
        where: { userId: session.user.id },
        select: { bucket: true, timesInBucket2: true, questionId: true },
      }),
      prisma.examResult.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 50,
        select: { grade: true, set: true },
      }),
    ]);

    const masteredIds = new Set(
      progressData
        .filter((p) => p.bucket === 2 && p.timesInBucket2 >= 2)
        .map((p) => p.questionId)
    );
    const notAttempted = Math.max(0, questions.length - progressData.length);
    bucketStats = {
      0: notAttempted + progressData.filter((p) => p.bucket === 0 && !masteredIds.has(p.questionId)).length,
      1: progressData.filter((p) => p.bucket === 1 && !masteredIds.has(p.questionId)).length,
      2: progressData.filter((p) => p.bucket === 2 && !masteredIds.has(p.questionId)).length,
      mastered: masteredIds.size,
    };

    recentGrades = examResults.slice(0, 12).map((r) => r.grade);

    for (const r of examResults) {
      if (!examSetGrades[r.set]) {
        examSetGrades[r.set] = r.grade;
      }
    }
  }

  return (
    <main className="page-shell" style={{ alignItems: "flex-start", padding: "5vh 16px" }}>
      <div className="app-card" style={{ minWidth: "min(640px, calc(100vw - 32px))", display: "flex", flexDirection: "column" }}>
        <HomeLoader />

        {/* Header */}
        <div className="page-enter home-header" style={{ padding: "24px 24px 22px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
          <div style={{ minWidth: 0 }}>
            <div className="label" style={{ marginBottom: "8px" }}>TDT4102</div>
            <h1 className="heading-lg" style={{ fontSize: "clamp(26px, 6vw, 38px)" }}>Eksamenstrening</h1>
          </div>
          <div style={{ flexShrink: 0, paddingTop: "2px" }}>
            {session?.user ? (
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: "13px", color: "var(--text-secondary)",
                    fontFamily: "var(--font-sans)", padding: 0, whiteSpace: "nowrap",
                  }}
                >
                  <PersonIcon />
                  Logg ut ({session.user.name})
                </button>
              </form>
            ) : (
              <Link
                href="/login"
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  fontSize: "13px", color: "var(--text-secondary)",
                  textDecoration: "none", whiteSpace: "nowrap",
                }}
              >
                <PersonIcon />
                Logg inn (for å lagre progresjon)
              </Link>
            )}
          </div>
        </div>

        {/* Mode cards */}
        <HomeCardReveal>

          {/* Læringsmodus Del 1 */}
          <div className="top-card-wrap" style={cardWrapStyle}>
          <Link href="/learn" className="mode-card" style={cardStyle}>
            <div className="card-image">
              <Image src="/øving3.jpg" alt="Læringsmodus Del 1" fill sizes="50vw" style={{ objectFit: "cover" }} />
            </div>

            <div className="card-glass" style={glassStyle}>
              <div className="card-glass-content">
                <div style={{ fontSize: "25px", fontWeight: 700, letterSpacing: "-0.3px", lineHeight: 1.2, color: "var(--text-primary)", marginBottom: "4px" }}>
                  Læringsmodus Del 1
                </div>
                <p style={{ fontSize: "14px", lineHeight: 1.4, color: "var(--text-secondary)", marginBottom: "14px" }}>
                  Tilbakemeldinger underveis + forklaringer
                </p>

                {bucketStats ? (
                  <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", rowGap: "6px" }}>
                    {BUCKET_ITEMS.map(({ color, label, key }) => {
                      const count = key === -1 ? bucketStats!.mastered : bucketStats![key as 0 | 1 | 2];
                      return (
                        <span key={label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: color, flexShrink: 0, display: "inline-block" }} />
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
                            {label} <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>{count}</strong>
                          </span>
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-tertiary)" }}>
                    {questions.length} spørsmål
                  </span>
                )}
              </div>
              <span className="card-cta">Start nå ⟶</span>
            </div>
          </Link>
          </div>

          {/* Læringsmodus Del 2 */}
          <div className="top-card-wrap" style={cardWrapStyle}>
          <Link href="/learn-del2" className="mode-card" style={cardStyle}>
            <div className="card-image">
              <Image src="/læring del2 3.png" alt="Læringsmodus Del 2" fill sizes="50vw" style={{ objectFit: "cover" }} />
            </div>

            <div className="card-glass" style={glassStyle}>
              <div className="card-glass-content">
                <div style={{ fontSize: "25px", fontWeight: 700, letterSpacing: "-0.3px", lineHeight: 1.2, color: "var(--text-primary)", marginBottom: "4px" }}>
                  Læringsmodus Del 2
                </div>
                <p style={{ fontSize: "14px", lineHeight: 1.4, color: "var(--text-secondary)", marginBottom: "14px" }}>
                  Kortsvarsoppgaver med egenvurdering
                </p>
              </div>
              <span className="card-cta">Start nå ⟶</span>
            </div>
          </Link>
          </div>

          {/* Eksamensmodus */}
          <div className="exam-card-wrap" style={{ width: "100%" }}>
            <ExamCardWithModal
              recentGrades={recentGrades}
              hasSession={!!session?.user}
              examSetGrades={examSetGrades}
            />
          </div>

        </HomeCardReveal>

        <HomeFooter />
      </div>
    </main>
  );
}
