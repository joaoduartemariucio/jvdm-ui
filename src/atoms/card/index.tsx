import type { ReactNode } from "react";

const PADDINGS = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
} as const;

export type CardPadding = keyof typeof PADDINGS;

export function Card({
  children,
  padding = "md",
  className = "",
}: {
  children: ReactNode;
  padding?: CardPadding;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-line bg-surface ${PADDINGS[padding]} ${className}`}>
      {children}
    </div>
  );
}
