import { locales } from "./locales";

const SIZES = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
  "2xl": "h-8 w-8",
} as const;

export type SpinnerSize = keyof typeof SIZES;

export function Spinner({
  size = "md",
  label = locales.label,
  className = "",
}: {
  size?: SpinnerSize;
  label?: string;
  className?: string;
}) {
  return (
    <svg
      className={`${SIZES[size]} shrink-0 animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label={label}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.4" opacity="0.2" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
