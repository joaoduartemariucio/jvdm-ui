import { Badge, buttonClass } from "jvdm-ui/atoms";

export function Hero() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="accent">React 19</Badge>
        <Badge tone="info">Tailwind v4</Badge>
        <Badge tone="ok">ESM only</Badge>
      </div>

      <h1 className="max-w-3xl text-display font-bold">The theme is a JSON file.</h1>

      <p className="max-w-2xl text-lg text-ink-soft">
        A React design system where every scale is a token you own — colors, spacing, radii, type,
        weight, tracking. Hand it an object; it becomes a Tailwind <code>@theme</code> block at
        build time, so you can even add tokens we never shipped.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <code className="rounded-lg border border-line bg-surface px-4 py-3 text-sm">
          npm install jvdm-ui
        </code>
        <a
          className={buttonClass({ variant: "primary" })}
          href="https://github.com/joaoduartemariucio/jvdm-ui"
        >
          View on GitHub
        </a>
      </div>

      <p className="max-w-2xl text-sm text-ink-muted">
        Everything on this page is rendered by the package itself. Change the theme below and watch
        it move.
      </p>
    </section>
  );
}
