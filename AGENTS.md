# AGENTS.md

Instructions for any AI agent working in this repository (Claude Code, Codex, Cursor, Gemini CLI,
Copilot). `CLAUDE.md` only points here — this file is the single copy.

Code, documentation and default UI strings are in **English**. Keep it that way.

## The ADRs are the manual

`docs/adr/` is not history: it is the standing norm. Every rule below summarises a clause. When the
two disagree, **the ADR wins**.

| Where                                            | What it decides                                         |
| ------------------------------------------------ | ------------------------------------------------------- |
| [ADR 0001](docs/adr/0001-design-system.md) R1    | consumers compose, never redefine                       |
| ADR 0001 R2                                      | inventory before building                               |
| ADR 0001 R3                                      | what is missing is born here, in the right layer        |
| ADR 0001 R5                                      | the scales (type, weight, radius, spacing, icon, color) |
| ADR 0001 R6                                      | rules do not loosen to close a task                     |
| ADR 0001 R7                                      | text a component says on its own                        |
| [ADR 0002](docs/adr/0002-code-conventions.md) C1 | one component per folder, in its `index.tsx`            |
| ADR 0002 C2                                      | import the folder, never the file inside it             |
| ADR 0002 C3                                      | no code comments, at all                                |
| [ADR 0003](docs/adr/0003-theming.md) T1          | one declaration per token, via `light-dark()`           |
| ADR 0003 T2                                      | the default preset carries no brand                     |
| ADR 0003 T3                                      | a theme is JSON, and it emits `@theme`                  |

Changing a rule means changing an ADR. Do not edit `eslint.config.mjs` to make a PR pass (R6).

**No code comments** ([ADR 0002, C3](docs/adr/0002-code-conventions.md)) — no `//`, no block, no
`eslint-disable`. The local `no-comments` rule fails CI.

## Commands

| Command                           | What it does                          |
| --------------------------------- | ------------------------------------- |
| `npm run dev`                     | `tsup` in watch mode                  |
| `npm run build`                   | `dist/`, preset CSS, and `tokens.css` |
| `npm run typecheck`               | types only                            |
| `npm run lint` / `lint:fix`       | ESLint                                |
| `npm run format` / `format:check` | Prettier                              |
| `npm run site:dev`                | the docs site at localhost:4321       |
| `npm run site:build`              | the docs site into `site-dist/`       |
| `npm run typecheck:site`          | types for the docs site               |

## Structure

```
src/
  tokens/     tokens.css (@theme, color-scheme) + theme.ts (the data-theme switch)
  theme/      defineTheme, the theme types, and presets/. Build-time, zero React
  atoms/      indivisible element
  molecules/  a few atoms as one unit
  organisms/  a complete section
  index.ts    root barrel
bin/          the jvdm-ui CLI
scripts/      build steps that run after tsup
site/         the docs site, deployed to Pages by .github/workflows/pages.yml
```

The site imports `jvdm-ui/*` through Vite aliases pointing at `src/`, not `dist/`, so it has real
HMR and needs no build ordering. It is a consumer like any other: if a component cannot be shown
there without reaching past the public API, that is a finding about the API.

Dependency only flows down: `tokens <- atoms <- molecules <- organisms`. `theme/` stands apart and
imports nothing but itself. `eslint-plugin-boundaries` fails the build on any crossing.

**This package knows no app.** No `@shared/`, `@features/`, `@app/` or router in here — the local
`no-app-import` rule enforces it. A component that knows a domain belongs in the consuming app, not
here ([ADR 0001, R3](docs/adr/0001-design-system.md)).

## Text

Text the consumer decides arrives as a prop. Text a component says on its own goes to that folder's
`locales.ts` **and** gets an optional prop defaulting to it — the package is public, and not every
consumer speaks English. See `atoms/theme-toggle/`, `atoms/input/` and `molecules/load-error/`.

## Tokens and theming

`src/tokens/tokens.css` is the schema. Each color is declared **once**, as
`light-dark(<light>, <dark>)`; mode switching lives in `color-scheme` alone. Never re-declare a
token in a `[data-theme]` block — that is exactly the specificity bug
[ADR 0003](docs/adr/0003-theming.md) removed, and it silently breaks every consumer override in
light mode.

Adding a semantic token changes the public contract: it needs a minor version and a README entry.

## Before calling a task done

```bash
npm run typecheck && npm run lint && npm run format:check && npm run build
```

If you touch `eslint.config.mjs`, verify it by injecting the forbidden import and confirming the
lint breaks: a descriptor that matches nothing becomes silence, not an error, and the rule dies
without telling anyone.
