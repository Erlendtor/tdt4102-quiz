export default function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
        <span className="label">Spørsmål {current} av {total}</span>
        <span className="label">{pct}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
