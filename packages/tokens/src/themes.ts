// ─────────────────────────────────────────────────────────────────────────────
// Design Tokens; Skins
//
// THIS FILE IS THE SOURCE for the runtime alias layer and the three skins.
//
// Eight alias names are the re-skin seam: components read them instead of the
// raw ramp, so a skin is a list of remapped tokens rather than a second
// stylesheet. `npm run build` emits each skin under its selector into
// dist/tokens.css, and the dark skin into dist/njord.css for the HMI.
//
// A skin's `tokens` keys are web variable names WITHOUT the leading `--`.
// The generator translates them to --njord-* names where a counterpart exists.
// ─────────────────────────────────────────────────────────────────────────────

import { palette } from './color.js'

/** The runtime alias names, in emit order. These are NOT in @theme; they live on :root. */
export const aliasNames = [
  'background', // the page itself
  'foreground', // default text on the page
  'surface',    // a raised card or panel
  'surface-2',  // a recessed strip: table header, well
  'fg',         // primary text
  'fg-muted',   // secondary text
  'fg-subtle',  // tertiary / meta text
  // Every dividing line: card edges, table rules, input outlines, dividers.
  //
  // It earns its own alias rather than pointing components at slate-200,
  // because a border and a background can resolve to the same grey and still
  // need to move apart in a skin. Once a component writes the raw ramp step,
  // the two uses are indistinguishable and a re-skin has to guess which is
  // which. The application uses it in 73 places for exactly this reason.
  'border',
] as const

export type AliasName = (typeof aliasNames)[number]

export type Skin = {
  /** Display name used in the docs. */
  name: string
  /** CSS selector the skin is emitted under. ':root' for the default. */
  selector: string
  /** Selector used inside the Ignition Perspective theme, if the HMI ships it. */
  ignitionSelector?: string
  description: string
  /** The five-swatch summary the docs render. Derived from `tokens`. */
  preview: {
    bg: string
    surface: string
    fg: string
    border: string
    primary: string
    /** Sidebar rail: chrome, not a token; documented for the shell only. */
    rail: string
    railText: string
  }
  /** Token overrides, keyed by web variable name without the leading `--`. */
  tokens: Record<string, string>
}

const modern: Skin = {
  name: 'Modern (default)',
  selector: ':root',
  description:
    'The light operations skin. Soft shadows, 12px radii, subtle status tints.',
  preview: {
    bg: palette.slate[50],
    surface: palette.white,
    fg: palette.slate.ink,
    border: palette.slate[200],
    primary: palette.primary,
    rail: palette.slate.ink,
    railText: palette.slate[350],
  },
  tokens: {
    background:  palette.slate[50],
    foreground:  palette.slate.ink,
    surface:     palette.white,
    'surface-2': palette.slate[50],
    fg:          palette.slate.ink,
    'fg-muted':  palette.slate[600],
    'fg-subtle': palette.slate[400],
    border:      palette.slate[200],
  },
}

const dark: Skin = {
  name: 'Dark',
  selector: '[data-theme="dark"]',
  ignitionSelector: '.njord-theme-dark',
  description:
    'The slate ramp inverts: high steps become light text, low steps become surfaces.',
  preview: {
    bg: '#0A1322',
    surface: '#16243E',
    fg: '#E8EDF5',
    border: '#28374F',
    primary: palette.primary,
    rail: '#0E1828',
    railText: '#B7C2D4',
  },
  tokens: {
    background:  '#0A1322',
    foreground:  '#E8EDF5',
    surface:     '#16243E',
    'surface-2': '#13203A',
    fg:          '#E8EDF5',
    'fg-muted':  '#B7C2D4',
    'fg-subtle': '#8B99B2',
    border:      '#28374F',

    // The ramp inverts: low steps become surfaces, high steps become text.
    'color-ink':         '#0E1828',
    'color-slate-800':   '#1C2C49',
    'color-slate-700':   '#28395A',
    'color-slate-600':   '#B7C2D4',
    'color-slate-500':   '#97A5BC',
    'color-slate-400':   '#8B99B2',
    'color-slate-300':   '#384963',
    'color-slate-200':   '#28374F',
    'color-slate-100':   '#1C2B45',
    'color-slate-50':    '#13203A',
    'color-neutral-100': '#1C2B45',

    // Status tints recomputed for a dark ground. The bases (primary, success,
    // warning, critical) keep their light hex; only the surrounds move.
    'color-success-bg':   '#102A20',
    'color-success-mid':  '#1E6149',
    'color-warning-bg':   '#2C2410',
    'color-warning-mid':  '#6E5618',
    'color-critical-bg':  '#301715',
    'color-critical-mid': '#71291F',
    'color-medium':       '#5B8DEF',
    'color-medium-bg':    '#16233F',
    'color-primary-bg':   '#0C2333',
    'color-info-bg':      '#1C2B45',
    'color-info-text':    '#97A5BC',

    // Status text needs a lighter hex to clear AA on a dark ground.
    'color-critical-text': '#FF6F66',
    'color-warning-text':  '#F2B341',
    'color-success-text':  '#3BD79F',
    'color-medium-text':   '#93B7FF',
    'color-primary-text':  '#41C4F5',

    // Deeper shadows: on a dark ground a light one is invisible.
    'shadow-sm':   '0 1px 2px rgba(0,0,0,0.45)',
    'shadow-base': '0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.4)',
    'shadow-md':   '0 6px 18px rgba(0,0,0,0.5)',
    'shadow-lg':   '0 16px 40px rgba(0,0,0,0.6)',

    // Severity MARKS lift so a dot or chart fill stays legible on the dark
    // card, and every lifted fill takes dark ink: all six inks flip.
    'color-sev-crit': '#F85C55',
    'color-sev-high': '#F2B341',
    'color-sev-med':  '#5B8DEF',
    'color-sev-low':  '#97A5BC',
    'color-sev-diag': '#7C8BA4',
    'color-sev-ok':   '#3BD79F',
    'color-sev-crit-ink': '#0F182B',
    'color-sev-high-ink': '#0F182B',
    'color-sev-med-ink':  '#0F182B',
    'color-sev-low-ink':  '#0F182B',
    'color-sev-diag-ink': '#0F182B',
    'color-sev-ok-ink':   '#0F182B',

    'color-sev-crit-text': '#FF6F66',
    'color-sev-high-text': '#F2B341',
    'color-sev-med-text':  '#93B7FF',
    'color-sev-ok-text':   '#3BD79F',

    // Fluid line coding, lifted for contrast on the dark schematic.
    'color-fl-proc':   '#5FA6DE',
    'color-fl-raw':    '#A6D4F2',
    'color-fl-drain':  '#97A5B8',
    'color-fl-sludge': '#B9986C',
    'color-fl-glycol': '#EDAE5A',
    'color-fl-brine':  '#4FCABF',
    'color-fl-o2':     '#55B6CF',
    'color-fl-gas':    '#97A5B8',
    'color-fl-chem':   '#D38571',
    'color-fl-feed':   '#A8C46B',

    // SCADA. Run and stop swap polarity here: on dark, energized is the LIGHT
    // neutral, because that is what reads as present.
    'color-sc-pipe':         '#47576F',
    'color-sc-node':         '#1B2B45',
    'color-sc-edge':         '#8593AC',
    'color-sc-vessel':       '#2C3A52',
    'color-sc-water':        '#44546E',
    'color-sc-line':         '#4D5D77',
    'color-sc-fill-lite':    '#1D2B45',
    'color-sc-cabinet':      '#2A3A55',
    'color-sc-cabinet-edge': '#47576F',
    'color-sc-halo':         '#16243E',
    'color-sc-run':          '#C6D2E4',
    'color-sc-stop':         '#3A4A63',
    'color-sc-abnormal':     '#FF6F66',
    'color-sc-manual':       '#D08A28',
    'color-sc-alarm-lo':      '#E8C94A',
    'color-sc-alarm-lo-edge': '#E8C94A',
    'color-sc-alarm-lo-text': '#EDD677',
  },
}

const legacy: Skin = {
  name: 'Legacy',
  selector: '[data-theme="legacy"]',
  description:
    'Recreates the classic NJORD/Ignition HMI: flat gray page, hard hairlines, no shadows, 3-4px radii.',
  preview: {
    bg: '#D6DADE',
    surface: '#FFFFFF',
    fg: '#1F2733',
    border: '#B4BCC5',
    primary: '#2F6CB0',
    rail: '#E7EAED',
    railText: '#3A4754',
  },
  tokens: {
    background:  '#D6DADE',
    foreground:  '#1F2733',
    surface:     '#FFFFFF',
    'surface-2': '#EEF0F2',
    fg:          '#1F2733',
    'fg-muted':  '#3F4A57',
    'fg-subtle': '#565F6B',
    border:      '#B4BCC5',

    'color-ink':         '#2C3A48',
    'color-slate-800':   '#3A4A5A',
    'color-slate-700':   '#4A5A6B',
    'color-slate-600':   '#2F3A45',
    'color-slate-500':   '#4B5563',
    'color-slate-400':   '#4B535E',
    'color-slate-300':   '#9AA3AE',
    'color-slate-200':   '#B4BCC5',
    'color-slate-100':   '#D3D8DD',
    'color-slate-50':    '#E4E7EA',
    // neutral-* is our alias of slate, so this follows slate-100. The
    // #E4E7EA the app carried under this name was a one-off it has now dropped.
    'color-neutral-100': '#D3D8DD',

    // A deeper blue, and every status hue desaturated toward the classic HMI.
    'color-primary':  '#2F6CB0',
    'color-success':  '#2E9E4F',
    'color-warning':  '#E0922A',
    'color-critical': '#C8443D',
    'color-medium':   '#2F5AAE',

    'color-success-bg':     '#DDF0E1',
    'color-success-mid':    '#8FCF9F',
    'color-success-text':   '#1E7A39',
    'color-success-solid':  '#1B6B33',
    'color-warning-bg':     '#FBEBD2',
    'color-warning-mid':    '#EBC07A',
    'color-warning-text':   '#6B4600',
    'color-critical-bg':    '#F6DAD8',
    'color-critical-mid':   '#E08079',
    'color-critical-text':  '#A83229',
    'color-critical-solid': '#C0392E',
    'color-medium-bg':      '#DEE7F5',
    'color-medium-text':    '#234B92',
    'color-primary-bg':     '#DEE9F4',
    'color-primary-text':   '#2C5E99',
    'color-primary-ink':    '#FFFFFF',
    'color-info-bg':        '#E4E7EA',
    'color-info-text':      '#4B5563',

    // Hard geometry: almost no corner radius, and borders rather than depth.
    // Only menus and modals keep a shadow at all.
    'radius-sm': '3px',
    'radius-md': '4px',
    'radius-lg': '4px',
    'radius-xl': '6px',
    'shadow-sm':   'none',
    'shadow-base': 'none',
    'shadow-md':   '0 1px 4px rgba(0,0,0,0.18)',
    'shadow-lg':   '0 4px 16px rgba(0,0,0,0.25)',

    // The classic saturated ramp, drawn from this skin's own palette so a dot
    // always matches the badge beside it.
    'color-sev-crit': '#C8443D',
    'color-sev-high': '#E0922A',
    'color-sev-med':  '#2F5AAE',
    'color-sev-low':  '#6B7480',
    'color-sev-diag': '#8A929C',
    'color-sev-ok':   '#2E9E4F',
    'color-sev-crit-ink': '#FFFFFF',
    'color-sev-high-ink': '#0F182B',
    'color-sev-med-ink':  '#FFFFFF',
    'color-sev-low-ink':  '#FFFFFF',
    'color-sev-diag-ink': '#0F182B',
    'color-sev-ok-ink':   '#0F182B',
    'color-sev-crit-text': '#A83229',
    'color-sev-high-text': '#6B4600',
    'color-sev-med-text':  '#234B92',
    'color-sev-ok-text':   '#1E7A39',

    // Monochrome by definition: every fluid falls back to the pipe colour, so
    // the schematic reads as the classic near-black line drawing.
    'color-fl-proc':   '#2B2B2B',
    'color-fl-raw':    '#2B2B2B',
    'color-fl-drain':  '#2B2B2B',
    'color-fl-sludge': '#2B2B2B',
    'color-fl-glycol': '#2B2B2B',
    'color-fl-brine':  '#2B2B2B',
    'color-fl-o2':     '#2B2B2B',
    'color-fl-gas':    '#2B2B2B',
    'color-fl-chem':   '#2B2B2B',
    'color-fl-feed':   '#2B2B2B',

    'color-sc-pipe':     '#2B2B2B',
    'color-sc-run':      '#2C3A48',
    'color-sc-stop':     '#C4CCD4',
    'color-sc-abnormal': '#C8443D',
    'color-sc-manual':        '#A25E08',
    'color-sc-alarm-lo':      '#E3BE2C',
    'color-sc-alarm-lo-edge': '#B39200',
    'color-sc-alarm-lo-text': '#5E4D00',
  },
}

export const skins = { modern, dark, legacy } as const

export type SkinName = keyof typeof skins

/** Ordered for docs and for CSS emission: `modern` first, it owns :root. */
export const skinList: Skin[] = [modern, dark, legacy]
