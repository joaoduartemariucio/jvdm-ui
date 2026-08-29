# ADR 0005 — Server Components

- **Status:** accepted
- **Date:** 2026-08-28
- **Scope:** `tsup.config.ts`, `package.json` (`exports`), the five modules that use React hooks.

## Context

React Server Components are the default in the App Router. A component that calls a hook has to sit
behind a `"use client"` boundary, and a component that does not should stay on the server — that is
the whole point of the split.

Five modules in this library use hooks: `useTheme`/`applyStoredTheme`, `ThemeToggle`,
`PasswordInput`, `Menu`, `Gallery`. Everything else is presentational.

Before this decision the library shipped no boundary at all. `tsup` bundled one chunk per layer, so
`atoms/index.js` was a single file that imported `useState` — because `ThemeToggle` was in it.
Importing `Badge`, which is a `<span>` with a class name, from a Server Component failed the
consumer's build:

```
You're importing a module that depends on `useState` into a React Server Component module.
```

Writing `"use client"` at the top of the five source files does not fix it. esbuild drops the
directive when it bundles, and it is not the file that reaches the consumer anyway — the chunk is.

Three shapes were considered.

**A banner on every output.** One line of config, and the whole library becomes client-side. It
trades the consumer's most valuable pages — the public, indexable ones — for build simplicity.
`Card` and `Label` have no reason to ship JavaScript.

**A fifth public entry point.** Move the five to `jvdm-ui/client` and let callers import them from
there. Honest and visible in the import, but it makes the boundary the caller's problem: the caller
has to know which of two places a component lives in, and moving one later is a breaking change.

**A boundary inside the build.** The five get their own bundles; the layers keep exporting them.

## Decision

### V1 — The client boundary is an implementation detail, not an entry point

`atoms`, `molecules`, `organisms`, `tokens` and the root keep exporting exactly what they exported
before. `import { ThemeToggle } from "jvdm-ui/atoms"` still works, and so does importing `Badge` from
a Server Component. Which side of the boundary a component sits on is the library's problem.

### V2 — Two passes, because one build cannot emit both kinds of file

`tsup.config.ts` exports an array. The first pass builds the five hook modules into `dist/client/*`,
one self-contained bundle each, with `banner: '"use client"'`. The second builds the public layers
and treats `jvdm-ui/client/*` as external.

The passes are separate because the banner is per-build in esbuild: a single pass can only mark
every output or none.

`dist/client/*` is reachable through an `exports` subpath because the emitted layers import it by
that specifier — the relative path would differ per output file. It is not documented in the README
and is not part of the supported API.

### V3 — A resolver plugin keeps the source relative

The `client-boundary` esbuild plugin in the second pass rewrites relative imports that land on one of
the five modules to `jvdm-ui/client/<name>`, external. The source keeps ordinary relative imports, so
`tsc` and the docs site resolve normally and nothing self-references the package name.

The list of five lives in `tsup.config.ts` as `CLIENT_MODULES`. **Adding a hook to a component that
is not on that list reintroduces the original bug**, and it fails in the consumer's build rather than
in ours.

### V4 — The first pass does not treeshake

`treeshake: true` makes tsup re-emit the file through rollup, which discards the esbuild banner. The
five bundles are leaf modules; there is nothing to shake out of them.

### V5 — Barrels re-export the five by name

`export * from "./theme-toggle"` silently disappears from the output: rollup cannot enumerate the
names behind an external module, so it drops the re-export and the consumer gets `undefined`. The two
barrels that cross the boundary — `atoms/index.ts` and `molecules/index.ts` — name what they export.

## Consequences

- The five bundles duplicate the small amount of code they share with the layers (`EyeIcon`,
  `BackIcon`, `Thumb`). A few hundred bytes, against making every component client-side.
- `npm run build` output is worth a glance when the module list changes: `dist/client/*.js` must
  start with `"use client"`, and nothing outside `dist/client/` may import a hook.
- Consumers on a bundler that ignores `exports` cannot resolve `jvdm-ui/client/*`. The package is
  already pure ESM with an `exports` map, so this rules out nothing that worked before.
