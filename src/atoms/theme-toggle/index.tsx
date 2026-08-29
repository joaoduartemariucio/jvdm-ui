"use client";

import { MoonIcon, SunIcon } from "../icon";
import { IconButton } from "../icon-button";
import { useTheme, type Theme } from "../../tokens";
import { THEME_TOGGLE as T } from "./locales";

export function ThemeToggle({ label = T.label }: { label?: (theme: Theme) => string }) {
  const { theme, toggle } = useTheme();
  const text = label(theme);

  return (
    <IconButton label={text} size="icon-sm" onClick={toggle}>
      {theme === "dark" ? <SunIcon size="lg" /> : <MoonIcon size="lg" />}
    </IconButton>
  );
}
