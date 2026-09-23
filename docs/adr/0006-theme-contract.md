# ADR 0006 — Theme contract

- **Status:** accepted
- **Date:** 2026-09-23
- **Scope:** `src/theme/`, theme JSON files and the documentation playground

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

## Consequences

- The default preset can develop a visual point of view without hardcoding that point of view into
  components.
- Consumers can create a brand, editorial, terminal or product-specific language from JSON.
- New semantic roles still require an ADR and a minor release when they change the public contract.
- A theme file is now a portable design decision that can be reviewed separately from component
  code.
