import type { ReactNode } from "react";

import { BADGE_TONES, type BadgeTone } from "../badge";
import { CloseIcon } from "../icon";
import { TAG } from "./locales";

export function Tag({
  tone = "neutral",
  children,
  onRemove,
  removeLabel = TAG.remove,
  disabled = false,
  className = "",
}: {
  tone?: BadgeTone;
  children: ReactNode;
  onRemove?: () => void;
  removeLabel?: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1 rounded-sm py-0.5 text-xs font-medium ${onRemove ? "pr-1 pl-2" : "px-2"} ${BADGE_TONES[tone]} ${disabled ? "opacity-50" : ""} ${className}`}
    >
      <span className="truncate">{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          aria-label={removeLabel}
          title={removeLabel}
          className="inline-flex shrink-0 touch-manipulation items-center justify-center rounded-xs p-0.5 opacity-70 transition-[opacity,background-color] duration-(--duration-fast) ease-out hover:bg-ink/10 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent disabled:pointer-events-none"
        >
          <CloseIcon size="sm" />
        </button>
      )}
    </span>
  );
}
