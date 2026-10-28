import { describe, expect, it } from "vitest";

import { locales as drawerLocales } from "../src/molecules/drawer/locales";
import { locales as modalLocales } from "../src/molecules/modal/locales";
import {
  MODAL_SIZES,
  dialogSurfaceStyle,
  type ModalSize,
} from "../src/molecules/modal/modal-style";
import { darkTokens, lightTokens } from "../src/tokens/theme";

const SIZES = Object.keys(MODAL_SIZES) as ModalSize[];

describe("the dialog family", () => {
  it("says what it says on its own", () => {
    expect(Object.keys(modalLocales)).toEqual(["label", "close"]);
    expect(modalLocales.label).toBe("Dialog");
    expect(modalLocales.close).toBe("Close");
    expect(drawerLocales.close).toBe("Close drawer");
  });

  it("carries the four modal sizes the contract names", () => {
    expect(SIZES).toEqual(["sm", "md", "lg", "xl"]);
  });

  it("makes every size wider than the one before it", () => {
    const widths = SIZES.map((size) => MODAL_SIZES[size]);
    expect(widths).toEqual([...widths].sort((a, b) => a - b));
    expect(new Set(widths).size).toBe(widths.length);
  });

  it("draws the surface and its rule from the palette", () => {
    const style = dialogSurfaceStyle(lightTokens);
    expect(style.surface.backgroundColor).toBe(lightTokens.color("surface"));
    expect(style.header.borderBottomColor).toBe(lightTokens.color("line"));
    expect(style.surface.borderTopLeftRadius).toBe(lightTokens.radius("xl"));
  });

  it("pads the surface on the spacing scale", () => {
    const style = dialogSurfaceStyle(lightTokens);
    expect(style.body.padding).toBe(20);
    expect(style.header.paddingLeft).toBe(20);
    expect(style.header.paddingVertical).toBe(12);
  });

  it("repaints the surface when the scheme flips", () => {
    expect(dialogSurfaceStyle(lightTokens).surface.backgroundColor).not.toBe(
      dialogSurfaceStyle(darkTokens).surface.backgroundColor,
    );
  });
});
