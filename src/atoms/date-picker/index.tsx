"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";

import { ChevronIcon } from "../icon";
import { locales } from "./locales";

const CONTROL =
  "w-full min-w-0 rounded-md border border-line-strong bg-field px-4 py-3 text-base text-ink transition-[background-color,border-color,box-shadow] duration-(--duration-fast) ease-out outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 sm:text-sm";
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function dateKey(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function parseDate(value?: string) {
  if (!value) return new Date();
  const [year, month, day] = value.split("-").map(Number);
  return year && month && day ? new Date(year, month - 1, day) : new Date();
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parseDate(value));
}

export function DatePicker({
  value,
  defaultValue = "",
  onValueChange,
  className = "",
  ...props
}: Omit<ComponentProps<"input">, "type" | "value" | "defaultValue" | "onChange"> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) {
  const initial = value ?? defaultValue;
  const [selected, setSelected] = useState(initial);
  const [month, setMonth] = useState(() => {
    const date = parseDate(initial);
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleDocument(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleDocument);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleDocument);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const offset = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(
    month,
  );

  function choose(date: Date) {
    const next = dateKey(date);
    setSelected(next);
    onValueChange?.(next);
    setOpen(false);
  }

  return (
    <div className="relative w-full" ref={ref}>
      <input
        {...props}
        className={`${CONTROL} cursor-pointer ${className}`}
        onClick={() => setOpen(true)}
        readOnly
        value={selected ? formatDate(selected) : ""}
      />
      <ChevronIcon
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-muted"
        size="md"
      />
      {open ? (
        <div className="absolute top-full right-0 z-20 mt-2 w-80 rounded-lg border border-line bg-surface p-4 text-ink shadow-popover">
          <div className="flex items-center justify-between">
            <button
              aria-label={locales.previous}
              className="flex size-8 items-center justify-center rounded-sm text-ink-muted transition-colors duration-(--duration-fast) ease-out hover:bg-raised hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
              type="button"
            >
              <ChevronIcon className="rotate-90" size="sm" />
            </button>
            <p className="text-sm font-medium">{monthLabel}</p>
            <button
              aria-label={locales.next}
              className="flex size-8 items-center justify-center rounded-sm text-ink-muted transition-colors duration-(--duration-fast) ease-out hover:bg-raised hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
              type="button"
            >
              <ChevronIcon className="-rotate-90" size="sm" />
            </button>
          </div>
          <div aria-label={locales.calendar} className="mt-4 grid grid-cols-7 gap-1" role="grid">
            {WEEKDAYS.map((day) => (
              <span className="py-1 text-center text-2xs text-ink-dim" key={day}>
                {day}
              </span>
            ))}
            {Array.from({ length: offset }, (_, index) => (
              <span aria-hidden="true" className="size-8" key={`empty-${index}`} />
            ))}
            {Array.from({ length: days }, (_, index) => {
              const date = new Date(month.getFullYear(), month.getMonth(), index + 1);
              const active = dateKey(date) === selected;
              return (
                <button
                  aria-current={active ? "date" : undefined}
                  aria-label={date.toLocaleDateString("en-US", { dateStyle: "long" })}
                  className={`flex size-8 items-center justify-center rounded-sm text-xs transition-colors duration-(--duration-fast) ease-out hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${active ? "bg-accent font-medium text-on-accent hover:bg-accent-ink" : "text-ink-soft"}`}
                  key={dateKey(date)}
                  onClick={() => choose(date)}
                  type="button"
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
