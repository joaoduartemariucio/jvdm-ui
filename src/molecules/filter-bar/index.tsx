import type { ReactNode } from "react";

import { locales } from "./locales";

export function FilterBar({
  children,
  resultLabel,
  onClear,
  className = "",
}: {
  children: ReactNode;
  resultLabel?: string;
  onClear?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-3 rounded-md border border-line bg-panel p-3 ${className}`}
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">{children}</div>
      {resultLabel ? <span className="text-xs text-ink-muted">{resultLabel}</span> : null}
      {onClear ? (
        <button
          className="text-xs text-accent-ink underline underline-offset-4"
          onClick={onClear}
          type="button"
        >
          {locales.clear}
        </button>
      ) : null}
    </div>
  );
}
