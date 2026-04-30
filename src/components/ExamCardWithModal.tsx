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
  { key: "V25V1", label: "V25 – Vår 2025 (v1)", sub: "11 Del 1 + 10 Del 2" },
  { key: "V25V2", label: "V25 – Vår 2025 (v2)", sub: "12 Del 1 + 10 Del 2" },
  { key: "V24V1", label: "V24 – Vår 2024 (v1)", sub: "12 Del 1 + 10 Del 2" },
  { key: "V24V2", label: "V24 – Vår 2024 (v2)", sub: "12 Del 1 + 10 Del 2" },
  { key: "K24",   label: "K24 – Sommer 2024",   sub: "12 Del 1 + 10 Del 2" },
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
    minHeight: "280px",
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
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backdropFilter: "blur(18px) saturate(130%)",
            WebkitBackdropFilter: "blur(18px) saturate(130%)",
            background: "rgba(255,255,255,0.72)",
            padding: "16px 18px 20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "-0.3px",
                lineHeight: 1.2,
                color: "var(--text-primary)",
                marginBottom: "3px",
              }}
            >
              Eksamen
            </div>
            <p
              style={{
                fontSize: "13px",
                lineHeight: 1.4,
                color: "var(--text-secondary)",
              }}
            >
              12 Del 1-spørsmål + Del 2-spørsmål · karakter
            </p>
          </div>
          <span className="card-cta" style={{ flexShrink: 0 }}>
            Start nå ⟶
          </span>
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
                marginBottom: "4px",
              }}
            >
              Velg eksamensformat
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                marginBottom: "20px",
                lineHeight: 1.4,
              }}
            >
              Tilfeldig trekker spørsmål fra hele spørsmålsbanken. Velg en
              spesifikk eksamen for å øve på akkurat den.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button className="btn-primary" onClick={() => navigate("random")}>
                Tilfeldig
              </button>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  margin: "2px 0",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: "var(--border)",
                  }}
                />
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--text-tertiary)",
                    fontFamily: "var(--font-mono)",
                    flexShrink: 0,
                  }}
                >
                  spesifikk eksamen
                </span>
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: "var(--border)",
                  }}
                />
              </div>

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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
