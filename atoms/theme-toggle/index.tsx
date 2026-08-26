import { MoonIcon, SunIcon } from "../icon";
import { useTheme } from "../../tokens";
import { THEME_TOGGLE as T } from "./locales";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const label = T.switchTo(theme === "dark" ? T.light : T.dark);

  return (
    <button
      type="button"
      onClick={toggle}
      title={label}
      aria-label={label}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-raised hover:text-ink-soft"
    >
      {theme === "dark" ? <SunIcon size="lg" /> : <MoonIcon size="lg" />}
    </button>
  );
}
