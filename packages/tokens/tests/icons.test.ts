import { describe, expect, it } from "vitest";

import { parseIcon, parsePath, readIcons, tokenize, type Segment } from "../src/icons";

const icons = readIcons();

const ends = (segments: Segment[]) =>
  segments.filter((segment) => segment.kind !== "close").map((segment) => segment.to);

describe("the path parser", () => {
  it("splits repeated values into implicit commands", () => {
    expect(tokenize("M1 2 3 4")).toEqual([
      { command: "M", values: [1, 2] },
      { command: "L", values: [3, 4] },
    ]);
  });

  it("resolves relative commands against the current point", () => {
    expect(parsePath("M10 10h5v5")).toEqual([
      { kind: "move", to: { x: 10, y: 10 } },
      { kind: "line", to: { x: 15, y: 10 } },
      { kind: "line", to: { x: 15, y: 15 } },
    ]);
  });

  it("returns to the subpath start after a close", () => {
    const segments = parsePath("M4 4h4v4Zm8 0h2");
    expect(segments.at(-1)).toEqual({ kind: "line", to: { x: 14, y: 4 } });
  });

  it("reflects the previous control point for a smooth curve", () => {
    const [, first, second] = parsePath("M0 0C1 1 2 2 3 3S5 5 6 6");
    expect(first).toMatchObject({ control2: { x: 2, y: 2 } });
    expect(second).toMatchObject({ control1: { x: 4, y: 4 } });
  });

  it("turns a quarter arc into one cubic that lands on the endpoint", () => {
    const segments = parsePath("M10 0A10 10 0 0 1 0 10");
    const curves = segments.filter((segment) => segment.kind === "curve");

    expect(curves).toHaveLength(1);
    expect(curves[0].to.x).toBeCloseTo(0, 6);
    expect(curves[0].to.y).toBeCloseTo(10, 6);
    expect(curves[0].control1.y).toBeCloseTo(10 * 0.5522847, 4);
  });

  it("splits a full circle into four cubics", () => {
    const circle = parsePath("M12 2A10 10 0 1 1 11.99 2");
    expect(circle.filter((segment) => segment.kind === "curve")).toHaveLength(4);
  });

  it("stays inside the viewBox for every arc it draws", () => {
    for (const icon of icons) {
      for (const shape of icon.shapes) {
        if (shape.kind !== "path") continue;
        for (const point of ends(shape.segments)) {
          expect(point.x).toBeGreaterThanOrEqual(-1);
          expect(point.x).toBeLessThanOrEqual(25);
          expect(point.y).toBeGreaterThanOrEqual(-1);
          expect(point.y).toBeLessThanOrEqual(25);
        }
      }
    }
  });

  it("reads a number in exponent notation rather than seeing a command", () => {
    expect(tokenize("M1e1 2")).toEqual([{ command: "M", values: [10, 2] }]);
  });

  it("refuses a command it cannot carry to every platform", () => {
    expect(() => parsePath("M0 0Q1 1 2 2")).toThrow(/not supported/);
    expect(() => tokenize("M0 0K5")).toThrow(/unsupported command/);
  });

  it("refuses geometry it cannot carry", () => {
    expect(() => parseIcon("x", '<svg><line x1="0" y1="0" x2="1" y2="1" /></svg>')).toThrow(
      /not geometry/,
    );
    expect(() => parseIcon("x", "<svg></svg>")).toThrow(/no geometry/);
  });
});

describe("the icon set", () => {
  it("reads all 33 icons", () => {
    expect(icons).toHaveLength(33);
  });

  it("names each component after its file", () => {
    expect(icons.map((icon) => icon.component)).toContain("ShieldCheckIcon");
    expect(icons.map((icon) => icon.component)).toContain("EyeOffIcon");
  });

  it("gives every icon at least one shape and every path a first move", () => {
    for (const icon of icons) {
      expect(icon.shapes.length).toBeGreaterThan(0);
      for (const shape of icon.shapes) {
        if (shape.kind !== "path") continue;
        expect(shape.segments[0].kind).toBe("move");
      }
    }
  });
});
