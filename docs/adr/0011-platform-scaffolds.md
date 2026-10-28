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

Wave two is the interactive atoms: `Button`, `IconButton`, `Link`, `Input`, `Textarea`, `Select`,
`Checkbox`, `Radio`, `Switch` and `Slider`. Three more things it settled:

**A host element becomes the platform's own control, and only the component's own props are
compared.** `Input` on the web is `{ size } & Omit<ComponentProps<"input">, "size">`; on the four
ports it is a `TextField`, a `BasicTextField`, a `TextField` and a `TextInput`, each with its own
value binding and keyboard handling. Parity checks `size`, which is the part the design system
actually decides ([ADR 0010, P2](0010-platform-contract.md)).

**A sibling imports the folder, not the file, on every platform.** React Native's `IconButton`
reached into `../button/button-style` and the lint stopped it, exactly as C2 would stop it on the
web — so the style is re-exported from the component's own index and the sibling imports
`../button`. ktlint enforces the same idea in Kotlin from the other end: a file holding one class
must be named after it, which is how `ControlStyle.kt` became `ControlSize.kt`.

**A golden catches what a unit test cannot see.** Flutter's `JvdmButton` stretched to the full width
because a `Container` with an `alignment` and no size expands to fill. Every prop assertion passed;
the picture did not. The button now sizes to its content, and the golden is the only reason that was
found.

Wave three is the presentational molecules: `Banner`, `Callout`, `CardTitle`, `Empty`, `Field`,
`PageHeader`, `StatCard` and `Stepper`. It added one clause to the affordance rule and confirmed one
shape:

**`htmlFor` is a web affordance, like `className`.** It is the HTML `for` attribute by name, and a
native port has no id to point a label at — it has an accessibility container. The extractor marks
it, parity skips it, and each platform links label to control its own way. Any further affordance is
added to that one table in `extract-contract.mjs`, never argued per component
([ADR 0010, P2](0010-platform-contract.md)).

**A prop whose web type is a class string becomes a token on the ports.** `StatCard` takes
`color?: string` on the web, carrying a utility class; the four ports take a `JvdmColorToken`. The
name is compared, the type is not, and that is the slack [ADR 0010, P3](0010-platform-contract.md)
left on purpose. Where the shared decision is logic rather than style — `StatCard` picking a text
step from the value's length, `Stepper` reading done/current/todo from an index — it is a pure
function with the same cases asserted on all four.

### D7 — R7 crosses, and parity checks the keys

Wave four is the first set whose components **say something on their own**: `Spinner`, `Tag`,
`ProgressBar`, `Breadcrumb`, `LoadError` and `MetricCard`. [ADR 0001, R7](0001-design-system.md)
gives the web its shape — the default string lives in the folder's `locales.ts` and the component
takes an optional prop defaulting to it — and the ports keep it exactly: a `SpinnerLocales` beside
the component, and a parameter that defaults to it.

`check-parity.mjs` now compares **locale keys** as well as props. The web contract already carried
them ([ADR 0010, P1](0010-platform-contract.md)); nothing read them until there was a port to check.
A platform that forgets a string, or invents one of its own, now fails the same way a missing prop
does.

Two things fell out of doing it:

**Locales stay internal on every platform, because they do on the web.** React Native's barrel broke
the moment two components both exported `locales` — which is the web's answer too: no layer barrel
re-exports them. The default reaches a consumer through the prop, never through an exported object.

**A continuous loop is not a transition.** The motion scale runs `instant` to `slow` (420ms) and
describes transitions; a spinner's rotation period is 1s, and Tailwind's `animate-spin` is outside
the token set on the web for the same reason. The period is a named constant on the component, like
the switch's track width, and the construction stays in the theme — `theme.linear(_:)` — so the R5
lint still has exactly one place where an animation may be built. The SwiftLint rule was narrowed to
the leading-dot form so it stops reading `theme.linear(…)` as a raw value, and it still rejects
`.easeInOut` and `.spring`.

Wave five is selection and disclosure: `Accordion`, `Tabs`, `Segmented`, `Pagination` and `Thumb`.
It brought the first string that **takes an argument** — `Pagination`'s `page` is
`(page) => "Page ${page}"`, not a constant — so parity now compares not just the locale keys but
whether each one is parameterised. A port could otherwise degrade `page` to a fixed "Page" and lose
the number with nothing to catch it; the test fixture proves it fails.

The parameterised string crosses as the idiom each language already has: a `@Sendable (Int) ->
String` constant in Swift, a `(Int) -> String` property in Kotlin, a static method in Dart, and a
function in the object on React Native. All four default the parameter to it, and all four are
tested with the same three cases.

One thing to watch when porting to SwiftUI: naming a static after a `View` modifier silently
resolves to the modifier. `Thumb.aspectRatio` compiled, and compared the unapplied method reference
rather than the number; it is `Thumb.ratio` now. The compiler will not warn about this, and the test
is what found it.

Wave six is the dialog family — `Modal`, `Drawer` and `ConfirmDialog` — and it is the first wave
where the API had to cede, exactly as the plan said it would. The cession has a rule now
([ADR 0010, P7](0010-platform-contract.md)) and the four entry points are:

| platform     | presentation                   |
| ------------ | ------------------------------ |
| iOS          | `View.jvdmModal(isPresented:)` |
| Android      | `JvdmModal(isOpen:onClose:)`   |
| Flutter      | `showJvdmModal(context:)`      |
| React Native | `Modal(visible:)`              |

What stayed shared is the **surface**: one `DialogSurface` per platform with the title row, the
close button, the rule under it and the padded body, built from the same tokens and checked on the
same props. `Drawer` reuses that surface and only changes how it arrives; `ConfirmDialog` has its
own content with the two buttons, confirm in `danger`.

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
