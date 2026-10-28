import type { ReactNode } from "react";

export function MetricCard({
  label,
  value,
  change,
  trend = "neutral",
  hint,
  children,
  className = "",
}: {
  label: string;
  value: ReactNode;
  change?: string;
  trend?: "neutral" | "up" | "down";
  hint?: string;
  children?: ReactNode;
  className?: string;
}) {
  const trendColor =
    trend === "up" ? "text-ok" : trend === "down" ? "text-danger" : "text-ink-muted";
  return (
    <article className={`rounded-md border border-line bg-surface p-5 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <span className="text-xs text-ink-muted">{label}</span>
        {change ? <span className={`text-xs font-medium ${trendColor}`}>{change}</span> : null}
      </div>
      <p className="mt-3 text-2xl font-bold text-ink">{value}</p>
      {hint ? <p className="mt-1 text-xs text-ink-dim">{hint}</p> : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </article>
  );
}
