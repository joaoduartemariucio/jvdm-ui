import { colors, duration, ease, radius, spacing, text, tracking, weight } from "./tokens";
import type {
  ColorToken,
  DurationStep,
  EaseStep,
  RadiusStep,
  TextStep,
  TrackingStep,
  WeightStep,
} from "./tokens";

export type Scheme = "light" | "dark";

export type FontWeight = "400" | "500" | "700";

export type JvdmTokens = {
  scheme: Scheme;
  color: (token: ColorToken) => string;
  radius: (step: RadiusStep) => number;
  spacing: (steps: number) => number;
  fontSize: (step: TextStep) => number;
  lineHeight: (step: TextStep) => number;
  letterSpacing: (step: TrackingStep, textStep: TextStep) => number;
  fontWeight: (step: WeightStep) => FontWeight;
  duration: (step: DurationStep) => number;
  bezier: (step: EaseStep) => readonly [number, number, number, number];
};

export function resolveTokens(scheme: Scheme): JvdmTokens {
  return {
    scheme,
    color: (token) => colors[token][scheme].hex,
    radius: (step) => radius[step],
    spacing: (steps) => spacing * steps,
    fontSize: (step) => text[step].size,
    lineHeight: (step) => Math.round(text[step].size * text[step].lineHeight),
    letterSpacing: (step, textStep) => tracking[step] * text[textStep].size,
    fontWeight: (step) => `${weight[step]}` as FontWeight,
    duration: (step) => duration[step],
    bezier: (step) => ease[step],
  };
}

export const lightTokens = resolveTokens("light");
export const darkTokens = resolveTokens("dark");
