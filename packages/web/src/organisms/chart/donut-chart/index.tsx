import type { ReactNode } from "react";

export type DonutDatum = { id: string; label: string; value: number; color: string };

export function DonutChart({
  data,
  total,
  label,
  children,
}: {
  data: readonly DonutDatum[];
  total: number;
  label: string;
  children?: ReactNode;
}) {
  const circumference = 2 * Math.PI * 38;
  return (
    <div className="flex items-center gap-6">
      <div className="relative size-36 shrink-0">
        <svg className="size-full -rotate-90" viewBox="0 0 100 100" role="img" aria-label={label}>
          <circle cx="50" cy="50" r="38" fill="none" stroke="var(--color-line)" strokeWidth="12" />
          {data.map((datum, index) => {
            const length = (datum.value / total) * circumference;
            const offset = data
              .slice(0, index)
              .reduce((sum, item) => sum + (item.value / total) * circumference, 0);
            return (
              <circle
                key={datum.id}
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke={datum.color}
                strokeDasharray={`${length} ${circumference - length}`}
                strokeDashoffset={-offset}
                strokeWidth="12"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {children}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {data.map((datum) => (
          <div className="flex items-center gap-2 text-xs text-ink-muted" key={datum.id}>
            <span className="size-2 rounded-full" style={{ backgroundColor: datum.color }} />
            {datum.label}
            <span className="ml-auto pl-4 font-mono text-2xs text-ink-dim">{datum.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
