export type ThemeMode = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "jvdm-ui.theme";

export type ThemeStorage = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

export function createThemeStore(storage: ThemeStorage) {
  return {
    async read(): Promise<ThemeMode> {
      const value = await storage.getItem(THEME_STORAGE_KEY);
      return value === "light" || value === "dark" ? value : "system";
    },

    async write(mode: ThemeMode): Promise<void> {
      if (mode === "system") {
        await storage.removeItem(THEME_STORAGE_KEY);
        return;
      }
      await storage.setItem(THEME_STORAGE_KEY, mode);
    },
  };
}
