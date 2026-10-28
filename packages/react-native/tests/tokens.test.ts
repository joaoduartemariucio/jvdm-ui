import { describe, expect, it } from "vitest";

import { THEME_STORAGE_KEY, createThemeStore, type ThemeMode } from "../src/tokens/mode";
import { darkTokens, lightTokens, resolveTokens } from "../src/tokens/theme";
import { COLOR_TOKENS, text, weight } from "../src/tokens/tokens";

const WEIGHTS = ["400", "500", "700"];

function memoryStorage() {
  const entries = new Map<string, string>();
  return {
    entries,
    getItem: async (key: string) => entries.get(key) ?? null,
    setItem: async (key: string, value: string) => void entries.set(key, value),
    removeItem: async (key: string) => void entries.delete(key),
  };
}

describe("the tokens", () => {
  it("resolves every color in both schemes", () => {
    for (const token of COLOR_TOKENS) {
      expect(lightTokens.color(token)).toMatch(/^#[0-9a-f]{6,8}$/);
      expect(darkTokens.color(token)).toMatch(/^#[0-9a-f]{6,8}$/);
      expect(lightTokens.color(token)).not.toBe(darkTokens.color(token));
    }
  });

  it("keeps the spacing scale on a 4px base", () => {
    expect(lightTokens.spacing(1)).toBe(4);
    expect(lightTokens.spacing(0.5)).toBe(2);
    expect(lightTokens.spacing(2)).toBe(8);
  });

  it("stringifies every weight into a value React Native accepts", () => {
    for (const step of Object.keys(weight) as (keyof typeof weight)[]) {
      expect(WEIGHTS).toContain(lightTokens.fontWeight(step));
    }
  });

  it("turns the line-height ratio into the pixel value StyleSheet wants", () => {
    expect(lightTokens.lineHeight("base")).toBe(Math.round(text.base.size * text.base.lineHeight));
    expect(Number.isInteger(lightTokens.lineHeight("2xs"))).toBe(true);
  });

  it("turns tracking in em into the pixel value StyleSheet wants", () => {
    expect(lightTokens.letterSpacing("caps", "2xs")).toBeCloseTo(0.06 * 11, 5);
  });

  it("resolves a scheme on demand", () => {
    expect(resolveTokens("dark").scheme).toBe("dark");
  });
});

describe("the theme mode store", () => {
  it("uses the key the web writes", () => {
    expect(THEME_STORAGE_KEY).toBe("jvdm-ui.theme");
  });

  it("reads nothing stored as following the system", async () => {
    const store = createThemeStore(memoryStorage());
    await expect(store.read()).resolves.toBe("system");
  });

  it("round-trips light and dark", async () => {
    const store = createThemeStore(memoryStorage());
    for (const mode of ["light", "dark"] as ThemeMode[]) {
      await store.write(mode);
      await expect(store.read()).resolves.toBe(mode);
    }
  });

  it("clears the key for system rather than storing a third value", async () => {
    const storage = memoryStorage();
    const store = createThemeStore(storage);
    await store.write("dark");
    await store.write("system");
    expect(storage.entries.has(THEME_STORAGE_KEY)).toBe(false);
    await expect(store.read()).resolves.toBe("system");
  });

  it("reads a value the web never writes as system", async () => {
    const storage = memoryStorage();
    await storage.setItem(THEME_STORAGE_KEY, "sepia");
    await expect(createThemeStore(storage).read()).resolves.toBe("system");
  });
});
