export const CONTROL =
  "w-full min-w-0 rounded-lg border border-line-strong bg-field text-sm text-ink" +
  " outline-none transition-colors focus:border-accent aria-invalid:border-danger";

export const CONTROL_SIZES = {
  md: "px-4 py-3",
  sm: "px-3 py-2",
} as const;

export type ControlSize = keyof typeof CONTROL_SIZES;
