"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const BUCKET_ITEMS = [
  { color: "var(--wrong)",    label: "Øving",  key: 0  },
  { color: "var(--correct)",  label: "Klart",  key: 2  },
  { color: "var(--mastered)", label: "Ferdig", key: -1 },
] as const;

type BucketStats = { 0: number; 1: number; 2: number; mastered: number };

interface Props {
  isLoggedIn: boolean;
  bucketStats: BucketStats | null;
  questionCount: number;
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

export default function LearnDel1Card({ isLoggedIn, bucketStats, questionCount }: Props) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [resetting, setResetting] = useState(false);

  async function handleReset() {
    setResetting(true);
    try {
      await fetch("/api/progress", { method: "DELETE" });
      setShowConfirm(false);
      router.refresh();
    } finally {
      setResetting(false);
    }
  }

  return (
    <>
      <div className="mode-card" style={cardStyle}>
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
                  const count = key === -1 ? bucketStats.mastered : bucketStats[key as 0 | 1 | 2];
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
                {questionCount} spørsmål
              </span>
            )}
          </div>
          <span className="card-cta">Start nå ⟶</span>
        </div>

        {/* Transparent link overlay — covers the full card, behind the reset button */}
        <Link href="/learn" style={{ position: "absolute", inset: 0, zIndex: 1 }} aria-label="Start Læringsmodus Del 1" />

        {/* Reset link — only for logged-in users, sits on top of the Link overlay */}
        {isLoggedIn && (
          <button
            onClick={(e) => { e.stopPropagation(); setShowConfirm(true); }}
            style={{
              position: "absolute",
              bottom: "10px",
              left: "16px",
              zIndex: 2,
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontSize: "11px",
              color: "var(--wrong)",
              textDecoration: "underline",
              fontFamily: "var(--font-sans)",
              lineHeight: 1,
            }}
          >
            reset
          </button>
        )}
      </div>

      {showConfirm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setShowConfirm(false)}
        >
          <div
            style={{
              background: "var(--card)",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              maxWidth: "340px",
              width: "100%",
              boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: "17px", fontWeight: 700, letterSpacing: "-0.2px", color: "var(--text-primary)", marginBottom: "12px" }}>
              Er du sikker på at du vil resette læringsmodus del 1?
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "20px", lineHeight: 1.5 }}>
              Din progresjon på oppgaver som er satt til ferdig og klart vil nullstilles og du vil få tilgang til alle spørsmålene i kortstokken igjen.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="btn-secondary"
                onClick={() => setShowConfirm(false)}
                style={{ flex: 1 }}
                disabled={resetting}
              >
                Avbryt
              </button>
              <button
                className="btn-primary"
                onClick={handleReset}
                disabled={resetting}
                style={{ flex: 1, background: "var(--wrong)" }}
              >
                {resetting ? "Resetter..." : "Ja, reset"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
