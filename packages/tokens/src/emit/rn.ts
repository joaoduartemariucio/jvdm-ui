import { resolve, type ResolvedColor, type ResolvedPair, type TokenModel } from "./model";
import { typeName } from "./name";
import { num } from "../number";
import type { TokenSource } from "../types";

const PREAMBLE = `export type Oklch = { l: number; c: number; h: number; alpha: number };

export type ColorValue = { hex: string; oklch: Oklch };

export type ColorPair = { light: ColorValue; dark: ColorValue };

export type TextSize = { size: number; lineHeight: number };

export type Bezier = [number, number, number, number];

export type ShadowLayer = {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: ColorPair;
};`;

const value = (color: ResolvedColor): string =>
  `{ hex: "${color.hex}", oklch: { l: ${num(color.oklch.l)}, c: ${num(color.oklch.c)}, h: ${num(color.oklch.h)}, alpha: ${num(color.oklch.alpha ?? 1)} } }`;

const pair = (resolved: ResolvedPair): string =>
  `{\n    light: ${value(resolved.light)},\n    dark: ${value(resolved.dark)},\n  }`;

function union(scale: string, tokens: string[]): string {
  const constant = `${scale.toUpperCase()}_STEPS`;
  return [
    `export const ${constant} = [${tokens.map((token) => `"${token}"`).join(", ")}] as const;`,
    "",
    `export type ${typeName(scale)}Step = (typeof ${constant})[number];`,
  ].join("\n");
}

function record(name: string, type: string, entries: string[]): string {
  return [`export const ${name}: ${type} = {`, ...entries, "};"].join("\n");
}

function tokens(model: TokenModel): string {
  const shadow = model.shadow.map(({ step, layers }) => {
    const body = layers.map(
      (layer) =>
        `    { x: ${layer.x}, y: ${layer.y}, blur: ${layer.blur}, spread: ${layer.spread}, color: ${pair(layer.color)} },`,
    );
    return `  "${step}": [\n${body.join("\n")}\n  ],`;
  });

  return [
    `export const fontSans = [${model.font[0].stack.map((family) => `"${family}"`).join(", ")}];`,
    `export const fontMono = [${model.font[1].stack.map((family) => `"${family}"`).join(", ")}];`,
    "",
    `export const spacing = ${model.spacing};`,
    "",
    record(
      "colors",
      "Record<ColorToken, ColorPair>",
      model.colors.map(({ token, value: resolved }) => `  "${token}": ${pair(resolved)},`),
    ),
    "",
    record(
      "text",
      "Record<TextStep, TextSize>",
      model.text.map(
        ({ step, size, lineHeight }) =>
          `  "${step}": { size: ${size}, lineHeight: ${num(lineHeight)} },`,
      ),
    ),
    "",
    record(
      "tracking",
      "Record<TrackingStep, number>",
      model.tracking.map(({ step, em }) => `  "${step}": ${num(em)},`),
    ),
    "",
    record(
      "weight",
      "Record<WeightStep, number>",
      model.weight.map(({ step, value: weight }) => `  "${step}": ${weight},`),
    ),
    "",
    record(
      "radius",
      "Record<RadiusStep, number>",
      model.radius.map(({ step, px }) => `  "${step}": ${px},`),
    ),
    "",
    record(
      "ease",
      "Record<EaseStep, Bezier>",
      model.ease.map(({ step, bezier }) => `  "${step}": [${bezier.map(num).join(", ")}],`),
    ),
    "",
    record(
      "duration",
      "Record<DurationStep, number>",
      model.duration.map(({ step, ms }) => `  "${step}": ${ms},`),
    ),
    "",
    record("shadow", "Record<ShadowStep, ShadowLayer[]>", shadow),
  ].join("\n");
}

export function emitReactNative(source: TokenSource): string {
  const model = resolve(source);

  return [
    PREAMBLE,
    "",
    `export const COLOR_TOKENS = [${model.colors.map(({ token }) => `"${token}"`).join(", ")}] as const;`,
    "",
    "export type ColorToken = (typeof COLOR_TOKENS)[number];",
    "",
    union(
      "text",
      model.text.map(({ step }) => step),
    ),
    "",
    union(
      "tracking",
      model.tracking.map(({ step }) => step),
    ),
    "",
    union(
      "weight",
      model.weight.map(({ step }) => step),
    ),
    "",
    union(
      "radius",
      model.radius.map(({ step }) => step),
    ),
    "",
    union(
      "ease",
      model.ease.map(({ step }) => step),
    ),
    "",
    union(
      "duration",
      model.duration.map(({ step }) => step),
    ),
    "",
    union(
      "shadow",
      model.shadow.map(({ step }) => step),
    ),
    "",
    tokens(model),
    "",
  ].join("\n");
}
