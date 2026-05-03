"use client";

import { useEffect } from "react";

export default function VersionCheck() {
  useEffect(() => {
    const built = process.env.NEXT_PUBLIC_BUILD_ID;
    if (!built) return;

    const id = setInterval(async () => {
      try {
        const res = await fetch("/api/version", { cache: "no-store" });
        if (!res.ok) return;
        const { v } = await res.json();
        if (v !== built) window.location.reload();
      } catch {
        // network error — ignore, try again next tick
      }
    }, 60_000);

    return () => clearInterval(id);
  }, []);

  return null;
}
