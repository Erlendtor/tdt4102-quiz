const FLAMES = [
  { l: "4%",  h: 30, w: 12, d: 50,  kf: "flame-a" },
  { l: "14%", h: 44, w: 17, d: 0,   kf: "flame-b" },
  { l: "24%", h: 34, w: 14, d: 170, kf: "flame-a" },
  { l: "35%", h: 50, w: 20, d: 90,  kf: "flame-b" },
  { l: "47%", h: 58, w: 23, d: 130, kf: "flame-a" },
  { l: "59%", h: 48, w: 20, d: 60,  kf: "flame-b" },
  { l: "70%", h: 36, w: 15, d: 200, kf: "flame-a" },
  { l: "82%", h: 46, w: 19, d: 110, kf: "flame-b" },
  { l: "92%", h: 28, w: 11, d: 40,  kf: "flame-a" },
];

export default function FireBar() {
  return (
    <>
      {FLAMES.map((f, i) => (
        <div key={i} style={{ position: "absolute", left: f.l, bottom: 0, transform: "translateX(-50%)", pointerEvents: "none" }}>
          <svg
            width={f.w} height={f.h} viewBox="0 0 24 48" fill="none"
            style={{
              display: "block",
              transformOrigin: "50% 100%",
              animation: `${f.kf} ${0.45 + (i % 3) * 0.12}s ease-in-out infinite alternate`,
              animationDelay: `${f.d}ms`,
            }}
          >
            <defs>
              <linearGradient id={`fire-fg-${i}`} x1="0" y1="0%" x2="0" y2="100%">
                <stop offset="0%"   stopColor="#ffff80" stopOpacity="0.55" />
                <stop offset="18%"  stopColor="#ffdd00" stopOpacity="0.95" />
                <stop offset="52%"  stopColor="#ff7700" stopOpacity="1"    />
                <stop offset="82%"  stopColor="#ff3300" stopOpacity="0.9"  />
                <stop offset="100%" stopColor="#cc1100" stopOpacity="0"    />
              </linearGradient>
            </defs>
            <path d="M12 0 C15 6 21 14 20 25 C19 35 15 43 12 48 C9 43 5 35 4 25 C3 14 9 6 12 0 Z" fill={`url(#fire-fg-${i})`} />
            <path d="M12 10 C14 15 16 21 15 28 C14 35 12 41 12 46 C10 41 8 35 8 28 C7 22 10 15 12 10 Z" fill="rgba(255,240,80,0.32)" />
          </svg>
        </div>
      ))}
    </>
  );
}
