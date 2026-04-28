"use client";

import { useEffect, useState } from "react";

export default function HomeLoader() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const min = new Promise<void>((r) => setTimeout(r, 1000));

    const load = (src: string) =>
      new Promise<void>((r) => {
        const img = new window.Image();
        img.onload = img.onerror = () => r();
        img.src = src;
      });

    Promise.all([min, load("/øving3.jpg"), load("/eksamen3.png")]).then(() => {
      setFading(true);
      window.dispatchEvent(new CustomEvent("home-loaded"));
      setTimeout(() => setGone(true), 380);
    });
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
        zIndex: 20,
        borderRadius: "var(--radius-lg)",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.38s ease",
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
