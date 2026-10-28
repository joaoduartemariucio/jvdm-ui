# ADR 0012 — The icons are geometry, so they are generated

- **Status:** accepted
- **Date:** 2026-10-28
- **Scope:** `packages/tokens/src/icons/`, `packages/tokens/src/emit/icons/`, every
  `atoms/icon/` folder on five platforms. The contract these icons satisfy is
  [ADR 0010](0010-platform-contract.md); the scaffolds they land in are
  [ADR 0011](0011-platform-scaffolds.md).

## Context

[ADR 0008, M1](0008-multiplatform.md) named three things that cross the platform boundary as data:
tokens, the component contract, and **icon geometry**. The first two are settled. This is the third,
and it is the only place in the system where a component itself — not a description of one — can be
generated, because an icon has no behaviour. It is a `d` attribute.

The arithmetic says why it matters: 33 icons on five platforms is 165 implementations, a third of
everything the parity ledger asks for, and every one of them would otherwise be a hand-traced path
that nobody can diff against the original.

## Decision

### I1 — An `.svg` file is the source, and the web is downstream of it like everyone else

`packages/tokens/src/icons/svg/*.svg` holds the 33 icons, each a plain SVG with the system's own
frame: viewBox `0 0 24 24`, `currentColor`, stroke width 1.6, round cap and join. A designer can open
one, and nothing in it is specific to React.

`npm run tokens` then writes all five platforms, the web included. The web files were **not** rewritten
in the process: the first generated output was byte-identical to the 33 hand-written `index.tsx`
files and to their barrel. The geometry made a full round trip — TSX to SVG and back — without moving
a decimal, which is the only evidence worth having that nothing was lost on the way out.

### I2 — One path parser, in the generator, not four in the ports

SVG path data is a language. Four hand-written parsers would be four sets of bugs, so there is one,
in TypeScript, in `icons/geometry.ts`: it reads `M L H V C S A Z` in both cases, resolves relative
commands and implicit repeats, reflects the control point for a smooth curve, and converts every
elliptical arc into cubic Béziers.

Arcs are converted rather than passed through, even though Compose and Flutter both accept SVG's
endpoint parameterization. One normalization means one geometry on every platform; a difference in a
drawn curve is then a bug in one shared function, not a difference of opinion between four
frameworks.

The parser **refuses** what it cannot carry. `Q`, `T` and any unknown letter throw, as does an SVG
with an element that is not `path`, `rect` or `circle`. An icon that cannot be ported is a build
failure at the moment it is added, not a silently flattened shape discovered on a device.

### I3 — Primitives stay primitive where the platform has them

A `rect` draws as a rounded rectangle and a `circle` as an ellipse on web, SwiftUI, Flutter and
React Native, because all four have that primitive and it is exact. Compose's `PathBuilder` has
neither, so for Compose the generator turns both into the `d` they are equivalent to and runs them
through the same parser. The conversion is therefore the tested one, not a second implementation.

### I4 — The wrapper is hand-written once per platform; the icons are generated

`Svg` on the web has four analogues — `JvdmIcon` in SwiftUI, Compose, Flutter and React Native — and
each is written by hand, because scaling, stroking and tinting are where platforms genuinely differ.
Each one holds the same two constants (`viewBox` 24, stroke 1.6) and the same five sizes: 12, 16, 20,
24, 32, which is R5's icon scale ([ADR 0001](0001-design-system.md)).

Every icon therefore has exactly one prop in the contract — `size` — and parity checks that on all
four. Flutter's icon was a data class at first and became a widget with `size` for that reason: the
contract is what the ports bend to, not the other way round.

### I5 — Generated code is checked by the compiler, not by the formatter

The emitted Kotlin produced 1841 ktlint findings about indentation and argument wrapping. Chasing
those from a generator is the wrong fight and the wrong rule: generated files are not this
repository's source, as [ADR 0010, P5](0010-platform-contract.md) already decided for the token
files. ktlint skips the generated icons, Prettier skips the generated TypeScript, and what proves
them is `swift build`, `./gradlew assembleRelease`, `flutter analyze` and `tsc --strict` — all four
of which accept the output.

The emitter still owes a reader something, so it lays out one command per line at the right
indentation. "Not linted" is not a licence to emit a wall of text.

## Consequences

- 33 icons × 5 platforms = 165 implementations, from 33 files and one generator. The parity ledger
  drops from 105 waivers per platform to **71**.
- Adding an icon is: drop an `.svg` in, run `npm run tokens`, delete four waiver lines. Nothing is
  hand-traced.
- A test regenerates all five outputs and compares them byte for byte, so a hand edit to any of the
  165 fails CI.
- The Flutter golden renders all 33 at once, which is the one place a wrong arc shows up as a picture
  rather than a number.
- `Q` and `T` are unsupported today. An icon that needs a quadratic curve fails the build until the
  parser learns it — one function, five platforms.
