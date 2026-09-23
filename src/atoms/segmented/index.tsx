import type { ChangeEvent, ReactNode } from "react";

export type SegmentedOption<T extends string> = {
  value: T;
  label: ReactNode;
  disabled?: boolean;
};

export function Segmented<T extends string>({
  name,
  options,
  value,
  defaultValue,
  onValueChange,
  label,
  className = "",
}: {
  name: string;
  options: readonly SegmentedOption<T>[];
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  label?: string;
  className?: string;
}) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onValueChange?.(event.target.value as T);
  }

  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex gap-1 rounded-md border border-line bg-panel p-1 ${className}`}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className="relative inline-flex min-h-8 cursor-pointer items-center justify-center rounded-sm px-3 text-xs text-ink-muted transition-colors duration-(--duration-fast) ease-out select-none not-has-checked:hover:bg-raised not-has-checked:hover:text-ink-soft has-checked:bg-accent has-checked:font-medium has-checked:text-on-accent has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent has-disabled:cursor-not-allowed has-disabled:opacity-50"
        >
          <input
            className="absolute size-0 opacity-0"
            type="radio"
            name={name}
            value={option.value}
            disabled={option.disabled}
            checked={value === undefined ? undefined : value === option.value}
            defaultChecked={value === undefined ? defaultValue === option.value : undefined}
            onChange={handleChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
