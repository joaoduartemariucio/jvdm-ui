import type { ComponentProps, ReactNode } from "react";

export function Checkbox({
  label,
  className = "",
  ...props
}: { label?: ReactNode; className?: string } & ComponentProps<"input">) {
  return (
    <label className={`inline-flex min-h-10 items-center gap-3 text-sm text-ink-soft ${className}`}>
      <input {...props} className="peer sr-only" type="checkbox" />
      <span
        aria-hidden="true"
        className="flex size-5 shrink-0 items-center justify-center rounded-xs border border-line-strong bg-field text-on-accent transition-[background-color,border-color,box-shadow] duration-150 peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent/30 peer-disabled:opacity-50 after:block after:size-2.5 after:scale-0 after:rounded-xs after:bg-current after:transition-transform after:content-[''] peer-checked:after:scale-100"
      ></span>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
