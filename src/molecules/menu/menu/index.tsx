"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

const ALIGNS = {
  start: "left-0",
  end: "right-0",
} as const;

const WIDTHS = {
  sm: "w-48",
  md: "w-56",
  lg: "w-72",
} as const;

export type MenuAlign = keyof typeof ALIGNS;
export type MenuWidth = keyof typeof WIDTHS;

export function Menu({
  label,
  trigger,
  align = "end",
  width = "md",
  className = "",
  children,
}: {
  label: string;
  trigger: ReactNode;
  align?: MenuAlign;
  width?: MenuWidth;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const items = Children.toArray(children).map((child) =>
    isValidElement(child)
      ? cloneElement(child as ReactElement<Record<string, unknown>>, {
          role: "menuitem",
          tabIndex: -1,
        })
      : child,
  );

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
  }, [open]);

  function onMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const menuItems = [
      ...(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []),
    ];
    const current = menuItems.indexOf(document.activeElement as HTMLElement);
    const next = (index: number) =>
      menuItems[(index + menuItems.length) % menuItems.length]?.focus();

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      next(current + 1);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      next(current - 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      menuItems[0]?.focus();
    }

    if (event.key === "End") {
      event.preventDefault();
      menuItems.at(-1)?.focus();
    }
  }

  return (
    <div ref={root} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex items-center rounded-md transition-colors duration-(--duration-fast) ease-out focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {trigger}
      </button>

      {open ? (
        <div
          ref={menuRef}
          role="menu"
          aria-label={label}
          onClick={() => setOpen(false)}
          onKeyDown={onMenuKeyDown}
          className={`absolute top-full z-10 mt-2 flex flex-col gap-1 rounded-md border border-line-strong bg-raised p-2 ${ALIGNS[align]} ${WIDTHS[width]}`}
        >
          {items}
        </div>
      ) : null}
    </div>
  );
}
