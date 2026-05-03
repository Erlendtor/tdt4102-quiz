"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function VersionCheck() {
  const pathname = usePathname();
  const pendingRef = useRef(false);

  // Fire deferred reload as soon as the user leaves /exam
  useEffect(() => {
    if (pendingRef.current) {
      window.location.reload();
    }
  }, [pathname]);

  useEffect(() => {
    const built = process.env.NEXT_PUBLIC_BUILD_ID;
    if (!built) return;

    const id = setInterval(async () => {
      try {
        const res = await fetch("/api/version", { cache: "no-store" });
        if (!res.ok) return;
        const { v } = await res.json();
        if (v !== built) {
          if (pathname === "/exam") {
            pendingRef.current = true;
          } else {
            window.location.reload();
          }
        }
      } catch {
        // network error — try again next tick
      }
    }, 60_000);

    return () => clearInterval(id);
  }, [pathname]);

  return null;
}
