import type { ChangeEvent, ComponentProps } from "react";

export type ComboboxOption = { value: string; label: string };

export function Combobox({
  options,
  onValueChange,
  className = "",
  ...props
}: {
  options: readonly ComboboxOption[];
  onValueChange?: (value: string) => void;
  className?: string;
} & ComponentProps<"input">) {
  const listId = `${props.id ?? props.name ?? "combobox"}-options`;
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onValueChange?.(event.target.value);
  }

  return (
    <>
      <input
        {...props}
        className={`w-full min-w-0 rounded-md border border-line-strong bg-field px-4 py-3 text-base text-ink transition-[background-color,border-color,box-shadow] duration-(--duration-fast) ease-out outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 sm:text-sm ${className}`}
        list={listId}
        onChange={handleChange}
      />
      <datalist id={listId}>
        {options.map((option) => (
          <option key={option.value} label={option.label} value={option.value} />
        ))}
      </datalist>
    </>
  );
}
