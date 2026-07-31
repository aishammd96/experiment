# Aisha Momand Portfolio — Project Handoff

This file is the working context for future Claude sessions. Read it before changing the site.

## Project and deployment

- Repository: `aishammd96/experiment`
- Production domain: `https://www.aishamomand.com`
- GitHub Pages source: `main`, repository root
- Former Pages URL: `https://aishammd96.github.io/experiment/`
- The custom domain was moved from `ux-portfolio` to this repository. Do not reconnect it to `ux-portfolio`.
- Local preview: `npx -y serve -l 8124 .`
- There is no build step. The site is static HTML/CSS with inline React JSX compiled in the browser by Babel.
- Preserve unrelated local files and changes, especially `.DS_Store` and the existing untracked `.claude/launch.json`.

## Main pages

- `index.html` — homepage and selected work
- `kindex.html` — Kindex case study
- `about.html` — about Aisha and Ora
- `resume.html` — resume
- `play.html` — AI-sha chat and guided contact experience

Navigation and global footers should use `play.html` as the single obvious connection destination, labelled “Let’s Connect.”

## Design system

The shared system lives in:

`_ds/aisha-momand-design-system-ae68735d-cf1b-4595-a743-23d3395d1e32/`

Important files:

- `tokens/colors.css`
- `tokens/typography.css`
- `tokens/spacing.css`
- `tokens/motion.css`
- `styles.css`
- `_ds_bundle.js` for the shared React components used by the pages

Visual direction:

- Warm editorial brutalism: strong navy rules, compact hard-edged controls, offset shadows, coral actions, butter highlights.
- Cormorant Garamond is the display typeface; Inter is the body/interface typeface.
- Use the shared fluid type scale. Mobile should preserve the desktop hierarchy at a smaller scale rather than inventing a separate hierarchy.
- Mobile page gutters are approximately `20px`.
- Keep numbering badges, navigation spacing, action treatments, and heading levels consistent between pages.
- Avoid decorative blobs. Gradients should be restrained and structural rather than floating decoration.
- Use the logo asset at `assets/logo_navy_bluebckg.png` beside AI-sha messages.
- Keep the custom cursor working on every page.
- The global navy footer contains “Let’s Connect,” LinkedIn, the copyright line, and the dry-humour signoff.

## AI-sha experience

`play.html` is intentionally a page-level experience, not a modular card.

Current empty state:

- Heading: “Connect with AI-sha”
- The heading is horizontally centred.
- Once the visitor starts a conversation, the heading collapses and fades away so the transcript shifts upward and gains more usable space.
- The message composer stays visible at the bottom of the viewport while the transcript scrolls independently.

Starter prompts:

1. “Tell me about your work”
2. “What’s your design process?”
3. “I want to contact you”

The starter prompts return after a contact email is sent.

AI endpoint:

`https://ai-sha-api.aisha-mmd96.workers.dev/chat`

The Cloudflare Worker is named `ai-sha-api` and uses Workers AI with `@cf/meta/llama-3.2-3b-instruct`.

Allowed browser origins must include `https://www.aishamomand.com`, `https://aishamomand.com`, the legacy GitHub Pages origin, and the local port `8124` origins. Origin values are normalized before CORS checks. If the production domain changes, update the Worker allowlist at the same time.

AI requests used by the site:

- Default chat: `{ message, history }`

The guided contact flow does not send the visitor’s message to the AI Worker. It keeps the message in browser state until the visitor reviews the final draft and chooses to send it.

Safety requirements:

- AI-sha speaks in first person as Aisha’s portfolio guide.
- Never invent work, tools, research methods, outcomes, or personal facts.
- If the portfolio does not document something, say so instead of guessing.
- Never expose private chain-of-thought. “Why this answer?” shows a concise evidence summary only.
- External links should render as subtle brutalist link buttons rather than raw URLs.

Verified personal content includes Ora, Aisha’s female cat: clumsy, convinced she is human, interrupts meetings, drinks only from glass cups, gets into tricky situations, and takes up most of the bed.

## Guided contact flow

The contact experience is conversational, not a traditional form.

Sequence:

1. First and last name
2. Reply email
3. Topic: project/collaboration, role/opportunity, portfolio question, or custom “Something else”
4. Visitor writes the message they want to discuss and is told it can be edited later
5. Timing
6. Full editable subject and email preview
7. Visitor explicitly presses “Send to Aisha”

Only the newest set of contact suggestion buttons should remain visible.

Email delivery:

- Recipient: `aisha.momand1@gmail.com`
- Service: FormSubmit AJAX endpoint
- Nothing is sent until the visitor reviews the complete draft and presses send.
- The subject and every word of the body remain editable.

## Voice and content

- Warm, grounded, personal, and professional.
- Sound like a thoughtful 30-year-old woman from Toronto.
- Use “I” and “my,” not third-person references to Aisha.
- Natural phrases such as “Hmm,” “Honestly,” or “For me” are acceptable when used sparingly.
- Prefer direct, human language over corporate filler.
- Dry humour is welcome, especially around Ora or the footer, but do not overdo it.

## Change and verification checklist

Before publishing:

1. Run `git diff --check`.
2. Test desktop and mobile layouts.
3. Confirm the transcript scrolls without elongating the page.
4. Confirm long input wraps and the composer grows only to its maximum height.
5. Test all three starter prompts.
6. Test the contact message, timing choice, and editable final draft.
7. Do not send a real test email unless explicitly requested.
8. Stage only files related to the requested change.
9. Push `main` to publish through GitHub Pages.
10. Verify the production page through `https://www.aishamomand.com`.

## Current intentional decisions

- `experiment` is the production repository despite its name.
- “Let’s Connect” replaces separate Contact and Play navigation destinations.
- AI-sha is introduced as a portfolio guide and contact-writing assistant, not as the real Aisha.
- The Play heading disappears after conversation starts.
- The contact flow does not polish or rewrite the visitor’s message.
- The final email remains human-controlled and editable.
- No decorative blobs.
