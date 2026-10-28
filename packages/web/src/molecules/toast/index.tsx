import type { ReactNode } from "react";

import { locales } from "./locales";

const TONES = {
  info: "border-info/35 bg-surface",
  ok: "border-ok/35 bg-surface",
  warn: "border-warn/35 bg-surface",
  danger: "border-danger/35 bg-surface",
} as const;

export type ToastTone = keyof typeof TONES;

export function Toast({
  tone = "info",
  title,
  children,
  onDismiss,
  dismissLabel = locales.dismiss,
  className = "",
}: {
  tone?: ToastTone;
  title: string;
  children?: ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
  className?: string;
}) {
  return (
    <div
      aria-live="polite"
      className={`flex items-start gap-4 rounded-md border p-4 shadow-popover ${TONES[tone]} ${className}`}
      role="status"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-ink">{title}</p>
        {children ? <div className="mt-1 text-xs text-ink-muted">{children}</div> : null}
      </div>
      {onDismiss ? (
        <button
          aria-label={dismissLabel}
          className="rounded-xs px-1 text-xs text-ink-muted transition-colors duration-(--duration-fast) ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={onDismiss}
          type="button"
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
