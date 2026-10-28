# ADR 0011 — The platform scaffolds

- **Status:** accepted
- **Date:** 2026-10-28
- **Scope:** `Package.swift`, `packages/ios/`, `packages/android/`, `packages/flutter/`,
  `packages/react-native/`, `scripts/check-scales.mjs`, `scripts/release-reach.mjs` and the
  per-platform release workflow. What the contract is is [ADR 0010](0010-platform-contract.md);
  where the token values come from is [ADR 0009](0009-token-source.md).

## Context

[ADR 0010](0010-platform-contract.md) left four platforms with a ledger of 106 waivers each and
nothing to check against. A parity gate whose every answer is "waived" proves only that the gate
runs. This decision ports one component — `Badge`, six tones, one prop, no state — the whole way on
all four, so that everything between the token source and a rendered pixel is exercised once before
it is repeated a hundred times.

## Decision

### D1 — A theme is tokens plus a brightness, and nothing else

Each platform resolves a color the same way: the generated pair, picked by the platform's own
light/dark signal. No platform re-declares a token, exactly as [ADR 0003, T1](0003-theming.md)
forbids on the web.

- **iOS** — `JvdmTheme(scheme:)` in the SwiftUI environment, injected by `.jvdmTheme()`, reading
  `@Environment(\.colorScheme)`. Colors are built from the generated Display P3 components.
- **Android** — `JvdmScales` behind a `staticCompositionLocalOf`, provided by `JvdmTheme(dark:)`
  from `isSystemInDarkTheme()`, alongside a Material 3 `ColorScheme` mapped from the palette.
- **Flutter** — `JvdmTokens extends ThemeExtension<JvdmTokens>`, carried by `jvdmLightTheme()` and
  `jvdmDarkTheme()`.
- **React Native** — `resolveTokens(scheme)` and `useJvdmTokens()` over `useColorScheme()`, with
  plain `StyleSheet` objects and **no NativeWind**: one less dependency and no second style engine
  to disagree with the first.

`lerp` on the Flutter extension cuts at the halfway point rather than interpolating. The tokens are
discrete and a half-resolved palette means nothing; the consequence is that a theme flip snaps while
Material's own colors cross-fade, and a widget test must `pumpAndSettle` before reading a color.

### D2 — The theme mode is three states stored as two values

The web stores `"light"` or `"dark"` under `jvdm-ui.theme`, and **stores nothing at all** to follow
the system ([`theme.ts`](../../packages/web/src/tokens/theme.ts)). The other four mirror that
exactly: same key, same two values, and "system" **removes** the key instead of writing a third
value. A hybrid app that shares a preference store therefore cannot disagree with itself.

Storage is an interface on every platform — `UserDefaults` on iOS, and a one-method port on the
others — so the package depends on no storage library and the behaviour is testable without one. A
value the web never writes reads as system.

### D3 — A platform prefixes a component only when the framework owns the name

Material already exports `Badge` in both Flutter and Compose, so those two ship `JvdmBadge`. SwiftUI
and React Native have no such type and ship `Badge`. The rule is mechanical — prefix on collision,
which the compiler reports — rather than a blanket prefix that would be noise where the language
already namespaces.

The contract is unaffected: `packages/<platform>/contract.json` records the contract name and the
platform's `spelling` beside it, and parity compares the former. The same holds for the slot, which
is `children` in the contract and `content`, `child` or `children` in the source.

### D4 — Raw values are checked by one gate, and by each platform's linter where one runs

`scripts/check-scales.mjs` reads every native source outside the generated files and fails on a code
comment, a raw color, a raw dimension or a raw duration. It is one rule table over Swift, Kotlin,
Dart and TypeScript, it runs in `npm run test`, and it was verified by injecting each kind of
violation.

The platform linters sit on top, each doing what it is actually good at. `.swiftlint.yml` carries
the same five rules as `custom_rules`, verified the same way. `analysis_options.yaml` runs `flutter
analyze` clean with `always_specify_types` and `require_trailing_commas`. Android runs `ktlintCheck`
with **no custom rules**: ktlint has no `no-comments` rule, and a configuration naming a rule that
does not exist is silence rather than enforcement — the failure [`AGENTS.md`](../../AGENTS.md) warns
about. What ktlint does enforce there is Kotlin style and, usefully, that a file is named after the
class it holds, which is [ADR 0002, C1](0002-code-conventions.md) arriving for free. R5 and C3 in
Kotlin stay with `check-scales.mjs`.

Android also runs Kotlin's **explicit API mode**, so a public declaration without a stated visibility
fails the build. That is the closest thing Kotlin has to a statement that the package's surface is
deliberate, and it was verified by removing one `public`.

### D5 — Each platform releases on its own tag, and the reach is inferred from the diff

`scripts/next-version.mjs` keeps being the single source of the bump rule ([ADR 0004,
V2](0004-releases.md)) and gains `--platform`: it reads that platform's own manifest — `package.json`,
`pubspec.yaml`, `build.gradle.kts`, or `contract.json` for SwiftPM, which has no version of its own —
and prints the tag with the platform's prefix.

| platform     | tag             | manifest                             |
| ------------ | --------------- | ------------------------------------ |
| web          | `v1.2.20`       | `packages/web/package.json`          |
| React Native | `rn-v0.1.0`     | `packages/react-native/package.json` |
| iOS          | `ios-0.1.0`     | `packages/ios/contract.json`         |
| Android      | `android-0.1.0` | `packages/android/build.gradle.kts`  |
| Flutter      | `flutter-0.1.0` | `packages/flutter/pubspec.yaml`      |

`scripts/release-reach.mjs` decides which platforms a merged pull request reaches: a
`platform:<id>` label if there is one, otherwise the paths in the diff, and a change under
`packages/tokens/`, `contracts/` or `scripts/` reaches all five, because that is exactly what a
shared change means. `no-release` still reaches nothing.

The new workflow **only reports and refuses an existing tag**. Publishing to SwiftPM, Maven Central
and pub.dev needs credentials and a signing story that are not set up, and a workflow that pretends
otherwise would fail on its first real run. `release.yml` keeps publishing the web package exactly
as before.

### D6 — Components land in waves, and the ledger is the roadmap

Porting goes in dependency order — stateless atoms, then form atoms, then molecules, then organisms
— and each wave is one change across four platforms at once, not four changes one platform at a
time. A wave is done when `npm run parity` accepts it, which it only does when every platform
declares the same prop names and the same variant sets.

Wave one is `Skeleton`, `FormAlert`, `Kbd`, `Card`, `Divider`, `Label` and `Avatar`: seven
components with no state and no locale strings, chosen because they exercise every part of the
pipeline — a slot, an enum, a boolean, a derived string, a border, a monospace face and an infinite
animation — without any of the focus and keyboard work the client modules will need.

Two things the wave settled, both of which generalise:

**Logic that must agree goes in a pure function, named the same on all four.** `Avatar` derives
initials from a name, and "first and last, upper-cased, whitespace-collapsed" is a decision, not a
rendering detail. It is `AvatarInitials.of`, `avatarInitials`, `initials` and `AvatarInitials.of` in
the four languages, and the same five cases are asserted in all four test suites.

**A platform's own tools will find real violations, and the fix belongs in the theme.** SwiftLint
rejected `Kbd` for building a monospaced font outside the scale; the answer was `theme.mono(step,
weight)`, not an exception. Dart's formatter and the `require_trailing_commas` lint disagreed, so the
lint went: one tool owns formatting.

The wave also showed `check-scales.mjs` to be too blunt in one place: it flagged every 1px border
and rule as a raw dimension. [ADR 0001, R5](0001-design-system.md) says the opposite in its own
words — "that is a border, not a gap" — so the rule now allows exactly 1, and only 1, where a border
width or a hairline goes. Narrowing a check to what the ADR actually says is not loosening it (R6):
the same change still rejects a 3px border and a 7px radius.

## Consequences

- One component is ported on four platforms and the ledger reads 105 waivers instead of 106. The
  pipeline — source, emitter, theme, component, test, golden, contract, gate — is proven end to end.
- `Package.swift` lives at the repository root, because SwiftPM allows it nowhere else
  ([ADR 0008, M5](0008-multiplatform.md)). It is the one file the layout does not get to choose.
- Three of the four platforms run their real test suite here: `swift test` (15 tests), `flutter
test` (16, with a light and a dark golden), and `vitest` for React Native (16). Android's Compose
  layer is **not compiled anywhere yet**: it needs the Gradle wrapper, which is a binary this
  repository does not carry. Its pure-Kotlin half — tokens, scales, badge style, theme store — does
  compile and its 15 tests do run.
- React Native's component is typechecked against the real React Native types but not rendered:
  importing `react-native` outside a Metro runtime fails on Flow syntax. A render harness is a Fase 5
  concern, and a stub would have proved nothing.
- Goldens are committed per platform and reviewed by eye. They are machine-specific enough that a
  different renderer will produce a diff; that is a known cost of goldens, not a bug to patch around.
