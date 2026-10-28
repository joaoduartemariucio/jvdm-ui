import { readFileSync, readdirSync } from "node:fs";

import { parsePath, type Segment } from "./geometry";

export type IconShape =
  | { kind: "path"; d: string; segments: Segment[] }
  | { kind: "rect"; x: number; y: number; width: number; height: number; rx: number }
  | { kind: "circle"; cx: number; cy: number; r: number };

export type Icon = { name: string; component: string; shapes: IconShape[] };

const FOLDER = new URL("./svg/", import.meta.url);

const ATTRIBUTES = {
  rect: ["x", "y", "width", "height", "rx"],
  circle: ["cx", "cy", "r"],
} as const;

function attributes(tag: string): Record<string, string> {
  const found: Record<string, string> = {};
  for (const [, name, value] of tag.matchAll(/([a-zA-Z-]+)="([^"]*)"/g)) {
    found[name] = value;
  }
  return found;
}

function numbers(tag: string, element: "rect" | "circle"): Record<string, number> {
  const found = attributes(tag);
  const read: Record<string, number> = {};

  for (const name of ATTRIBUTES[element]) {
    const value = found[name];
    if (value === undefined) throw new Error(`icon: <${element}> is missing ${name}`);
    read[name] = Number(value);
  }

  return read;
}

export function shapeData(shape: IconShape): string {
  if (shape.kind === "path") return shape.d;

  if (shape.kind === "circle") {
    const { cx, cy, r } = shape;
    return `M${cx - r} ${cy}A${r} ${r} 0 1 0 ${cx + r} ${cy}A${r} ${r} 0 1 0 ${cx - r} ${cy}Z`;
  }

  const { x, y, width, height, rx } = shape;
  const radius = Math.min(rx, width / 2, height / 2);
  const arc = `A${radius} ${radius} 0 0 1`;

  return [
    `M${x + radius} ${y}`,
    `H${x + width - radius}`,
    `${arc} ${x + width} ${y + radius}`,
    `V${y + height - radius}`,
    `${arc} ${x + width - radius} ${y + height}`,
    `H${x + radius}`,
    `${arc} ${x} ${y + height - radius}`,
    `V${y + radius}`,
    `${arc} ${x + radius} ${y}`,
    "Z",
  ].join("");
}

export function shapeSegments(shape: IconShape): Segment[] {
  return shape.kind === "path" ? shape.segments : parsePath(shapeData(shape));
}

export function parseIcon(name: string, source: string): Icon {
  const shapes: IconShape[] = [];

  for (const [tag, element] of source.matchAll(/<(path|rect|circle|[a-z]+)\b[^>]*\/?>/g)) {
    if (element === "svg") continue;

    if (element === "path") {
      const d = attributes(tag).d;
      if (!d) throw new Error(`icon ${name}: <path> without d`);
      shapes.push({ kind: "path", d, segments: parsePath(d) });
      continue;
    }

    if (element === "rect") {
      shapes.push({ kind: "rect", ...numbers(tag, "rect") } as IconShape);
      continue;
    }

    if (element === "circle") {
      shapes.push({ kind: "circle", ...numbers(tag, "circle") } as IconShape);
      continue;
    }

    throw new Error(`icon ${name}: <${element}> is not geometry this generator carries`);
  }

  if (shapes.length === 0) throw new Error(`icon ${name}: no geometry`);

  return {
    name,
    component: `${name
      .split("-")
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join("")}Icon`,
    shapes,
  };
}

export function readIcons(): Icon[] {
  return readdirSync(FOLDER)
    .filter((entry) => entry.endsWith(".svg"))
    .map((entry) =>
      parseIcon(entry.replace(/\.svg$/, ""), readFileSync(new URL(entry, FOLDER), "utf8")),
    )
    .sort((a, b) => `${a.name}-icon`.localeCompare(`${b.name}-icon`));
}

export { parsePath, tokenize, type Point, type Segment } from "./geometry";
