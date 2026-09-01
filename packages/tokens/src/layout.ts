// ─────────────────────────────────────────────────────────────────────────────
// Design Tokens; Radii & elevation
//
// THIS FILE IS THE SOURCE. `npm run build` derives --radius-* / --shadow-* in
// dist/tokens.css and --njord-r-* / --njord-shadow* in dist/njord.css from it.
//
// Elevation is deliberately shallow. An operations console is read at a glance
// in a bright control room; a heavy drop shadow reads as noise, not depth.
// ─────────────────────────────────────────────────────────────────────────────

export const radii = {
  sm:   '6px',   // badges, small chips, inline code
  md:   '8px',   // buttons, inputs, list rows
  lg:   '12px',  // cards, panels
  xl:   '16px',  // sheets, dialogs
  pill: '999px', // filter chips, status pills, avatars
} as const

export const elevation = {
  sm:   '0 1px 2px rgba(0,0,0,0.05)',                              // resting card edge
  base: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',   // raised row / hovered card
  md:   '0 4px 12px rgba(0,0,0,0.10)',                             // popovers, dropdowns
  lg:   '0 12px 32px rgba(15,24,43,0.12)',                         // dialogs, drawers, sheets
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Shell dimensions: fixed sizes, not spacing steps.
//
// These are what the clearance tokens in spacing.ts are measured against. A
// gutter that clears the 72px collapsed rail is 72 because the rail is 72;
// it is not a spacing step and must not be rounded onto the ladder.
// ─────────────────────────────────────────────────────────────────────────────

export const shell = {
  'sidebar-w':           { value: '256px', use: 'Expanded sidebar rail' },
  'sidebar-collapsed-w': { value: '72px',  use: 'Collapsed icon-only rail' },
  'topbar-h':            { value: '72px',  use: 'Top bar height' },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Minimum interactive target.
//
// WCAG 2.5.5 is about the TARGET, not the ink. A compact control keeps its
// visual size and gains an invisible hit area around it; do NOT inflate a
// control's height to satisfy this, or every dense toolbar in the product
// grows. The app implements it as a `.njd-hit` pseudo-element overlay.
// ─────────────────────────────────────────────────────────────────────────────

export const target = {
  'target-min':         { value: '44px', use: 'Touch · the WCAG 2.5.5 floor' },
  'target-min-desktop': { value: '40px', use: 'Pointer-driven chrome · top-bar icon buttons' },
} as const
