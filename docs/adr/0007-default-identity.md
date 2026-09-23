# ADR 0007 — The default identity, and the scales that carry it

- **Status:** accepted
- **Date:** 2026-09-23
- **Scope:** `src/tokens/tokens.css`, `src/theme/`, every component that animates or casts depth

## Context

[ADR 0003, T2](0003-theming.md) keeps the default preset free of brand color, and that rule stands.
It left the default with no identity at all: every non-color scale shipped at a generic value, so
the system looked like an unconfigured Tailwind install and had no point of view to offer the
evaluator it needed to convince.

Three gaps made that concrete. `ThemeConfig` accepted `typography.font.mono` while `tokens.css`
never declared `--font-mono`, so the type promised a token the system did not have and mono text
fell back to Tailwind's default. Motion was hardcoded per component — `duration-150` in five
places, `duration-200` in a sixth — so no consumer could own it. Depth existed only as a single
`shadow-xl`, a Tailwind default whose color came from outside the palette.

## Decision

**The default's identity lives in the non-color scales.** Typography, rhythm, radius, density,
depth and motion carry the point of view; the palette stays achromatic and the consumer's color is
never pre-empted. T2 constrains the palette and is untouched by this decision.

**Two scales join R5.** Depth (`--shadow-raised|popover|modal`) and motion (`--ease-out|in-out|over`
and `--duration-instant|fast|base|slow`) are now system scales, which means a raw value in either is
a defect exactly as a raw radius is. Every shadow carries an offset and a soft blur, and its color
is drawn from the palette through `light-dark()` so depth reads correctly in both modes.

**`--font-mono` is declared**, closing the gap between the theme type and the token schema.

**Existing scale values are retuned**, not merely extended: the type scale gets a denser UI range
and a more decisive display step, the radius curve gets steps that are actually distinguishable,
and `--tracking-tight` and `--tracking-display` are added because a 58px display step at zero
tracking is loose. The spacing base stays at `0.25rem`: changing it rescales every dimension in
every consuming application, and the identity it would buy does not justify that.

**Consumers own all of it.** `TokenConfig` gains `shadow`, `ease` and `duration`, and `defineTheme`
emits them, so nothing added here is a value only the library can set.

## Consequences

- This is a **minor** release with a visible change: type sizes, radii and motion all shift for
  consumers on upgrade. It is deliberate and belongs in the release notes.
- `eslint.config.mjs` is unchanged. Its rules enforce the absence of arbitrary values rather than a
  list of permitted numbers, so retuning a scale does not touch the lint — and this ADR is the
  revision R6 requires for moving one.
- Components no longer choose their own durations. One authored motion language covers the system.
- A consumer who wants a louder or quieter system reaches for the motion and depth scales instead
  of overriding component classes from outside.
