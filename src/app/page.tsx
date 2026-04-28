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

export default async function Home() {
  const session = await auth();

  // Fetch real bucket stats for logged-in users
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
      <div className="app-card">2
        {/* Header */}
        <div style={{ padding: "28px 24px 20px" }}>
          <div className="label" style={{ marginBottom: "8px" }}>TDT4102</div>
          <h1 className="heading-lg">Eksamenstrening Del1</h1>
        </div>

        <div className="divider" />

        {/* Mode cards */}
        <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>

          {/* Læringsmodus — med bucket-stats inni */}
          <Link href="/learn" className="mode-card" style={{ flexDirection: "column", alignItems: "flex-start", gap: "10px" }}>
            <div className="heading-sm">Læringsmodus</div>
            <p className="body-text" style={{ fontSize: "13px", marginTop: "-6px" }}>
              Tilbakemelding · Forklaringer · Spaced repetition
            </p>

            {bucketStats ? (
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", paddingTop: "2px" }}>
                {BUCKET_ITEMS.map(({ color, label, key }) => {
                  const count = key === -1 ? bucketStats!.mastered : bucketStats![key as 0 | 1 | 2];
                  return (
                    <span key={label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
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
              <span className="label" style={{ letterSpacing: 0, textTransform: "none", fontSize: "11px", color: "var(--text-tertiary)" }}>
                {questions.length} spørsmål
              </span>
            )}
          </Link>

          {/* Eksamensmodus */}
          <Link href="/exam" className="mode-card">
            <div>
              <div className="heading-sm">Eksamensmodus</div>
              <p className="body-text" style={{ marginTop: "2px", fontSize: "13px" }}>
                12 spørsmål · NTNU-karakter · Ingen tilbakemelding underveis
              </p>
            </div>
          </Link>
        </div>

        <div className="divider" />

        {/* Auth footer */}
        <div style={{ padding: "13px 20px", textAlign: "center" }}>
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
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  color: "var(--text-tertiary)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Logg ut ({session.user.name})
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              style={{ fontSize: "13px", color: "var(--text-tertiary)", textDecoration: "none" }}
            >
              Logg inn for å lagre progresjon →
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
