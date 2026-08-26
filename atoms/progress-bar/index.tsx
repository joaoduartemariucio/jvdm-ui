export type ProgressTone = "accent" | "ok" | "warn" | "danger";

const FILL: Record<ProgressTone, string> = {
  accent: "bg-accent",
  ok: "bg-ok",
  warn: "bg-warn",
  danger: "bg-danger",
};

const HEIGHTS = { md: "h-2", xs: "h-1" } as const;

export function ProgressBar({
  value,
  tone = "accent",
  size = "md",
  dim = false,
  className = "",
}: {
  value: number;
  tone?: ProgressTone;
  size?: keyof typeof HEIGHTS;
  dim?: boolean;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(1, value)) * 100;

  return (
    <div className={`${HEIGHTS[size]} overflow-hidden rounded-full bg-raised ${className}`}>
      <div
        className={`h-full rounded-full transition-[width] duration-500 ${FILL[tone]} ${dim ? "opacity-45" : ""}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
