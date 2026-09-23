import type { ChangeEvent, ReactNode } from "react";

export function FileUpload({
  accept,
  multiple = false,
  onFilesChange,
  children = "Choose files",
  className = "",
}: {
  accept?: string;
  multiple?: boolean;
  onFilesChange?: (files: FileList | null) => void;
  children?: ReactNode;
  className?: string;
}) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onFilesChange?.(event.target.files);
  }

  return (
    <label
      className={`inline-flex cursor-pointer items-center justify-center rounded-md border border-line-strong px-4 py-3 text-sm text-ink-soft transition-colors duration-(--duration-fast) ease-out focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent hover:bg-raised ${className}`}
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
