"use client";

import { useMemo, useState, type ReactNode } from "react";

import { Input } from "../input";
import { locales } from "./locales";

export type MultiSelectOption = { value: string; label: ReactNode };

export function MultiSelect({
  options,
  selected = [],
  onSelectedChange,
  label = locales.empty,
  className = "",
}: {
  options: readonly MultiSelectOption[];
  selected?: readonly string[];
  onSelectedChange?: (values: string[]) => void;
  label?: string;
  className?: string;
}) {
  function toggle(value: string) {
    const next = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    onSelectedChange?.(next);
  }
  const [query, setQuery] = useState("");
  const visibleOptions = useMemo(
    () =>
      options.filter((option) => String(option.label).toLowerCase().includes(query.toLowerCase())),
    [options, query],
  );
  return (
    <details className={`group relative w-full ${className}`}>
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between rounded-md border border-line-strong bg-field px-4 py-3 text-sm text-ink transition-[background-color,border-color,box-shadow] duration-(--duration-fast) ease-out outline-none hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
        <span>{selected.length ? `${selected.length} ${locales.selected}` : label}</span>
        <span className="text-ink-muted transition-transform duration-(--duration-fast) ease-out group-open:rotate-180">
          ⌄
        </span>
      </summary>
      <div className="absolute top-full z-20 mt-2 flex w-full flex-col gap-1 rounded-md border border-line bg-surface p-2 shadow-popover">
        <Input
          aria-label={locales.search}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={locales.search}
          value={query}
        />
        {visibleOptions.map((option) => (
          <label
            className="flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2 text-sm text-ink-soft hover:bg-raised"
            key={String(option.value)}
          >
            <input
              checked={selected.includes(String(option.value))}
              onChange={() => toggle(String(option.value))}
              type="checkbox"
            />
            {option.label}
          </label>
        ))}
      </div>
    </details>
  );
}
