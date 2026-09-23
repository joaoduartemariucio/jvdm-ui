import type { ReactNode } from "react";

const TONES = { info: "border-info/40 bg-info-soft text-info", ok: "border-ok/40 bg-ok-soft text-ok", warn: "border-warn/40 bg-warn-soft text-warn", danger: "border-danger/40 bg-danger-soft text-danger" } as const;
export type BannerTone = keyof typeof TONES;

export function Banner({ tone = "info", title, children, action, className = "" }: { tone?: BannerTone; title: string; children?: ReactNode; action?: ReactNode; className?: string }) {
  return <aside className={`flex flex-wrap items-center gap-4 rounded-md border px-4 py-3 ${TONES[tone]} ${className}`}><div className="min-w-0 flex-1"><p className="text-sm font-medium">{title}</p>{children ? <div className="mt-1 text-xs opacity-80">{children}</div> : null}</div>{action}</aside>;
}
