import type { ReactNode } from "react";

const SIDES = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
} as const;

export type TooltipSide = keyof typeof SIDES;

export function Tooltip({
  id,
  content,
  side = "top",
  children,
  className = "",
}: {
  id: string;
  content: ReactNode;
  side?: TooltipSide;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`group relative inline-flex ${className}`}>
      <span aria-describedby={id} className="inline-flex">
        {children}
      </span>
      <span
        id={id}
        role="tooltip"
        className={`pointer-events-none absolute z-50 w-max max-w-64 rounded-sm border border-line-strong bg-raised px-2 py-1 text-2xs text-ink-soft opacity-0 shadow-popover transition-opacity duration-(--duration-fast) ease-out group-focus-within:opacity-100 group-hover:opacity-100 ${SIDES[side]}`}
      >
        {content}
      </span>
    </span>
  );
}
