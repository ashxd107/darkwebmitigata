const severityData = [
  { label: "Critical", count: 2, color: "hsl(0, 84%, 60%)", pct: 40 },
  { label: "High", count: 2, color: "hsl(25, 90%, 55%)", pct: 40 },
  { label: "Medium", count: 1, color: "hsl(38, 92%, 50%)", pct: 20 },
];

const SeverityDistribution = () => {
  return (
    <div className="card-surface !p-5 h-full">
      <h3 className="text-display text-sm mb-4">Source Severity</h3>

      {/* Stacked bar */}
      <div className="flex rounded-full overflow-hidden h-3 mb-4">
        {severityData.map((s) => (
          <div
            key={s.label}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{ width: `${s.pct}%`, backgroundColor: s.color }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {severityData.map((s) => (
          <div key={s.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
              <span className="text-body text-[11px]">{s.label}</span>
            </div>
            <span className="text-display text-[11px]">{s.count} sources</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeverityDistribution;
