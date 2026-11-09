---
name: Cybernetic Vanguard
colors:
  surface: '#0f131d'
  surface-dim: '#0f131d'
  surface-bright: '#353944'
  surface-container-lowest: '#0a0e18'
  surface-container-low: '#171b26'
  surface-container: '#1c1f2a'
  surface-container-high: '#262a35'
  surface-container-highest: '#313540'
  on-surface: '#dfe2f1'
  on-surface-variant: '#bbc9cf'
  inverse-surface: '#dfe2f1'
  inverse-on-surface: '#2c303b'
  outline: '#859399'
  outline-variant: '#3c494e'
  surface-tint: '#47d6ff'
  primary: '#a5e7ff'
  on-primary: '#003543'
  primary-container: '#00d2ff'
  on-primary-container: '#00566a'
  inverse-primary: '#00677f'
  secondary: '#8bcef9'
  on-secondary: '#00344b'
  secondary-container: '#005d83'
  on-secondary-container: '#95d5ff'
  tertiary: '#b9e3ff'
  on-tertiary: '#00344a'
  tertiary-container: '#89c9f0'
  on-tertiary-container: '#005576'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b6ebff'
  primary-fixed-dim: '#47d6ff'
  on-primary-fixed: '#001f28'
  on-primary-fixed-variant: '#004e60'
  secondary-fixed: '#c6e7ff'
  secondary-fixed-dim: '#8bcef9'
  on-secondary-fixed: '#001e2d'
  on-secondary-fixed-variant: '#004c6b'
  tertiary-fixed: '#c5e7ff'
  tertiary-fixed-dim: '#8ecef6'
  on-tertiary-fixed: '#001e2d'
  on-tertiary-fixed-variant: '#004c6a'
  background: '#0f131d'
  on-background: '#dfe2f1'
  surface-variant: '#313540'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-code:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system projects a high-octane, elite esports and gaming commerce atmosphere. Designed for gamers, competitive teams, and digital entertainment consumers, the aesthetic balances precision fintech trust with the electric energy of cyberpunk and futuristic competitive arenas.

The visual theme combines **High-Contrast Dark Theme** with **Sleek Glassmorphic Neon Accents**:
- Deep void backdrops provide infinite visual depth.
- Luminescent electric cyan and icy plasma highlights cut through low-light environments, giving instantaneous affordance.
- Crisp, mechanical geometry evokes high-end gaming hardware, tactical HUD overlays, and cybernetic interfaces.

## Colors

The palette is engineered specifically for deep OLED/dark-mode fidelity, focusing on high visual hierarchy and tactical luminescence:

- **Primary (`#00D2FF`)**: Electric Cyan. Used for active CTA triggers, focal neon outlines, key interactive states, and glowing brand anchors.
- **Secondary (`#086288`)**: Deep Cyber Blue. Serves as a foundational structural accent, high-contrast borders under resting states, and subdued active badges.
- **Tertiary (`#97D7FF`)**: Glacial Plasma. Used for elevated interactive highlights, hover states, sub-headers, and accent glyphs requiring refined luminescence without saturation overload.
- **Neutral Surface Hierarchy**:
  - `Base Canvas`: `#0B0F19` (Obsidian Void).
  - `Card / Surface Tier 1`: `#111827` (Midnight Base).
  - `Card / Surface Tier 2`: `#161F30` (Tactical Elevation).
  - `Border / Hairline Grid`: `rgba(0, 210, 255, 0.12)` to `rgba(77, 141, 186, 0.24)`.
  - `Text Muted`: `#4D8DBA` for system labels, metadata, and tactical timestamps.
  - `Text Primary`: `#F0F6FC` for uncompromising readability.

## Typography

The design system standardizes on **Space Grotesk** across display, informational, and micro-metric layers to deliver an unapologetic sci-fi, esports-native tone with razor-sharp readability.

- **Numerics & Denominations**: Top-up pricing, currency amounts, and instant instant checkout tiers rely on bold weights with tracking narrowed slightly (`-0.02em`) to echo game HUD telemetry.
- **Labels & Microcopy**: Functional labels and status trackers utilize uppercase tracking (`+0.06em` to `+0.08em`) to enforce military-spec precision.
- **Editorial & Body**: Content preserves balanced line heights (`1.5x`) on body copy to ensure rapid scanning during high-urgency checkout flows.

## Layout & Spacing

The layout follows a modular 12-column responsive grid on desktop, scaling to 6 columns on tablet, and 4 columns on mobile. 

- **Grid Philosophy**: Fluid container with a max bounded width of `1440px` for high-resolution gaming monitors and ultra-wides, centering content within dark atmospheric boundaries.
- **Tactical Grid Density**: Spacers adhere to a strict 4px/8px modular base. Elements maintain high architectural tension—compact padding within top-up item selector matrices, contrasted with expansive breathing room around heroic promotions and corporate identity blocks.
- **Screen Adaptations**:
  - **Desktop (1024px+)**: `margin: 2rem`, `gutter: 1.25rem`. Multi-column game title grids and top-up item cards display in 4-6 card arrays.
  - **Tablet (768px - 1023px)**: `margin: 1.5rem`, `gutter: 1rem`. Catalogs collapse to 3-column layouts.
  - **Mobile (<768px)**: `margin: 1rem`, `gutter: 0.75rem`. Item selector matrices drop to 2 columns with thumb-reachable sticky bottom checkout action bars.

## Elevation & Depth

Visual hierarchy does not rely on soft daylight shadows, but rather on **luminescent backlighting, surface luminosity shifts, and multi-stop cyber glows**:

- **Ground Level (Canvas)**: Solid `#0B0F19` with ambient radial gradients of `#086288` (blur: `160px`, opacity: `15%`) fixed behind hero zones.
- **Tier 1 (Surface Cards / Inactive Modules)**: `#111827` overlaid with a 1px perimeter border of `rgba(77, 141, 186, 0.15)`.
- **Tier 2 (Interactive Floating Elements / Dialogs)**: `#161F30` with a 1px border of `rgba(0, 210, 255, 0.3)` and a soft ambient drop shadow: `0 12px 32px -4px rgba(0, 0, 0, 0.6)`.
- **Tier 3 (Active / Focus / Legendary Tier)**: Cyan Aura Glow. Outlined in `#00D2FF` accompanied by a double-layer drop glow: `0 0 16px rgba(0, 210, 255, 0.35), 0 0 2px #00D2FF`.
- **Glass Overlays**: Tactical popovers and navigation bars implement `backdrop-filter: blur(16px)` with surface fill `rgba(17, 24, 39, 0.82)`.

## Shapes

The design system adopts a **Soft, Angular Profile (`roundedness: 1`)** where corner radii stay low (`4px` base to `8px` container standard, with `12px` maximum on modals).

- This avoids bubbly, casual consumer aesthetics and instead reinforces the hardline, precision edges of gaming monitors, GPUs, and e-sports trophies.
- Interactive elements feature crisp bevels and structured rectangular frameworks with high structural integrity.

## Components

### Buttons
- **Primary CTA (Cyber Glow Button)**: Solid background `#00D2FF` with `#0B0F19` high-contrast bold typography. Hover state triggers a neon corona (`box-shadow: 0 0 20px rgba(0, 210, 255, 0.6)`), subtly scaling (`scale: 1.02`).
- **Secondary (Tactical Outline)**: Transparent background, 1.5px border of `#086288`, text in `#97D7FF`. On hover, the border brightens to `#00D2FF` and fills with `rgba(0, 210, 255, 0.08)`.
- **Ghost/Tertiary**: Flat `#161F30` surface with `#F0F6FC` text, shifting to neon border definition on focus.

### Top-Up Denomination & Game Cards
- **Product & Currency Tiles**: Base surface `#111827`, border `1px solid rgba(77, 141, 186, 0.2)`. 
- **Selected State**: Border transitions dynamically to `#00D2FF` with a radiant cyan corner indicator notch and inner cyan wash (`rgba(0, 210, 255, 0.05)`).
- **Badge Accents**: Hot deal, instant delivery, and bonus currency tags use high-density pills with `#00D2FF` text over `rgba(0, 210, 255, 0.12)` backgrounds.

### Input Fields & Game ID Selectors
- **Fields**: Background `#111827`, inset border `1px solid rgba(77, 141, 186, 0.3)`, text `#F0F6FC`, placeholder `#4D8DBA`.
- **Focus State**: 1px `#00D2FF` ring with `box-shadow: 0 0 12px rgba(0, 210, 255, 0.25)`. Includes an inline validation checkmark glowing in electric cyan.
- **Server Selection Dropdowns**: Modular select menus featuring custom scrolling and frosted backdrop-blur surfaces (`rgba(17, 24, 39, 0.95)`).

### Chips & Category Filters
- Compact modules (`rounded-sm`, 4px radius) in `#161F30` with `#4D8DBA` borders. Active chip ignites with a neon electric blue underline or full border highlight in `#00D2FF`.

### Checkboxes & Radio Selection
- Angular square and diamond-like radio glyphs. Unchecked: `#161F30` fill with `#086288` rim. Checked: `#00D2FF` core fill with an unmistakable neon surge.

### Live Status Indicators & Telemetry Tickers
- Esports tournament updates, stock balances, and instant server operational statuses use pulsing dots: `#00D2FF` with keyframe pulse animation expanding an outer halo ring (`rgba(0, 210, 255, 0)`).