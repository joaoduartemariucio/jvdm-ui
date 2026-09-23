"use client";

import { useRef, type ClipboardEvent, type KeyboardEvent } from "react";

import { locales } from "./locales";

export function PinInput({ length = 6, value = "", onValueChange, className = "" }: { length?: number; value?: string; onValueChange?: (value: string) => void; className?: string }) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, index) => value[index] ?? "");
  function update(index: number, digit: string) {
    const next = digits.map((item, itemIndex) => (itemIndex === index ? digit : item)).join("");
    onValueChange?.(next);
    if (digit && index < length - 1) refs.current[index + 1]?.focus();
  }
  function handleKey(event: KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key === "Backspace" && !digits[index] && index > 0) refs.current[index - 1]?.focus();
    if (event.key === "ArrowLeft" && index > 0) refs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < length - 1) refs.current[index + 1]?.focus();
  }
  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    onValueChange?.(event.clipboardData.getData("text").replace(/\D/g, "").slice(0, length));
  }
  return <div className={`flex gap-2 ${className}`}>{digits.map((digit, index) => <input aria-label={`${locales.digit} ${index + 1}`} className="size-12 rounded-md border border-line-strong bg-field text-center text-lg text-ink outline-none transition-[border-color,box-shadow] duration-(--duration-fast) ease-out focus:border-accent focus:ring-2 focus:ring-accent/30" inputMode="numeric" key={index} maxLength={1} onChange={(event) => update(index, event.target.value.replace(/\D/g, "").slice(-1))} onKeyDown={(event) => handleKey(event, index)} onPaste={handlePaste} ref={(element) => { refs.current[index] = element; }} value={digit} />)}</div>;
}
