export default function BucketIndicator({
  bucket0,
  bucket1,
  bucket2,
  mastered,
}: {
  bucket0: number;
  bucket1: number;
  bucket2: number;
  mastered: number;
}) {
  const items = [
    { color: "var(--wrong)", label: "Øving", count: bucket0 },
    { color: "var(--partial)", label: "Nesten", count: bucket1 },
    { color: "var(--correct)", label: "Bra", count: bucket2 },
    { color: "var(--border-strong)", label: "Ferdig", count: mastered },
  ];

  return (
    <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
      {items.map(({ color, label, count }) => (
        <span key={label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: color,
              flexShrink: 0,
              display: "inline-block",
            }}
          />
          <span
            className="label"
            style={{ letterSpacing: 0, textTransform: "none", fontSize: "11px", color: "var(--text-secondary)" }}
          >
            {label}{" "}
            <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>{count}</strong>
          </span>
        </span>
      ))}
    </div>
  );
}
