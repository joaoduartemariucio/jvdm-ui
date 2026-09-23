"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";

import { ChevronIcon } from "../icon";
import { locales } from "./locales";

const CONTROL =
  "w-full min-w-0 rounded-md border border-line-strong bg-field px-4 py-3 text-base text-ink transition-[background-color,border-color,box-shadow] duration-(--duration-fast) ease-out outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 sm:text-sm";
const HOURS = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, "0"));
const MINUTES = Array.from({ length: 12 }, (_, index) => String(index * 5).padStart(2, "0"));

export function TimePicker({
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
  const [selected, setSelected] = useState(value ?? defaultValue);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [selectedHour, selectedMinute] = (selected || "09:00").split(":");

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

  function choose(hour: string, minute: string) {
    const next = `${hour}:${minute}`;
    setSelected(next);
    onValueChange?.(next);
  }

  return (
    <div
      className={`time-picker-root relative w-full ${open ? "time-picker-root-open" : ""}`}
      ref={ref}
    >
      <input
        {...props}
        aria-label={props["aria-label"] ?? locales.choose}
        className={`${CONTROL} cursor-pointer ${className}`}
        onClick={() => setOpen(true)}
        readOnly
        value={selected}
      />
      <ChevronIcon
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-muted"
        size="md"
      />
      {open ? (
        <div className="fixed right-4 bottom-4 left-4 z-20 grid max-h-[min(28rem,calc(100dvh-2rem))] grid-cols-2 gap-4 rounded-xl border border-line bg-surface p-4 text-ink shadow-modal sm:absolute sm:top-full sm:right-0 sm:bottom-auto sm:left-auto sm:mt-2 sm:w-64 sm:rounded-lg sm:shadow-popover">
          <div>
            <p className="mb-2 text-2xs tracking-caps text-ink-dim uppercase">{locales.hours}</p>
            <div className="flex max-h-60 flex-col gap-1 overflow-y-auto overscroll-contain sm:max-h-52">
              {HOURS.map((hour) => (
                <button
                  className={`min-h-11 rounded-sm px-3 py-2 text-left text-sm transition-colors duration-(--duration-fast) ease-out hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${hour === selectedHour ? "bg-accent text-on-accent hover:bg-accent-ink" : "text-ink-soft"}`}
                  key={hour}
                  onClick={() => choose(hour, selectedMinute)}
                  type="button"
                >
                  {hour}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-2xs tracking-caps text-ink-dim uppercase">{locales.minutes}</p>
            <div className="flex max-h-60 flex-col gap-1 overflow-y-auto overscroll-contain sm:max-h-52">
              {MINUTES.map((minute) => (
                <button
                  className={`min-h-11 rounded-sm px-3 py-2 text-left text-sm transition-colors duration-(--duration-fast) ease-out hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${minute === selectedMinute ? "bg-accent text-on-accent hover:bg-accent-ink" : "text-ink-soft"}`}
                  key={minute}
                  onClick={() => choose(selectedHour, minute)}
                  type="button"
                >
                  {minute}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
