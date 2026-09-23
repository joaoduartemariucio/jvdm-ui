import type { ReactNode } from "react";

import { locales } from "./locales";

export type Snackbar = {
  id: string;
  title: string;
  message?: ReactNode;
  tone?: "neutral" | "ok" | "warn" | "danger";
};

const TONES = {
  neutral: "border-line-strong",
  ok: "border-ok/50",
  warn: "border-warn/50",
  danger: "border-danger/50",
} as const;

export function SnackbarStack({
  items,
  onDismiss,
  className = "",
}: {
  items: readonly Snackbar[];
  onDismiss?: (id: string) => void;
  className?: string;
}) {
  return (
    <div
      aria-live="polite"
      className={`fixed right-4 bottom-4 z-20 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2 ${className}`}
    >
      {items.map((item) => (
        <div
          className={`flex items-start gap-3 rounded-md border bg-surface p-4 text-ink shadow-popover ${TONES[item.tone ?? "neutral"]}`}
          key={item.id}
        >
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{item.title}</p>
            {item.message ? (
              <div className="mt-1 text-xs text-ink-muted">{item.message}</div>
            ) : null}
          </div>
          {onDismiss ? (
            <button
              aria-label={locales.dismiss}
              className="text-xs text-ink-muted hover:text-ink"
              onClick={() => onDismiss(item.id)}
              type="button"
            >
              ×
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
}
