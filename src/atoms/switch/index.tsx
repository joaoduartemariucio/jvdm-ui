import type { ReactNode } from "react";

export function Switch({
  checked,
  onCheckedChange,
  label,
  disabled = false,
  className = "",
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <label className={`inline-flex min-h-10 items-center gap-3 text-sm text-ink-soft ${className}`}>
      <button
        aria-checked={checked}
        className={`relative h-6 w-10 shrink-0 rounded-full transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 ${
          checked ? "bg-accent" : "bg-raised"
        }`}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        role="switch"
        type="button"
      >
        <span
          className={`absolute top-1 left-1 size-4 rounded-full transition-[background-color,transform] duration-150 ease-out ${
            checked ? "translate-x-4 bg-on-accent" : "translate-x-0 bg-ink"
          }`}
        />
      </button>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
