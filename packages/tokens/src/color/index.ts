import { num } from "../number";
import type { Oklch } from "../types";

export type Srgb = { r: number; g: number; b: number; alpha: number };

const OKLAB_TO_LMS = [
  [1, 0.3963377773761749, 0.2158037573099136],
  [1, -0.1055613458156586, -0.0638541728258133],
  [1, -0.0894841775298119, -1.2914855480194092],
] as const;

const LMS_TO_LINEAR = [
  [4.0767416360759583, -3.3077115392580629, 0.2309699031821044],
  [-1.2684379732850315, 2.6097573492876882, -0.3413193760026573],
  [-0.0041960761386756, -0.7034186179359362, 1.7076146940746117],
] as const;

export function formatOklch(value: Oklch): string {
  const base = `${num(value.l)} ${num(value.c)} ${num(value.h)}`;
  if (value.alpha === undefined) return `oklch(${base})`;
  return `oklch(${base} / ${num(value.alpha)})`;
}

export function toLinearSrgb(value: Oklch): [number, number, number] {
  const radians = (value.h * Math.PI) / 180;
  const a = value.c * Math.cos(radians);
  const b = value.c * Math.sin(radians);

  const lms = OKLAB_TO_LMS.map(([wl, wa, wb]) => (wl * value.l + wa * a + wb * b) ** 3);

  return LMS_TO_LINEAR.map(([wl, wm, ws]) => wl * lms[0] + wm * lms[1] + ws * lms[2]) as [
    number,
    number,
    number,
  ];
}

export function isInSrgbGamut(value: Oklch, tolerance = 0.0005): boolean {
  return toLinearSrgb(value).every((channel) => channel >= -tolerance && channel <= 1 + tolerance);
}

function encode(channel: number): number {
  const clamped = Math.min(1, Math.max(0, channel));
  if (clamped <= 0.0031308) return clamped * 12.92;
  return 1.055 * clamped ** (1 / 2.4) - 0.055;
}

export function toSrgb(value: Oklch): Srgb {
  const [r, g, b] = toLinearSrgb(value);
  return {
    r: Math.round(encode(r) * 255),
    g: Math.round(encode(g) * 255),
    b: Math.round(encode(b) * 255),
    alpha: value.alpha ?? 1,
  };
}

export function toHex(value: Oklch): string {
  const { r, g, b, alpha } = toSrgb(value);
  const channels = alpha === 1 ? [r, g, b] : [r, g, b, Math.round(alpha * 255)];
  return `#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}
