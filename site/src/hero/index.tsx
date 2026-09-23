import { Badge, Card, Label, buttonClass } from "jvdm-ui/atoms";

export function Hero() {
  return (
    <section className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-end">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">React 19</Badge>
          <Badge tone="info">Tailwind v4</Badge>
          <Badge tone="ok">ESM only</Badge>
        </div>

        <h1 className="max-w-3xl text-display font-bold text-balance">
          A design system with a point of view.
        </h1>

        <p className="max-w-2xl text-lg text-ink-soft">
          Tokens, components and constraints for interfaces that feel deliberate without locking a
          product into somebody else&apos;s brand.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a
            className={buttonClass({ variant: "primary" })}
            href="https://github.com/joaoduartemariucio/jvdm-ui"
          >
            Read the source
          </a>
          <code className="rounded-md border border-line bg-surface px-4 py-3 text-sm">
            npm install jvdm-ui
          </code>
        </div>
      </div>

      <Card className="overflow-hidden bg-raised p-0">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Label tone="accent">The visual language</Label>
          <span className="font-mono text-2xs text-ink-dim">01 / 04</span>
        </div>
        <div className="flex flex-col gap-5 p-5">
          <div className="grid grid-cols-[1fr_auto] items-end gap-4 border-b border-line pb-5">
            <span className="text-2xl font-bold">Quiet structure.</span>
            <span className="text-2xs text-ink-dim">type / form</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-ink-soft">Warm neutrals, sharp states.</span>
            <span className="size-8 rounded-xs bg-accent" />
          </div>
        </div>
      </Card>
    </section>
  );
}
