"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

interface FireStreakResult {
  fireStreak:    number;
  fireWarning:   boolean;
  fireActivating: boolean;
  isOnFire:      boolean;
  setFireStreak: (n: number) => void;
  setFireWarning: (w: boolean) => void;
}

export function useFireStreak(mode: "del1" | "del2"): FireStreakResult {
  const { data: session, status } = useSession();

  const [fireStreak,    setFireStreak]    = useState(0);
  const [fireWarning,   setFireWarning]   = useState(false);
  const [fireActivating, setFireActivating] = useState(false);

  const prevOnFireRef = useRef(false);
  const loadedRef     = useRef(false);

  // ── Restore from localStorage once session is known ─────────────────────
  useEffect(() => {
    if (status === "loading") return;
    const userId = session?.user?.id ?? "guest";
    const key    = `fire_${mode}_${userId}`;
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const { streak, warning } = JSON.parse(raw) as { streak: number; warning: boolean };
        if (typeof streak === "number" && streak >= 1) {
          setFireStreak(streak);
          setFireWarning(warning ?? false);
          // Don't play activation animation for a restored streak
          if (streak >= 3) prevOnFireRef.current = true;
        }
      }
    } catch { /* ignore */ }
    loadedRef.current = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session?.user?.id]);

  // ── Persist every change ─────────────────────────────────────────────────
  useEffect(() => {
    if (!loadedRef.current) return;
    const userId = session?.user?.id ?? "guest";
    const key    = `fire_${mode}_${userId}`;
    if (fireStreak > 0) {
      localStorage.setItem(key, JSON.stringify({ streak: fireStreak, warning: fireWarning }));
    } else {
      localStorage.removeItem(key);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fireStreak, fireWarning]);

  // ── Activation flash ─────────────────────────────────────────────────────
  const isOnFire = fireStreak >= 3;
  useEffect(() => {
    if (isOnFire && !prevOnFireRef.current) {
      setFireActivating(true);
      const t = setTimeout(() => setFireActivating(false), 700);
      prevOnFireRef.current = true;
      return () => clearTimeout(t);
    }
    if (!isOnFire) prevOnFireRef.current = false;
  }, [isOnFire]);

  return { fireStreak, fireWarning, fireActivating, isOnFire, setFireStreak, setFireWarning };
}
