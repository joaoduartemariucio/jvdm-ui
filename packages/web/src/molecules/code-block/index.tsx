import { CopyButton } from "../../atoms";

export function CodeBlock({
  code,
  language = "text",
  copyLabel,
  copiedLabel,
  className = "",
}: {
  code: string;
  language?: string;
  copyLabel?: string;
  copiedLabel?: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-md border border-line bg-field ${className}`}>
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="font-mono text-2xs tracking-caps text-ink-dim uppercase">{language}</span>
        <CopyButton value={code} label={copyLabel} copiedLabel={copiedLabel} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-ink-soft">
        <code>{code}</code>
      </pre>
    </div>
  );
}
