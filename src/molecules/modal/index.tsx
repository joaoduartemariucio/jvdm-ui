"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { CloseIcon, IconButton } from "../../atoms";
import { MODAL } from "./locales";

const SIZE_CLASSES = {
  sm: "sm:max-w-md",
  md: "sm:max-w-2xl",
  lg: "sm:max-w-4xl",
  xl: "sm:max-w-6xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  closeLabel = MODAL.close["en-US"],
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  size?: keyof typeof SIZE_CLASSES;
  closeLabel?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className={`fixed inset-x-0 top-auto bottom-0 z-50 m-0 mt-auto w-full max-w-none rounded-t-2xl border border-b-0 border-line bg-surface p-0 text-ink shadow-[0_-18px_50px_rgba(2,6,23,0.45)] backdrop:bg-app/70 backdrop:backdrop-blur-sm sm:inset-0 sm:m-auto sm:rounded-2xl sm:border-b sm:shadow-[0_18px_50px_rgba(2,6,23,0.45)] ${SIZE_CLASSES[size]}`}
      aria-modal="true"
      aria-label={title ? undefined : MODAL.label["en-US"]}
      aria-labelledby={title ? titleId : undefined}
    >
      <div className="flex max-h-[92dvh] flex-col sm:max-h-[88dvh]">
        {title ? (
          <div className="flex items-center justify-between gap-4 border-b border-line py-3 pr-3 pl-5 sm:py-4 sm:pl-6">
            <h2 id={titleId} className="text-lg font-bold text-ink">
              {title}
            </h2>
            <IconButton label={closeLabel} onClick={onClose}>
              <CloseIcon size="md" />
            </IconButton>
          </div>
        ) : null}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pt-4 pb-5 sm:px-6">
          {children}
        </div>
      </div>
    </dialog>
  );
}
