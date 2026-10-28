import type { ComponentProps } from "react";

const TONES = {
  accent: "text-accent-ink decoration-accent/40 hover:decoration-accent",
  ink: "text-ink decoration-line-strong hover:decoration-ink-muted",
  muted: "text-ink-muted decoration-line hover:text-ink-soft hover:decoration-line-strong",
} as const;

export type LinkTone = keyof typeof TONES;

export function Link({
  tone = "accent",
  className = "",
  ...props
}: { tone?: LinkTone } & ComponentProps<"a">) {
  return (
    <a
      {...props}
      className={`rounded-xs underline decoration-1 underline-offset-4 transition-colors duration-(--duration-fast) ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${TONES[tone]} ${className}`}
    />
  );
}
