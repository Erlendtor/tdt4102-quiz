"use client";

import { useState } from "react";

function FlagIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
      <line x1="7.5" y1="4.5" x2="7.5" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="7.5" cy="10.5" r="0.75" fill="currentColor"/>
    </svg>
  );
}

export default function HomeFooter() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSend() {
    if (!message.trim()) return;
    setSending(true);
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    }).catch(() => {});
    setSending(false);
    setSent(true);
    setTimeout(() => {
      setOpen(false);
      setMessage("");
      setSent(false);
    }, 1400);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSend();
  }

  return (
    <>
      <div style={{
        padding: "0 24px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "8px",
      }}>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          opacity: 0.3,
          color: "var(--text-primary)",
          letterSpacing: "0.03em",
        }}>
          Laget av Erlend Torgersen
        </span>

        <button
          onClick={() => setOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            opacity: 0.3,
            color: "var(--text-primary)",
            padding: 0,
            letterSpacing: "0.03em",
            transition: "opacity 0.12s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "0.3")}
        >
          <FlagIcon />
          Report an issue
        </button>
      </div>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              background: "var(--card)",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              width: "100%",
              maxWidth: "420px",
              boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
              animation: "reveal 0.18s ease",
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="label" style={{ marginBottom: "6px" }}>Tilbakemelding</div>
            <p className="heading-sm" style={{ marginBottom: "16px", fontSize: "18px" }}>
              {sent ? "Takk for tilbakemeldingen!" : "Rapporter et problem"}
            </p>

            {!sent && (
              <>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Beskriv problemet eller forbedringsforslaget..."
                  className="input-field"
                  style={{ resize: "vertical", minHeight: "96px", lineHeight: 1.55 }}
                  autoFocus
                />
                <p style={{ fontSize: "11px", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", marginTop: "6px", marginBottom: "12px" }}>
                  ⌘ + Enter for å sende
                </p>
                <button
                  onClick={handleSend}
                  disabled={!message.trim() || sending}
                  className="btn-primary"
                >
                  {sending ? "Sender..." : "Send"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
