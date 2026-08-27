import type { Theme } from "../../tokens";

const NAME: Record<Theme, string> = { dark: "escuro", light: "claro" };

export const THEME_TOGGLE = {
  label: (theme: Theme) => `Mudar para o tema ${NAME[theme === "dark" ? "light" : "dark"]}`,
};
