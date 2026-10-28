import type { ColorToken } from "../../tokens";

export type Step = { id: string; label: string; description?: string };

export type StepState = "done" | "current" | "todo";

export const STEP_STATES: StepState[] = ["done", "current", "todo"];

export function stepState(index: number, current: number): StepState {
  if (index < current) return "done";
  if (index === current) return "current";
  return "todo";
}

export const STEP_TOKENS = {
  done: { dot: "accent", label: "ink" },
  current: { dot: "accent", label: "ink" },
  todo: { dot: "raised", label: "ink-muted" },
} as const satisfies Record<StepState, { dot: ColorToken; label: ColorToken }>;
