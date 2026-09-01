// ─────────────────────────────────────────────────────────────────────────────
// Design Tokens — Motion
//
// THIS FILE IS THE SOURCE for durations, easings and the named keyframes the
// components reference.
//
// Motion here is functional, never decorative: it shows where a panel came from
// and confirms that a press registered. In a control room an animation that
// delays information is a defect, which is why nothing above 300ms exists
// except the row highlight — and that one is a fade-out, not a delay.
// ─────────────────────────────────────────────────────────────────────────────

export const durations = {
  'd-press':  { value: '120ms', use: 'Hover and press — buttons, nav items, chips, table rows' },
  'd-fade':   { value: '140ms', use: 'Dialog scrim fade in' },
  'd-rise':   { value: '160ms', use: 'Dialog panel rise (8px + fade)' },
  'd-settle': { value: '180ms', use: 'Mobile swipe row settling back' },
  'd-travel': { value: '200ms', use: 'Toggle switch travel · mobile scrim fade' },
  'd-slide':  { value: '220ms', use: 'Drawer slide in from the right' },
  'd-pop':    { value: '240ms', use: 'Mobile centred confirm pop (0.94 → 1)' },
  'd-sheet':  { value: '280ms', use: 'Bottom sheet rise · toast entry' },
  'd-hl':     { value: '1s',    use: 'Row highlight fade after arriving from a trend marker' },

  // Loading indicators. These are loops, not transitions — they run until the
  // work finishes, so they are deliberately slower than anything above.
  'd-spin':        { value: '700ms',  use: 'Spinner rotation' },
  'd-spin-reduced':{ value: '2.4s',   use: 'Spinner rotation under prefers-reduced-motion' },
  'd-shimmer':     { value: '1.4s',   use: 'Skeleton sweep — disabled under prefers-reduced-motion' },
  'd-indeterminate': { value: '1.1s', use: 'Indeterminate progress band travel' },
} as const

export const easings = {
  'e-default': { value: 'ease', use: 'Fades and short rises' },
  'e-linear':  { value: 'linear', use: 'Indeterminate spinners only' },
  'e-sheet':   { value: 'cubic-bezier(.2, .8, .2, 1)', use: 'Bottom sheet rise — decelerates hard at the end' },
} as const

/**
 * The named keyframes components reference by name. They are emitted into both
 * stylesheets, so an Ignition style class can set `animationName: dlgRise`
 * without the project defining its own copy.
 */
export const keyframes = {
  dlgFade: {
    use: 'Dialog scrim',
    css: 'from { opacity: 0 } to { opacity: 1 }',
  },
  dlgRise: {
    use: 'Dialog panel',
    css: 'from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none }',
  },
  msheetin: {
    use: 'Bottom sheet',
    css: 'from { transform: translateY(100%) } to { transform: translateY(0) }',
  },
  mpop: {
    use: 'Centred confirm',
    css: 'from { transform: scale(.94); opacity: 0 } to { transform: scale(1); opacity: 1 }',
  },
  mtoastin: {
    use: 'Toast',
    css: 'from { transform: translateY(14px); opacity: 0 } to { transform: translateY(0); opacity: 1 }',
  },
  njRowHl: {
    use: 'Trend → alarm row arrival',
    css: '0% { background: color-mix(in srgb, var(--PRIMARY) 26%, var(--SURFACE)) } 100% { background: var(--PRIMARY_BG) }',
  },
} as const

export type KeyframeName = keyof typeof keyframes
