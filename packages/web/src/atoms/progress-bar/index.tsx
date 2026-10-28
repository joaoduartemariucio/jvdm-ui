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
  label,
  className = "",
}: {
  value: number;
  tone?: ProgressTone;
  size?: keyof typeof HEIGHTS;
  dim?: boolean;
  label?: string;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(1, value)) * 100;

  return (
    <div
      aria-label={label}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={pct}
      className={`${HEIGHTS[size]} overflow-hidden rounded-full bg-raised ${className}`}
      role="progressbar"
    >
      <div
        className={`h-full origin-left rounded-full transition-transform duration-(--duration-base) ease-out ${FILL[tone]} ${dim ? "opacity-45" : ""}`}
        style={{ transform: `scaleX(${pct / 100})` }}
      />
    </div>
  );
}
