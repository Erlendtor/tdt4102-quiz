"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const GRADE_COLORS: Record<string, string> = {
  A: "var(--correct)",
  B: "var(--correct)",
  C: "var(--partial)",
  D: "var(--partial)",
  E: "var(--wrong)",
  F: "var(--wrong)",
};

const EXAM_SETS = [
  { key: "V25V1", label: "V25 – Vår 2025 (v1)", chip: "V25v1" },
  { key: "V25V2", label: "V25 – Vår 2025 (v2)", chip: "V25v2" },
  { key: "V24V1", label: "V24 – Vår 2024 (v1)", chip: "V24v1" },
  { key: "V24V2", label: "V24 – Vår 2024 (v2)", chip: "V24v2" },
  { key: "K24",   label: "K24 – Sommer 2024",   chip: "K24"   },
  { key: "INSP",  label: "INSP – Insperaøving 14. april", chip: "INSP" },
] as const;

interface Props {
  hasSession: boolean;
  examSetGrades: Record<string, string[]>;
}

export default function ExamCardWithModal({ hasSession, examSetGrades }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);

  function handleCardClick() {
    if (!hasSession) {
      setLoginPrompt(true);
    } else {
      setOpen(true);
    }
  }

  function navigate(set: string) {
    setOpen(false);
    router.push(`/exam?set=${set}`);
  }

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
    aspectRatio: "auto",
    minHeight: "340px",
    cursor: "pointer",
    border: "none",
    textAlign: "left",
  };

  return (
    <>
      {/* Exam card — button instead of Link */}
      <button
        className="mode-card"
        style={cardStyle}
        onClick={handleCardClick}
      >
        <div className="card-image">
          <Image
            src="/eksamen3.png"
            alt="Eksamensmodus"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div
          className="card-glass"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backdropFilter: "blur(18px) saturate(130%)",
            WebkitBackdropFilter: "blur(18px) saturate(130%)",
            background: "rgba(255,255,255,0.72)",
            padding: "16px 16px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <div className="card-glass-content">
            <div
              style={{
                fontSize: "25px",
                fontWeight: 700,
                letterSpacing: "-0.3px",
                lineHeight: 1.2,
                color: "var(--text-primary)",
                marginBottom: "4px",
              }}
            >
              Eksamen
            </div>
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.4,
                color: "var(--text-secondary)",
                marginBottom: "10px",
              }}
            >
              Del 1 og Del 2 · karakter
            </p>
            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
              {EXAM_SETS.map(({ key, chip }) => {
                const taken = (examSetGrades[key]?.length ?? 0) > 0;
                const isShort = chip.length <= 3;
                return (
                  <span
                    key={key}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                      height: "30px",
                      aspectRatio: isShort ? "1" : "auto",
                      padding: isShort ? "0" : "0 10px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "6px",
                      background: taken ? "rgba(255,255,255,0.35)" : "white",
                      color: taken ? "var(--text-tertiary)" : "var(--text-secondary)",
                      opacity: taken ? 0.6 : 1,
                      lineHeight: 1,
                    }}
                  >
                    {chip}
                  </span>
                );
              })}
            </div>
          </div>
          <span className="card-cta">Start nå ⟶</span>
        </div>
      </button>

      {/* Login prompt modal */}
      {loginPrompt && (
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
          onClick={() => setLoginPrompt(false)}
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
            <div
              style={{
                fontSize: "17px",
                fontWeight: 700,
                letterSpacing: "-0.2px",
                color: "var(--text-primary)",
                marginBottom: "8px",
              }}
            >
              Logg inn for å lagre progresjon
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                marginBottom: "20px",
                lineHeight: 1.5,
              }}
            >
              Med en konto lagres resultatene dine automatisk og er tilgjengelige på alle enheter.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button
                className="btn-primary"
                onClick={() => router.push("/login")}
              >
                Logg inn / registrer
              </button>
              <button
                className="btn-secondary"
                onClick={() => { setLoginPrompt(false); setOpen(true); }}
              >
                Fortsett uten
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Format modal */}
      {open && (
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
          onClick={() => setOpen(false)}
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
            <div
              style={{
                fontSize: "17px",
                fontWeight: 700,
                letterSpacing: "-0.2px",
                color: "var(--text-primary)",
                marginBottom: "16px",
              }}
            >
              Velg eksamensformat
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {EXAM_SETS.map(({ key, label }) => {
                const grades = examSetGrades[key];
                const taken = grades && grades.length > 0;
                return (
                  <button
                    key={key}
                    className="btn-secondary"
                    onClick={() => navigate(key)}
                    style={taken ? {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid var(--border)",
                      color: "var(--text-secondary)",
                    } : undefined}
                  >
                    <span>{label}</span>
                    {taken && (
                      <span style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        {grades.map((g, i) => (
                          <span key={i} style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "13px",
                            fontWeight: 700,
                            color: GRADE_COLORS[g] ?? "var(--text-primary)",
                            lineHeight: 1,
                            opacity: i === 0 ? 1 : i === 1 ? 0.55 : 0.3,
                          }}>
                            {g}
                          </span>
                        ))}
                      </span>
                    )}
                  </button>
                );
              })}

              <button className="btn-primary" onClick={() => navigate("random")} style={{ marginTop: "4px" }}>
                Tilfeldig
              </button>

              <p
                style={{
                  fontSize: "12px",
                  color: "var(--text-tertiary)",
                  lineHeight: 1.4,
                  textAlign: "center",
                  marginTop: "2px",
                }}
              >
                Tilfeldig trekker spørsmål fra hele spørsmålsbanken.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
