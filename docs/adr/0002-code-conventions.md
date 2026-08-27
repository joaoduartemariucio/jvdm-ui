# ADR 0002 — Code conventions

- **Status:** accepted
- **Date:** 2026-08-20
- **Scope:** file and folder shape under `src/`. What the design system _is_ is
  [ADR 0001](0001-design-system.md).

## Context

Two files with the same name in different folders, or one file holding three components, make a
component library unnavigable long before it becomes unmaintainable. These rules exist so that the
path to a component is derivable from its name, with no search.

## Decision

### C1 — One component per folder, in that folder's `index.tsx`

`icon/` holds 17 icons in 17 folders, plus the `Svg` folder they all compose.

A folder that groups several components has no `index.tsx` of its own: it has an `index.ts` barrel,
one subfolder per component, and whatever they share.

```
atoms/
  card/                 component folder: index.tsx and nothing else
  input/                group folder: barrel + one subfolder per component
    index.ts  control.ts  locales.ts
    input/index.tsx  select/index.tsx  password-input/index.tsx
```

The `one-component-per-file` lint rule enforces this.

### C2 — Import the folder, never the file inside it

Consumers import `jvdm-ui/atoms`, never `jvdm-ui/atoms/button`. The package `exports` map publishes
only the four layers, so a deep import fails to resolve; the `import-the-folder` lint rule catches
it earlier, with a better message.

Between siblings of the same group the path is direct (`../svg`, `../control`), so the barrel does
not create a cycle.

### C3 — No code comments

No `//`, no block comments, no `eslint-disable`. The reason a decision was made lives in an ADR,
where it can be found, dated and revised — not in a line that drifts from the code beneath it three
refactors later.

The `no-comments` lint rule fails CI on any comment. This is deliberately absolute: an exception
process would cost more argument than the rule saves.

## Consequences

- A reviewer never asks "where does this component live".
- Explaining a non-obvious decision requires writing an ADR. That friction is intended.
