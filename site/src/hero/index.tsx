import { Badge, Card, Kbd, Label, buttonClass } from "jvdm-ui/atoms";

const PARAMETERS = [
  { name: "rhythm", value: "04 / 06 / 08" },
  { name: "radius", value: "xs → xl" },
  { name: "motion", value: "over / base" },
];

export function Hero() {
  return (
    <section className="hero-grid relative min-h-[min(720px,calc(100dvh-8rem))] items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
      <div className="relative z-1 flex flex-col gap-8 py-12 lg:py-20">
        <div className="flex items-center gap-3">
          <span className="eyebrow-mark" />
          <Label tone="accent">jvdm-ui / design system</Label>
        </div>

        <h1 className="max-w-4xl text-display leading-none font-bold text-balance">
          Rules you can
          <span className="hero-outline block">feel.</span>
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-ink-soft lg:text-xl">
          A React system where every value belongs to a scale, every scale bends to your brand, and
          the constraints are part of the product.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a className={buttonClass({ size: "lg", variant: "primary" })} href="#theming">
            Shape a theme
          </a>
          <a
            className="inline-flex items-center gap-3 text-sm font-medium text-ink-soft transition-transform duration-(--duration-base) ease-out hover:-translate-y-0.5 hover:text-ink"
            href="#components"
          >
            Browse the catalog
            <Kbd>↓</Kbd>
          </a>
        </div>

        <div className="flex flex-wrap gap-2 pt-4">
          <Badge tone="accent">React 19</Badge>
          <Badge tone="info">Tailwind v4</Badge>
          <Badge tone="ok">40+ components</Badge>
        </div>
      </div>

      <div className="relative lg:translate-y-8">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <Card className="hero-console relative z-1 overflow-hidden p-0">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Label tone="accent">Live constraint engine</Label>
            <span className="font-mono text-2xs text-ink-dim">SEED_001</span>
          </div>
          <div className="flex flex-col gap-8 p-6 lg:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="font-mono text-2xs tracking-code text-ink-dim uppercase">
                  output
                </span>
                <p className="mt-2 text-2xl font-bold">One seed.</p>
              </div>
              <span className="hero-seed-dot" aria-hidden="true" />
            </div>

            <div className="hero-wave" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="flex flex-col gap-3">
              {PARAMETERS.map((parameter, index) => (
                <div
                  className="flex items-center gap-3 border-t border-line pt-3"
                  key={parameter.name}
                >
                  <span className="font-mono text-2xs text-ink-dim">0{index + 1}</span>
                  <span className="text-sm text-ink-soft">{parameter.name}</span>
                  <span className="ml-auto font-mono text-2xs text-ink-muted">
                    {parameter.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-line bg-raised px-6 py-4 font-mono text-2xs text-ink-muted">
            <span className="text-ok">✓</span> valid theme / no odd values emitted
          </div>
        </Card>
      </div>
    </section>
  );
}
