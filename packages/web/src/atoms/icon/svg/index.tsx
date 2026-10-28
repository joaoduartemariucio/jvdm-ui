import type { ReactNode } from "react";

export type IconSize = "sm" | "md" | "lg" | "xl" | "2xl";

const SIZES: Record<IconSize, string> = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
  "2xl": "h-8 w-8",
};

export type Props = { size?: IconSize; className?: string };

export function Svg({ size = "md", className = "", children }: Props & { children: ReactNode }) {
  return (
    <svg
      className={`${SIZES[size]} shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
