<div align="center">

# jvdm-ui

**One design system, one source of tokens, one implementation per platform.**

[![npm](https://img.shields.io/npm/v/jvdm-ui?color=0b7285)](https://www.npmjs.com/package/jvdm-ui)
[![license](https://img.shields.io/npm/l/jvdm-ui?color=0b7285)](./LICENSE)

[Documentation](https://joaoduartemariucio.github.io/jvdm-ui) · [The React package](./packages/web) · [The ADRs](./docs/adr)

</div>

---

This repository is the whole design system. Each platform is a package in `packages/`, released on
its own tag, built from the same token source and held to the same component contract.

| Package                                            | Platform              | Status             |
| -------------------------------------------------- | --------------------- | ------------------ |
| [`packages/tokens`](./packages/tokens)             | the token source      | internal           |
| [`packages/web`](./packages/web)                   | React 19 + Tailwind 4 | published to npm   |
| [`packages/react-native`](./packages/react-native) | React Native          | scaffold, 1 of 106 |
| [`packages/ios`](./packages/ios)                   | SwiftUI (SwiftPM)     | scaffold, 1 of 106 |
| [`packages/android`](./packages/android)           | Jetpack Compose       | scaffold, 1 of 106 |
| [`packages/flutter`](./packages/flutter)           | Flutter               | scaffold, 1 of 106 |

Why one repository and not five: a design system stops being a system the moment its platforms can
drift without anything noticing. Tokens are generated from a single source, every component declares
the same contract, and CI fails when a platform falls behind — none of which survives a split across
repositories.

## Commands

| Command                           | What it does                              |
| --------------------------------- | ----------------------------------------- |
| `npm run build`                   | builds the published packages             |
| `npm run tokens`                  | regenerates every platform's token file   |
| `npm run contracts`               | re-extracts the component contracts       |
| `npm run parity`                  | fails when a platform falls behind        |
| `npm run typecheck`               | types only                                |
| `npm run lint` / `lint:fix`       | ESLint, including the design-system rules |
| `npm run format` / `format:check` | Prettier                                  |
| `npm run test` / `test:coverage`  | the test suites                           |
| `npm run site:dev`                | the docs site at localhost:5173           |
| `npm run site:build`              | the docs site into `site-dist/`           |

A command scoped to one package takes the workspace flag: `npm run build -w jvdm-ui`.

## The rules live in the ADRs

`docs/adr/` is not history, it is the standing norm: the four layers, the token contract, the
theming model, the release unit. [`AGENTS.md`](./AGENTS.md) summarises them for anyone — human or
agent — working in here.

## License

MIT, see [LICENSE](./LICENSE).
