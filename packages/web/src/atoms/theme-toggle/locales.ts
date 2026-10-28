import type { Theme } from "../../tokens";

const NAME: Record<Theme, string> = { dark: "dark", light: "light" };

export const locales = {
  label: (theme: Theme) => `Switch to ${NAME[theme === "dark" ? "light" : "dark"]} theme`,
};
