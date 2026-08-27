import { MoonIcon, SunIcon } from "../icon";
import { useTheme, type Theme } from "../../tokens";
import { THEME_TOGGLE as T } from "./locales";

export function ThemeToggle({ label = T.label }: { label?: (theme: Theme) => string }) {
  const { theme, toggle } = useTheme();
  const text = label(theme);

  return (
    <button
      type="button"
      onClick={toggle}
      title={text}
      aria-label={text}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-raised hover:text-ink-soft"
    >
      {theme === "dark" ? <SunIcon size="lg" /> : <MoonIcon size="lg" />}
    </button>
  );
}
