export function toggledAccordion(
  open: readonly string[],
  id: string,
  exclusive: boolean,
): string[] {
  if (open.includes(id)) return open.filter((entry) => entry !== id);
  return exclusive ? [id] : [...open, id];
}
