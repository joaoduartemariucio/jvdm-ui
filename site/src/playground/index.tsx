import { useEffect, useState } from "react";

import { Button, FormAlert, Label } from "jvdm-ui/atoms";
import { defineTheme, gavel, type ThemeConfig } from "jvdm-ui/theme";

const STYLE_ID = "playground-theme";

const SAMPLES: { name: string; config: ThemeConfig }[] = [
  { name: "default", config: {} },
  { name: "gavel", config: gavel },
  {
    name: "indigo",
    config: {
      colors: {
        accent: { light: "oklch(0.5 0.2 275)", dark: "oklch(0.72 0.16 275)" },
        "accent-ink": { light: "oklch(0.43 0.19 275)", dark: "oklch(0.82 0.13 275)" },
        "accent-soft": { light: "oklch(0.94 0.04 275)", dark: "oklch(0.3 0.07 275)" },
        "on-accent": "oklch(1 0 0)",
      },
      radius: { lg: "16px", md: "12px", sm: "8px" },
    },
  },
  {
    name: "terminal",
    config: {
      font: { sans: 'ui-monospace, "SF Mono", Menlo, monospace' },
      colors: {
        app: { light: "oklch(0.98 0.01 140)", dark: "oklch(0.16 0.02 150)" },
        surface: { light: "oklch(1 0 0)", dark: "oklch(0.2 0.024 150)" },
        accent: { light: "oklch(0.5 0.16 150)", dark: "oklch(0.8 0.18 150)" },
        "on-accent": { light: "oklch(1 0 0)", dark: "oklch(0.16 0.02 150)" },
        "accent-soft": { light: "oklch(0.93 0.06 150)", dark: "oklch(0.28 0.07 150)" },
      },
      radius: { xs: "0px", sm: "0px", md: "0px", lg: "0px", xl: "0px" },
    },
  },
];

type Parsed =
  { runtime: string; build: string; error: null } | { runtime: null; build: null; error: string };

function parseTheme(source: string): Parsed {
  try {
    const config = JSON.parse(source) as ThemeConfig;
    return {
      runtime: defineTheme(config, { selector: ":root" }),
      build: defineTheme(config),
      error: null,
    };
  } catch (parseError) {
    return {
      runtime: null,
      build: null,
      error: parseError instanceof Error ? parseError.message : "Invalid JSON",
    };
  }
}

export function Playground() {
  const [source, setSource] = useState(() => JSON.stringify(SAMPLES[1].config, null, 2));
  const parsed = parseTheme(source);
  const runtime = parsed.runtime;

  useEffect(() => {
    if (runtime === null) return;

    const style =
      document.getElementById(STYLE_ID) ??
      document.head.appendChild(Object.assign(document.createElement("style"), { id: STYLE_ID }));

    style.textContent = runtime;
  }, [runtime]);

  return (
    <section className="flex scroll-mt-20 flex-col gap-6" id="theming">
      <div className="flex flex-col gap-2">
        <Label>Theming</Label>
        <h2 className="text-2xl font-bold">Edit the JSON. The page changes.</h2>
        <p className="max-w-2xl text-sm text-ink-muted">
          This is the same object the CLI turns into CSS at build time — here it is applied live so
          you can feel it. Every field is optional; whatever you leave out keeps the default.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {SAMPLES.map((sample) => (
          <Button
            key={sample.name}
            size="sm"
            onClick={() => setSource(JSON.stringify(sample.config, null, 2))}
          >
            {sample.name}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <textarea
            aria-label="Theme JSON"
            className="h-96 w-full resize-y rounded-lg border border-line-strong bg-field p-4 font-mono text-xs text-ink transition-colors outline-none focus:border-accent"
            onChange={(event) => setSource(event.target.value)}
            spellCheck={false}
            value={source}
          />
          {parsed.error ? <FormAlert>{parsed.error}</FormAlert> : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label>Generated CSS</Label>
          <pre className="h-96 overflow-auto rounded-lg border border-line bg-surface p-4 font-mono text-2xs text-ink-soft">
            {parsed.build ?? "—"}
          </pre>
        </div>
      </div>
    </section>
  );
}
