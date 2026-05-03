// 4 giant flames: 2 left (leaning left), 2 right (leaning right)
// Gap kept in center so "ON FIRE!" remains readable
const FLAMES = [
  { x: "-3%",  rotate: -32, h: 590, w: 128, d: 0,    dur: 3.8, kf: "big-flame-a" },
  { x: "21%",  rotate: -13, h: 530, w: 112, d: 1100, dur: 3.2, kf: "big-flame-b" },
  { x: "79%",  rotate:  13, h: 555, w: 118, d: 600,  dur: 4.0, kf: "big-flame-a" },
  { x: "103%", rotate:  31, h: 610, w: 134, d: 1500, dur: 3.5, kf: "big-flame-b" },
];

export default function FireBar() {
  return (
    <>
      {FLAMES.map((f, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: f.x,
            bottom: 0,
            transform: `translateX(-50%) rotate(${f.rotate}deg)`,
            transformOrigin: "50% 100%",
            pointerEvents: "none",
            filter: "blur(0.6px)",
          }}
        >
          <svg
            width={f.w}
            height={f.h}
            viewBox="0 0 80 300"
            preserveAspectRatio="none"
            fill="none"
            style={{
              display: "block",
              transformOrigin: "50% 100%",
              animation: `${f.kf} ${f.dur}s ease-in-out infinite alternate`,
              animationDelay: `${f.d}ms`,
            }}
          >
            <defs>
              <linearGradient id={`big-fg-${i}`} x1="0" y1="0%" x2="0" y2="100%">
                <stop offset="0%"   stopColor="#ffff90" stopOpacity="0.4"  />
                <stop offset="10%"  stopColor="#ffee00" stopOpacity="0.92" />
                <stop offset="42%"  stopColor="#ff8800" stopOpacity="1"    />
                <stop offset="76%"  stopColor="#ff3300" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#bb0000" stopOpacity="0"    />
              </linearGradient>
              <linearGradient id={`big-core-${i}`} x1="0" y1="0%" x2="0" y2="100%">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.65" />
                <stop offset="35%"  stopColor="#fff0a0" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#ffcc00" stopOpacity="0"    />
              </linearGradient>
            </defs>
            {/* Outer flame body */}
            <path
              d="M40 0 C55 30 72 70 68 118 C64 165 52 222 40 300 C28 222 16 165 12 118 C8 70 25 30 40 0 Z"
              fill={`url(#big-fg-${i})`}
            />
            {/* Bright inner core */}
            <path
              d="M40 14 C47 38 56 75 53 120 C50 164 43 210 40 290 C37 210 30 164 27 120 C24 75 33 38 40 14 Z"
              fill={`url(#big-core-${i})`}
            />
          </svg>
        </div>
      ))}
    </>
  );
}
