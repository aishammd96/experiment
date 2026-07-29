# Navbar

Sticky header used on every page (Home, About, Resume, Kindex). Replaces four hand-built, drifting copies of the same header with one component driven by page state instead of per-page markup.

## Why it exists
Every page previously hand-rolled its own navbar JSX; they had begun to drift (different logo sizes, different mobile breakpoints). `Navbar` owns the responsive behavior itself — a page passes only `activePage` and gets a correctly-sized, correctly-collapsed header back.

## Responsive rule
Single breakpoint at **1000px**, raised from an earlier ~768px cutoff: at 1000px the desktop link row (Work / About / Resume / LinkedIn / Contact) starts crowding the logo, so the hamburger now takes over earlier instead of squeezing text.
- `< 1000px`: logo at 36px + hamburger. Tap expands a stacked menu (each link ≥44px tap target, inherited from `Link`).
- `>= 1000px`: logo at 46px + full inline row, single line.
Both sizes are a step up from the component's earlier 32/40px — the mark reads better at the header's current padding.

## Visual treatment
- `position: sticky; top:0` — stays pinned through long, scrolling case-study pages.
- Frosted glass via the new `--surface-navbar-glass` token (`color-mix(in oklch, var(--surface-page) 70%, transparent)`) + `backdrop-filter: blur(16px) saturate(160%)`.
- A fixed noise-grain overlay (inline SVG `feTurbulence`, 3.5% opacity) — breaks up the flat blur so it doesn't read as a plain glass panel. This is the one new visual primitive introduced by this pass; not derived from an existing token.
- Bottom edge is a near-invisible `--shadow-navbar`, no card-style drop shadow (matches the system's "no card drop shadows" rule).

## Usage
```jsx
const { Navbar } = window.AishaMomandDesignSystem_ae6873;
<Navbar activePage="about" />
```
Each page sets only its own `activePage` (`"work" | "about" | "resume"`) — no other nav code needed per page.

## Notes / non-goals
- The custom mouse cursor (dot + ring follower) used sitewide is intentionally **not** part of this component — it's a page-level `position:fixed` overlay unrelated to header layout; keep it a separate include.
- Requires `--surface-navbar-glass` (see `colors-token-addition.css` in this package) and `--shadow-navbar` (existing token).
