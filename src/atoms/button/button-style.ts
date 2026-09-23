export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "icon" | "icon-sm";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-accent font-medium text-on-accent hover:bg-accent-ink",
  secondary: "border border-line-strong hover:bg-raised",
  ghost: "text-ink-muted hover:bg-raised hover:text-ink-soft",
  danger: "border border-danger/50 text-danger hover:bg-danger-soft",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "gap-2 px-3 py-2 text-xs",
  md: "gap-2 px-4 py-3 text-sm",
  lg: "gap-2 px-4 py-4 text-base",
  icon: "h-10 w-10 shrink-0",
  "icon-sm": "h-8 w-8 shrink-0",
};

const BASE =
  "inline-flex touch-manipulation select-none items-center justify-center rounded-md transition-[background-color,border-color,color,box-shadow,transform] duration-(--duration-fast) ease-out active:scale-95" +
  " focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent focus-visible:ring-2 focus-visible:ring-accent/30" +
  " disabled:pointer-events-none disabled:opacity-50";

export type ButtonOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function buttonClass({
  variant = "secondary",
  size = "md",
  className = "",
}: ButtonOptions = {}) {
  return `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
}
