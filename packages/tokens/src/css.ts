// ─────────────────────────────────────────────────────────────────────────────
// The emit map — the one place that says what a token is CALLED in CSS.
//
// Every entry names the token twice: once for the web build (`web`) and once
// for the Ignition Perspective theme (`ignition`). Values are read from the
// data modules, never retyped here, so this file governs naming only.
//
// Leave `ignition` off when a token has no counterpart in the HMI (the neutral
// aliases and the --text-* scale are web-only; Perspective sizes type inline).
// ─────────────────────────────────────────────────────────────────────────────

import { palette, status, severity, severityChip, fluids, scada } from './color.js'
import { fontFamilies, typeScale, mobileTypeScale, textSizes } from './typography.js'
import { radii, elevation, shell, target } from './layout.js'
import { spacing, layoutSpacing, clearance } from './spacing.js'
import { durations, easings } from './motion.js'
import { iconSizes, iconStroke } from './icons.js'

export type CssToken = {
  /** Web variable name, including the leading `--`. */
  web: string
  /** Ignition variable name. Omit when the HMI has no counterpart. */
  ignition?: string
  value: string
  /** Set only when the HMI needs a different literal (font stacks, px sizes). */
  ignitionValue?: string
  comment?: string
  /**
   * `theme` (default) emits into Tailwind's @theme, which turns the token into
   * a utility class. `root` emits onto :root instead — for tokens that should
   * NOT mint a class, because Tailwind already owns that namespace (spacing) or
   * the concept has no utility (durations, easings).
   */
  scope?: 'theme' | 'root'
}

export type CssGroup = {
  title: string
  tokens: CssToken[]
}

/**
 * The next/font CSS variables the web build injects, per family, and the
 * family in each stack that the variable actually substitutes for.
 *
 * The two are not always the first entry: --font-mono leads with Consolas so a
 * control-room Windows machine renders the original, and the webfont variable
 * belongs on the JetBrains Mono behind it. Wrapping the first entry instead
 * would let next/font override Consolas and invert that order.
 */
export const webFontVars = {
  sans: { cssVar: '--font-inter', family: 'Inter' },
  mono: { cssVar: '--font-jetbrains-mono', family: "'JetBrains Mono'" },
} as const

/**
 * `Inter, -apple-system, …` → `var(--font-inter, Inter), -apple-system, …`
 * so the stack still resolves when next/font is not in play.
 */
function withFontVar(stack: string, v: { cssVar: string; family: string }): string {
  const parts = stack.split(',').map((p) => p.trim())
  const i = parts.findIndex((p) => p === v.family)
  if (i === -1) throw new Error(`withFontVar: ${v.family} is not in the stack: ${stack}`)
  parts[i] = `var(${v.cssVar}, ${v.family})`
  return parts.join(', ')
}

/** '11.5px' → '0.71875rem'. Type is authored in px and emitted in rem. */
function toRem(px: string): string {
  const n = Number.parseFloat(px)
  if (Number.isNaN(n)) throw new Error(`toRem: not a px value: ${px}`)
  return `${n / 16}rem`
}

// Where a data key and its CSS name disagree, the CSS name wins and the
// mapping is spelled out here rather than guessed by a transform.
const SEVERITY_CSS: Record<keyof typeof severity, string> = {
  critical: 'crit',
  high: 'high',
  medium: 'med',
  low: 'low',
  diagnostic: 'diag',
  ok: 'ok',
}

const FLUID_CSS: Record<keyof typeof fluids, string> = {
  process: 'proc',
  raw: 'raw',
  drain: 'drain',
  sludge: 'sludge',
  glycol: 'glycol',
  brine: 'brine',
  oxygen: 'o2',
  gas: 'gas',
  chemical: 'chem',
  feed: 'feed',
}

const SCADA_CSS: Record<keyof typeof scada, string> = {
  pipe: 'pipe',
  node: 'node',
  edge: 'edge',
  vessel: 'vessel',
  water: 'water',
  line: 'line',
  fillLite: 'fill-lite',
  cabinet: 'cabinet',
  cabinetEdge: 'cabinet-edge',
  halo: 'halo',
  run: 'run',
  stop: 'stop',
  abnormal: 'abnormal',
}

/** Elevation steps carry no suffix in the HMI at the base step. */
const ELEVATION_CSS: Record<keyof typeof elevation, string> = {
  sm: '--njord-shadow-sm',
  base: '--njord-shadow',
  md: '--njord-shadow-md',
  lg: '--njord-shadow-lg',
}

export function tokenGroups(): CssGroup[] {
  const slate: CssToken[] = [
    { web: '--color-ink', ignition: '--njord-ink', value: palette.slate.ink, comment: 'darkest chrome — sidebar, primary buttons, bulk bar' },
    ...([800, 700, 600, 500, 400, 350, 300, 200, 100, 50] as const).map((step) => ({
      web: `--color-slate-${step}`,
      ignition: `--njord-slate-${step}`,
      value: palette.slate[step],
    })),
    { web: '--color-white', ignition: '--njord-white', value: palette.white },
    { web: '--color-black', ignition: '--njord-black', value: palette.black },
  ]

  // The neutral ramp is an alias of slate, kept so older chrome keeps working.
  const neutralSteps: [number, string][] = [
    [0, palette.white],
    [50, palette.slate[50]],
    [100, palette.slate[100]],
    [200, palette.slate[200]],
    [300, palette.slate[300]],
    [400, palette.slate[400]],
    [500, palette.slate[500]],
    [600, palette.slate[600]],
    [700, palette.slate[700]],
    [800, palette.slate[800]],
    [900, palette.slate.ink],
    [1000, palette.black],
  ]

  const brand: CssToken[] = [
    { web: '--color-primary', ignition: '--njord-primary', value: palette.primary, comment: 'brand cyan — links, focus, selection' },
    { web: '--color-success', ignition: '--njord-success', value: palette.success, comment: 'indicator green — never carries text' },
    { web: '--color-warning', ignition: '--njord-warning', value: palette.warning },
    { web: '--color-critical', ignition: '--njord-critical', value: palette.critical },
    { web: '--color-medium', ignition: '--njord-medium', value: palette.medium, comment: 'MEDIUM priority — its own royal blue, never brand cyan' },
  ]

  const tints: CssToken[] = Object.entries(status).flatMap(([name, members]) =>
    Object.entries(members).map(([member, value]) => ({
      web: `--color-${name}-${member}`,
      ignition: `--njord-${name}-${member}`,
      value: value as string,
    })),
  )

  const sev: CssToken[] = Object.entries(severity).flatMap(([name, t]) => {
    const key = SEVERITY_CSS[name as keyof typeof severity]
    return [
      { web: `--color-sev-${key}`, ignition: `--njord-sev-${key}`, value: t.mark },
      { web: `--color-sev-${key}-ink`, ignition: `--njord-sev-${key}-ink`, value: t.ink },
      { web: `--color-sev-${key}-text`, ignition: `--njord-sev-${key}-text`, value: t.text },
    ]
  })

  // Filled chip pairs. Same severity keys, so they reuse SEVERITY_CSS.
  const sevChip: CssToken[] = Object.entries(severityChip).flatMap(([name, c]) => {
    const key = SEVERITY_CSS[name as keyof typeof severity]
    return [
      {
        web: `--color-sev-chip-${key}`,
        ignition: `--njord-sev-chip-${key}`,
        value: c.fill,
        comment: `${c.ratio} against its ink`,
      },
      {
        web: `--color-sev-chip-${key}-ink`,
        ignition: `--njord-sev-chip-${key}-ink`,
        value: c.ink,
      },
    ]
  })

  const fl: CssToken[] = Object.entries(fluids).map(([name, f]) => {
    const key = FLUID_CSS[name as keyof typeof fluids]
    return {
      web: `--color-fl-${key}`,
      ignition: `--njord-fl-${key}`,
      value: f.color,
      comment: f.dashed ? `${f.label} — dashed` : f.label,
    }
  })

  const sc: CssToken[] = Object.entries(scada).map(([name, value]) => ({
    web: `--color-sc-${SCADA_CSS[name as keyof typeof scada]}`,
    ignition: `--njord-sc-${SCADA_CSS[name as keyof typeof scada]}`,
    value,
  }))

  const fonts: CssToken[] = [
    {
      web: '--font-sans',
      ignition: '--njord-font-sans',
      value: withFontVar(fontFamilies.sans, webFontVars.sans),
      ignitionValue: fontFamilies.sans,
    },
    {
      web: '--font-mono',
      ignition: '--njord-font-mono',
      value: withFontVar(fontFamilies.mono, webFontVars.mono),
      ignitionValue: fontFamilies.mono,
    },
  ]

  // The web build takes rem so the scale respects a user's browser text size.
  // Perspective style classes are authored in px, so the HMI gets px — and it
  // gets them at all, so a style class never has to hardcode a size.
  const type: CssToken[] = Object.values(typeScale).flatMap((t) => {
    const out: CssToken[] = [
      {
        web: `--text-${t.token}`,
        ignition: `--njord-text-${t.token}`,
        value: toRem(t.fontSize),
        ignitionValue: t.fontSize,
        comment: `${t.fontSize} — ${t.usage}`,
      },
      {
        web: `--text-${t.token}--line-height`,
        ignition: `--njord-lh-${t.token}`,
        value: toRem(t.lineHeight),
        ignitionValue: t.lineHeight,
      },
    ]
    if (t.letterSpacing !== '0') {
      out.push({
        web: `--text-${t.token}--letter-spacing`,
        ignition: `--njord-ls-${t.token}`,
        value: t.letterSpacing,
      })
    }
    return out
  })

  // Mobile roles. The phone build re-tunes nine of them for a 393px viewport,
  // and they are NOT derivable from the desktop scale — a 30px vital value with
  // 30px leading is a deliberate 1.0 ratio no desktop role uses. Emitted under
  // an `-m-` infix so a consumer can see at a glance which surface a role is
  // for. Off @theme like spacing: these are for direct var() reference, not for
  // Tailwind to mint `text-m-*` utilities from.
  const kebab = (s: string) => s.replace(/(?<=[a-z])(?=[A-Z])/g, '-').toLowerCase()

  const mobileType: CssToken[] = Object.entries(mobileTypeScale).flatMap(([name, t]) => {
    const key = kebab(name)
    const out: CssToken[] = [
      {
        web: `--text-m-${key}`,
        ignition: `--njord-text-m-${key}`,
        value: t.fontSize,
        comment: `${t.fontSize}/${t.lineHeight} — mobile only`,
        scope: 'root' as const,
      },
      {
        web: `--lh-m-${key}`,
        ignition: `--njord-lh-m-${key}`,
        value: t.lineHeight,
        scope: 'root' as const,
      },
    ]
    if (t.letterSpacing !== '0') {
      out.push({
        web: `--ls-m-${key}`,
        ignition: `--njord-ls-m-${key}`,
        value: t.letterSpacing,
        scope: 'root' as const,
      })
    }
    return out
  })

  // Spacing stays off @theme: Tailwind owns `--spacing-*` and would mint
  // p-sp-4 / gap-sp-4 utilities from it. Referenced as var(--sp-4) instead.
  const space: CssToken[] = Object.entries(spacing).map(([name, s]) => ({
    web: `--${name}`,
    ignition: `--njord-${name}`,
    value: s.value,
    comment: s.use,
    scope: 'root',
  }))

  const layout: CssToken[] = Object.entries(layoutSpacing).map(([name, s]) => ({
    web: `--${name}`,
    ignition: `--njord-${name}`,
    value: s.value,
    comment: s.use,
    scope: 'root',
  }))

  const textSize: CssToken[] = Object.entries(textSizes).map(([name, t]) => ({
    web: `--${name}`,
    ignition: `--njord-${name}`,
    value: t.value,
    comment: t.use,
    scope: 'root' as const,
  }))

  // Clearance floors — component dimensions, not gaps. Off @theme for the same
  // reason spacing is: they must not mint padding utilities.
  const clear: CssToken[] = Object.entries(clearance).map(([name, c]) => ({
    web: `--${name}`,
    ignition: `--njord-${name}`,
    value: c.value,
    comment: c.use,
    scope: 'root' as const,
  }))

  const icons: CssToken[] = [
    ...Object.entries(iconSizes).map(([name, i]) => ({
      web: `--${name}`,
      ignition: `--njord-${name}`,
      value: i.value,
      comment: i.use,
      scope: 'root' as const,
    })),
    ...Object.entries(iconStroke).map(([name, i]) => ({
      web: `--${name}`,
      ignition: `--njord-${name}`,
      value: i.value,
      comment: i.use,
      scope: 'root' as const,
    })),
  ]

  // Shell dimensions and the interactive-target floor. Sizes, not spacing —
  // off @theme so they cannot mint padding utilities.
  const dims: CssToken[] = [...Object.entries(shell), ...Object.entries(target)].map(
    ([name, d]) => ({
      web: `--${name}`,
      ignition: `--njord-${name}`,
      value: d.value,
      comment: d.use,
      scope: 'root' as const,
    }),
  )

  const motion: CssToken[] = [
    ...Object.entries(durations).map(([name, d]) => ({
      web: `--${name}`,
      ignition: `--njord-${name}`,
      value: d.value,
      comment: d.use,
      scope: 'root' as const,
    })),
    ...Object.entries(easings).map(([name, e]) => ({
      web: `--${name}`,
      ignition: `--njord-${name}`,
      value: e.value,
      comment: e.use,
      scope: 'root' as const,
    })),
  ]

  const radius: CssToken[] = Object.entries(radii).map(([name, value]) => ({
    web: `--radius-${name}`,
    ignition: `--njord-r-${name}`,
    value,
  }))

  const shadow: CssToken[] = Object.entries(elevation).map(([name, value]) => ({
    web: `--shadow-${name}`,
    ignition: ELEVATION_CSS[name as keyof typeof elevation],
    value,
  }))

  return [
    { title: 'Slate ramp — the neutral spine of the system', tokens: slate },
    {
      title: 'Neutral aliases — map 1:1 onto the slate ramp',
      tokens: neutralSteps.map(([step, value]) => ({ web: `--color-neutral-${step}`, value })),
    },
    { title: 'Brand / semantic base', tokens: brand },
    { title: 'Status tints — bg / mid / text / solid', tokens: tints },
    { title: 'Severity — mark, ink on that mark, and text on a normal surface', tokens: sev },
    { title: 'Severity — filled chip pairs (fill + the ink it carries)', tokens: sevChip },
    { title: 'Process-fluid line coding (SCADA mimic pipes)', tokens: fl },
    { title: 'SCADA equipment palette (ISA-101 HP-HMI)', tokens: sc },
    { title: 'Font families', tokens: fonts },
    { title: 'Type scale — semantic text roles', tokens: type },
    { title: 'Type scale — mobile re-tuned roles (393px)', tokens: mobileType },
    { title: 'Radii', tokens: radius },
    { title: 'Elevation', tokens: shadow },
    { title: 'Spacing — the fixed 2px scale', tokens: space },
    { title: 'Layout — fluid gutters, gaps and rails', tokens: layout },
    { title: 'Clearance — space measured off a neighbouring element', tokens: clear },
    { title: 'Icons — sizes and stroke', tokens: icons },
    { title: 'Shell dimensions and interactive-target floor', tokens: dims },
    { title: 'Motion — durations and easings', tokens: motion },
    { title: 'Text size — the user preference multiplier', tokens: textSize },
  ]
}

/** Every token, flattened. */
export function allTokens(): CssToken[] {
  return tokenGroups().flatMap((g) => g.tokens)
}

/** `color-slate-200` → `--njord-slate-200`. Keys are web names without `--`. */
export function webToIgnition(): Map<string, string> {
  const map = new Map<string, string>()
  for (const t of allTokens()) {
    if (t.ignition) map.set(t.web.slice(2), t.ignition)
  }
  return map
}

/**
 * Fails the build on the mistakes that would quietly desync a consumer:
 * a duplicated name, or a colour token that is not a literal hex.
 */
export function assertTokenIntegrity(): void {
  const web = new Set<string>()
  const ign = new Set<string>()
  for (const t of allTokens()) {
    if (web.has(t.web)) throw new Error(`Duplicate web token name: ${t.web}`)
    web.add(t.web)
    if (t.ignition) {
      if (ign.has(t.ignition)) throw new Error(`Duplicate Ignition token name: ${t.ignition}`)
      ign.add(t.ignition)
    }
    if (t.web.startsWith('--color-') && !/^#[0-9A-Fa-f]{6}$/.test(t.value)) {
      throw new Error(`Colour token ${t.web} is not a 6-digit hex: ${t.value}`)
    }
  }
}
