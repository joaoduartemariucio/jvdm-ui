import { useState } from "react";

import { Badge, Card, Input, Label, Switch, buttonClass } from "jvdm-ui/atoms";

const PARAMETERS = [
  { name: "rhythm", value: "04 / 06 / 08" },
  { name: "radius", value: "xs → xl" },
  { name: "motion", value: "over / base" },
];

export function Hero() {
  const [rememberScale, setRememberScale] = useState(true);

  return (
    <section className="hero-grid relative min-h-[min(720px,calc(100dvh-4rem))] items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)]">
      <div className="relative z-1 flex flex-col gap-8 py-8 lg:py-12">
        <p className="hero-kicker">React design system / enforced by code</p>

        <h1 className="hero-title max-w-4xl text-display font-bold text-balance">
          A system with
          <span className="hero-outline block">a point of view.</span>
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-ink-soft lg:text-xl">
          Every value belongs to a scale. Every scale can bend to your brand. The constraints are
          part of the product.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a className={buttonClass({ size: "lg", variant: "primary" })} href="#theming">
            Shape a theme
          </a>
          <a
            className="inline-flex items-center text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            href="#components"
          >
            Browse the catalog
          </a>
        </div>

        <div className="flex flex-wrap gap-2 pt-4">
          <Badge tone="accent">React 19</Badge>
          <Badge tone="info">Tailwind v4</Badge>
          <Badge tone="ok">40+ components</Badge>
        </div>
      </div>

      <div className="relative lg:translate-y-6">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <Card className="hero-specimen relative z-1 overflow-hidden p-0">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Label tone="accent">A live specimen</Label>
            <span className="font-mono text-2xs text-ink-dim">THEME.JSON</span>
          </div>
          <div className="flex flex-col gap-7 p-6 lg:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-2xl font-bold">One vocabulary.</p>
                <p className="mt-2 text-sm text-ink-muted">Four layers, shared tokens.</p>
              </div>
              <span className="hero-seed-dot" aria-hidden="true" />
            </div>
            <div className="hero-control-stack">
              <div className="flex items-center justify-between gap-4">
                <Label>Field</Label>
                <span className="font-mono text-2xs text-ink-dim">atom</span>
              </div>
              <Input aria-label="Email" id="specimen-email" placeholder="you@your-product.com" />
              <div className="flex items-center justify-end gap-4">
                <Switch
                  checked={rememberScale}
                  onCheckedChange={setRememberScale}
                  label="Remember the scale"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {PARAMETERS.map((parameter) => (
                <div
                  className="flex items-center gap-3 border-t border-line pt-3"
                  key={parameter.name}
                >
                  <span className="text-sm text-ink-soft">{parameter.name}</span>
                  <span className="ml-auto font-mono text-2xs text-ink-muted">
                    {parameter.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-line bg-raised px-6 py-4 font-mono text-2xs text-ink-muted">
            <span className="text-ok">valid</span> theme / no odd values emitted
          </div>
        </Card>
      </div>
    </section>
  );
}
