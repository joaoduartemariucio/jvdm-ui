import { useState } from "react";

export type Theme = "dark" | "light";

const KEY = "arremato.theme";

function stored(): Theme | null {
  const value = localStorage.getItem(KEY);
  return value === "dark" || value === "light" ? value : null;
}

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function applyStoredTheme() {
  const theme = stored();
  if (theme) document.documentElement.dataset.theme = theme;
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => stored() ?? systemTheme());

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem(KEY, next);
    setTheme(next);
  }

  return { theme, toggle };
}
