// ─────────────────────────────────────────────────────────────────────────────
// Design Tokens — Skins
//
// THIS FILE IS THE SOURCE for the runtime alias layer and the three skins.
//
// Seven alias names are the re-skin seam: components read them instead of the
// raw ramp, so a skin is a list of remapped tokens rather than a second
// stylesheet. `npm run build` emits each skin under its selector into
// dist/tokens.css, and the dark skin into dist/njord.css for the HMI.
//
// A skin's `tokens` keys are web variable names WITHOUT the leading `--`.
// The generator translates them to --njord-* names where a counterpart exists.
// ─────────────────────────────────────────────────────────────────────────────

import { palette } from './color.js'

/** The runtime alias names, in emit order. These are NOT in @theme — they live on :root. */
export const aliasNames = [
  'background', // the page itself
  'foreground', // default text on the page
  'surface',    // a raised card or panel
  'surface-2',  // a recessed strip — table header, well
  'fg',         // primary text
  'fg-muted',   // secondary text
  'fg-subtle',  // tertiary / meta text
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
    /** Sidebar rail — chrome, not a token; documented for the shell only. */
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
    'surface-2': '#1C2B45',
    fg:          '#E8EDF5',
    'fg-muted':  '#B7C2D4',
    'fg-subtle': '#8B99B2',

    // The ramp inverts — low steps become surfaces, high steps become text.
    'color-slate-600': '#B7C2D4',
    'color-slate-500': '#97A5BC',
    'color-slate-400': '#8B99B2',
    'color-slate-300': '#384963',
    'color-slate-200': '#28374F',
    'color-slate-100': '#1C2B45',
    'color-slate-50':  '#13203A',

    // Status text needs a lighter hex to clear AA on a dark ground.
    'color-critical-text': '#FF6F66',
    'color-warning-text':  '#F2B341',
    'color-success-text':  '#3BD79F',
    'color-medium-text':   '#93B7FF',
    'color-primary-text':  '#41C4F5',

    'color-sev-crit-text': '#FF6F66',
    'color-sev-high-text': '#F2B341',
    'color-sev-med-text':  '#93B7FF',
    'color-sev-ok-text':   '#3BD79F',
  },
}

const legacy: Skin = {
  name: 'Legacy',
  selector: '[data-theme="legacy"]',
  description:
    'Recreates the classic NJORD/Ignition HMI: flat gray page, hard hairlines, no shadows, 3–4px radii.',
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
    'surface-2': '#E7EAED',
    fg:          '#1F2733',
    'fg-muted':  '#3A4754',
    'fg-subtle': '#5A6675',

    'color-slate-200': '#B4BCC5',
    'color-primary':   '#2F6CB0',
    'color-critical':  '#C8443D',
    'color-critical-text': '#A83229',

    // Hard geometry: the classic HMI has almost no corner radius and no depth.
    'radius-md': '4px',
    'radius-lg': '4px',
    'shadow-sm': 'none',
    'shadow-base': 'none',
    'shadow-md': 'none',
    'shadow-lg': 'none',
  },
}

export const skins = { modern, dark, legacy } as const

export type SkinName = keyof typeof skins

/** Ordered for docs and for CSS emission — `modern` first, it owns :root. */
export const skinList: Skin[] = [modern, dark, legacy]
