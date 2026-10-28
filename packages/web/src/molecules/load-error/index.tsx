import { buttonClass } from "../../atoms";
import { locales } from "./locales";

export function LoadError({
  message,
  onRetry,
  retryLabel = locales.retry,
}: {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <p className="text-sm text-danger">{message}</p>
      {onRetry ? (
        <button type="button" onClick={onRetry} className={buttonClass({ variant: "secondary" })}>
          {retryLabel}
        </button>
      ) : null}
    </div>
  );
}
