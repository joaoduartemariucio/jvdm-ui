export function num(value: number): string {
  return String(Math.round(value * 1e6) / 1e6);
}
