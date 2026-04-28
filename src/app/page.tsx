import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { questions } from "@/lib/questions";

const BUCKET_ITEMS = [
  { color: "var(--wrong)",         label: "Øving",  key: 0  },
  { color: "var(--partial)",       label: "Nesten", key: 1  },
  { color: "var(--correct)",       label: "Bra",    key: 2  },
  { color: "var(--border-strong)", label: "Ferdig", key: -1 },
] as const;

function PersonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M2 13.5c0-3.038 2.462-4.5 5.5-4.5s5.5 1.462 5.5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

export default async function Home() {
  const session = await auth();

  type BucketStats = { 0: number; 1: number; 2: number; mastered: number };
  let bucketStats: BucketStats | null = null;

  if (session?.user?.id) {
    const progressData = await prisma.questionProgress.findMany({
      where: { userId: session.user.id },
      select: { bucket: true, timesInBucket2: true, questionId: true },
    });
    const masteredIds = new Set(
      progressData.filter((p) => p.bucket === 2 && p.timesInBucket2 >= 2).map((p) => p.questionId)
    );
    const notAttempted = Math.max(0, questions.length - progressData.length);
    bucketStats = {
      0: notAttempted + progressData.filter((p) => p.bucket === 0 && !masteredIds.has(p.questionId)).length,
      1: progressData.filter((p) => p.bucket === 1 && !masteredIds.has(p.questionId)).length,
      2: progressData.filter((p) => p.bucket === 2 && !masteredIds.has(p.questionId)).length,
      mastered: masteredIds.size,
    };
  }

  return (
    <main className="page-shell">
      <div className="app-card" style={{ minWidth: "min(640px, calc(100vw - 32px))" }}>

        {/* Header — title left, auth top-right */}
        <div style={{ padding: "24px 24px 22px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
          <div>
            <div className="label" style={{ marginBottom: "8px" }}>TDT4102</div>
            <h1 className="heading-lg">Eksamenstrening Del1</h1>
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
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-sans)",
                    padding: 0,
                    whiteSpace: "nowrap",
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
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <PersonIcon />
                Logg inn
              </Link>
            )}
          </div>
        </div>

        {/* Mode cards — side by side vertical tiles */}
        <div className="mode-cards" style={{ padding: "0 20px 24px" }}>

          {/* Læringsmodus */}
          <Link
            href="/learn"
            className="mode-card"
            style={{ flex: 1, flexDirection: "column", alignItems: "stretch", padding: 0, gap: 0, overflow: "hidden" }}
          >
            {/* Square image placeholder */}
            <div style={{ width: "100%", aspectRatio: "1", background: "var(--surface)", borderBottom: "1px solid var(--border)" }} />

            {/* Text at bottom */}
            <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: "4px" }}>
              <div className="heading-sm" style={{ fontSize: "16px" }}>Læringsmodus</div>
              <p className="body-text" style={{ fontSize: "13px" }}>
                tilbakemeldinger underveis + forklaringer
              </p>

              {bucketStats ? (
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
                  {BUCKET_ITEMS.map(({ color, label, key }) => {
                    const count = key === -1 ? bucketStats!.mastered : bucketStats![key as 0 | 1 | 2];
                    return (
                      <span key={label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, flexShrink: 0, display: "inline-block" }} />
                        <span className="label" style={{ letterSpacing: 0, textTransform: "none", fontSize: "11px", color: "var(--text-secondary)" }}>
                          {label}{" "}
                          <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>{count}</strong>
                        </span>
                      </span>
                    );
                  })}
                </div>
              ) : (
                <span className="label" style={{ letterSpacing: 0, textTransform: "none", fontSize: "11px", color: "var(--text-tertiary)", marginTop: "6px" }}>
                  {questions.length} spørsmål
                </span>
              )}
            </div>
          </Link>

          {/* Eksamensmodus */}
          <Link
            href="/exam"
            className="mode-card"
            style={{ flex: 1, flexDirection: "column", alignItems: "stretch", padding: 0, gap: 0, overflow: "hidden" }}
          >
            {/* Square image placeholder */}
            <div style={{ width: "100%", aspectRatio: "1", background: "var(--surface)", borderBottom: "1px solid var(--border)" }} />

            {/* Text at bottom */}
            <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: "4px" }}>
              <div className="heading-sm" style={{ fontSize: "16px" }}>Eksamensmodus</div>
              <p className="body-text" style={{ fontSize: "13px" }}>
                12 spørsmål + karakter
              </p>
            </div>
          </Link>

        </div>
      </div>
    </main>
  );
}
