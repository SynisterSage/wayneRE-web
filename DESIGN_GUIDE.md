# Wayne NJ Real Estate Design Guide

This guide defines the current visual direction for the WayneNJRealEstate.com redesign. It is intentionally restrained and should evolve gradually as sections are added.

## Core Direction

- Editorial
- Boutique
- Warm
- Local
- Calm
- Typography-led
- Spacious

The site should feel like a focused local advisor, not a generic realtor template or a sales funnel.

## Color Palette

Use the palette below as the foundation for all new UI.

- `brand-cream`: `#FDFCF8`
  - Main canvas
  - Feels like archival paper
- `brand-lake`: `#2C4A52`
  - Primary CTA color
  - Subtle neighborhood accent
- `brand-sand`: `#F5F2ED`
  - Section and card background
  - Soft hierarchy without harsh contrast
- `brand-sage`: `#E8EDE7`
  - Decorative blocks
  - Image underlays
- `stone-900`: `#222A2F`
  - Headlines and body copy
- `stone-700`: `#5C656A`
  - Supporting text
- `stone-300`: `#D9D3CA`
  - Borders and rules
- `stone-100`: `#EEEAE3`
  - Hairline section separators

Avoid pure black and bright white.

## Typography

### Serif

- `Playfair Display`
- Use for `H1` and `H2`
- Reserve italic spans for emphasis and place names

### Sans

- `Inter`
- Use for body, navigation, forms, and UI labels

### Utility Labels

- Small uppercase text
- Wide tracking
- Strong weight
- Use for things like:
  - neighborhood labels
  - section tags
  - process notes

## Spacing

The layout should breathe.

- Major sections: `py-32` equivalent
- Container: `max-width: 7xl` equivalent with side padding
- Use large gaps between text and imagery
- Prefer fewer, larger blocks over dense card grids

Recommended spacing targets:

- Section padding: `128px`
- Large internal gaps: `64px` to `96px`
- Narrow text widths where needed

## Layout Rules

- Use semantic HTML
- Keep sections clearly separated
- Favor editorial asymmetry over centered symmetry
- Allow images to bleed or offset when useful
- Keep the header and nav calm and simple
- Avoid heavy shadows and glass effects

## Buttons

### Primary

- Background: `brand-lake`
- Text: light or near-white
- Sharp corners
- Use for the most important action

### Secondary

- Transparent or surface background
- Thin border
- Sharp corners
- Use for supporting actions

## Imagery

Imagery should feel:

- local
- architectural
- seasonal
- grounded
- natural

Prefer:

- Wayne neighborhoods
- Packanack Lake
- tree-lined streets
- tasteful interiors

Avoid:

- flashy luxury stock
- generic realtor smiles
- overly saturated imagery

## Voice

Copy should sound:

- grounded
- informed
- neighborly
- strategic
- concise

Prefer language like:

- strategic prep
- local rhythms
- neighborhood context
- architectural appreciation
- community transition

Avoid phrases like:

- dream home
- luxury experience
- seamless journey
- cutting-edge tools
- premier property

## Implementation Notes

- The current codebase uses CSS variables in `src/styles/tokens.css`
- Treat this guide as the source of truth for future sections
- Update tokens first, then component styling
- Keep changes incremental and easy to revise

## Current Token Reference

```css
:root {
  --color-brand-cream: #fdfcf8;
  --color-brand-lake: #2c4a52;
  --color-brand-sand: #f5f2ed;
  --color-brand-sage: #e8ede7;
  --color-stone-900: #222a2f;
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

