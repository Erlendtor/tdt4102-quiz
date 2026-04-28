"use client";

import { useEffect, useRef } from "react";

export default function HomeCardReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onLoaded = () => ref.current?.classList.add("cards-revealed");
    window.addEventListener("home-loaded", onLoaded, { once: true });
    return () => window.removeEventListener("home-loaded", onLoaded);
  }, []);

  return (
    <div ref={ref} className="mode-cards" style={{ padding: "0 20px 32px" }}>
      {children}
    </div>
  );
}
