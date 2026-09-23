"use client";

import { useState } from "react";

import { Button } from "../../atoms";

export function CodeBlock({ code, language = "text", className = "" }: { code: string; language?: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className={`overflow-hidden rounded-md border border-line bg-field ${className}`}>
      <div className="flex items-center justify-between border-b border-line px-4 py-2"><span className="font-mono text-2xs tracking-caps text-ink-dim uppercase">{language}</span><Button onClick={copy} size="sm" variant="ghost">{copied ? "Copied" : "Copy"}</Button></div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-ink-soft"><code>{code}</code></pre>
    </div>
  );
}
