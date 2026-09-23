"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { Button, Input, Kbd } from "../../atoms";
import { locales } from "./locales";

export type CommandItem = { id: string; label: string; description?: string; icon?: ReactNode };

export function CommandMenu({
  items,
  onSelect,
  label = "Search commands",
  global = false,
}: {
  items: readonly CommandItem[];
  onSelect?: (item: CommandItem) => void;
  label?: string;
  global?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(!global);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!global) return;
    function handleKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [global]);
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  const filtered = useMemo(
    () =>
      items.filter((item) =>
        `${item.label} ${item.description ?? ""}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [items, query],
  );

  if (global && !open)
    return (
      <Button onClick={() => setOpen(true)} variant="secondary">
        {locales.open}
      </Button>
    );
  const menu = (
    <div className="flex w-full max-w-lg flex-col gap-3 rounded-xl border border-line bg-surface p-3 shadow-modal">
      <div className="flex items-center gap-3">
        <Input
          aria-label={label}
          ref={inputRef}
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
  return global ? (
    <div
      className="fixed inset-0 z-30 flex items-start justify-center bg-app/70 p-4 pt-24 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div onClick={(event) => event.stopPropagation()}>{menu}</div>
    </div>
  ) : (
    menu
  );
}
