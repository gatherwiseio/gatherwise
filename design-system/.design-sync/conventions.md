# Gatherwise design system — how to build with it

An editorial, "classical" system: **Cormorant Garamond** (display serif) + **Karla**
(body sans) on a warm parchment palette. Ink (`#2a2723`) and gold (`#b8935f`) on
cream (`#fdfaf4`) / parchment (`#f6efe0`).

## Setup

- **No provider or wrapper is required.** Components read no React context.
- Import the design system stylesheet **once** at the app root:
  `import "@gatherwise/design-system/styles.css";`. It defines every design
  token on `:root`, loads the two font families (remote `@import`), and carries
  all component styles. Without it, components render unstyled.
- Import components by name: `import { Button, ComparisonTable } from "@gatherwise/design-system";`.

## Styling idiom — tokens, not utility classes

Components are fully styled internally. Style **your own** layout glue (sections,
grids, spacing) with the CSS custom properties below — never invent hex values,
and never restyle a component's internals. Read the bundled `styles.css` for the
full set before adding new color/spacing.

| Token | Use |
|---|---|
| `--gw-cream` / `--gw-parchment` | page + panel backgrounds (light) |
| `--gw-ink` / `--gw-ink-hover` | dark backgrounds, primary text |
| `--gw-gold` / `--gw-gold-hover` | accent fills, eyebrows, marks |
| `--gw-muted` / `--gw-muted-soft` / `--gw-muted-faint` | secondary text, tiers of quiet |
| `--gw-font-display` | Cormorant Garamond — headings only |
| `--gw-font-body` | Karla — everything else |
| `--gw-gutter` | responsive page side padding |
| `--gw-section-y` | responsive vertical section rhythm |

Dark sections (`background: var(--gw-ink)`) use `--gw-parchment` for text and
the `gold`/`ghost` button variants. On light sections use `primary`/`large`.

## Components

`Button` (variant: `primary` | `large` | `gold` | `ghost` | `link`), `Eyebrow`,
`Heading` (size: `display` | `section` | `sub`, with `Heading.Accent` / `Heading.Quiet`
inline spans), `Chip`, `FeatureMark`, `EventCard`, `ComparisonTable`,
`PositioningCard`, `WinCard`, `PricingColumn`, `CalloutCard`, `CTASection`,
`Footer`. Read each component's own doc for its props before composing it.

## One idiomatic build snippet

```tsx
import { Eyebrow, Heading, Button } from "@gatherwise/design-system";

<section style={{ padding: "var(--gw-section-y) var(--gw-gutter)", background: "var(--gw-cream)" }}>
  <Eyebrow>Pricing snapshot</Eyebrow>
  <Heading size="section">
    Similar price. <Heading.Accent>Very different</Heading.Accent> amount of work covered.
  </Heading>
  <Button variant="large" href="/signup">Start free trial</Button>
</section>
```
