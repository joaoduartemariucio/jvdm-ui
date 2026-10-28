import type { ColorToken } from "../../tokens";

export const METRIC_TRENDS = {
  neutral: "ink-muted",
  up: "ok",
  down: "danger",
} as const satisfies Record<string, ColorToken>;

export type MetricTrend = keyof typeof METRIC_TRENDS;
