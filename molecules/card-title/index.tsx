import type { ReactNode } from "react";

export function CardTitle({ children, hint }: { children: ReactNode; hint?: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-sm font-medium">{children}</span>
      {hint ? <span className="shrink-0 text-xs text-ink-muted">{hint}</span> : null}
    </div>
  );
}
