export const CONTROL =
  "w-full min-w-0 rounded-md border border-line-strong bg-field text-base text-ink sm:text-sm" +
  " outline-none transition-[background-color,border-color,box-shadow] duration-150 focus:border-accent focus:ring-2 focus:ring-accent/30 aria-invalid:border-danger aria-invalid:ring-2 aria-invalid:ring-danger/20";

export const CONTROL_SIZES = {
  md: "px-4 py-3",
  sm: "px-3 py-2",
} as const;

export type ControlSize = keyof typeof CONTROL_SIZES;
