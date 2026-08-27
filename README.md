<div align="center">

# jvdm-ui

**A React design system where the theme is a JSON file — and the rules are enforced by lint, not by hope.**

[![npm](https://img.shields.io/npm/v/jvdm-ui?color=0b7285)](https://www.npmjs.com/package/jvdm-ui)
[![license](https://img.shields.io/npm/l/jvdm-ui?color=0b7285)](./LICENSE)
[![React 19](https://img.shields.io/badge/react-19-0b7285)](https://react.dev)
[![Tailwind v4](https://img.shields.io/badge/tailwind-v4-0b7285)](https://tailwindcss.com)

[Documentation](https://joaoduartemariucio.github.io/jvdm-ui) · [Theming](#theming) · [Components](#components)

</div>

---

## Why another one

Most component libraries let you theme the colors and stop there. Change the spacing rhythm or the
type scale and you are patching CSS from the outside, hoping specificity holds.

Here **every scale is a token, and every token is yours.** Colors, spacing base, radii, type steps,
tracking, weights, font. You hand over a JSON object; it becomes a Tailwind `@theme` block at build
time — which means you can even _add_ tokens, not just repaint the ones we picked.

The other half is that the constraints are real. No odd values, one component per folder, no raw
colors, no loose text in JSX. Not documented — **enforced**, by lint rules that fail CI. The library
holds itself to the rules it asks of you.

## Install

```bash
npm install jvdm-ui
```

`react@^19` is a peer dependency. Tailwind CSS v4 is required. The package is pure ESM.

## Quick start

**1. Wire up the CSS.** Three lines, and one of them is easy to miss:

```css
@import "tailwindcss";
@import "jvdm-ui/tokens.css";
@source "../../node_modules/jvdm-ui/dist";
```

> **`@source` is not optional.** Tailwind v4's automatic content detection skips `node_modules`,
> so without it none of the component classes are ever generated and the UI renders unstyled —
> with no error anywhere. The path is relative to your CSS file.

**2. Apply the stored theme before first paint**, so the screen never flashes the wrong one:

```tsx
import { applyStoredTheme } from "jvdm-ui/tokens";

applyStoredTheme();
```

**3. Compose:**

```tsx
import { Button, Card, Label } from "jvdm-ui/atoms";
import { Field, PageHeader } from "jvdm-ui/molecules";
import { DataTable } from "jvdm-ui/organisms";
```

Each layer is its own entry point. Deep imports (`jvdm-ui/atoms/button`) are not supported — the
`exports` map publishes the four layers and the root, nothing else.

## Theming

Write a JSON file. Every field is optional; whatever you leave out keeps the default.

```json
{
  "colors": {
    "accent": { "light": "oklch(0.55 0.2 265)", "dark": "oklch(0.75 0.16 265)" },
    "on-accent": "oklch(1 0 0)",
    "brand": { "light": "oklch(0.5 0.18 320)", "dark": "oklch(0.8 0.15 320)" }
  },
  "font": { "sans": "Inter, sans-serif" },
  "spacing": "0.25rem",
  "radius": { "lg": "14px" },
  "text": { "sm": ["15px", 1.6] }
}
```

Turn it into CSS and import it after the tokens:

```bash
npx jvdm-ui theme theme.json --out src/theme.css
```

```css
@import "jvdm-ui/tokens.css";
@import "./theme.css";
```

That `brand` key was not one of ours — and `bg-brand`, `text-brand` and `border-brand` now exist as
real utilities, in both light and dark. That is the point of emitting `@theme` instead of `:root`.

A single color value (rather than a `light`/`dark` pair) means the same color in both modes.

### In TypeScript instead

```ts
import { defineTheme, gavel } from "jvdm-ui/theme";

const css = defineTheme({ ...gavel, colors: { ...gavel.colors, accent: "oklch(0.7 0.2 150)" } });
```

### Presets

Presets ship as ready CSS, generated from the same source object at build time, so the two cannot
drift:

```css
@import "jvdm-ui/presets/gavel.css";
```

| Preset    | Looks like                                                  |
| --------- | ----------------------------------------------------------- |
| _default_ | achromatic neutrals, high-contrast neutral accent, no brand |
| `gavel`   | navy and gold — institutional, built for a marketplace      |

### How it works

Every color is declared exactly once, using `light-dark()`:

```css
--color-accent: light-dark(oklch(0.24 0.01 255), oklch(0.96 0.003 255));
```

Mode switching lives entirely in `color-scheme`. No token is ever re-declared in a `[data-theme]`
block, so there is **no specificity contest** — your override wins in both modes. Most systems get
this wrong in exactly one place, and the bug shows up as "my brand color works until the user flips
to light mode".

The cost is a browser floor: `light-dark()` needs Chrome 123, Safari 17.5 or Firefox 120 (all 2024).
Older browsers get the dark palette regardless of preference.

## Components

**Atoms** — `Avatar` · `Badge` · `Button` / `buttonClass` · `Card` · `FormAlert` · `Icon` (17 of them) · `Input` · `Label` · `PasswordInput` · `ProgressBar` · `Select` · `Skeleton` · `ThemeToggle` · `Thumb`

**Molecules** — `CardTitle` · `Empty` · `Field` · `LoadError` · `PageHeader` · `StatCard`

**Organisms** — `BarChart` · `DataTable` · `Sparkline`

`buttonClass()` exists separately from `<Button>` because many actions navigate — they are a router
`<Link>`, not a `<button>`. Use the class there instead of making `Button` polymorphic.

Loading is always `Skeleton`, never a spinner.

## The scales

No odd values, anywhere. The lint fails CI on every one of these — in this repository, and it is the
same config you can copy into yours:

| dimension  | scale                                                             |
| ---------- | ----------------------------------------------------------------- |
| typography | 10, 12, 14, 16, 18, 22, 26, 52px (`text-2xs` … `text-display`)    |
| tracking   | `tracking-caps` (uppercase labels), `tracking-code`               |
| weight     | 400/500/700. No 600: the browser would synthesise it              |
| radius     | 4, 6, 8, 10, 16px (`radius-xs\|sm\|md\|lg\|xl`)                   |
| spacing    | 2px and multiples of 4                                            |
| icon       | 12, 16, 20, 24, 32px via `Icon`'s `size`, never a loose `h-* w-*` |
| color      | semantic tokens only                                              |

You can change every value. You cannot make the scale stop existing.

## Localisation

Default strings are English. The three components that speak on their own take an optional prop:

| Component       | Prop         | Default           |
| --------------- | ------------ | ----------------- |
| `PasswordInput` | `showLabel`  | `"Show password"` |
| `PasswordInput` | `hideLabel`  | `"Hide password"` |
| `ThemeToggle`   | `label`      | `(theme) => …`    |
| `LoadError`     | `retryLabel` | `"Try again"`     |

Everything else is a prop, and yours.

## Contributing

`docs/adr/` is the standing norm, not history. Read
[ADR 0001](docs/adr/0001-design-system.md) before writing a component.

```bash
npm run typecheck && npm run lint && npm run format:check && npm run build
```

## License

MIT
