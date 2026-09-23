import type { ReactNode } from "react";

export type TimelineItem = {
  id: string;
  title: string;
  meta: string;
  children?: ReactNode;
  tone?: "neutral" | "accent" | "ok" | "warn" | "danger";
};

const DOTS = {
  neutral: "bg-line-strong",
  accent: "bg-accent",
  ok: "bg-ok",
  warn: "bg-warn",
  danger: "bg-danger",
} as const;

export function Timeline({
  items,
  className = "",
}: {
  items: readonly TimelineItem[];
  className?: string;
}) {
  return (
    <ol className={`flex flex-col ${className}`}>
      {items.map((item, index) => (
        <li className="relative flex gap-4 pb-6 last:pb-0" key={item.id}>
          {index < items.length - 1 ? (
            <span className="absolute top-3 bottom-0 left-1 w-px bg-line" />
          ) : null}
          <span
            className={`relative z-1 mt-1 size-2.5 shrink-0 rounded-full ring-4 ring-surface ${DOTS[item.tone ?? "neutral"]}`}
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-sm font-medium text-ink">{item.title}</p>
              <time className="text-2xs text-ink-dim">{item.meta}</time>
            </div>
            {item.children ? (
              <div className="mt-1 text-xs text-ink-muted">{item.children}</div>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
