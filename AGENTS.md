# AGENTS.md

Instructions for any AI agent working in this repository (Claude Code, Codex, Cursor, Gemini CLI,
Copilot, OpenCode). `CLAUDE.md`, `.github/copilot-instructions.md` and `opencode.json` only point
here — this file is the single copy.

Code, documentation and default UI strings are in **English**. Keep it that way.

## The ADRs are the manual

`docs/adr/` is not history: it is the standing norm. Every rule below summarises a clause. When the
two disagree, **the ADR wins**.

| Where                                            | What it decides                                                        |
| ------------------------------------------------ | ---------------------------------------------------------------------- |
| [ADR 0001](docs/adr/0001-design-system.md) R1    | consumers compose, never redefine                                      |
| ADR 0001 R2                                      | inventory before building                                              |
| ADR 0001 R3                                      | what is missing is born here, in the right layer                       |
| ADR 0001 R5                                      | the scales (type, weight, radius, spacing, depth, motion, icon, color) |
| ADR 0001 R6                                      | rules do not loosen to close a task                                    |
| ADR 0001 R7                                      | text a component says on its own                                       |
| [ADR 0002](docs/adr/0002-code-conventions.md) C1 | one component per folder, in its `index.tsx`                           |
| ADR 0002 C2                                      | import the folder, never the file inside it                            |
| ADR 0002 C3                                      | no code comments, at all                                               |
| [ADR 0003](docs/adr/0003-theming.md) T1          | one declaration per token, via `light-dark()`                          |
| ADR 0003 T2                                      | the default preset carries no brand                                    |
| ADR 0003 T3                                      | a theme is JSON, and it emits `@theme`                                 |
| [ADR 0004](docs/adr/0004-releases.md) V1         | a merged pull request is the unit of release                           |
| ADR 0004 V2                                      | the bump level is declared, then inferred, then assumed                |
| [ADR 0007](docs/adr/0007-default-identity.md)    | identity lives in the non-color scales                                 |
| [ADR 0008](docs/adr/0008-multiplatform.md)       | one repository, one package per platform                               |
| [ADR 0009](docs/adr/0009-token-source.md) S1     | the default theme is data; CSS is generated from it                    |
| ADR 0009 S2                                      | `tokens.css` is generated — edit `source.ts`, then `npm run tokens`    |

Changing a rule means changing an ADR. Do not edit `eslint.config.mjs` to make a PR pass (R6).

**No code comments** ([ADR 0002, C3](docs/adr/0002-code-conventions.md)) — no `//`, no block, no
`eslint-disable`. The local `no-comments` rule fails CI.

## Commands

| Command                           | What it does                             |
| --------------------------------- | ---------------------------------------- |
| `npm run dev`                     | `tsup` in watch mode                     |
| `npm run build`                   | `dist/`, preset CSS, and `tokens.css`    |
| `npm run tokens`                  | regenerates `tokens.css` from the source |
| `npm run test`                    | both packages' suites                    |
| `npm run typecheck`               | types only                               |
| `npm run lint` / `lint:fix`       | ESLint                                   |
| `npm run format` / `format:check` | Prettier                                 |
| `npm run site:dev`                | the docs site at localhost:5173          |
| `npm run site:build`              | the docs site into `site-dist/`          |
| `npm run typecheck:site`          | types for the docs site                  |

## Structure

This is a workspace root, and every platform is a package of its own
([ADR 0008](docs/adr/0008-multiplatform.md)). Nothing is published from the root.

```
packages/
  tokens/               @jvdm-ui/tokens — the neutral token source and its emitters. Node, zero React
    src/
      source.ts         the default theme as structured data: the one thing every platform reads
      color/            oklch -> oklab -> sRGB, pure arithmetic, no dependency
      emit/             css.ts today; swift, kotlin, dart and rn next
      cli.ts            writes packages/web/src/tokens/tokens.css
  web/                  the npm package `jvdm-ui` — React 19 + Tailwind v4
    src/
      tokens/           tokens.css (generated @theme) + runtime.css (static) + theme.ts (the switch)
      theme/            defineTheme, the theme types, and presets/. Build-time, zero React
      atoms/            indivisible element
      molecules/        a few atoms as one unit
      organisms/        a complete section
      index.ts          root barrel
    bin/                the jvdm-ui CLI
    scripts/            build steps that run after tsup
    tests/              vitest + node --test, outside src/ and so outside the src lint
    tsup.config.ts      the two passes that keep the client boundary (ADR 0005)
scripts/                release tooling shared by every package
site/                   the docs site, deployed to Pages by .github/workflows/pages.yml
tsconfig.base.json      the compiler options every package extends
```

A command scoped to one package takes the workspace flag: `npm run build -w jvdm-ui`. The root
`build`, `test` and `dev` already delegate there.

The site imports `jvdm-ui/*` through Vite aliases pointing at `packages/web/src/`, not `dist/`, so
it has real HMR and needs no build ordering. It is a consumer like any other: if a component cannot be shown
there without reaching past the public API, that is a finding about the API.

Inside `packages/web/src`, dependency only flows down: `tokens <- atoms <- molecules <- organisms`. `theme/` stands apart and
imports nothing but itself. `eslint-plugin-boundaries` fails the build on any crossing.

**This package knows no app.** No `@shared/`, `@features/`, `@app/` or router in here — the local
`no-app-import` rule enforces it. A component that knows a domain belongs in the consuming app, not
here ([ADR 0001, R3](docs/adr/0001-design-system.md)).

## Text

Text the consumer decides arrives as a prop. Text a component says on its own goes to that folder's
`locales.ts` **and** gets an optional prop defaulting to it — the package is public, and not every
consumer speaks English. See `packages/web/src/atoms/theme-toggle/`, `.../atoms/input/` and `.../molecules/load-error/`.

## Tokens and theming

**`packages/web/src/tokens/tokens.css` is generated. Do not edit it.** The default theme lives in
`packages/tokens/src/source.ts` as structured data — oklch triples, px numbers, bezier tuples —
and `npm run tokens` writes the stylesheet from it ([ADR 0009](docs/adr/0009-token-source.md)). A
test regenerates the file and compares it byte for byte, so a hand edit fails CI. The behavioural
half of the stylesheet (`color-scheme`, `[data-theme]`, `@keyframes attention`) is hand-written in
`runtime.css` and appended verbatim.

That file is the schema. Each color is declared **once**, as `light-dark(<light>, <dark>)`; mode
switching lives in `color-scheme` alone. Never re-declare a token in a `[data-theme]` block — that
is exactly the specificity bug [ADR 0003](docs/adr/0003-theming.md) removed, and it silently breaks
every consumer override in light mode.

Adding a semantic token changes the public contract: it needs a minor version and a README entry.
Add it to `COLOR_TOKENS` and to a color group in `source.ts`; a test fails if the two disagree.

`defineTheme` in `packages/web/src/theme/` is the **consumer-facing** emitter and takes CSS strings.
It is deliberately not the one that feeds the other platforms, which need numbers
([ADR 0009, S6](docs/adr/0009-token-source.md) dates the unification).

## Releasing

A **merged pull request** is the unit of release ([ADR 0004](docs/adr/0004-releases.md)). A direct
push to `main` publishes nothing.

The bump level comes from a `major` / `minor` / `patch` label on the PR; failing that, from a
Conventional Commits title (`feat!:` and `BREAKING CHANGE` are major, `feat:` is minor); failing
that, `patch`. A `no-release` label publishes nothing. Two conflicting labels fail the run.

`scripts/next-version.mjs` is the single source of that rule — the PR preview and the release both
call it, so they cannot drift. Change the rule there, and in the ADR.

While the PR is open, a bot comment says which version merging will publish. Nothing is committed to
the PR branch; the version lands on `main` at merge time, as `chore: release vX.Y.Z [skip ci]`, with
a matching tag and a GitHub release.

Adding a semantic token is a `minor`, never a `patch`: it changes the public contract.

## Before calling a task done

```bash
npm run typecheck && npm run lint && npm run format:check && npm run test && npm run build
```

If you touch `eslint.config.mjs`, verify it by injecting the forbidden import and confirming the
lint breaks: a descriptor that matches nothing becomes silence, not an error, and the rule dies
without telling anyone.
