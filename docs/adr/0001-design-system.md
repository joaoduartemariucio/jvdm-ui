# ADR 0001 — The design system

- **Status:** accepted
- **Date:** 2026-08-20 (rewritten 2026-08-27, when the package left its first app)
- **Scope:** everything under `src/`. Code shape is [ADR 0002](0002-code-conventions.md); the token
  contract is [ADR 0003](0003-theming.md).

## Context

A design system only stays a system while the boundary around it is **checkable**. As long as it is
a written convention, it leaks the first time a deadline gets tight — a screen redefines a button
with loose classes, a raw hex slips into a card, and within a quarter there are three buttons that
are almost the same.

This package was extracted from a product codebase precisely because the boundary held there: every
rule below is enforced by lint, not by good intentions.

## Decision

Consumers **compose** this package. It is the single source of component, token and visual scale,
and it knows nothing about any app.

Four layers, dependency only flows down:

```
tokens/     color, typography, weight, radius, spacing scale, theme
atoms/      indivisible element: Card, Label, Input, Button, Icon, Avatar, Skeleton
molecules/  a few atoms acting as one unit: Field, StatCard, PageHeader, Empty, LoadError
organisms/  a complete section: DataTable, BarChart, Sparkline
```

### R1 — Compose, never redefine

A screen composes the design system. It does not redefine a button, field, card, table, label or
empty state with loose utility classes. Writing `text-2xs tracking-caps text-ink-muted` on a
`<span>` is reimplementing `Label`.

### R2 — Inventory before building

Before a screen: which components already fit, what is missing, what needs to change. This is what
lets the team discuss a component _before_ it exists in three near-identical versions.

### R3 — What is missing is born here, in the right layer

Extending what exists comes before creating an almost-identical sibling. A component that knows a
domain — a `Pill` that understands auction lot status, a panel that calls a feature hook — does
**not** belong in this package. It lives in the consuming app.

### R4 — Code the task touched, migrates

If a task brushes against code that predates these rules, it moves to the rules in the same PR.

### R5 — Where a scale exists, a raw value is a defect

No odd values, anywhere. The lint fails CI on every one of these:

| dimension  | scale                                                                           |
| ---------- | ------------------------------------------------------------------------------- |
| typography | 10, 12, 14, 16, 18, 22, 26, 52px (`text-2xs` … `text-display`)                  |
| tracking   | `tracking-caps` (uppercase labels), `tracking-code`                             |
| weight     | 400/500/700. The scale has no 600: `font-semibold` gets synthesised by browsers |
| radius     | 4, 6, 8, 10, 16px (`radius-xs\|sm\|md\|lg\|xl`)                                 |
| spacing    | 2px and multiples of 4. `gap-px`, `gap-2.5` and `gap-[7px]` are defects         |
| icon       | 12, 16, 20, 24, 32px via `Icon`'s `size`, never a loose `h-* w-*`               |
| color      | semantic tokens only. Raw colors are forbidden                                  |

Width and height sit outside the scale — `w-[316px]` is allowed, in even px and with care.

Consumers may change **the values** of every scale ([ADR 0003](0003-theming.md)). They cannot make
the scale stop existing.

### R6 — Rules do not loosen to close a task

Moving a lint boundary, a scale or a token is a separate decision that needs its own ADR revision.
Do not edit `eslint.config.mjs` to make a PR pass.

### R7 — Text a component says on its own

Text the consumer decides always arrives as a prop. For the handful of strings a component says by
itself, the default lives in that folder's `locales.ts` **and** the component takes an optional prop
carrying that default. The package is public: not every consumer speaks the default language.

## Consequences

- Adding a component is more expensive than writing markup in a screen, and that is the point.
- The lint is the contract. If a rule is not enforced, it is not a rule — it is a wish.
