import { describe, expect, it } from "vitest";

import { THUMB_RATIO } from "../src/atoms/thumb/thumb-style";
import { toggledAccordion } from "../src/molecules/accordion/accordion-style";
import { locales as paginationLocales } from "../src/molecules/pagination/locales";
import { clampPage } from "../src/molecules/pagination/pagination-style";
import { locales as tabsLocales } from "../src/molecules/tabs/locales";

describe("Pagination", () => {
  it("says four things on its own, one of them with the page number", () => {
    expect(Object.keys(paginationLocales)).toEqual(["label", "previous", "next", "page"]);
    expect(paginationLocales.label).toBe("Pagination");
    expect(paginationLocales.previous).toBe("Previous");
    expect(paginationLocales.next).toBe("Next");
    expect(paginationLocales.page(3)).toBe("Page 3");
  });

  it("reads the number the page string is given", () => {
    expect(paginationLocales.page(1)).toBe("Page 1");
    expect(paginationLocales.page(42)).toBe("Page 42");
    expect(paginationLocales.page(1)).not.toBe(paginationLocales.page(2));
  });

  it("clamps the page into the range", () => {
    expect(clampPage(0, 5)).toBe(1);
    expect(clampPage(3, 5)).toBe(3);
    expect(clampPage(9, 5)).toBe(5);
    expect(clampPage(1, 0)).toBe(1);
  });
});

describe("Accordion", () => {
  it("opens and closes a row", () => {
    expect(toggledAccordion([], "a", false)).toEqual(["a"]);
    expect(toggledAccordion(["a"], "a", false)).toEqual([]);
  });

  it("keeps the others open unless it is exclusive", () => {
    expect(toggledAccordion(["a"], "b", false)).toEqual(["a", "b"]);
    expect(toggledAccordion(["a"], "b", true)).toEqual(["b"]);
    expect(toggledAccordion(["a", "b"], "a", true)).toEqual(["b"]);
  });
});

describe("Tabs and Thumb", () => {
  it("tabs say their own label", () => {
    expect(Object.keys(tabsLocales)).toEqual(["label"]);
    expect(tabsLocales.label).toBe("Tabs");
  });

  it("a thumb keeps the 4:3 frame the web uses", () => {
    expect(THUMB_RATIO).toBe(4 / 3);
  });
});
