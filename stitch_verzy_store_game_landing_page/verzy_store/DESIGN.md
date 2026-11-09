---
name: Verzy Store
colors:
  surface: '#f7f9ff'
  surface-dim: '#cddbee'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#edf4ff'
  surface-container: '#e3efff'
  surface-container-high: '#dbe9fc'
  surface-container-highest: '#d6e4f6'
  on-surface: '#0f1d2a'
  on-surface-variant: '#40484e'
  inverse-surface: '#24323f'
  inverse-on-surface: '#e8f1ff'
  outline: '#70787f'
  outline-variant: '#c0c7cf'
  surface-tint: '#10658b'
  primary: '#004967'
  on-primary: '#ffffff'
  primary-container: '#086288'
  on-primary-container: '#a5dbff'
  inverse-primary: '#8bcef9'
  secondary: '#19648f'
  on-secondary: '#ffffff'
  secondary-container: '#8fcdfd'
  on-secondary-container: '#005881'
  tertiary: '#004966'
  on-tertiary: '#ffffff'
  tertiary-container: '#146285'
  on-tertiary-container: '#a4dbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c6e7ff'
  primary-fixed-dim: '#8bcef9'
  on-primary-fixed: '#001e2d'
  on-primary-fixed-variant: '#004c6b'
  secondary-fixed: '#cae6ff'
  secondary-fixed-dim: '#8fcdfd'
  on-secondary-fixed: '#001e30'
  on-secondary-fixed-variant: '#004b70'
  tertiary-fixed: '#c5e7ff'
  tertiary-fixed-dim: '#8ecef6'
  on-tertiary-fixed: '#001e2d'
  on-tertiary-fixed-variant: '#004c6a'
  background: '#f7f9ff'
  on-background: '#0f1d2a'
  surface-variant: '#d6e4f6'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
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

This design system powers a high-velocity gaming top-up and digital entertainment platform. It combines the dynamic thrill of gaming culture with the ironclad trust and clarity required for instant digital commerce. 

The aesthetic is clean, modern, and energetic with minimalist glassmorphism accents. It departs from clunky, chaotic e-commerce interfaces by pairing deep marine blue anchors with luminous ice-cyan highlights. It provides a tactile, responsive, and seamless checkout experience tailored for Indonesian gamers and digital entertainment consumers.

Key principles:
- **Fast & Direct:** Optimized for 3-step checkouts (input ID, select denomination, pick payment). Minimal distraction, immediate feedback.
- **Vibrant Precision:** Deep oceanic blues establish financial security and structure, while electric cyan glows inject game-ready excitement.
- **Tactile Softness:** Generous corner radii, crisp borders, and pill-shaped interactive targets deliver an intuitive, mobile-first gaming console feel.

## Colors

The palette establishes an immediate sense of tech-forward reliability paired with radiant energy:

- **Primary Deep Blue (`#086288`):** The foundational brand anchor. Used for primary CTA buttons, active state selections, key header banners, and high-emphasis interface chrome.
- **Secondary Mid Blue (`#4D8DBA`):** The balancing layer. Drives secondary UI states, inactive pill borders, icons, subheadings, and interactive hover feedback.
- **Tertiary Ice Cyan (`#97D7FF`):** The electric spark. Utilized for badges, glowing borders, active selection highlights, special voucher flash-sale indicators, and micro-accents.
- **Neutral Dark (`#0B1926`):** Deep oceanic charcoal used for typography, icons, footer surfaces, and contrasting high-importance elements.
- **Neutral Light & Surface (`#F8FAFC` & `#FFFFFF`):** High-clarity, distraction-free backgrounds that let product art and gaming assets pop.

Functional color roles:
- **Surface Canvas:** `#F8FAFC`
- **Surface Card:** `#FFFFFF` with translucent variants (`rgba(255, 255, 255, 0.8)`) for frosted glass overlays.
- **Success:** `#10B981` (Transaksi Berhasil)
- **Warning / Promo:** `#F59E0B` (Promo Kilat)
- **Error:** `#EF4444` (ID Salah / Gagal)

## Typography

The type system blends the energetic, tech-forward flair of **Space Grotesk** with the ergonomic legibility and friendly geometry of **Plus Jakarta Sans**. 

- **Display & Headings (Space Grotesk):** Conveys gaming hardware vibes, tech speed, and sharpness. Used for hero promos, game titles, step numbers, and nominal pricing indicators.
- **Body & Controls (Plus Jakarta Sans):** Crafted for rapid scanning of IDs, server regions, payment methods (QRIS, E-Wallet, Pulsa), and Indonesian UI copy (e.g., *“Pilih Nominal”*, *“Metode Pembayaran”*, *“Beli Sekarang”*).

## Layout & Spacing

The layout is built around a structured 12-column grid on desktop (max width: 1200px) and a fluid 4-column layout on mobile, keeping items within natural thumb-reach.

- **Breakpoints:**
  - Mobile: `< 640px` (Single column flow, bottom sheet checkouts, 12px grid gaps)
  - Tablet: `640px - 1024px` (2 to 3 column item grids)
  - Desktop: `> 1024px` (Persistent split view: 8 columns for item & payment selection, 4 columns for sticky purchase summary)
- **Spacing Rhythm:** Standard 4px/8px base unit rhythm ensuring clear hierarchy between form fields, denomination cards, and action bars.

## Elevation & Depth

Depth in this design system uses soft, clean ambient diffusion backed by subtle cyan luminescent edges rather than heavy, dirty drop shadows:

- **Level 0 (Flat / Canvas):** Neutral background `#F8FAFC`.
- **Level 1 (Card & Containers):** `#FFFFFF` surface with a crisp outline `1px solid rgba(8, 98, 136, 0.08)` and shadow `0 2px 8px -2px rgba(11, 25, 38, 0.04)`.
- **Level 2 (Hover / Active Cards):** Outlined with `1px solid #97D7FF`, elevated by shadow `0 8px 24px -4px rgba(8, 98, 136, 0.12)`, plus a faint `0 0 12px 0 rgba(151, 215, 255, 0.35)` cyan outer glow.
- **Level 3 (Modals / Sticky Purchase Drawer):** Frosted glass surface using backdrop-filter blur `16px`, semi-opaque white fill `rgba(255, 255, 255, 0.88)`, border `1px solid rgba(151, 215, 255, 0.4)`, and shadow `0 16px 36px -8px rgba(11, 25, 38, 0.18)`.

## Shapes

The shape system adopts a balanced rounded style (Corner radius token `2` = `0.5rem / 8px` base, `1rem / 16px` for cards).

- **Cards & Catalog Tiles:** `1rem` (16px) radius for a soft, friendly, modern look.
- **Buttons & Input Fields:** `0.75rem` (12px) to `1rem` (16px) radius for accessible, ergonomic tap zones.
- **Badges, Filter Chips & Steppers:** Fully pill-shaped (`9999px`) to emphasize fluidity and playfulness.

## Components

### Buttons
- **Primary Action (*Beli Sekarang*):** Background `#086288` transitioning to hover `#064b68`, text `#FFFFFF`, font `Space Grotesk` semi-bold. Height 48px, radius 12px. Active focus receives a 2px offset ring in `#97D7FF`.
- **Secondary / Ghost (*Detail Promo*):** Translucent `#97D7FF` at 15% fill with `#086288` text and `1px solid rgba(8, 98, 136, 0.2)`.

### Denomination / Item Cards (Diamond & Voucher Selectors)
- Card container with `16px` border-radius, `16px` inner padding, clean white background.
- **Default State:** Border `1px solid #E2E8F0`. Shows asset icon, amount (e.g., *“86 Diamonds”*), and price in Indonesian Rupiah (e.g., *“Rp 21.000”*).
- **Selected State:** Border `2px solid #086288`, subtle cyan background tint `rgba(151, 215, 255, 0.12)`, corner checkmark badge, and ambient cyan glow.

### Chips & Badges
- **Status / Promo Chips (*Diskon 20%*, *Instant*, *Flash Sale*):** Pill-shaped, font `label-sm` uppercase. Accent styling: background `rgba(151, 215, 255, 0.25)`, text `#086288`, border `1px solid #97D7FF`.

### Input Fields (User ID & Zone ID)
- Dual field grouping for Game ID and Server Zone. 
- Background `#FFFFFF`, border `1.5px solid #CBD5E1`, text `#0B1926`, height 46px, radius 12px.
- Focus state triggers border `#086288` with box-shadow `0 0 0 3px rgba(151, 215, 255, 0.45)`. Helper text provides illustrated modal guides (*“Cara Menemukan User ID Anda”*).

### Payment Method Accordions / Radios
- Structured list cards showing payment logo (GoPay, OVO, DANA, ShopeePay, QRIS, Indomaret).
- Right-aligned calculated admin fee and total price.
- Custom radio button with outer ring in `#4D8DBA` and inner fill in `#086288`.

### Stepper Header (3 Langkah Mudah)
- Minimalist horizontal step indicator: `1. Masukkan ID` -> `2. Pilih Nominal` -> `3. Bayar`.
- Active circle colored `#086288` with crisp white numeric typography; connected by cyan `#97D7FF` progression tracks.