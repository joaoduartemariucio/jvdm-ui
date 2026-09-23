"use client";

import { useMemo, useState, type ReactNode } from "react";

import { Button, Input, Kbd } from "../../atoms";
import { locales } from "./locales";

export type CommandItem = { id: string; label: string; description?: string; icon?: ReactNode };

export function CommandMenu({
  items,
  onSelect,
  label = "Search commands",
}: {
  items: readonly CommandItem[];
  onSelect?: (item: CommandItem) => void;
  label?: string;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      items.filter((item) =>
        `${item.label} ${item.description ?? ""}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [items, query],
  );

  return (
    <div className="flex w-full max-w-lg flex-col gap-3 rounded-xl border border-line bg-surface p-3 shadow-modal">
      <div className="flex items-center gap-3">
        <Input
          aria-label={label}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={label}
          value={query}
        />
        <Kbd>⌘K</Kbd>
      </div>
      <div className="flex max-h-72 flex-col gap-1 overflow-y-auto">
        {filtered.length ? (
          filtered.map((item) => (
            <Button
              className="justify-start text-left"
              key={item.id}
              onClick={() => onSelect?.(item)}
              variant="ghost"
            >
              <span className="flex min-w-0 flex-col items-start">
                {item.label}
                {item.description ? (
                  <span className="text-2xs text-ink-dim">{item.description}</span>
                ) : null}
              </span>
            </Button>
          ))
        ) : (
          <p className="px-3 py-6 text-center text-sm text-ink-muted">{locales.empty}</p>
        )}
      </div>
    </div>
  );
}
