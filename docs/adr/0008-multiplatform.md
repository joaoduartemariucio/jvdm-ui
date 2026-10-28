# ADR 0008 — One repository, one package per platform

- **Status:** accepted
- **Date:** 2026-10-27
- **Scope:** the repository layout, the workspace root, and what each package owns. The layers
  inside the React package are [ADR 0001](0001-design-system.md). How the tokens themselves become
  five artefacts is a separate decision, still to be written.

## Context

The system exists on the web and is wanted on iOS, Android, Flutter and React Native, saying the
same things, with the same tokens and the same component names.

Five repositories is the obvious shape and the wrong one. The failure is not the setup cost, it is
that nothing can notice drift: the platforms share a token palette and a component vocabulary, and
once those live in five histories, a renamed token, a retuned radius or a new variant lands in one
and is forgotten in four. There is no commit where the divergence is visible, and no CI run that can
fail. A design system stops being a system exactly there.

The opposite error is to believe the components themselves can be shared. They cannot: SwiftUI,
Compose, Flutter and React Native do not run React, and nothing generated from JSX is a native
component worth shipping.

## Decision

One repository. Each platform is a package under `packages/`, and the root publishes nothing.

```
packages/web/              jvdm-ui                 npm
packages/react-native/     @jvdm-ui/react-native   npm
packages/ios/              JvdmUI                  SwiftPM
packages/android/          com.jvdm:jvdm-ui        Maven Central
packages/flutter/          jvdm_ui                 pub.dev
packages/tokens/           @jvdm-ui/tokens         the neutral source and its emitters
```

### M1 — What is shared is data, not code

Three things cross the platform boundary, and all three are data: the **tokens** (one neutral
source, emitted per platform), the **component contract** (name, layer, props, variants, defaults,
locale keys) and the **icon geometry**. Component implementations are hand-written per platform and
shared with nobody.

### M2 — The root is a workspace, never a package

The root `package.json` is `private`. Its `build`, `dev`, `test` and `test:coverage` delegate to a
workspace; `lint`, `format` and the site stay at the root, because they are repository-wide.
Compiler options live in `tsconfig.base.json`, which every package extends.

### M3 — Each platform releases on its own tag

A merged pull request is still the unit of release ([ADR 0004](0004-releases.md)), but the version
belongs to the package, not to the repository: `v1.2.0` for the web package, `ios-0.1.0`,
`android-0.1.0`, `flutter-0.1.0`, `rn-v0.1.0`. A fix in CSS does not bump Swift.
`scripts/next-version.mjs` stays the single source of the bump rule and reads the manifest of the
platform being released.

### M4 — Every rule gets an equivalent, or it stops being a rule

ADR 0001 R5 (no raw value where a scale exists) and ADR 0002 C1–C3 apply on all five platforms.
Since "the lint is the contract", each package carries a linter that enforces them in its own language
— SwiftLint, ktlint, `custom_lint`, ESLint. A platform without that enforcement is a platform where
the rules are decoration.

### M5 — The Swift manifest lives at the root

Swift Package Manager resolves `Package.swift` from the repository root only. The manifest therefore
sits at the root and points at `packages/ios/Sources/JvdmUI`. This is the single concession the
layout makes to a toolchain, and it is the one that avoids a second repository.

## Consequences

- A token rename is one commit that touches five packages, and CI can see all five.
- The React package keeps its name, version, `exports` map and published tarball: consumers see
  nothing.
- A platform is allowed to be behind, but not silently — what is missing is declared, with an owner.
- Adding a component is now five times the work it was. That is the real price of parity, and it is
  paid deliberately rather than discovered later.
