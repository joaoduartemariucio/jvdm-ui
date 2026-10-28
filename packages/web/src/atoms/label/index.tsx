import type { ReactNode } from "react";

const TONES = {
  muted: "text-ink-muted",
  dim: "text-ink-dim",
  accent: "text-accent-ink",
} as const;

export function Label({
  children,
  tone = "muted",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof TONES;
  className?: string;
}) {
  return <span className={`text-2xs tracking-caps ${TONES[tone]} ${className}`}>{children}</span>;
}
