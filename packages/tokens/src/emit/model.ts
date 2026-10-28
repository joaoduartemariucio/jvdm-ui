import { isInDisplayP3Gamut, isInSrgbGamut, toDisplayP3, toHex, toSrgb, type Srgb } from "../color";
import {
  COLOR_TOKENS,
  DURATION_STEPS,
  EASE_STEPS,
  RADIUS_STEPS,
  SHADOW_STEPS,
  TEXT_STEPS,
  TRACKING_STEPS,
  WEIGHT_STEPS,
} from "../types";
import type {
  ColorPair,
  ColorToken,
  DurationStep,
  Ease,
  EaseStep,
  FontFamily,
  Oklch,
  RadiusStep,
  ShadowStep,
  TextStep,
  TokenSource,
  TrackingStep,
  WeightStep,
} from "../types";

export type ResolvedColor = {
  oklch: Oklch;
  srgb: Srgb;
  displayP3: Srgb;
  hex: string;
  inSrgbGamut: boolean;
  inDisplayP3Gamut: boolean;
};

export type ResolvedPair = { light: ResolvedColor; dark: ResolvedColor };

export type ResolvedShadowLayer = {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: ResolvedPair;
};

export type TokenModel = {
  font: { family: FontFamily; stack: string[] }[];
  colors: { token: ColorToken; value: ResolvedPair }[];
  text: { step: TextStep; size: number; lineHeight: number }[];
  tracking: { step: TrackingStep; em: number }[];
  weight: { step: WeightStep; value: number }[];
  radius: { step: RadiusStep; px: number }[];
  spacing: number;
  ease: { step: EaseStep; bezier: Ease }[];
  duration: { step: DurationStep; ms: number }[];
  shadow: { step: ShadowStep; layers: ResolvedShadowLayer[] }[];
};

function resolveColor(value: Oklch): ResolvedColor {
  return {
    oklch: value,
    srgb: toSrgb(value),
    displayP3: toDisplayP3(value),
    hex: toHex(value),
    inSrgbGamut: isInSrgbGamut(value),
    inDisplayP3Gamut: isInDisplayP3Gamut(value),
  };
}

const resolvePair = (pair: ColorPair): ResolvedPair => ({
  light: resolveColor(pair.light),
  dark: resolveColor(pair.dark),
});

function colorsOf(source: TokenSource): Map<ColorToken, ColorPair> {
  const found = new Map<ColorToken, ColorPair>();
  for (const group of source.colors) {
    for (const [token, pair] of Object.entries(group)) {
      if (pair) found.set(token as ColorToken, pair);
    }
  }
  return found;
}

export function resolve(source: TokenSource): TokenModel {
  const colors = colorsOf(source);

  const missing = COLOR_TOKENS.filter((token) => !colors.has(token));
  if (missing.length > 0) {
    throw new Error(`token source is missing colors: ${missing.join(", ")}`);
  }

  return {
    font: Object.entries(source.font).map(([family, stack]) => ({
      family: family as FontFamily,
      stack: stack.split(",").map((entry) => entry.trim().replace(/^"|"$/g, "")),
    })),

    colors: COLOR_TOKENS.map((token) => ({
      token,
      value: resolvePair(colors.get(token) as ColorPair),
    })),

    text: TEXT_STEPS.map((step) => ({ step, ...source.text[step] })),

    tracking: TRACKING_STEPS.map((step) => ({ step, em: source.tracking[step] })),

    weight: WEIGHT_STEPS.map((step) => ({ step, value: source.weight[step] })),

    radius: RADIUS_STEPS.map((step) => ({ step, px: source.radius[step] })),

    spacing: source.spacing,

    ease: EASE_STEPS.map((step) => ({ step, bezier: source.ease[step] })),

    duration: DURATION_STEPS.map((step) => ({ step, ms: source.duration[step] })),

    shadow: SHADOW_STEPS.map((step) => ({
      step,
      layers: source.shadow[step].map((layer) => ({
        x: layer.x,
        y: layer.y,
        blur: layer.blur,
        spread: layer.spread ?? 0,
        color: resolvePair(layer.color),
      })),
    })),
  };
}
