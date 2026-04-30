"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setFading(true);
      setTimeout(() => setGone(true), 340);
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--card)",
        zIndex: 30,
        borderRadius: "var(--radius-lg)",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.34s ease",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        style={{ animation: "spin 0.8s linear infinite" }}
      >
        <circle cx="14" cy="14" r="11" stroke="var(--border)" strokeWidth="2.5" />
        <path
          d="M14 3 A11 11 0 0 1 25 14"
          stroke="var(--text-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
