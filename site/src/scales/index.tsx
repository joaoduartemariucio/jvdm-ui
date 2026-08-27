import { Card, Label } from "jvdm-ui/atoms";
import { CardTitle } from "jvdm-ui/molecules";

const TYPE = [
  { name: "text-2xs", size: "10px" },
  { name: "text-xs", size: "12px" },
  { name: "text-sm", size: "14px" },
  { name: "text-base", size: "16px" },
  { name: "text-lg", size: "18px" },
  { name: "text-xl", size: "22px" },
  { name: "text-2xl", size: "26px" },
  { name: "text-display", size: "52px" },
];

const RADIUS = [
  { name: "xs", value: "4px" },
  { name: "sm", value: "6px" },
  { name: "md", value: "8px" },
  { name: "lg", value: "10px" },
  { name: "xl", value: "16px" },
];

const SURFACES = ["app", "rail", "panel", "surface", "field", "raised"];
const STATUS = ["accent", "ok", "warn", "danger", "info"];

export function Scales() {
  return (
    <section className="flex scroll-mt-20 flex-col gap-8" id="scales">
      <div className="flex flex-col gap-2">
        <Label>Scales</Label>
        <h2 className="text-2xl font-bold">No odd values, anywhere.</h2>
        <p className="max-w-2xl text-sm text-ink-muted">
          Every one of these is enforced by lint, in this repository and in yours if you copy the
          config. You can change the values. You cannot make the scale stop existing.
        </p>
      </div>

      <Card>
        <div className="flex flex-col gap-4">
          <CardTitle>Type</CardTitle>
          {TYPE.map((step) => (
            <div className="flex items-baseline gap-6" key={step.name}>
              <code className="w-32 shrink-0 text-2xs text-ink-dim">{step.name}</code>
              <span className={`${step.name} truncate`}>The quick brown fox</span>
              <code className="ml-auto shrink-0 text-2xs text-ink-dim">{step.size}</code>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="flex flex-col gap-4">
            <CardTitle>Radius</CardTitle>
            <div className="flex flex-wrap gap-4">
              {RADIUS.map((step) => (
                <div className="flex flex-col items-center gap-2" key={step.name}>
                  <div
                    className="h-16 w-16 border border-line-strong bg-raised"
                    style={{ borderRadius: `var(--radius-${step.name})` }}
                  />
                  <code className="text-2xs text-ink-dim">{step.name}</code>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-4">
            <CardTitle>Color tokens</CardTitle>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {SURFACES.map((token) => (
                  <div className="flex flex-col items-center gap-1" key={token}>
                    <div
                      className="h-12 w-12 rounded-md border border-line"
                      style={{ background: `var(--color-${token})` }}
                    />
                    <code className="text-2xs text-ink-dim">{token}</code>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {STATUS.map((token) => (
                  <div className="flex flex-col items-center gap-1" key={token}>
                    <div
                      className="h-12 w-12 rounded-md border border-line"
                      style={{ background: `var(--color-${token})` }}
                    />
                    <code className="text-2xs text-ink-dim">{token}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
