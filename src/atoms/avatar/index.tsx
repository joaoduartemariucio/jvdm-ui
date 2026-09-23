function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}

const SIZES = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
} as const;

export type AvatarSize = keyof typeof SIZES;

export function Avatar({
  name,
  size = "md",
  label = name,
}: {
  name: string;
  size?: AvatarSize;
  label?: string;
}) {
  return (
    <span
      aria-label={label}
      className={`flex shrink-0 items-center justify-center rounded-md bg-raised font-medium text-ink-muted ${SIZES[size]}`}
      role="img"
    >
      {initials(name)}
    </span>
  );
}
