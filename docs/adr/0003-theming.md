# ADR 0003 — The theming contract

- **Status:** accepted
- **Date:** 2026-08-27 (T2 corrected 2026-10-28, when the palette became structured data)
- **Scope:** `packages/web/src/tokens/`, `packages/web/src/theme/` and its `presets/`. Where the
  default palette's values come from is [ADR 0009](0009-token-source.md).

## Context

The package shipped with exactly one look — the navy-and-gold identity of the auction marketplace it
was extracted from — and no supported way to change it. Two problems followed.

**The palette was somebody's brand.** A generic package whose default is a specific client's
identity is not generic; it is that client's package with a public name.

**Overriding half-worked, which is worse than not working.** Semantic tokens were re-pointed inside
`:root[data-theme="light"]`, specificity `(0,1,1)`. A consumer overriding `--color-accent` at
`:root`, specificity `(0,0,1)`, was silently beaten **in light mode only**. The failure appeared as
"my brand color works until the user flips the theme".

The file also declared every color three times — once for dark, once for `prefers-color-scheme`,
once for `[data-theme="light"]` — so 24 tokens cost 72 lines that had to stay in sync by hand.

## Decision

### T1 — One declaration per token, via `light-dark()`

Every color is declared exactly once inside `@theme`:

```css
--color-accent: light-dark(oklch(0.24 0.01 255), oklch(0.96 0.003 255));
```

Mode switching moves entirely to `color-scheme`, set by `:root`, by the
`prefers-color-scheme` media query, and by `[data-theme]`. No token is ever re-declared, so **no
specificity contest exists** and a consumer override wins in both modes.

This collapsed `tokens.css` from 211 lines to 107.

`light-dark()` requires Chrome 123 / Safari 17.5 / Firefox 120 (all 2024). This is the cost, and it
is accepted: it is what buys single-declaration tokens.

### T2 — The default preset carries no brand

The default palette is **near-neutral**, with a high-contrast neutral accent — near-black on light,
near-white on dark. Status colors (`ok`, `warn`, `danger`, `info`) stay chromatic because they carry
meaning, not brand.

The navy-and-gold identity became `presets/gavel`, one preset among others.

This clause said "achromatic" until 2026-10-28, and that was never true of the shipped file. Every
neutral sits at hue 78 with a chroma between 0.008 and 0.025 — a warm sand tint, deliberate and
visible side by side with a true grey. [ADR 0009](0009-token-source.md) transcribed those values into
a structured source, where the tint is a named helper and impossible to overlook, so the wording is
corrected rather than the palette.

What T2 forbids is a **consumer's** brand as the default — a specific accent hue the system pre-empts
([ADR 0007](0007-default-identity.md) reads it this way and builds the default's identity out of the
non-color scales). A shared tint across the neutrals is a point of view, not a brand, and it stays.

### T3 — A theme is JSON, and it emits `@theme`

`defineTheme(config)` turns a plain object into a Tailwind `@theme` block, covering colors, font,
type scale, spacing base, tracking, weights and radii. The CLI does the same from a `.json` file.

Emitting `@theme` rather than `:root` is the load-bearing choice: it means a consumer can **add**
tokens, not merely repaint existing ones. A `brand` color in the JSON produces a working `bg-brand`
utility, because Tailwind generates utilities from `@theme` at build time.

This is why theming is build-time. At runtime you can change what a token _is_; you cannot make a
utility that the build never generated.

### T4 — Presets ship as CSS too

Every preset is emitted to `dist/presets/<name>.css` during build, from the same source object. A
consumer wanting a whole preset writes one `@import` and owns no generated file; the CSS and the
object cannot drift, because one is built from the other.

## Consequences

- Consumers can change every value of every scale. They cannot remove a scale ([ADR 0001](0001-design-system.md), R5).
- `tokens.css` is the schema. Adding a semantic token is an API change and needs a minor version.
- Browsers older than mid-2024 render the dark palette regardless of preference, because
  `light-dark()` is unsupported there. This is a documented floor, not a bug to patch around.
