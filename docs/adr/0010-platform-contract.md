# ADR 0010 — The platform contract

- **Status:** accepted
- **Date:** 2026-10-28
- **Scope:** `packages/tokens/src/emit/`, `packages/tokens/generated/`, `contracts/`,
  `scripts/extract-contract.mjs`, `scripts/check-parity.mjs`, and every `locales.ts`. Why the
  repository holds one package per platform is [ADR 0008](0008-multiplatform.md); where the token
  values come from is [ADR 0009](0009-token-source.md).

## Context

[ADR 0008, M1](0008-multiplatform.md) says what crosses the platform boundary is data: the tokens,
the component contract, the icon geometry. [ADR 0009](0009-token-source.md) made the tokens data.
This decision makes the other two checkable, and that is the harder half — because the thing being
checked does not exist yet.

"The same component on four platforms" is a claim nobody can verify by reading code. SwiftUI,
Compose, Flutter and React Native share no syntax with React, so a reviewer comparing a `Badge` in
five languages is comparing prose. Without a machine-readable statement of what `Badge` _is_, drift
is not a risk, it is a certainty: a new variant lands on the web, four ports stay at six tones, and
no commit anywhere looks wrong.

## Decision

### P1 — The web source is the contract, and the contract is extracted, never written

`scripts/extract-contract.mjs` reads `packages/web/src` with the TypeScript compiler API and writes
one `contracts/<layer>/<name>.json` per component — today 106 of them: 70 atoms, 28 molecules, 8
organisms. It records the component's name, layer, source path, its **declared** props with each
one's type, optionality, enumerated values, default and whether it is a slot, and the locale keys it
reads.

Extracted, because a contract maintained by hand is a second source of truth and loses. `npm run
contracts` regenerates it, the files are committed, and a test re-extracts and compares byte for
byte — the same guard shape as the stylesheet ([ADR 0009, S2](0009-token-source.md)). Changing a
component's API and forgetting the contract fails CI.

### P2 — A component's own props and its host element are different things

`Button` is `ButtonOptions & ComponentProps<"button">`. Resolved naively that is several hundred
props — `formEncType`, `onTransitionEnd`, `key` — and a parity check built on it would demand every
platform implement the DOM.

So the extractor reads the **declared** type, not the resolved one: the component's own members, and
separately `host: { element: "button", omits: [...] }`. The contract then says what it means: _Button
has `variant`, `size` and `className`, and otherwise behaves like the platform's native button,
except for the props it takes over._ Fourteen components carry a host element. A native port
implements the own props and maps the host to its own idiom; parity is checked on the former and not
on the latter.

### P3 — Parity is a ledger that only shrinks

`scripts/check-parity.mjs` walks the web contracts and, for each platform in
`contracts/platforms.json`, requires every one to be **implemented or waived**. A platform declares
what it implements in `packages/<platform>/contract.json`: the contract id, the file, the prop names
and each enum's values. The checker fails when a platform is missing a prop, invents one, carries a
different variant set, points at a file that does not exist, waives something already implemented, or
waives a contract the web does not have.

`contracts/waivers.json` starts at 106 entries per platform, with an owner and a reason, because
nothing is ported yet. That is the point: the ledger is explicit and complete from day one, and a
port is a diff that deletes lines from it. A component cannot be quietly skipped, because "not
mentioned" is a failure and only "waived" is allowed.

Prop **names and variant sets** are compared; prop **types** are not. `ReactNode`, `@ViewBuilder`,
`@Composable () -> Unit` and `Widget` are the same idea in four spellings, and a checker that
insisted they match would be enforcing React, not parity. What the checker enforces is that the four
platforms offer the same knobs with the same values.

### P4 — A `locales.ts` exports one const named `locales`

[ADR 0001, R7](0001-design-system.md) put each component's own strings in its folder's `locales.ts`.
It never said what the export is called, so nine of the 26 files invented a name — `TAG`,
`THEME_TOGGLE`, `PASSWORD_INPUT` — and the other 17 used `locales`. A string catalogue the platforms
share cannot have a different name per folder, so the name is now `locales` everywhere, and the local
`locales-export-name` lint rule fails CI on anything else.

Three files also nested their strings by locale tag: `{ "en-US": "Close", "pt-BR": "Fechar" }`. The
`pt-BR` half was read nowhere — unreachable data that looked like an i18n system while 43 other
strings had none. Those are flattened to the default string. Translation reaches the package through
the optional prop R7 already requires, which is the consumer's own i18n, and a value is therefore
either a string or a function returning one.

### P5 — The emitters are five, and each platform's own linter checks its own output

`packages/tokens/src/emit/` holds `css`, `swift`, `kotlin`, `dart` and `rn`. Each renders the same
resolved model (`emit/model.ts`), so a token cannot reach one platform and miss another; output lands
in `packages/tokens/generated/<platform>/` and is committed, with a test per platform comparing byte
for byte. Fase 3 moves each file into its platform package.

A generated file is not this repository's source: Prettier and ESLint ignore
`packages/tokens/generated`, and Prettier ignores `contracts/` as well — one array element per line
is worse to read and far better to diff, which is what a ledger is for: porting a component deletes
one line, and adding a variant adds one. What checks it is the platform's own toolchain, and all four
outputs compile today: `swiftc -emit-module`, `kotlinc -Werror`, `dart analyze` and `tsc --strict`
each accept their file. Wiring that into CI needs the platform packages and their runners, so it
arrives with Fase 3 — [ADR 0008, M4](0008-multiplatform.md) applied to generated code.

Each language's identifiers come from one rule (`emit/name.ts`): the contract name stays kebab-case
as the enum's raw value, and the identifier is that name in the platform's spelling —
`line-strong` becomes `lineStrong`, `LineStrong`, `LINE_STRONG`. `2xs` and `2xl` become `xxs` and
`xxl`, because no language lets an identifier start with a digit; the raw value still reads `"2xs"`,
so the contract name survives the trip. A test holds that the mapping is valid and collides nowhere.

### P6 — Display P3 where it fits, sRGB where it does not

[ADR 0009, S4](0009-token-source.md) left P3 to the platform emitters, and this is them. Every
emitted color carries the oklch triple, sRGB components and Display P3 components, so the
hand-written layer picks per platform rather than per token. P3 recovers three of the six colors that
sRGB has to clamp — `ok`, `warn` and `danger` in light mode; `warn-soft`, `danger-soft` and
`info-soft` sit outside P3 too, and a test names that set so it cannot grow unnoticed.

## Consequences

- Parity stops being a promise. `npm run parity` is a gate, and the waiver list is the roadmap.
- A new component is not done until `npm run contracts` is run and its waiver lines are added. A
  removed prop fails four platforms at once, which is the behaviour that was missing.
- `contracts/` is 107 files of generated JSON in review diffs. That is the price of a reviewable API
  change, and it is cheaper than discovering the divergence on a fifth platform.
- Prop types are deliberately unchecked, so a platform can satisfy parity with a prop that means
  something different. Goldens and review cover that; the checker does not pretend to.
- The repository's own `scripts/*.mjs` are still outside ESLint, which lints `**/*.{ts,tsx}` only.
  The parity checker and the extractor are now load-bearing, so that gap is worth closing — in its
  own decision, not by widening a glob here (R6).
