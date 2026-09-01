// ─────────────────────────────────────────────────────────────────────────────
// Design Tokens; Spacing
//
// THIS FILE IS THE SOURCE. A 2px base unit for component spacing, and a fluid
// clamp scale for layout.
//
// Two things the naming buys:
//
//   The step IS its pixel value. `sp-14` is 14px. No arithmetic, no lookup,
//   and no step whose name implies a size it does not have.
//
//   The base is 2px, not 4px. Control interiors genuinely need 2, 6, 10 and
//   14: a segmented-control track, a badge, a button's optical horizontal
//   padding. Forcing those onto a 4px grid makes chips and badges visibly
//   fat, so the grid bends to the design rather than the other way round.
//
// Everything is an even whole pixel. Nothing odd, nothing fractional.
//
// The shell has no fixed width: gutters and gaps grow with the viewport so a
// 1920px control-room monitor feels used rather than stretched. That is why
// the layout values are clamp() expressions rather than steps; they
// interpolate continuously instead of jumping at a breakpoint.
// ─────────────────────────────────────────────────────────────────────────────

/** The fixed 2px scale; component-level spacing. */
export const spacing = {
  'sp-2':  { value: '2px',  use: 'Hairline gaps · segmented control track' },
  'sp-4':  { value: '4px',  use: 'Icon-to-label gaps, badge vertical padding' },
  'sp-6':  { value: '6px',  use: 'Chip gaps, tag padding, tab-bar inset' },
  'sp-8':  { value: '8px',  use: 'Tight button gaps, control vertical padding' },
  'sp-10': { value: '10px', use: 'Compact row padding, bulk-bar gaps' },
  'sp-12': { value: '12px', use: 'Row gaps, card stack gaps (mobile)' },
  'sp-14': { value: '14px', use: 'Control horizontal padding · buttons, inputs, cells' },
  'sp-16': { value: '16px', use: 'Card padding, grid gaps' },
  'sp-20': { value: '20px', use: 'Card horizontal padding (desktop)' },
  'sp-24': { value: '24px', use: 'Section gaps' },
  'sp-28': { value: '28px', use: 'Top-bar horizontal gutter' },
  'sp-32': { value: '32px', use: 'Content gutters at wide widths' },
  'sp-40': { value: '40px', use: 'Major section separation' },
  'sp-48': { value: '48px', use: 'Card-sized empty state · icon tile and padding' },
  'sp-56': { value: '56px', use: 'Page-level breaks' },
  'sp-72': { value: '72px', use: 'Region-sized empty state · the largest icon tile' },
} as const

/**
 * Clearance: space measured off a NEIGHBOURING element, not off the scale.
 *
 * Each of these keeps content out of the lane something else occupies: the tab
 * bar, a floating close button, the top of the viewport. Their value is
 * dictated by that neighbour's size, so rounding them onto the spacing ladder
 * would break the thing they exist to avoid.
 *
 * They belong with the env(safe-area-inset) exemption, not with spacing steps.
 * Named for what they clear, never for their number: if the tab bar changes
 * height, the value changes and the name still reads true.
 */
export const clearance = {
  'cl-tabbar': {
    value: '96px',
    use: 'Bottom padding on the mobile scroll area · keeps the last row above the tab bar',
  },
  'cl-close': {
    value: '56px',
    use: 'Right padding in a drawer head · the floating close button’s lane',
  },
  'cl-palette-top': {
    value: 'min(14vh, 120px)',
    use: 'Top offset for the command palette (proportional, capped so it never drops too far',
  },
} as const

/** The fluid layout scale) gutters and rails that grow with the viewport. */
export const layoutSpacing = {
  'pad-x':  { value: 'clamp(16px, 1.7vw, 32px)',  use: 'Content and top-bar horizontal gutter' },
  'pad-y':  { value: 'clamp(18px, 1.5vw, 28px)',  use: 'Content vertical gutter' },
  gap:      { value: 'clamp(12px, 1.05vw, 16px)', use: 'Default grid gap' },
  'gap-lg': { value: 'clamp(14px, 1.35vw, 20px)', use: 'Dashboard-level grid gap' },
  rail:     { value: 'clamp(276px, 23vw, 352px)', use: 'Side rail in two-pane workspaces' },
} as const
