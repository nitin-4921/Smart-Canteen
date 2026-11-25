---
name: SmartCanteen
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#584238'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#8c7166'
  outline-variant: '#dfc0b3'
  surface-tint: '#a04100'
  primary: '#a04100'
  on-primary: '#ffffff'
  primary-container: '#ff7a30'
  on-primary-container: '#622400'
  inverse-primary: '#ffb693'
  secondary: '#4f5c8e'
  on-secondary: '#ffffff'
  secondary-container: '#b7c4fd'
  on-secondary-container: '#435081'
  tertiary: '#006c49'
  on-tertiary: '#ffffff'
  tertiary-container: '#08b77f'
  on-tertiary-container: '#00402a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcc'
  primary-fixed-dim: '#ffb693'
  on-primary-fixed: '#351000'
  on-primary-fixed-variant: '#7a2f00'
  secondary-fixed: '#dce1ff'
  secondary-fixed-dim: '#b7c4fd'
  on-secondary-fixed: '#071747'
  on-secondary-fixed-variant: '#374475'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-token:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-token-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
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
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-badge:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-md: 1.5rem
  gutter-lg: 2rem
  margin: 1rem
  margin-md: 2rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system targets hungry, fast-moving university students and campus dining vendors. The platform balances high-tempo utility with an upbeat, approachable energy—reducing cognitive friction during peak meal rush hours while instilling total confidence in order timing. 

The aesthetic is Modern Tactile Minimalism: ultra-clean, card-oriented interfaces accented by vivid appetite-stimulating energy, hyper-legible numerical focal points, and playful, friendly micro-surfaces. Key characteristics include:
- Generous internal padding and breathable whitespace that prevent menu overload.
- Pronounced geometric curves (`rounded-xl` to `rounded-3xl`) communicating approachability and modern consumer software polish.
- High-contrast visual cues prioritizing speed: token numbers, pickup countdown timers, and stall statuses readable at a glance from yards away.
- Vibrant status badging combined with light micro-interactions that make queuing feel instantaneous and rewarding.

## Colors

The palette leverages high-contrast warmth and authoritative structure to guide students swiftly through meal selection, payment, and pickup verification.

- **Primary (`#FF7A30`):** Vivid warm orange. Used exclusively for core action drivers, primary CTA buttons, highlighted token identifiers, and progress bars.
- **Secondary (`#172554`):** Deep navy. Establishes visual gravity for headers, primary typography, active navigation states, and dark high-impact container banners.
- **Tertiary / Semantic Success (`#10B981`):** Emerald green. Designates "Ready for Pickup", active counters, success states, and dietary badges (e.g., Vegetarian/Vegan).
- **Warning / Preparing (`#F59E0B`):** Warm amber. Denotes meals currently on the grill/prep counter, limited stock warnings, and queue slowdown alerts.
- **Critical / Urgent (`#EF4444`):** Crisp rose red. Highlights sold-out items, stall closures, expired pickup windows, and system alerts.
- **Neutral Canvas (`#F8FAFC`):** Crisp off-white cool slate foundation paired against pure `#FFFFFF` elevated cards and `#E2E8F0` structural divider borders.

## Typography

The typography system relies on **Plus Jakarta Sans**, providing modern geometric clarity, welcoming rounded forms, and structural legibility even at micro sizes.

- **Tokens & Counters:** Utilize tabular numerals (`tnum`) in weights 700 and 800 for live countdowns, live order queues, and token tickets to avoid visual jittering.
- **Hierarchy:** Deep navy (`#172554`) is strictly assigned to headlines and primary labels to maintain an authoritative contrast against `#F8FAFC`. Secondary content utilizes `#64748B` for clarity without competing against item titles.
- **Badges:** Set in uppercase, tracking expanded by `0.04em`, using `label-badge` for rapid visual indexing (e.g., "STALL OPEN", "PREPARING", "READY").

## Layout & Spacing

The layout model is a fluid, responsive 12-column grid designed for rapid scanning on mobile handsets and dense kiosk/desktop monitoring.

- **Mobile (&lt;640px):** 4 fluid columns, `1rem` outer margin, `1rem` gutter. Food categories horizontally scrollable with sticky order summary drawers anchored to the viewport bottom.
- **Tablet (640px - 1024px):** 8 fluid columns, `2rem` outer margin, `1.5rem` gutter. Split view showing stall selections alongside active basket calculations.
- **Desktop (&gt;1024px):** 12 fluid columns constrained to a max-width of `1280px` with `3rem` margins and `2rem` gutters. Accommodates multi-vendor column views, order tracker dashboards, and vendor inventory consoles.
- **Rhythm:** Spacing follows an 8pt progression (`space-xs` through `space-xl`). Internal card padding defaults to `space-lg` (`1.5rem`) on desktop and `space-md` (`1rem`) on handheld devices to preserve thumb comfort.

## Elevation & Depth

This system avoids heavy, muddy drop shadows in favor of a soft, luminous elevation model that renders white surfaces crisp and light atop `#F8FAFC`.

- **Canvas Base (Level 0):** `#F8FAFC`. Completely un-elevated screen foundation.
- **Surface Cards (Level 1):** `#FFFFFF` with a dual-layer soft ambient shadow:
  - `0 1px 3px rgba(23, 37, 84, 0.04), 0 4px 12px rgba(23, 37, 84, 0.03)`
  - Outlined with an ultra-subtle border: `1px solid rgba(226, 232, 240, 0.8)`.
- **Interactive Hover & Modals (Level 2):** Elevated interactive components, popup trays, and active tokens:
  - `0 8px 24px -4px rgba(23, 37, 84, 0.08), 0 2px 6px -1px rgba(23, 37, 84, 0.04)`
- **Sticky Actions & Bottom Drawers (Level 3):** Fixed bottom navigation bar and order cart action sheets:
  - `0 -8px 20px -2px rgba(23, 37, 84, 0.06)` with backdrop blur `backdrop-filter: blur(12px)`.
- **Token Glow Accent:** When an order transitions to "Ready", its card acquires a subtle primary-tinted halo:
  - `0 0 0 3px rgba(16, 185, 129, 0.2), 0 10px 25px -3px rgba(16, 185, 129, 0.15)`.

## Shapes

The design system embraces a friendly, ergonomic corner treatment across interactive items, balancing contemporary mobile app aesthetics with dependable structure.

- **Standard Containers (`roundedness: 2`):** Cards, modal dialogs, and menu cards use base rounding (`0.5rem` to `1rem`), scaling to `rounded-2xl` (`1.25rem` / `1.5rem`) for main meal containers.
- **Full Pill Geometry:** Action buttons, chips, numerical status counters, and floating micro-badges strictly enforce 9999px rounded-full borders to invite physical touch and tap precision.
- **Form Inputs:** Styled with `0.75rem` (`rounded-xl`) to harmonize with interactive buttons without appearing overly juvenile.

## Components

### Buttons
- **Primary:** Filled `#FF7A30` background, pure white text, full pill radius (`rounded-full`), `space-md` horizontal padding, height 48px on mobile / 44px on desktop. Hover state darkens primary by 8% with a slight lift (`transform: translateY(-1px)`).
- **Secondary / Action Navy:** Deep navy (`#172554`) background, pure white text. Reserved for final checkout or administrative vendor actions.
- **Ghost / Tertiary:** Transparent background, text `#172554`, border `1.5px solid #E2E8F0`. Hover triggers background `#F1F5F9`.

### Chips & Micro-Badges
- **Status Badges:** Compact pill tags (`px-3 py-1`, rounded-full) indicating stall flow:
  - *Ready / Available:* 10% `#10B981` tint background, bold `#047857` label, pulsing green dot.
  - *Preparing:* 10% `#F59E0B` tint background, bold `#B45309` label.
  - *Full / Urgent:* 10% `#EF4444` tint background, bold `#B91C1C` label.
- **Dietary Filter Chips:** Bordered pills with food category icons. Active state fills with `#172554` and text `#FFFFFF`; inactive state uses `#FFFFFF` background with text `#64748B` and border `#E2E8F0`.

### Cards & Menu Items
- **Structure:** Pure white `#FFFFFF` surface, `rounded-2xl`, padded with `1rem` on mobile and `1.25rem` on desktop.
- **Image Integration:** Ratio 4:3 or 1:1 rounded square (`rounded-xl`) masked image on left or top, accompanied by dish title, prep time counter (e.g. `⚡ 6-8 mins`), and high-contrast orange price tag.
- **Add Trigger:** Circular `+` button in primary orange (`#FF7A30`) anchored to bottom-right of the item card for single-tap addition.

### Order Token Ticket
- Prominent standalone card featuring high-contrast navy background (`#172554`) or clean white with orange border.
- Dominant numeric token (e.g., `#B-42`) in `headline-token` size.
- Real-time animated progress stepper: "Order Received" → "In the Kitchen" → "Ready for Pickup".

### Inputs & Quantity Selectors
- **Inputs:** `1.5px` border `#E2E8F0` on off-white canvas, transitioning to `#FF7A30` border with a subtle 3px orange focus ring on focus.
- **Stepper Selector:** Pill-shaped unified stepper with plus/minus triggers surrounding a bold numerical count for instantaneous cart modification.