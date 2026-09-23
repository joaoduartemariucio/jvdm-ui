"use client";

import { useState, type ChangeEvent, type DragEvent, type ReactNode } from "react";

import { locales } from "./locales";

export function FileUpload({
  accept,
  multiple = false,
  onFilesChange,
  children = locales.choose,
  className = "",
}: {
  accept?: string;
  multiple?: boolean;
  onFilesChange?: (files: FileList | null) => void;
  children?: ReactNode;
  className?: string;
}) {
  const [dragging, setDragging] = useState(false);
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onFilesChange?.(event.target.files);
  }
  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    onFilesChange?.(event.dataTransfer.files);
  }

  return (
    <label
      className={`flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-line-strong px-4 py-6 text-sm text-ink-soft transition-[background-color,border-color] duration-(--duration-fast) ease-out focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent hover:bg-raised ${dragging ? "border-accent bg-accent-soft" : ""} ${className}`}
      onDragEnter={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      {children}
      <input
        accept={accept}
        className="sr-only"
        multiple={multiple}
        onChange={handleChange}
        type="file"
      />
    </label>
  );
}
