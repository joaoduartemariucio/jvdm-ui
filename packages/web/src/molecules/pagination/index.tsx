import { locales } from "./locales";

export function Pagination({
  page,
  pages,
  onPageChange,
  previousLabel = locales.previous,
  nextLabel = locales.next,
  pageLabel = locales.page,
  label = locales.label,
  className = "",
}: {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
  previousLabel?: string;
  nextLabel?: string;
  pageLabel?: (page: number) => string;
  label?: string;
  className?: string;
}) {
  const current = Math.min(Math.max(page, 1), Math.max(pages, 1));

  return (
    <nav aria-label={label} className={`flex flex-wrap items-center gap-2 ${className}`}>
      <button
        className="min-h-10 rounded-md border border-line-strong px-3 text-sm text-ink-soft transition-colors duration-(--duration-fast) ease-out hover:bg-raised disabled:pointer-events-none disabled:opacity-40"
        disabled={current === 1}
        onClick={() => onPageChange(current - 1)}
        type="button"
      >
        {previousLabel}
      </button>
      <span className="min-h-10 px-2 text-sm text-ink-muted" aria-current="page">
        {pageLabel(current)}
      </span>
      <button
        className="min-h-10 rounded-md border border-line-strong px-3 text-sm text-ink-soft transition-colors duration-(--duration-fast) ease-out hover:bg-raised disabled:pointer-events-none disabled:opacity-40"
        disabled={current === pages}
        onClick={() => onPageChange(current + 1)}
        type="button"
      >
        {nextLabel}
      </button>
    </nav>
  );
}
