"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { CloseIcon, IconButton } from "../../atoms";
import { locales } from "./locales";

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  closeLabel = locales.close,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  closeLabel?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      className="fixed inset-y-0 right-0 left-auto m-0 h-full max-h-none w-full max-w-md border-y-0 border-r-0 border-line bg-surface p-0 text-ink shadow-modal backdrop:bg-app/70 backdrop:backdrop-blur-sm sm:rounded-l-xl"
      aria-modal="true"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <IconButton label={closeLabel} onClick={onClose}>
            <CloseIcon size="md" />
          </IconButton>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
      </div>
    </dialog>
  );
}
