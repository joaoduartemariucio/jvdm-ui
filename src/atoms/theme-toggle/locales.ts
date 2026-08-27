import type { Theme } from "../../tokens";

const NAME: Record<Theme, string> = { dark: "dark", light: "light" };

export const THEME_TOGGLE = {
  label: (theme: Theme) => `Switch to ${NAME[theme === "dark" ? "light" : "dark"]} theme`,
};
