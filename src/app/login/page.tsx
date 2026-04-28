"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register" | null>(null);
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      localStorage.setItem("hasVisited", "1");
      setMode("register");
    } else {
      setMode("login");
    }
    requestAnimationFrame(() => setVisible(true));
  }, []);

  function switchMode(next: "login" | "register") {
    setMode(next);
    setError("");
    setConfirmPassword("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (mode === "register" && password !== confirmPassword) {
      setError("Passordene stemmer ikke overens");
      return;
    }

    setLoading(true);

    if (mode === "register") {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Registrering feilet");
        setLoading(false);
        return;
      }
    }

    const result = await signIn("credentials", { username, password, redirect: false });

    if (result?.error) {
      setError("Feil brukernavn eller passord");
    } else {
      router.push("/");
      router.refresh();
    }
    setLoading(false);
  }

  if (!mode) return null;

  const enter = (delay: string): React.CSSProperties => visible
    ? { animation: "page-enter 0.32s cubic-bezier(0.25, 0, 0.2, 1) both", animationDelay: delay }
    : { opacity: 0 };

  return (
    <main className="page-shell">
      <div className="app-card" style={{ maxWidth: "400px" }}>
        {/* Header */}
        <div style={{ padding: "32px 28px 24px", ...enter("0ms") }}>
          <h1 className="heading-lg">
            {mode === "login" ? "Logg inn" : "Opprett konto"}
          </h1>
          <p className="body-text" style={{ marginTop: "6px" }}>
            Lagre progresjon på tvers av enheter
          </p>
        </div>

        <div className="divider" />

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "24px 20px 20px" }}>
          <div style={{ marginBottom: "14px", ...enter("60ms") }}>
            <label className="label" style={{ display: "block", marginBottom: "6px" }}>
              Brukernavn
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              placeholder="dittbrukernavn"
              autoComplete="username"
              required
            />
          </div>

          <div style={{ marginBottom: mode === "register" ? "14px" : "0", ...enter("110ms") }}>
            <label className="label" style={{ display: "block", marginBottom: "6px" }}>
              Passord
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
              autoComplete={mode === "register" ? "new-password" : "current-password"}
              required
            />
          </div>

          {mode === "register" && (
            <div style={enter("160ms")}>
              <label className="label" style={{ display: "block", marginBottom: "6px" }}>
                Bekreft passord
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
            </div>
          )}

          {error && (
            <p style={{
              fontSize: "13px",
              color: "var(--wrong)",
              marginTop: "14px",
              padding: "10px 12px",
              background: "var(--wrong-bg)",
              borderRadius: "6px",
              border: "1px solid var(--wrong-border)",
            }}>
              {error}
            </p>
          )}

          {/* Switch link */}
          <div style={{ marginTop: "20px", textAlign: "center", ...enter("190ms") }}>
            <button
              type="button"
              onClick={() => switchMode(mode === "login" ? "register" : "login")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "13px",
                color: "var(--text-tertiary)",
                textDecoration: "underline",
                fontFamily: "var(--font-sans)",
                padding: 0,
              }}
            >
              {mode === "login" ? "Eller registrer deg her" : "Har allerede bruker? Logg inn"}
            </button>
          </div>

          {/* Action row: home sq + submit */}
          <div style={{ display: "flex", gap: "5px", alignItems: "center", marginTop: "12px", ...enter("220ms") }}>
            <Link href="/" className="learn-sq-btn" aria-label="Hjem">
              <svg width="22" height="22" viewBox="0 0 17 17" fill="none">
                <path d="M2.5 7.5L8.5 2L14.5 7.5V15H11V10.5H6V15H2.5V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
              </svg>
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ flex: 1 }}
            >
              {loading ? "Laster..." : mode === "login" ? "Logg inn" : "Opprett konto"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
