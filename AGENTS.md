<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Gatherwise, the product

Gatherwise is planning and sales software (with a CRM) built specifically for **event and wedding
planners** — not the wider events industry (venues, caterers, florists, photographers all have their
own competing tools; Gatherwise deliberately doesn't try to serve them). Around 75% of the customer
base runs weddings, 25% runs other events (corporate, galas, fundraisers, milestone parties), so
product copy should default to neutral nouns (event, client, guest list) and treat weddings as one
example among several rather than the assumed case — see the `gatherwise-doc-article` skill's "Write
event-agnostic, not wedding-only" section for the fuller version of this rule.

**Core surfaces:**
- `app.gatherwise.io` — the product itself, built on Bubble.io (not this repo). Timelines (multi-day
  event schedules with per-item responsible vendor/guest/client-team assignment, TBD times, and
  filtered/PDF export so each recipient gets only their own call times), tasks, budgets, guest lists,
  seating charts, proposals, contracts, invoicing, vendor and guest management, and a native iOS/Android
  app for event day.
- `gatherwise.io` — the marketing site, which **is** this repo (`gatherwiseio/gatherwise`), a Next.js
  App Router site deployed on Vercel. It has two parallel visual systems (site-wide brand vs. an
  editorial ink/gold system used by `/compare/*` and `/features/*` pages) — see the
  `gatherwise-implement-design-handoff` skill for the full breakdown before building a new marketing
  page here.

**Pricing model, and why it's the headline differentiator:** a flat monthly subscription
(Professional $59/mo for up to 40 events; entry plan from $29/mo), not per-project billing. Several
competitors (Aisle Planner among them) charge per project, so their bill scales with the planner's
book of business — Gatherwise's flat pricing is the thing most comparison pages lead with. Figures are
current as of mid-2026 per the `/compare/*` pages; re-verify before quoting them in anything new.

**Named competitors** (each has a `/compare/<slug>` page in `app/compare/`): Aisle Planner, Harpsen,
HoneyBook, Planning Pod, Rock Paper Coin, Timeline Genius.

**Founder context:** Alex Lee (alex@gatherwise.io) and co-founder Stephanie Chang.
