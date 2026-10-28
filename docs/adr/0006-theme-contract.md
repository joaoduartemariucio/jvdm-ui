# ADR 0006 — Theme contract

- **Status:** accepted
- **Date:** 2026-09-23 (scope narrowed 2026-10-28 by [ADR 0009](0009-token-source.md))
- **Scope:** `packages/web/src/theme/`, theme JSON files and the documentation playground. The
  default theme is no longer one of these: it is structured data in `packages/tokens`
  ([ADR 0009](0009-token-source.md))

## Context

The system needs a recognizable default language without making every consumer inherit a fixed
brand. A theme must therefore control the visual grammar, not only the accent color.

## Decision

The canonical theme shape has three top-level groups:

- `colors` defines semantic color roles and accepts a shared value or light and dark values.
- `typography` defines font families, text steps, tracking and weights.
- `tokens` defines the spacing base and radius scale.

`defineTheme` emits the same `@theme` contract for build-time Tailwind utilities and the same
declarations under a selector for runtime previews.

`defineTheme` is therefore the **consumer-facing** emitter, and its input is CSS strings on purpose:
a consumer writing `"oklch(0.56 0.12 74)"` or a raw `box-shadow` gets it through to the stylesheet
untouched. That passthrough is why it cannot also serve the platform emitters, which need the numbers
([ADR 0009, S1](0009-token-source.md)). A value written as a string reaches the web and no further,
and the structured form that does cross arrives in `ThemeConfig` as a minor, alongside those
emitters.

## Consequences

- The default preset can develop a visual point of view without hardcoding that point of view into
  components.
- Consumers can create a brand, editorial, terminal or product-specific language from JSON.
- New semantic roles still require an ADR and a minor release when they change the public contract.
- A theme file is now a portable design decision that can be reviewed separately from component
  code.
- A consumer theme is still web-only until it is written in the structured form. Nothing silently
  half-crosses to another platform: a string value simply does not cross.
