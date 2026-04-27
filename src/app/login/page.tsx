"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
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

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Feil brukernavn eller passord");
    } else {
      router.push("/");
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <main className="page-shell">
      <div className="app-card">
        {/* Header */}
        <div style={{ padding: "32px 28px 24px" }}>
          <div className="label" style={{ marginBottom: "10px" }}>TDT4102 · Del 1</div>
          <h1 className="heading-lg">Logg inn</h1>
          <p className="body-text" style={{ marginTop: "6px" }}>
            Lagre progresjon på tvers av enheter
          </p>
        </div>

        <div className="divider" />

        {/* Tab toggle */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--border)" }}>
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                flex: 1,
                padding: "12px",
                background: "none",
                border: "none",
                borderBottom: `2px solid ${mode === m ? "var(--text-primary)" : "transparent"}`,
                color: mode === m ? "var(--text-primary)" : "var(--text-tertiary)",
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: mode === m ? 500 : 400,
                cursor: "pointer",
                transition: "all 0.15s",
                marginBottom: "-1px",
              }}
            >
              {m === "login" ? "Logg inn" : "Registrer"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "24px 20px 0" }}>
          <div style={{ marginBottom: "14px" }}>
            <label
              className="label"
              style={{ display: "block", marginBottom: "6px" }}
            >
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

          <div style={{ marginBottom: "16px" }}>
            <label
              className="label"
              style={{ display: "block", marginBottom: "6px" }}
            >
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

          {error && (
            <p style={{
              fontSize: "13px",
              color: "var(--wrong)",
              marginBottom: "14px",
              padding: "10px 12px",
              background: "var(--wrong-bg)",
              borderRadius: "6px",
              border: "1px solid var(--wrong-border)",
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ marginBottom: "20px" }}
          >
            {loading
              ? "Laster..."
              : mode === "login"
              ? "Logg inn"
              : "Opprett konto"}
          </button>
        </form>

        <div className="divider" />

        <div style={{ padding: "16px 20px" }}>
          <button
            onClick={() => router.push("/")}
            className="btn-secondary"
          >
            Fortsett uten innlogging
          </button>
        </div>
      </div>
    </main>
  );
}
