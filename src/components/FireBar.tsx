// Flame data: left%, height, width, animation-delay(ms), keyframe, duration(s)
const FLAMES: { l: string; h: number; w: number; d: number; kf: string; dur: number }[] = [
  { l: "-3%",  h: 58,  w: 24, d: 40,  kf: "flame-c", dur: 0.58 },
  { l: "5%",   h: 82,  w: 32, d: 130, kf: "flame-a", dur: 0.48 },
  { l: "13%",  h: 52,  w: 21, d: 20,  kf: "flame-b", dur: 0.62 },
  { l: "22%",  h: 96,  w: 37, d: 200, kf: "flame-c", dur: 0.44 },
  { l: "32%",  h: 68,  w: 27, d: 85,  kf: "flame-a", dur: 0.55 },
  { l: "41%",  h: 112, w: 42, d: 160, kf: "flame-b", dur: 0.50 },
  { l: "51%",  h: 80,  w: 32, d: 60,  kf: "flame-c", dur: 0.46 },
  { l: "60%",  h: 100, w: 39, d: 230, kf: "flame-a", dur: 0.57 },
  { l: "69%",  h: 62,  w: 25, d: 105, kf: "flame-b", dur: 0.43 },
  { l: "78%",  h: 88,  w: 34, d: 30,  kf: "flame-c", dur: 0.52 },
  { l: "87%",  h: 70,  w: 28, d: 175, kf: "flame-a", dur: 0.60 },
  { l: "96%",  h: 54,  w: 22, d: 95,  kf: "flame-b", dur: 0.47 },
  { l: "103%", h: 46,  w: 19, d: 55,  kf: "flame-c", dur: 0.56 },
];

export default function FireBar() {
  return (
    <>
      {FLAMES.map((f, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: f.l,
            bottom: 0,
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        >
          <svg
            width={f.w}
            height={f.h}
            viewBox="0 0 40 96"
            fill="none"
            style={{
              display: "block",
              transformOrigin: "50% 100%",
              animation: `${f.kf} ${f.dur}s ease-in-out infinite alternate`,
              animationDelay: `${f.d}ms`,
            }}
          >
            <defs>
              <linearGradient id={`fire-fg-${i}`} x1="0" y1="0%" x2="0" y2="100%">
                <stop offset="0%"   stopColor="#ffff80" stopOpacity="0.5"  />
                <stop offset="15%"  stopColor="#ffe000" stopOpacity="0.95" />
                <stop offset="50%"  stopColor="#ff7700" stopOpacity="1"    />
                <stop offset="80%"  stopColor="#ff3300" stopOpacity="0.9"  />
                <stop offset="100%" stopColor="#cc1100" stopOpacity="0"    />
              </linearGradient>
              <linearGradient id={`fire-core-${i}`} x1="0" y1="0%" x2="0" y2="100%">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.7"  />
                <stop offset="40%"  stopColor="#ffee50" stopOpacity="0.6"  />
                <stop offset="100%" stopColor="#ffaa00" stopOpacity="0"    />
              </linearGradient>
            </defs>
            {/* Outer flame body */}
            <path
              d="M20 0 C26 10 36 24 34 44 C32 62 26 78 20 96 C14 78 8 62 6 44 C4 24 14 10 20 0 Z"
              fill={`url(#fire-fg-${i})`}
            />
            {/* Wider organic bulge on one side (alternates by index) */}
            <path
              d={i % 2 === 0
                ? "M20 20 C30 28 36 40 32 56 C28 70 22 82 20 94 C17 82 14 68 14 54 C14 38 14 28 20 20 Z"
                : "M20 20 C10 28 4 40 8 56 C12 70 18 82 20 94 C22 82 26 68 26 54 C26 38 26 28 20 20 Z"
              }
              fill={`url(#fire-fg-${i})`}
              opacity="0.55"
            />
            {/* Bright inner core */}
            <path
              d="M20 14 C23 22 26 32 25 46 C24 58 21 70 20 90 C19 70 16 58 15 46 C14 32 17 22 20 14 Z"
              fill={`url(#fire-core-${i})`}
            />
          </svg>
        </div>
      ))}
    </>
  );
}
