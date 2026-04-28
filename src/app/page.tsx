import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { questions } from "@/lib/questions";
import HomeFooter from "@/components/HomeFooter";

const BUCKET_ITEMS = [
  { color: "var(--wrong)",         label: "Øving",  key: 0  },
  { color: "var(--partial)",       label: "Nesten", key: 1  },
  { color: "var(--correct)",       label: "Bra",    key: 2  },
  { color: "var(--border-strong)", label: "Ferdig", key: -1 },
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
  padding: "16px 16px 20px",
};

const cardStyle: React.CSSProperties = {
  flex: 1,
  position: "relative",
  aspectRatio: "3 / 4",
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

  if (session?.user?.id) {
    const [progressData, examResults] = await Promise.all([
      prisma.questionProgress.findMany({
        where: { userId: session.user.id },
        select: { bucket: true, timesInBucket2: true, questionId: true },
      }),
      prisma.examResult.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 12,
        select: { grade: true },
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

    recentGrades = examResults.map((r) => r.grade);
  }

  return (
    <main className="page-shell">
      <div className="app-card" style={{ minWidth: "min(640px, calc(100vw - 32px))" }}>

        {/* Header */}
        <div style={{ padding: "24px 24px 22px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
          <div style={{ minWidth: 0 }}>
            <div className="label" style={{ marginBottom: "8px" }}>TDT4102</div>
            <h1 className="heading-lg" style={{ fontSize: "clamp(26px, 6vw, 38px)" }}>Eksamenstrening Del1</h1>
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
                Logg inn
              </Link>
            )}
          </div>
        </div>

        {/* Mode cards */}
        <div className="mode-cards" style={{ padding: "0 20px 20px" }}>

          {/* Læringsmodus */}
          <Link href="/learn" className="mode-card" style={cardStyle}>
            <Image src="/øving.jpg" alt="Læringsmodus" fill sizes="50vw" style={{ objectFit: "cover" }} />

            <div style={glassStyle}>
              <div style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.3px", lineHeight: 1.2, color: "var(--text-primary)", marginBottom: "4px" }}>
                Læringsmodus
              </div>
              <p style={{ fontSize: "13px", lineHeight: 1.4, color: "var(--text-secondary)", marginBottom: "8px" }}>
                tilbakemeldinger underveis + forklaringer
              </p>

              {bucketStats ? (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", rowGap: "4px" }}>
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
          </Link>

          {/* Eksamensmodus */}
          <Link href="/exam" className="mode-card" style={cardStyle}>
            <Image src="/eksamen.jpg" alt="Eksamensmodus" fill sizes="50vw" style={{ objectFit: "cover" }} />

            <div style={glassStyle}>
              <div style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.3px", lineHeight: 1.2, color: "var(--text-primary)", marginBottom: "4px" }}>
                Eksamensmodus
              </div>
              <p style={{ fontSize: "13px", lineHeight: 1.4, color: "var(--text-secondary)", marginBottom: "10px" }}>
                12 spørsmål + karakter
              </p>

              {recentGrades.length > 0 ? (
                <div style={{ display: "flex", gap: "8px", overflow: "hidden", flexWrap: "nowrap", alignItems: "baseline" }}>
                  {recentGrades.map((grade, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "18px",
                        fontWeight: 700,
                        lineHeight: 1,
                        color: GRADE_COLORS[grade] ?? "var(--text-primary)",
                        flexShrink: 0,
                      }}
                    >
                      {grade}
                    </span>
                  ))}
                </div>
              ) : session?.user ? (
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-tertiary)" }}>
                  Ingen eksamen tatt ennå
                </span>
              ) : null}
            </div>
          </Link>

        </div>

        <HomeFooter />
      </div>
    </main>
  );
}
