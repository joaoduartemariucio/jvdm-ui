import type { KeyboardEvent, ReactNode } from "react";
import { TABS as T } from "./locales";

export type Tab = {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
};

export function Tabs({
  items,
  value,
  onValueChange,
  label = T.label["en-US"],
  className = "",
}: {
  items: Tab[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  className?: string;
}) {
  const active = items.find((item) => item.value === value) ?? items[0];

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const index = items.findIndex((item) => item.value === active?.value);
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    const target =
      event.key === "Home"
        ? items[0]
        : event.key === "End"
          ? items.at(-1)
          : direction
            ? items[(index + direction + items.length) % items.length]
            : undefined;

    if (!target || target.disabled) return;
    event.preventDefault();
    onValueChange(target.value);
  }

  return (
    <div className={`flex min-w-0 flex-col gap-4 ${className}`}>
      <div
        aria-label={label}
        className="flex min-w-0 gap-1 overflow-x-auto border-b border-line"
        role="tablist"
      >
        {items.map((item) => (
          <button
            aria-selected={item.value === active?.value}
            id={`tab-${item.value}`}
            className={`min-h-10 shrink-0 border-b-2 px-3 text-sm transition-colors duration-150 ${
              item.value === active?.value
                ? "border-accent font-medium text-ink"
                : "border-transparent text-ink-muted hover:border-line-strong hover:text-ink"
            }`}
            disabled={item.disabled}
            key={item.value}
            onClick={() => onValueChange(item.value)}
            onKeyDown={onKeyDown}
            role="tab"
            tabIndex={item.value === active?.value ? 0 : -1}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
      {active ? (
        <div aria-labelledby={`tab-${active.value}`} role="tabpanel">
          {active.content}
        </div>
      ) : null}
    </div>
  );
}
