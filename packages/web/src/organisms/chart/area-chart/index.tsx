export type AreaPoint = { label: string; value: number };

export function AreaChart({
  data,
  top,
  label,
}: {
  data: readonly AreaPoint[];
  top: number;
  label: string;
}) {
  const span = Math.max(data.length - 1, 1);
  const points = data.map(
    (point, index) => `${(index / span) * 100},${100 - (Math.min(point.value, top) / top) * 100}`,
  );
  const line = points.join(" ");
  return (
    <div className="flex flex-col gap-2">
      <svg
        aria-label={label}
        className="h-40 w-full overflow-visible"
        preserveAspectRatio="none"
        role="img"
        viewBox="0 0 100 100"
      >
        <polygon className="fill-accent-soft" points={`0,100 ${line} 100,100`} />
        <polyline
          className="stroke-accent"
          fill="none"
          points={line}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="flex justify-between text-2xs text-ink-dim">
        {data.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>
    </div>
  );
}
