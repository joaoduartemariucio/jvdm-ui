import { createElement } from "react";
import { act, create } from "react-test-renderer";
import { describe, expect, test, vi } from "vitest";

import { applyStoredTheme, useTheme } from "../src/tokens/theme";
import { defineTheme } from "../src/theme/define-theme";
import { gavel } from "../src/theme/presets/gavel";

vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);

describe("theme functions", () => {
  test("applies a stored theme to the document", () => {
    const storage = { getItem: vi.fn(() => "light"), setItem: vi.fn() };
    const documentElement = { dataset: {} as Record<string, string> };

    vi.stubGlobal("localStorage", storage);
    vi.stubGlobal("document", { documentElement });

    applyStoredTheme();

    expect(documentElement.dataset.theme).toBe("light");
    expect(storage.getItem).toHaveBeenCalledWith("jvdm-ui.theme");
  });

  test("toggles the active theme and persists it", async () => {
    const storage = { getItem: vi.fn(() => "dark"), setItem: vi.fn() };
    const documentElement = { dataset: {} as Record<string, string> };

    vi.stubGlobal("localStorage", storage);
    vi.stubGlobal("document", { documentElement });
    vi.stubGlobal("window", { matchMedia: () => ({ matches: false }) });

    function Probe() {
      const { theme, toggle } = useTheme();
      return createElement("button", { onClick: toggle }, theme);
    }

    let renderer: ReturnType<typeof create>;
    await act(async () => {
      renderer = create(createElement(Probe));
    });
    const button = renderer.root.findByType("button");

    await act(async () => button.props.onClick());

    expect(renderer.root.findByType("button").children).toEqual(["light"]);
    expect(documentElement.dataset.theme).toBe("light");
    expect(storage.setItem).toHaveBeenCalledWith("jvdm-ui.theme", "light");
  });

  test("emits theme tokens and exposes the preset", () => {
    const css = defineTheme({ colors: { accent: { light: "white", dark: "black" } } });

    expect(css).toContain("--color-accent: light-dark(white, black);");
    expect(gavel.colors).toBeDefined();
    expect(gavel.typography).toBeDefined();
  });
});
