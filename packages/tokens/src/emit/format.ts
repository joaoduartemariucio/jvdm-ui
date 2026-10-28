import type { Srgb } from "../color";
import { num } from "../number";

export function double(value: number): string {
  return Number.isInteger(value) ? `${value}.0` : num(value);
}

export function argb({ r, g, b, alpha }: Srgb): string {
  const byte = (value: number) => value.toString(16).padStart(2, "0").toUpperCase();
  return `0x${byte(Math.round(alpha * 255))}${byte(r)}${byte(g)}${byte(b)}`;
}

export function block(lines: string[], depth = 1, unit = "    "): string {
  const pad = unit.repeat(depth);
  return lines.map((line) => (line === "" ? "" : `${pad}${line}`)).join("\n");
}
