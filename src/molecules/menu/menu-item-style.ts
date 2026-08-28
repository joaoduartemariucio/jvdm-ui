export type MenuItemTone = "neutral" | "danger";

const TONES: Record<MenuItemTone, string> = {
  neutral: "text-ink-soft hover:bg-raised hover:text-ink",
  danger: "text-danger hover:bg-danger-soft",
};

const BASE =
  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs transition-colors" +
  " focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export type MenuItemOptions = {
  tone?: MenuItemTone;
  className?: string;
};

export function menuItemClass({ tone = "neutral", className = "" }: MenuItemOptions = {}) {
  return `${BASE} ${TONES[tone]} ${className}`;
}
