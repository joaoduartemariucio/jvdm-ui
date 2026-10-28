import { formatOklch } from "../color";
import { num } from "../number";
import {
  DURATION_STEPS,
  EASE_STEPS,
  FONT_FAMILIES,
  RADIUS_STEPS,
  SHADOW_STEPS,
  TEXT_STEPS,
  TRACKING_STEPS,
  WEIGHT_STEPS,
} from "../types";
import type { ColorPair, ShadowLayer, ShadowStep, TokenSource } from "../types";

const px = (value: number): string => (value === 0 ? "0" : `${num(value)}px`);

const lightDark = ({ light, dark }: ColorPair): string =>
  `light-dark(${formatOklch(light)}, ${formatOklch(dark)})`;

function layer({ x, y, blur, spread, color }: ShadowLayer): string {
  const offsets = [px(x), px(y), px(blur)];
  if (spread !== undefined) offsets.push(px(spread));
  return `${offsets.join(" ")} ${lightDark(color)}`;
}

function shadow(step: ShadowStep, layers: readonly ShadowLayer[]): string {
  const body = layers.map((entry) => `    ${layer(entry)}`).join(",\n");
  return `--shadow-${step}:\n${body};`;
}

function groups(source: TokenSource): string[][] {
  return [
    FONT_FAMILIES.map((family) => `--font-${family}: ${source.font[family]};`),

    TEXT_STEPS.flatMap((step) => [
      `--text-${step}: ${px(source.text[step].size)};`,
      `--text-${step}--line-height: ${num(source.text[step].lineHeight)};`,
    ]),

    [`--spacing: ${num(source.spacing / 16)}rem;`],

    TRACKING_STEPS.map((step) => `--tracking-${step}: ${num(source.tracking[step])}em;`),

    WEIGHT_STEPS.map((step) => `--font-weight-${step}: ${num(source.weight[step])};`),

    RADIUS_STEPS.map((step) => `--radius-${step}: ${px(source.radius[step])};`),

    EASE_STEPS.map(
      (step) => `--ease-${step}: cubic-bezier(${source.ease[step].map(num).join(", ")});`,
    ),

    DURATION_STEPS.map((step) => `--duration-${step}: ${num(source.duration[step])}ms;`),

    ...source.colors.map((group) =>
      Object.entries(group).flatMap(([token, value]) =>
        value ? [`--color-${token}: ${lightDark(value)};`] : [],
      ),
    ),

    SHADOW_STEPS.map((step) => shadow(step, source.shadow[step])),
  ];
}

export function emitCss(source: TokenSource): string {
  const body = groups(source)
    .map((group) => group.map((declaration) => `  ${declaration}`).join("\n"))
    .join("\n\n");

  return `@theme {\n${body}\n}\n`;
}

export function emitStylesheet(source: TokenSource, runtime: string): string {
  return `${emitCss(source)}\n${runtime}`;
}
