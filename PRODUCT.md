# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences, all confirmed as real and none subordinate to the others:

1. **External developers evaluating the package.** They arrive at npm or the GitHub Pages site
   cold, comparing against shadcn/ui, Radix and MUI, and decide in well under a minute. For them the
   documentation site is sales material, not reference material — they read it before they install
   anything.
2. **The author's own products.** The package was extracted from an auction marketplace codebase
   (the origin of the `gavel` preset) and is consumed by several applications that pin its version.
   Their needs are concrete and they are the only consumers who feel a breaking change.
3. **Technical portfolio visitors.** The docs site doubles as evidence of the author's competence.
   Depth that can be demonstrated counts here, not only depth that is used.

These pull in different directions and the tension is deliberate: audience 1 wants generality and
persuasion, audience 2 wants stability, audience 3 wants demonstrable range. Work that serves only
one of the three is incomplete.

## Product Purpose

A React 19 + Tailwind v4 design system distributed as a public npm package, where the visual
contract is a set of tokens a consumer fully owns and the structural rules are enforced
mechanically. Success is a consumer who can adopt their own brand — colors, spacing rhythm, type
scale, radii, tracking, weights, font — without patching CSS from the outside, and who cannot
accidentally drift out of the system while doing it.

## Positioning

Two claims, and the order between them is load-bearing: **the rules are enforced, and that
enforcement costs no freedom.**

- _The rigor comes first._ No odd values, no raw colors, one component per folder, no code comments,
  no deep imports — not documented as convention but failed in CI by lint rules. The library holds
  itself to every rule it asks of its consumers. This is the rarer half and the one a neighboring
  library cannot truthfully copy, because it is a property of the codebase, not of the README.
- _The malleability is the proof._ A theme is a JSON object that becomes a Tailwind `@theme` block
  at build time, so a consumer can **add** tokens, not merely repaint the ones that shipped.

The second claim exists to demonstrate the first is not a cage. Design work must communicate rigor
before it communicates flexibility.

## Operating Context

Consumers install from npm, import `jvdm-ui/tokens.css`, and must add a `@source` directive pointing
at `node_modules/jvdm-ui/dist` — Tailwind v4 skips `node_modules` in content detection, so omitting
it renders the UI unstyled with no error anywhere. Themes are authored as JSON and applied at build
time; the `jvdm-ui` CLI emits a theme from a `.json` file. A stored theme is applied before first
paint via `applyStoredTheme()` to avoid a flash of the wrong mode.

Evaluation happens at the GitHub Pages documentation site, which imports `src/` directly through
Vite aliases rather than `dist/`, making it a real consumer of the public API: a component that
cannot be demonstrated there without reaching past that API is a finding about the API.

## Capabilities and Constraints

- Four layers with downward-only dependency: `tokens <- atoms <- molecules <- organisms`.
  `theme/` stands apart and imports nothing but itself. `eslint-plugin-boundaries` fails the build
  on any crossing.
- The package knows no app. No `@shared/`, `@features/`, `@app/` or router imports; a component that
  knows a domain belongs in the consuming application.
- Every color token is declared exactly once via `light-dark()`; mode switching lives in
  `color-scheme` alone. Re-declaring a token under `[data-theme]` reintroduces a specificity bug
  that silently defeats consumer overrides in light mode only.
- `light-dark()` sets the browser floor at Chrome 123 / Safari 17.5 / Firefox 120 (all 2024).
  Older browsers render the dark palette regardless of preference. Documented floor, not a bug.
- Five modules use React hooks and are bundled behind a `"use client"` boundary inside the build
  (`dist/client/*`), invisible in the public import path. Adding a hook to a component outside that
  list breaks consumers' Server Component builds, and it fails in their build rather than this one.
- Adding a semantic token changes the public contract: minor version, README entry, ADR.
- A merged pull request is the unit of release; a direct push to `main` publishes nothing.
- Governance is the six ADRs under `docs/adr/`. They are the standing norm, not history, and they
  outrank every other instruction. Changing a rule means revising an ADR in the same change — the
  lint config is never loosened to close a task.

## Brand Commitments

- Name `jvdm-ui`, author João Vitor Duarte Mariucio, MIT.
- Code, documentation and default UI strings are in English, and stay that way.
- Text a component says on its own lives in that folder's `locales.ts` **and** is overridable by an
  optional prop, because the package is public and not every consumer speaks English.
- **The default preset carries no brand color.** Confirmed by the user against ADR 0003 T2: the
  default may develop a real visual point of view through typography, rhythm, radius, density and
  motion, but its palette stays neutral so it never hijacks a consumer's own color. Chromatic status
  colors (`ok`, `warn`, `danger`, `info`) are exempt — they carry meaning, not identity.
- `gavel` is the navy-and-gold identity of the originating marketplace, and is one named preset among
  others rather than the default.

## Evidence on Hand

- Working source for 40+ components across four layers, plus `defineTheme`, the preset build and the
  CLI. This is real and demonstrable; nothing needs to be invented to show the system working.
- Six accepted ADRs recording the reasoning behind the boundary, the code shape, the token contract,
  the release rule, the Server Component boundary and the theme contract.
- One shipped preset (`gavel`) proving the theming path end to end.
- No usage metrics, download counts, adoption numbers, testimonials, customers or benchmarks exist.
  Future work must not fabricate any of these, and must not imply adoption that has not happened.

## Product Principles

1. **A rule that is not enforced is a wish.** If something matters, it fails CI; if it cannot fail
   CI, it is documented as a decision in an ADR, not as a comment in code.
2. **The consumer owns every value; they cannot remove a scale.** Malleability is total inside the
   system and unavailable outside it.
3. **The package knows no app.** Domain knowledge is the consuming application's, always.
4. **The default must not be someone's brand.** A generic package whose default is one client's
   identity is that client's package with a public name.
5. **Friction where it protects the system is intended.** Adding a component costs more than writing
   markup in a screen, and that is the point.

## Accessibility & Inclusion

No product-specific standard was established with the user in this round. The request that prompted
this record asked for accessibility to be excellent, which the design work treats as WCAG 2.2 AA as
the floor across both color modes, keyboard paths and reduced-motion — recorded here as the working
assumption, not as a confirmed product requirement.
