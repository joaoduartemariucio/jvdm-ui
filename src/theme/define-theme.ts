import type { ColorValue, ThemeConfig } from "./types";

function color(value: ColorValue): string {
  if (typeof value === "string") return value;
  return `light-dark(${value.light}, ${value.dark})`;
}

function entries<T extends object>(source: T | undefined): [string, unknown][] {
  if (!source) return [];
  return Object.entries(source).filter(([, value]) => value !== undefined);
}

export type DefineThemeOptions = { selector?: string };

export function defineTheme(config: ThemeConfig, options: DefineThemeOptions = {}): string {
  const lines: string[] = [];

  for (const [name, value] of entries(config.colors)) {
    lines.push(`  --color-${name}: ${color(value as ColorValue)};`);
  }

  for (const [name, value] of entries(config.font)) {
    lines.push(`  --font-${name}: ${value as string};`);
  }

  for (const [step, value] of entries(config.text)) {
    const [size, lineHeight] = Array.isArray(value) ? value : [value as string, undefined];
    lines.push(`  --text-${step}: ${size};`);
    if (lineHeight !== undefined) {
      lines.push(`  --text-${step}--line-height: ${lineHeight};`);
    }
  }

  if (config.spacing !== undefined) {
    lines.push(`  --spacing: ${config.spacing};`);
  }

  for (const [name, value] of entries(config.tracking)) {
    lines.push(`  --tracking-${name}: ${value as string};`);
  }

  for (const [step, value] of entries(config.weight)) {
    lines.push(`  --font-weight-${step}: ${value as number};`);
  }

  for (const [step, value] of entries(config.radius)) {
    lines.push(`  --radius-${step}: ${value as string};`);
  }

  if (lines.length === 0) return "";

  const wrapper = options.selector ?? "@theme";

  return `${wrapper} {\n${lines.join("\n")}\n}\n`;
}
