import type { ComponentProps, ReactNode } from "react";

export function Checkbox({
  label,
  className = "",
  ...props
}: { label?: ReactNode; className?: string } & ComponentProps<"input">) {
  return (
    <label className={`inline-flex min-h-10 items-center gap-3 text-sm text-ink-soft ${className}`}>
      <input
        {...props}
        className="size-4 shrink-0 accent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        type="checkbox"
      />
      {label ? <span>{label}</span> : null}
    </label>
  );
}
