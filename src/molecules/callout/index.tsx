import type { ReactNode } from "react";

const TONES = {
  info: "border-info/35 bg-info-soft text-info",
  ok: "border-ok/35 bg-ok-soft text-ok",
  warn: "border-warn/35 bg-warn-soft text-warn",
  danger: "border-danger/35 bg-danger-soft text-danger",
} as const;

export type CalloutTone = keyof typeof TONES;

export function Callout({
  tone = "info",
  title,
  children,
  className = "",
}: {
  tone?: CalloutTone;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <aside className={`rounded-md border px-4 py-3 ${TONES[tone]} ${className}`}>
      <p className="text-sm font-medium">{title}</p>
      <div className="mt-1 text-sm opacity-80">{children}</div>
    </aside>
  );
}
