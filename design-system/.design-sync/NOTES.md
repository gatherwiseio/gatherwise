# Gatherwise design system — sync notes

Repo-specific gotchas for future `/design-sync` runs of `@gatherwise/design-system`.

## Build / environment
- Package lives at `design-system/` inside the `gatherwise` repo (a Next.js app). Run all sync commands **from `design-system/`** — `.design-sync/`, `.ds-sync/`, and `ds-bundle/` all live there.
- Build: `npm run build` (tsup) → emits `dist/index.js` (ESM) + `dist/index.d.ts`. Under `"type": "module"` tsup names the ESM output `index.js`, so the converter entry is `--entry ./dist/index.js` (NOT `.mjs`).
- `--node-modules ./node_modules` (the package's own; `react` resolves there).
- This environment gates npm install scripts: after `npm i` of the converter deps, run `npm approve-scripts esbuild` in `.ds-sync/` or esbuild's native binary won't be present.
- The root `tsconfig.json` excludes `design-system`, and the app has no import of it, so the DS never affects `next build` / the Vercel deploy.

## Known render warns (triaged legitimate — a warn NOT in this list is new)
- `[FONT_REMOTE] "Karla", "Cormorant Garamond"` — expected. Fonts load via a Google Fonts `@import` at the top of `styles.css`; nothing is shipped in `fonts/`. This is intentional, not a `[FONT_MISSING]`.
- `cardMode: column` overrides on `Heading`, `PricingColumn`, `WinCard` — their wide multi-column stories (`Display`, `SideBySide`, `Grid`) overflow a grid cell otherwise. Set in `cfg.overrides`.

## Re-sync risks (what can silently go stale)
- **Preview content is hand-authored** from the Timeline Genius comparison page copy (`app/compare/timeline-genius`). It is illustrative marketing copy, not live data — safe, but if the components' prop APIs change, the `.design-sync/previews/*.tsx` must be updated to match (they import from the built package).
- **Remote fonts**: if Google Fonts is unreachable at render time, previews fall back to system serif/sans. Re-check the contact sheet if fonts look wrong.
- **13 components, all authored + graded good** on first sync. No floor cards.
