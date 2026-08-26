import { buttonClass } from "../../atoms";
import { LOAD_ERROR as T } from "./locales";

export function LoadError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <p className="text-sm text-danger">{message}</p>
      {onRetry ? (
        <button type="button" onClick={onRetry} className={buttonClass({ variant: "secondary" })}>
          {T.retry}
        </button>
      ) : null}
    </div>
  );
}
