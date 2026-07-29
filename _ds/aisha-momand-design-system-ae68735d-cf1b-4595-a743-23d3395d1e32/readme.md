# Aisha Momand — Portfolio Design System

A design system extracted from Aisha Momand's personal UX/product-design portfolio ("Portfolio - Final.fig"). Aisha is a product/UX designer (enterprise + data systems, master's in UXD, ex-Stantec); the site is a warm, editorial portfolio: cream pages, navy serif headings, one coral accent, a "Selected Works" grid, and long-form case studies.

**Source scope:** import was narrowed to 5 frames — `/Designs`, `/Designs/1`, `/Designs/4`, `/Designs/5`, `/Designs/Desktop`. `/Designs/Desktop` is the desktop homepage; `/Designs/1`, `/5`, `/4` are the "Kindex" case-study page at 1440/744/440px. Other Figma pages (Components, V3, Version-1, Version-2, Study-Spot) were **out of scope** — see "Intentional additions / exclusions."

## Architecture

**Token model — two tiers.** `tokens/colors.css` separates:
1. **Primitives** (`--navy-900`, `--coral-500`, `--sand-200`) — raw values named hue+step. Never referenced by components.
2. **Semantic tokens** (`--text-body`, `--surface-page`, `--action-primary-hover`, `--focus-ring`) — role-based aliases. Components reference *only* these, so a rebrand is a one-file change.
Deprecated aliases are kept at the bottom of the file for backward compatibility and are marked "do not use."

**Naming rules:**
- Primitives: `--{hue}-{step}` (steps follow Tailwind-style lightness ordering: 50 lightest → 950 darkest).
- Semantic: `--{category}-{role}[-{state}]` — categories are `text`, `surface`, `action`, `border`, `focus`.
- Accent-on-context tokens (`--text-accent-on-light` / `--text-accent-on-dark`) exist because no single coral passes WCAG AA on both cream and navy; the suffix names the *background* it is safe on.
- Components: PascalCase, one directory per concern (`brand/`, `core/`, `navigation/`), each with `Name.jsx` + `Name.d.ts` + `Name.prompt.md`.

## Index
- `styles.css` — global entry; imports everything under `tokens/`
- `tokens/` — `colors.css` (primitives + semantic), `typography.css` (families + type-scale shorthands; display sizes are fluid `clamp()` — desktop max, ~55–70% mobile floor; body/label sizes are fixed with a 16px readability floor), `spacing.css` (spacing/radius/shadow/layout)
- `components/brand/` — Logo · `components/core/` — Button, Tag, MetaField, ProjectCard · `components/navigation/` — Link, Footer
- `templates/long-form-page/` — generic reusable page template (case study, article, write-up)
- `templates/long-form-page-mobile/` — same template composed for a 390px mobile viewport
- `guidelines/` — foundation specimen cards
- `ui_kits/portfolio/` — Homepage.html, Homepage Mobile.html (generic screen templates)
- `assets/` — logo-mark.png, hero-illustration.svg, `case-studies/`
- `thumbnail.html`, `SKILL.md`

## Card taxonomy (Design System tab)
Groups are a small, fixed, mutually exclusive set — one axis (what kind of thing is this?), no overlaps:
**Brand** (marks, illustration) · **Color** · **Type** · **Spacing** · **Surface** (radii, placeholders) · **Components** (live component specimens) · **Screens** (full-page recreations).
Rules: a card belongs to exactly one group; new foundation concerns get a new group only if no existing one fits; component cards are named after their directory ("Core Primitives", "Navigation"), not repeated per component.

## Components
- **Logo** — circular portrait mark (PNG) + wordmark
- **Link** — nav text link; hover/focus underline parity, `aria-current="page"` when active, 44px tap target
- **Button** — `variant` (primary/secondary/ghost) × `size` (sm/md/lg) × states (hover/active/focus/disabled); interaction colors come from `--action-*` tokens
- **Tag** — uppercase metadata badge
- **MetaField** — label/value pair for fact grids
- **ProjectCard** — works-grid tile (media, serif title, tag row)
- **Footer** — navy contact footer with SVG arrow links and SVG © mark
API conventions: variants via props, never duplicate components; every prop documented in the sibling `.d.ts`; usage + rationale in `.prompt.md`.

### Intentional additions / exclusions (final — not a TODO)
The Figma file's full METADATA lists 19 component families (Controls/Buttons, Text Fields, Search Bars, StatusBar, Chips, icon symbols…). **All of them live on pages excluded from this import's scope.** The in-scope frames contain only generically named layout frames ("Container", "Paragraph") plus one named "Link". The 7 components above are the complete inventory for the in-scope designs:
- **Link** — 1:1 with the source's "Link" layer.
- **Logo, Tag, MetaField, ProjectCard, Footer** — intentional additions; the source names these only "Container"/"Group", which would be meaningless as public API.
- **Button** — intentional addition with no source counterpart (the source uses only text links); added so consumers have a real interactive control.
This will not change unless the other Figma pages are attached — do not re-flag as incomplete.

## Templates
`templates/long-form-page/` is deliberately **generic**: hero + tag row, optional meta grid, alternating content/media sections, optional CTA footer. It serves case studies, articles, and project write-ups through configurable sections (`showMeta`, `showCta` tweaks) rather than a single-purpose "Case Study" template. New templates should follow the same rule: configurable sections over content-specific layouts.

## Governance — adding to the system
1. **New color?** Add a primitive, then a semantic alias; components use the alias. Check AA contrast against every surface it will sit on (see Accessibility).
2. **New component?** `components/<group>/<Name>.jsx` + `.d.ts` + `.prompt.md`; add it to that group's card; prefer a variant on an existing component first.
3. **New card?** Tag with exactly one taxonomy group; ~700px wide, small and focused (one sub-concept per card).
4. **Never** hand-edit `_ds_bundle.js` / `_ds_manifest.json` (generated), or reference primitives from components.

## Content fundamentals
First-person, direct, quietly confident — never salesy. Short declaratives: *"I cut the complexity."* Work described plainly (*"I designed an end-to-end interface for a solar farm design tool"*), backed by real numbers (*"$50 billion,"* *"80% of business cards"*). Labels are terse lowercase eyebrows (*role, team, timeline*) rendered uppercase via CSS. The footer signs off with dry humor: *"Created with love, coffee, and the occasional existential crisis about button placement."* No emoji. Sentence case for prose; uppercase only for small labels.

## Visual foundations
- **Color:** warm cream page (`--surface-page`), deep navy as the single brand anchor (headings, nav, footer), coral as the lone accent — always via the AA-safe `--text-accent-on-*` pair for text. Slate/navy-700 body copy, never pure black. Sand stands in for unloaded media.
- **Type:** Cormorant Garamond for all display/headings and the hero statement (weight 500–700); Inter for body, labels, links. Two families max per page. Hero line mixes navy + coral spans in one heading.
- **Backgrounds:** flat color only — no gradients; the footer is a solid navy block.
- **Imagery:** homepage project cards intentionally ship with the sand placeholder (art added per-project — do not invent thumbnails); case-study pages carry real screenshots as `<img>` with alt text. One hand-drawn navy line illustration accompanies the hero.
- **Motion/hover/press:** minimal — underline on hover/focus for links; Button darkens + scales 0.97 on press. Nothing else.
- **Borders/shadows:** hairline `rgba(255,255,255,.2)` outlines on media tiles; near-invisible navbar shadow; inset vignette on framed screenshots; no card drop shadows.
- **Radii:** 4px badges · 14px project-card media · 24px case-study media/panels. Nothing rounder.
- **Layout:** centered 1280px container, 80px page gutters, 60px section rhythm, two-column grids for works/comparisons.

## Iconography
No icon system exists in the scoped source. Vector art = the logo mark + hero illustration (copied to `assets/`). Functional glyphs (link arrow, © mark) are small inline SVGs drawn in-component at 1.5–2px stroke, `currentColor` — follow that pattern for any new glyph; do not add a third-party icon set without checking the out-of-scope Figma pages first.

## Accessibility — status
All audit findings fixed:
- AA-safe coral text tokens (`--text-accent-on-light` #d9503f, `--text-accent-on-dark` #ff9086); Tag text darkened to navy-700 on butter (8.1:1).
- `lang="en"` on all screens; homepage has a real `<h1>`; heading levels sequential.
- `Link`: `aria-current="page"`, focus/hover parity, 44px targets. `Button`: visible `--focus-ring` outline.
- Case-study imagery is `<img>` + descriptive alt; skip-to-content links into `<main>` landmarks.
- `Logo` uses `alt=""` only because the adjacent wordmark names it (documented in its prompt.md).
Contrast reference: navy-900/cream 10.1:1 · navy-700/cream 8.6:1 · white/navy 10.4:1.

## Fonts
Cormorant Garamond, Tinos, and Inter load unmodified from Google Fonts via `styles.css` — no substitutions.
