// ─────────────────────────────────────────────────────────────────────────────
// Design Tokens — Typography
//
// THIS FILE IS THE SOURCE. `npm run build` derives the --text-* scale in
// dist/tokens.css from `typeScale` below. Never edit a generated file.
//
// Originally lifted from NJORD Redesign — lib/tokens.css semantic text helpers.
//
// Two families, one rule: Inter carries language, JetBrains Mono carries every
// number, tag, duration and setpoint. Mono is always tabular-nums so digits in
// a column line up and a changing value never shifts its neighbours.
// ─────────────────────────────────────────────────────────────────────────────

export const fontFamilies = {
  sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  // Consolas FIRST — control-room Windows machines then render the original the
  // design was drawn against. Consolas is not web-distributable, so JetBrains
  // Mono is the substitute everyone else falls back to.
  mono: "Consolas, 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace",
} as const

export type TypeToken = {
  token: string
  fontFamily: 'sans' | 'mono'
  fontSize: string
  lineHeight: string
  fontWeight: number
  letterSpacing: string
  transform?: 'uppercase'
  usage: string
}

export const typeScale = {
  display: {
    token: 'display',
    fontFamily: 'mono',
    fontSize: '32px',
    lineHeight: '40px',
    fontWeight: 600,
    letterSpacing: '-1px',
    usage: 'Hero figure — a score or single dominant number. Tabular-nums.',
  },
  metric: {
    token: 'metric',
    fontFamily: 'mono',
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: 400,
    letterSpacing: '-0.5px',
    usage: 'The headline number on a KPI card. Tabular-nums.',
  },
  h1: {
    token: 'h1',
    fontFamily: 'sans',
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: 700,
    letterSpacing: '-0.2px',
    usage: 'Page title. Screens carry no in-page h1 — the top bar owns it.',
  },
  heroValue: {
    token: 'hero-value',
    fontFamily: 'sans',
    fontSize: '22px',
    lineHeight: '28px',
    fontWeight: 700,
    letterSpacing: '-0.5px',
    usage:
      'The one prominent figure in a card head, donut centre or stat tile — ' +
      'bigger than a title, smaller than a metric. Single-line by nature: ' +
      'collapse the leading where it sits tight against a label.',
  },
  title: {
    token: 'title',
    fontFamily: 'sans',
    fontSize: '20px',
    lineHeight: '28px',
    fontWeight: 700,
    letterSpacing: '-0.2px',
    usage: 'The top-bar page title. Louder than h2 — the screen owns no in-page h1.',
  },
  readout: {
    token: 'readout',
    fontFamily: 'mono',
    fontSize: '20px',
    lineHeight: '28px',
    fontWeight: 600,
    letterSpacing: '-0.5px',
    usage: 'Mid-size numeric readout, between card-title and metric. Tabular-nums.',
  },
  h2: {
    token: 'h2',
    fontFamily: 'sans',
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: 700,
    letterSpacing: '0',
    usage: 'Section headers and dialog titles.',
  },
  cardTitle: {
    token: 'card-title',
    fontFamily: 'sans',
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 700,
    letterSpacing: '0',
    usage: 'Card header title.',
  },
  bodyStrong: {
    token: 'body-strong',
    fontFamily: 'sans',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 600,
    letterSpacing: '0',
    usage: 'Emphasised body — list row titles, labelled values.',
  },
  body: {
    token: 'body',
    fontFamily: 'sans',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 400,
    letterSpacing: '0',
    usage: 'Default body text, form fields, sidebar labels.',
  },
  sectionLabel: {
    token: 'section-label',
    fontFamily: 'sans',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 700,
    letterSpacing: '0.5px',
    transform: 'uppercase',
    usage: 'Dark section heading inside a card body.',
  },
  small: {
    token: 'small',
    fontFamily: 'sans',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
    letterSpacing: '0',
    usage: 'Secondary copy, table cells, helper text.',
  },
  data: {
    token: 'data',
    fontFamily: 'mono',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
    letterSpacing: '0',
    usage: 'Inline readings and durations. Tabular-nums.',
  },
  tag: {
    token: 'tag',
    fontFamily: 'mono',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
    letterSpacing: '0.3px',
    usage: 'Equipment tags and instrument IDs (TK-04, PT-1201).',
  },
  caption: {
    token: 'caption',
    fontFamily: 'sans',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
    letterSpacing: '0',
    usage: 'Timestamps and de-emphasised meta lines.',
  },
  eyebrow: {
    token: 'eyebrow',
    fontFamily: 'sans',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 700,
    letterSpacing: '0.8px',
    transform: 'uppercase',
    usage: 'KPI label above a metric; small block headings.',
  },
  axis: {
    token: 'axis',
    fontFamily: 'sans',
    fontSize: '8px',
    lineHeight: '12px',
    fontWeight: 400,
    letterSpacing: '0',
    usage: 'Chart tick labels ONLY. Never for interface text — it does not meet minimum legibility.',
  },
  badge: {
    token: 'badge',
    fontFamily: 'sans',
    fontSize: '10px',
    lineHeight: '14px',
    fontWeight: 700,
    letterSpacing: '0.5px',
    transform: 'uppercase',
    usage: 'Badges, severity chips, state tags.',
  },
} as const satisfies Record<string, TypeToken>

// ---------------------------------------------------------------------------
// Mobile overrides — the phone build re-tunes a handful of roles for a 393px
// viewport. Everything not listed here is shared with desktop.
// ---------------------------------------------------------------------------

export const mobileTypeScale = {
  screenTitle: { fontSize: '24px', lineHeight: '26px', fontWeight: 800, letterSpacing: '-0.5px' },
  vitalValue:  { fontSize: '30px', lineHeight: '30px', fontWeight: 600, letterSpacing: '-1px', fontFamily: 'mono' },
  readValue:   { fontSize: '26px', lineHeight: '30px', fontWeight: 600, letterSpacing: '-0.5px', fontFamily: 'mono' },
  rowTitle:    { fontSize: '14px', lineHeight: '18px', fontWeight: 600, letterSpacing: '0' },
  alarmTitle:  { fontSize: '14px', lineHeight: '18px', fontWeight: 600, letterSpacing: '0' },
  rowSub:      { fontSize: '12px', lineHeight: '16px', fontWeight: 400, letterSpacing: '0' },
  eyebrow:     { fontSize: '10px', lineHeight: '14px', fontWeight: 800, letterSpacing: '1px' },
  tabLabel:    { fontSize: '10px', lineHeight: '14px', fontWeight: 600, letterSpacing: '0.1px' },
  badge:       { fontSize: '10px', lineHeight: '14px', fontWeight: 800, letterSpacing: '0.5px' },
} as const

// ---------------------------------------------------------------------------
// Text size — a user-level preference, not a design choice.
//
// Implemented as `zoom` on the working area rather than a font-size sweep: the
// layout REFLOWS at the new scale, so a longer label can never overlap its
// neighbour. A font-size sweep would guarantee that overlap.
//
// Viewport-sized overlays (dialogs, drawers) must divide the multiplier back
// out of their max-height / width, or they grow past the screen edge.
// ---------------------------------------------------------------------------

export const textSizes = {
  'ts-default': { value: '1', use: 'Base — no scaling' },
  'ts-lg':      { value: '1.09', use: 'Large — body.nj-text-lg' },
  'ts-xl':      { value: '1.18', use: 'Extra large — body.nj-text-xl' },
} as const

// ---------------------------------------------------------------------------
// Weight aliases
// ---------------------------------------------------------------------------

export const fontWeights = {
  regular:   400,
  medium:    500,
  semibold:  600,
  bold:      700,
  extrabold: 800,
} as const

// ---------------------------------------------------------------------------
// Tailwind v3 fontSize config shape.
// Tailwind v4 consumers import "@njord/tokens/css" instead — it is generated.
// ---------------------------------------------------------------------------

export const tailwindFontSize = Object.fromEntries(
  Object.values(typeScale).map((t) => [
    t.token,
    [
      t.fontSize,
      {
        lineHeight: t.lineHeight,
        letterSpacing: t.letterSpacing,
        fontWeight: String(t.fontWeight),
      },
    ],
  ]),
) as Record<string, [string, { lineHeight: string; letterSpacing: string; fontWeight: string }]>
