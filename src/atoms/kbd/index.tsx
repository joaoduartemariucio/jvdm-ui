import type { ReactNode } from "react";

export function Kbd({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <kbd
      className={`inline-flex min-w-6 items-center justify-center rounded-xs border border-line-strong bg-raised px-1 py-0.5 font-mono text-2xs text-ink-soft ${className}`}
    >
      {children}
    </kbd>
  );
}
