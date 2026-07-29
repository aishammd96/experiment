# Design system update package

Files to copy into the Aisha Momand Design System project:

1. **Navbar.jsx / Navbar.d.ts / Navbar.prompt.md** → `components/navigation/`
   Reusable Navbar component (glass/blur/noise sticky nav, desktop + mobile variants). Replaces the hand-rolled, drifting navbar markup duplicated across Home, About, Resume, and Kindex. Now self-contained: owns its own 1000px mobile breakpoint (raised from ~768px) and takes `activePage` instead of a page passing its own link list/active index. Logo sizes bumped to 46px desktop / 36px mobile (from 40/32).

2. **colors-token-addition.css** → append its one line into `tokens/colors.css` (`:root`, near `--surface-media-placeholder`).
   Adds `--surface-navbar-glass` token the Navbar component depends on.

3. **Typography consistency** (no new files — apply by hand in existing templates):
   Consolidate repeated inline font strings into shared style constants, same pattern used in this project's `Kindex.html`:
   - `cardTitleStyle` = `{font:"var(--text-display-sm)",fontSize:22,color:"var(--navy-900)"}` — grid/card titles
   - `cardBodyStyle` = `{margin:0,font:"400 16px/1.6 Inter,sans-serif",color:"var(--text-muted,#62748e)"}` — card body copy
   - `labelStyle` = `{font:"700 12px/1.3 Inter,sans-serif",letterSpacing:1,textTransform:"uppercase",color:"var(--text-accent-on-light)"}` — eyebrow labels
   - `captionStyle` = `{textAlign:"center",font:"italic 400 16px/1.8 Inter,sans-serif",color:"var(--text-muted,#62748e)",margin:0}` — image captions
   Use these across `templates/long-form-page/` and `ui_kits/portfolio/` instead of one-off inline fonts.

4. **footer-refinement.css** → append into `styles.css` (or each page's global `<style>`).
   Adds a subtle grain texture over the Footer component's dark background (matches the navbar's texture) and an arrow-nudge hover animation on its linkedin/email links. No changes to `Footer.jsx` needed — `footer{}` selector targets its root tag directly.

5. **button-radius-token.css** → append into `tokens/spacing.css` (near `--radius-badge`).
   Adds `--radius-button:10px` — a softer, more rounded corner for `Button.jsx` (was using the sharp 4px `--radius-badge`). In `Button.jsx`, change `borderRadius: "var(--radius-badge)"` to `borderRadius: "var(--radius-button)"`.

After copying: register Navbar under the "Components" card group (per SKILL.md governance), regenerate `_ds_bundle.js`/manifest as that project's build step requires.
