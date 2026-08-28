import { useEffect, useRef, useState, type ReactNode } from "react";

const ALIGNS = {
  start: "left-0",
  end: "right-0",
} as const;

export type MenuAlign = keyof typeof ALIGNS;

export function Menu({
  label,
  trigger,
  align = "end",
  width = 216,
  className = "",
  children,
}: {
  label: string;
  trigger: ReactNode;
  align?: MenuAlign;
  width?: number;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      root.current?.querySelector("button")?.focus();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={root} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex items-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {trigger}
      </button>

      {open ? (
        <div
          role="menu"
          aria-label={label}
          style={{ width }}
          onClick={() => setOpen(false)}
          className={`absolute top-full z-10 mt-2 flex flex-col gap-1 rounded-lg border border-line-strong bg-raised p-2 ${ALIGNS[align]}`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
