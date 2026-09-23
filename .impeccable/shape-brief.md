# Shape brief — jvdm-ui identity, catalog and docs site

Direction chosen by the user: **Generative Parametric Identity**.
Build path: **code-led** (no image generation available in this session).
Language note: this brief is discussion. All code, documentation and default UI strings ship in English.

## 1. Job and audience

Three confirmed audiences, none subordinate (PRODUCT.md):

1. External developers evaluating the package cold, in under a minute, against shadcn/ui, Radix and MUI.
2. The author's own products, which pin a version and feel every breaking change.
3. Portfolio visitors judging competence.

The docs site is one surface serving all three. Its visitor mode is **Persuade** at the top and **Read** below the fold: the first viewport must win a decision, everything after it must be reference a consumer can actually work from.

## 2. Outcome and proof

Primary action: the visitor manipulates the theme seed, watches the entire surface restyle in lockstep, tries to produce an invalid value, and fails.

Success: they understand both claims in the correct order — the rules are enforced, and that enforcement costs no freedom.

Real evidence only. 40+ working components, six ADRs, one shipped preset (`gavel`), `defineTheme` and the CLI. No metrics, downloads, testimonials or adopters exist; none may be implied.

Product-specific truth a neighbour cannot claim: a theme is JSON that becomes a Tailwind `@theme` block at build time, so a consumer **adds** tokens rather than repainting shipped ones — and the structural rules fail CI rather than living in a README.

## 3. Selected direction

**Visual authority:** generative parametric identity. One seed derives palette, rhythm, radius, density, weight and motion; the same seed flows outward so every button, divider, field and heading inherits it.

**Structural thesis, and the resolution of the direction's declared risk:** the seed cannot land between steps. Every parameter is a *scale selector*, never a free number — rhythm steps 4 → 6 → 8, radius walks `xs…xl`, type walks `2xs…display`. The generator is structurally incapable of emitting a raw value. This converts the direction from a contradiction of rigor into its live demonstration, and it is Principle 2 of PRODUCT.md performed instead of described.

**Palette resolution against the brand commitment:** the default preset's chroma axis is clamped to zero. The shipped default derives its identity from typography, rhythm, radius, density and motion only, and stays achromatic, honouring ADR 0003 T2 and the user's confirmed rule. Chromatic seeds live in the playground and in named presets, never in what publishes as default. Status colors (`ok`, `warn`, `danger`, `info`) remain exempt: they carry meaning, not identity.

**Focal moment:** a single parameter move visibly restyles the whole page at once — not a preview swatch, not one card. If any region fails to follow the seed, the demo has lied and the defect is material.

**Implementation consequence:** the playground writes CSS custom properties on a scoped root, reading the same token names `tokens.css` declares. It must not re-declare a color token under `[data-theme]` — that is the specificity bug ADR 0003 removed. Seed → `ThemeConfig` must be the same shape `defineTheme` already consumes, so the panel's output is a valid theme JSON the visitor can copy and ship.

## 4. Scope and boundaries

Three bodies of work, in order:

1. **Default identity in `src/tokens/tokens.css`** — give the default a real point of view through the non-color scales. Adding a semantic token is a minor version plus a README entry plus an ADR; changing an existing value is not.
2. **Catalog expansion** — fill the gaps that keep the catalog from being complete, each component in its own folder under the correct layer.
3. **Docs site rebuild** — currently 619 lines for a 40+ component library. This is the concrete gap behind "extremely complete catalog".

An accessibility pass runs across all three rather than as a fourth phase.

**Untouched:** `eslint.config.mjs` is never loosened to close a task (R6). The four-layer boundary, the release model, the client boundary list and the `locales.ts` + optional-prop rule stay exactly as they are.

**Anti-goals:** no brand color in the default; no webfont in the library default (network and licensing cost pushed onto every consumer — an expressive face may be used by the docs site and by a named preset, while the default keeps a system stack with its own metrics); no fabricated adoption evidence; no code comments anywhere; no `eslint-disable`.

## 5. States and ranges

Every component demonstrated across: both color modes, default and seeded themes, empty, loading, error, disabled, focus-visible, and overflow with realistic maximum content. The empty state is an invitation, not an apology.

## 6. Interaction and layout

The seed panel is persistent and reachable from anywhere in the catalog, not a widget parked in one section. Each token scale is presented in the form its own question demands — a waterfall for type, an arc for radius, a ladder for spacing — never six identical demo boxes. Depth comes from surface tokens and overlap, never from shadow or tone, so both modes stay honest. Every seeded change is a transition, and every transition respects `prefers-reduced-motion`. Each catalog entry carries its provenance: layer, import path, version added, and the ADR that governs it.

## 7. Constraints and open decisions

- WCAG 2.2 AA as the floor across both modes, keyboard paths and reduced motion — recorded in PRODUCT.md as the working assumption, not a confirmed product requirement.
- `light-dark()` sets the browser floor at Chrome 123 / Safari 17.5 / Firefox 120.
- The site imports `src/` through Vite aliases, so it is a real consumer: a component it cannot demonstrate without reaching past the public API is a finding about the API, to be reported rather than worked around.
- ADRs 0005 and 0006 are absent from the AGENTS.md table. Reported, not repaired.
- A builder must not invent: new semantic tokens, a loosened lint rule, a default brand color, or any adoption claim.
