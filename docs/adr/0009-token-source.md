# ADR 0009 — The token source

- **Status:** accepted
- **Date:** 2026-10-28
- **Scope:** `packages/tokens/`, `packages/web/src/tokens/tokens.css` and `runtime.css`. What a theme
  may contain is [ADR 0006](0006-theme-contract.md); what the default says is
  [ADR 0007](0007-default-identity.md); why the repository has one package per platform is
  [ADR 0008](0008-multiplatform.md).

## Context

[ADR 0008, M1](0008-multiplatform.md) decided that what crosses the platform boundary is data, and
named the tokens first. But there was no data to cross. The default theme lived in
`src/tokens/tokens.css` as hand-written CSS: `light-dark(oklch(0.965 0.012 78), oklch(0.18 0.015 78))`
is a string, and a string is readable by exactly one platform.

`defineTheme` looked like the missing emitter and is not. It serves a consumer's partial theme, whose
values are already CSS strings — `"oklch(0.56 0.12 74)"`, `"cubic-bezier(0.16, 1, 0.3, 1)"`,
`"0 1px 1px rgb(0 0 0 / 0.05)"`. Passing those through is the right behaviour for the web and no help
at all to Swift, Kotlin or Dart, which need the numbers, not the syntax.

So the default theme — the one thing every platform must agree on — was the one theme that existed
only as CSS.

## Decision

### S1 — The default theme is structured data, and CSS is downstream of it

`packages/tokens/src/source.ts` is the default theme: 24 colors as `{ l, c, h, alpha? }` pairs, 8
text steps as `{ size, lineHeight }`, tracking in `em`, radius and spacing in px, easing as the four
bezier numbers, duration in ms, and each shadow as a list of layers with offsets and a color pair.
Nothing in it is a CSS string. A value that cannot be expressed as a number or an enumerated name
does not belong in the source — it belongs in a consumer's theme.

The colors are declared in named groups (surfaces, lines, ink, accent, status), in contract order.
The grouping is not decoration: it is what gives every emitter the same section order, and a test
asserts it covers `COLOR_TOKENS` exactly once.

### S2 — `tokens.css` is generated, committed, and guarded by a test

`npm run tokens` writes `packages/web/src/tokens/tokens.css` from the source. The file stays in git,
because it is the published artefact and the web build must not depend on a generator step
([ADR 0005](0005-server-components.md)'s two-pass build is delicate enough).

A generated file that is also committed drifts the first time someone edits it by hand. The guard is
a test, not a banner comment: `packages/tokens/tests/css.test.ts` regenerates the stylesheet and
asserts byte equality with what is committed. A hand edit fails CI. This follows
[ADR 0001](0001-design-system.md): a rule that is not enforced is a wish, and
[ADR 0002, C3](0002-code-conventions.md) leaves no room for a "do not edit" comment anyway.

The first generated output was byte-identical to the hand-written file it replaced. The pipeline
changed; not one token did.

### S3 — The stylesheet's runtime half stays hand-written

`color-scheme`, the `[data-theme]` selectors, `@keyframes attention` and the `.attention` classes are
behaviour, not values: there is nothing to emit and nothing for another platform to read. They live
in `packages/web/src/tokens/runtime.css` and the generator appends them verbatim. The published
`dist/tokens.css` is unchanged — one file, same content, same export.

### S4 — Color is oklch in the source, and each platform gets what it can render

`oklch` is the source form, because that is what the palette was authored in and it is the only form
in which the lightness ramp means anything. `packages/tokens/src/color/` converts it: oklch → oklab →
linear sRGB → sRGB, in pure arithmetic with no dependency. The sRGB primaries round-trip exactly, and
a test holds that.

Six of the 48 default color values sit outside sRGB, all of them light-mode and all of them barely:
`ok`, `warn`, `warn-soft`, `danger`, `danger-soft`, `info-soft`. On the web this is invisible, because
the browser gamut-maps `oklch()` itself. On a platform emitting sRGB, `toSrgb` clamps, which costs a
little saturation on those six. The test names them, so the set cannot grow in silence, and asserts
every overflow stays under 0.12 in linear light. Emitting Display P3 where the platform supports it —
iOS, and Android 13 and up — is the fix, and it belongs with the platform emitters, not here.

### S5 — The source knows no renderer and no platform

`packages/tokens` imports no React, no platform package, and nothing above itself in the tree. Lint
enforces it (`no-restricted-imports` on `react`, `@jvdm-ui/*`, `jvdm-ui` and `../../`), because
[ADR 0008, M1](0008-multiplatform.md) only holds while the data stays upstream of everyone who reads
it.

The four local rules of [ADR 0002](0002-code-conventions.md) — no comments, one component per file,
import the folder, no app import — now apply to `packages/*/src` rather than to the web package
alone. This is a tightening, which R6 permits; it does not reach `packages/*/tests`, because C2 is a
rule about consumers and a test is not one.

### S6 — `defineTheme` is untouched, and the two emitters will be one

`jvdm-ui/theme` keeps exporting `defineTheme` with the same signature and the same output. Consumers
see nothing. That leaves two pieces of code that know how to write `light-dark(…)` and
`--text-*--line-height`, which is a drift risk and is accepted for now with a date on it: the
serializer gets unified when the Swift, Kotlin, Dart and React Native emitters land and have to share
it, and `ThemeConfig` gains the structured value form at the same time — a minor, since the string
form keeps working.

## Consequences

- The default theme is now readable by a program. Everything [ADR 0008](0008-multiplatform.md)
  promises about tokens rests on this and could not start before it.
- Changing a default token means editing `source.ts` and running `npm run tokens`. Editing the CSS
  fails CI.
- `@jvdm-ui/tokens` is private and publishes nothing. It is a build-time workspace package; whether
  it ever ships to npm is a later decision.
- The structured source made one thing undeniable that the prose had got wrong: see the revision note
  in [ADR 0003, T2](0003-theming.md). The palette's neutrals are not achromatic, and the source says
  so in a helper called `sand`.
- Coverage still measures the web package only. The token package has its own tests and no coverage
  gate; it gets one when the emitters multiply.
