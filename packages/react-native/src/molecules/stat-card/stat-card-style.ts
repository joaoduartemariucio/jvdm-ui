import type { TextStep } from "../../tokens";

export function statCardStep(value: string): TextStep {
  if (value.length <= 7) return "2xl";
  if (value.length <= 12) return "lg";
  return "sm";
}
