// ─────────────────────────────────────────────────────────────────────────────
// Design Tokens — Color
//
// THIS FILE IS THE SOURCE. Nothing else declares a colour.
// `npm run build` derives the Tailwind @theme block (dist/tokens.css) and the
// Ignition Perspective theme (dist/njord.css) from the values below, so a hex
// changes in exactly one place. Never edit a generated file.
//
// Originally lifted from NJORD Redesign — lib/tokens.css (Claude Design project
// "NJORD Redesign", Redesign.html).
//
// The neutral spine is a SLATE ramp (blue-tinted), not pure gray.
// Every value below is an exact source hex.
// ─────────────────────────────────────────────────────────────────────────────

export const palette = {
  // ── Slate — the neutral spine ────────────────────────────────────────────
  slate: {
    ink: '#0F182B', // darkest chrome — sidebar, primary buttons, bulk bar
    800: '#1D293D', // active nav / raised chrome
    700: '#314158', // avatar
    600: '#5C646F', // body text
    500: '#62748E', // secondary text
    400: '#666F7D', // muted text — darkened so it clears AA on tint fills
    350: '#90A1B9', // decorative dots / hairlines ONLY — never text
    300: '#CAD5E2', // strong borders / input borders
    200: '#E0E5EB', // default borders / dividers
    100: '#EFF2F5', // hover fills / row dividers
    50:  '#F8FAFC', // subtle surface / table header / page background
  },

  white: '#FFFFFF',
  black: '#000000',

  // ── Brand / semantic base ────────────────────────────────────────────────
  primary:  '#00AEEE', // brand cyan — links, focus, selection
  success:  '#00C483', // indicator green — bright, never carries text
  warning:  '#FBA100',
  critical: '#F53E39',
  // MEDIUM alarm priority has its OWN hue (royal blue) so it never shares the
  // brand cyan used for links / focus / selection. Per ISA-101, alarm colors
  // are reserved for alarm state only.
  medium:   '#2563EB',
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Status tints — every status has a bg / mid / text triplet.
// `text` is the only member safe to use as a foreground on an ordinary surface.
// ─────────────────────────────────────────────────────────────────────────────

export const status = {
  success: {
    bg:    '#E7F8F0',
    mid:   '#70D7A7',
    text:  '#007A52',
    // Solid fill for a positive ACTION surface with white text (swipe-to-ack).
    // `palette.success` itself is only 2.3:1 against white — never put text on it.
    solid: '#00734C',
  },
  warning: {
    bg:   '#FFF3E0',
    mid:  '#FEBE72',
    text: '#8A5A00',
  },
  critical: {
    bg:    '#FEEAE9',
    mid:   '#FF8377',
    text:  '#C42620',
    solid: '#D8302B', // highest-priority badge — white text, AA clean
  },
  medium: {
    bg:   '#E8EEFC',
    text: '#1D4ED8',
  },
  primary: {
    bg:   '#E6F7FE',
    text: '#00719B',
    ink:  '#04222F', // ink for text sitting ON a primary fill
  },
  info: {
    bg:   '#EFF2F5',
    text: '#5C646F',
  },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Severity ramp — dots, chart fills, row rails.
//   mark → the fill itself (dots, bars, rails)
//   ink  → label color when a number sits directly ON that fill
//   text → severity as text on an ordinary surface
// Never use `mark` as text: sev-crit is 3.73:1 on white, sev-high only 2.06:1.
// ─────────────────────────────────────────────────────────────────────────────

export const severity = {
  critical:   { mark: '#F53E39', ink: '#0F182B', text: '#C42620' },
  high:       { mark: '#FBA100', ink: '#0F182B', text: '#8A5A00' },
  medium:     { mark: '#2563EB', ink: '#FFFFFF', text: '#1D4ED8' },
  low:        { mark: '#90A1B9', ink: '#0F182B', text: '#5C646F' },
  diagnostic: { mark: '#62748E', ink: '#FFFFFF', text: '#5C646F' },
  ok:         { mark: '#00C483', ink: '#0F182B', text: '#007A52' },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Filled severity CHIP pairs — a small solid badge that carries its own label.
//
// Used where a tint would disappear: on a tinted alarm ribbon, on a tab-bar
// badge. Distinct from `severity[].mark`, which is a fill with no text on it,
// and from `severity[].text`, which is text with no fill under it.
//
// Tuned to clear AA at 9px, which is why `low` and `ok` are not their marks:
// palette low (#90A1B9) and success (#00C483) cannot carry a label at any size.
// Ratios are measured against the paired ink.
// ─────────────────────────────────────────────────────────────────────────────

export const severityChip = {
  critical:   { fill: '#D8302B', ink: '#FFFFFF', ratio: '4.80:1' },
  high:       { fill: '#FBA100', ink: '#0F182B', ratio: '8.40:1' },
  medium:     { fill: '#2563EB', ink: '#FFFFFF', ratio: '5.26:1' },
  low:        { fill: '#5C646F', ink: '#FFFFFF', ratio: '6.00:1' },
  diagnostic: { fill: '#62748E', ink: '#FFFFFF', ratio: '4.78:1' },
  ok:         { fill: '#00734C', ink: '#FFFFFF', ratio: '5.90:1' },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Process-fluid line coding — SCADA mimic pipes.
// Deliberately subtle: alarm status must still read louder than any pipe.
// ─────────────────────────────────────────────────────────────────────────────

export const fluids = {
  process: { color: '#2C6FA8', label: 'Process / recirculated water', dashed: false },
  raw:     { color: '#4093D2', label: 'Raw · intake · make-up water', dashed: false },
  drain:   { color: '#6E7B8C', label: 'Effluent · drain · overflow',  dashed: false },
  sludge:  { color: '#8A7250', label: 'Sludge · dead-fish transport', dashed: false },
  glycol:  { color: '#B87214', label: 'Glycol / heat-exchanger loop', dashed: false },
  brine:   { color: '#2AA198', label: 'Brine loop · seawater exchange', dashed: false },
  oxygen:  { color: '#1F8FA8', label: 'Oxygen (gas)',                 dashed: true },
  gas:     { color: '#6E7B8C', label: 'Air · CO2 off-gas',            dashed: true },
  chemical:{ color: '#B0563F', label: 'Chemical dosing (lye)',        dashed: false },
  feed:    { color: '#5F7A2E', label: 'Waterborne feed transport',    dashed: false },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// SCADA equipment palette (ISA-101 HP-HMI).
// NORMAL is neutral gray — color is reserved for ABNORMAL.
// ─────────────────────────────────────────────────────────────────────────────

export const scada = {
  pipe:        '#B8C2CF',
  node:        '#FFFFFF',
  edge:        '#222B3A',
  vessel:      '#D9D1C8',
  water:       '#9E9E9E',
  line:        '#9AA3AF',
  fillLite:    '#E4E9F0',
  cabinet:     '#EDE7DF',
  cabinetEdge: '#B9B0A4',
  halo:        '#FFFFFF',
  run:         '#3C4A5E', // running / open — energized (solid neutral)
  stop:        '#C9D2DC', // stopped / closed — de-energized (light neutral)
  abnormal:    '#F53E39', // equipment in alarm — the ONLY saturated symbol color
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Alarm-row ink — CONTEXTUAL, not a :root token.
//
// The legacy skin fills an active alarm row with its saturated severity colour,
// so nothing inside that row can use the ordinary text tokens: --fg would be
// dark ink on a red fill. These three re-point every child of the row at once.
//
// Declare them on the row's own cells and let them inherit down. They are NOT
// emitted into dist/tokens.css: a :root default would leak the override onto
// every unfilled row.
//
//   line → hairline borders and glyph rings (55% ink — visible, not loud)
//   wash → the faint fill behind a chip sitting on the row (20% ink)
// ─────────────────────────────────────────────────────────────────────────────

export const alarmRowInk = {
  // Critical / high / medium fills are dark enough to carry white.
  onSaturated: {
    ink:  '#FFFFFF',
    line: 'rgba(255, 255, 255, 0.55)',
    wash: 'rgba(255, 255, 255, 0.20)',
  },
  // LOW severity fills are pale, so the ink flips back to slate ink or the row
  // becomes unreadable. This is the only severity that inverts.
  onLow: {
    ink:  '#0F182B',
    line: 'rgba(15, 24, 43, 0.5)',
    wash: 'rgba(15, 24, 43, 0.14)',
  },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Surface / text / border aliases — the semantic layer components read from.
// Re-pointing these is what re-skins the whole app (dark, legacy).
// ─────────────────────────────────────────────────────────────────────────────

export const surface = {
  page:     palette.slate[50],
  raised:   palette.white,
  subtle:   palette.slate[50],
  inverse:  palette.slate.ink,
} as const

export const text = {
  primary:   palette.slate.ink,
  muted:     palette.slate[600],
  subtle:    palette.slate[400],
  inverse:   palette.white,
  link:      status.primary.text,
  linkHover: palette.primary,
} as const

export const border = {
  subtle:  palette.slate[100],
  default: palette.slate[200],
  strong:  palette.slate[300],
  focus:   palette.primary,
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Tailwind v3 theme.extend.colors (for projects not on v4).
// Tailwind v4 consumers import "@njord/tokens/css" instead — it is generated.
// ─────────────────────────────────────────────────────────────────────────────

export const tailwindColors = {
  ink:      palette.slate.ink,
  slate:    palette.slate,
  primary:  palette.primary,
  success:  palette.success,
  warning:  palette.warning,
  critical: palette.critical,
  medium:   palette.medium,
} as const
