// ─────────────────────────────────────────────────────────────────────────────
// Design Tokens — Icon sizes
//
// THIS FILE IS THE SOURCE. Six sizes, all even.
//
// The rule that picks one: an icon's size follows the TEXT it sits with, not
// the container it sits in. A 16px glyph beside 14/20 body reads as part of the
// sentence; the same glyph in a 40px button still follows the label, not the
// button. Sizing by container is what produced thirteen different icon sizes
// across the app — 10, 11, 13, 15, 17, 19, 22, 23 and 26 all chosen per call
// site, none of them named.
//
// Every glyph is drawn on a 24×24 viewBox and rendered at one of these sizes.
// Stroke stays 2 at every size — it is NOT scaled with the glyph, or a small
// icon turns spindly and a large one turns fat. Colour always inherits
// currentColor so an icon cannot disagree with the text beside it.
// ─────────────────────────────────────────────────────────────────────────────

export const iconSizes = {
  'icon-12': { value: '12px', use: 'Micro-mark inside a chip, badge or pill' },
  'icon-14': { value: '14px', use: 'Inline with body 14/20 — table-cell actions, link arrows, meta lines' },
  'icon-16': { value: '16px', use: 'DEFAULT — buttons, menu items, card heads, inputs, sidebar rail' },
  'icon-20': { value: '20px', use: 'Prominent — dialog close, top-bar buttons, sidebar nav, mobile tab bar, steppers' },
  'icon-24': { value: '24px', use: 'Hero glyph — empty-state tiles, confirm-dialog glyph, equipment glyphs' },
  'icon-28': { value: '28px', use: 'Mobile screen hero only' },
} as const

/** Stroke width. Constant across sizes; the mobile active tab is the one exception. */
export const iconStroke = {
  'icon-stroke': { value: '2', use: 'Every icon at every size' },
  'icon-stroke-active': { value: '2.4', use: 'Active mobile tab only' },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// The icon SET.
//
// Lucide, pinned at v0.469.0. Names below are Lucide's own kebab-case names and
// are the literal string the app passes to its Icon component — they are not
// labels chosen for this document. A name that is not on this list either does
// not exist in Lucide or is not used by NJORD; in both cases the icon silently
// renders as nothing, because the lookup returns null rather than throwing.
//
// Every glyph is a 24×24 outline at stroke 2, with round caps and joins, and
// inherits currentColor. Equipment symbols — pump, tank, valve, blower — are
// NOT icons and are not in Lucide; they are drawn SVG and live with the SCADA
// symbol set.
//
// `count` is how many call sites use it in the source application. It is kept
// because it answers the question a reader actually has: is this the
// established glyph for the job, or a one-off? A count of 1 is a candidate for
// consolidation, not a precedent to copy.
// ─────────────────────────────────────────────────────────────────────────────

export const iconSet = {
  library: 'lucide',
  version: '0.469.0',
  viewBox: '24',
  license: 'ISC',
  url: 'https://lucide.dev',
} as const

export type IconGroup = {
  title: string
  note?: string
  icons: readonly { readonly name: string; readonly count: number }[]
}

export const iconGroups: readonly IconGroup[] = [
  {
    title: 'Navigation & disclosure',
    note: 'Moving between places, opening and closing things.',
    icons: [
      { name: 'chevron-right', count: 49 },
      { name: 'chevron-down', count: 20 },
      { name: 'chevron-left', count: 10 },
      { name: 'chevron-up', count: 3 },
      { name: 'chevrons-up-down', count: 2 },
      { name: 'chevrons-left', count: 1 },
      { name: 'chevrons-up', count: 1 },
      { name: 'arrow-right', count: 20 },
      { name: 'arrow-up-right', count: 19 },
      { name: 'arrow-left', count: 7 },
      { name: 'arrow-down-to-line', count: 3 },
      { name: 'corner-down-left', count: 2 },
      { name: 'corner-down-right', count: 1 },
      { name: 'x', count: 34 },
      { name: 'external-link', count: 2 },
      { name: 'square-arrow-out-up-right', count: 1 },
      { name: 'maximize-2', count: 13 },
      { name: 'move-diagonal-2', count: 2 },
      { name: 'panel-right-open', count: 2 },
      { name: 'log-out', count: 3 },
    ],
  },
  {
    title: 'Actions',
    note: 'Things an operator does. `pencil` is edit; there is no `edit` glyph.',
    icons: [
      { name: 'plus', count: 48 },
      { name: 'pencil', count: 27 },
      { name: 'trash-2', count: 15 },
      { name: 'download', count: 14 },
      { name: 'upload', count: 2 },
      { name: 'search', count: 40 },
      { name: 'sliders-horizontal', count: 19 },
      { name: 'send', count: 6 },
      { name: 'minus', count: 6 },
      { name: 'copy', count: 4 },
      { name: 'rotate-ccw', count: 10 },
      { name: 'rotate-cw', count: 1 },
      { name: 'refresh-cw', count: 1 },
      { name: 'undo-2', count: 2 },
      { name: 'repeat', count: 2 },
      { name: 'more-vertical', count: 3 },
      { name: 'ellipsis-vertical', count: 1 },
      { name: 'eraser', count: 1 },
      { name: 'printer', count: 2 },
      { name: 'play', count: 2 },
      { name: 'pause', count: 1 },
      { name: 'power', count: 1 },
      { name: 'scan-line', count: 1 },
    ],
  },
  {
    title: 'Status & feedback',
    note: 'Alarm and confirmation vocabulary. Never colour alone.',
    icons: [
      { name: 'check', count: 69 },
      { name: 'check-check', count: 3 },
      { name: 'check-circle-2', count: 3 },
      { name: 'check-circle', count: 1 },
      { name: 'check-square', count: 1 },
      { name: 'info', count: 22 },
      { name: 'alert-triangle', count: 18 },
      { name: 'bell', count: 7 },
      { name: 'bell-ring', count: 2 },
      { name: 'shield', count: 7 },
      { name: 'ban', count: 4 },
      { name: 'minus-circle', count: 1 },
      { name: 'help-circle', count: 2 },
      { name: 'life-buoy', count: 2 },
      { name: 'lock', count: 4 },
      { name: 'loader', count: 1 },
      { name: 'cloud-off', count: 1 },
      { name: 'flag', count: 1 },
      { name: 'skull', count: 2 },
    ],
  },
  {
    title: 'Data & trends',
    note: 'Charts, tables and readouts. `line-chart` is the trend glyph.',
    icons: [
      { name: 'line-chart', count: 39 },
      { name: 'bar-chart-2', count: 6 },
      { name: 'bar-chart-3', count: 2 },
      { name: 'chart-pie', count: 2 },
      { name: 'activity', count: 8 },
      { name: 'table-2', count: 4 },
      { name: 'columns-3', count: 2 },
      { name: 'rows-3', count: 1 },
      { name: 'layout-grid', count: 2 },
      { name: 'list', count: 3 },
      { name: 'list-checks', count: 1 },
      { name: 'align-left', count: 1 },
      { name: 'gauge', count: 2 },
      { name: 'target', count: 1 },
      { name: 'crosshair', count: 4 },
      { name: 'ruler', count: 2 },
      { name: 'function-square', count: 1 },
    ],
  },
  {
    title: 'Time & scheduling',
    icons: [
      { name: 'history', count: 16 },
      { name: 'calendar', count: 10 },
      { name: 'clock', count: 9 },
      { name: 'calendar-clock', count: 2 },
      { name: 'calendar-plus', count: 1 },
      { name: 'alarm-clock', count: 2 },
    ],
  },
  {
    title: 'Documents & records',
    icons: [
      { name: 'clipboard-list', count: 8 },
      { name: 'file-text', count: 6 },
      { name: 'file-bar-chart', count: 3 },
      { name: 'clipboard-check', count: 1 },
      { name: 'sticky-note', count: 3 },
      { name: 'notebook-pen', count: 2 },
      { name: 'book-open', count: 1 },
      { name: 'bookmark', count: 1 },
      { name: 'message-square', count: 2 },
      { name: 'message-square-text', count: 1 },
      { name: 'archive', count: 4 },
    ],
  },
  {
    title: 'Structure & hierarchy',
    note: 'Facility tree, systems and grouping.',
    icons: [
      { name: 'folder-tree', count: 7 },
      { name: 'folder', count: 5 },
      { name: 'folder-plus', count: 4 },
      { name: 'folder-open', count: 1 },
      { name: 'folder-search', count: 1 },
      { name: 'layers', count: 5 },
      { name: 'box', count: 4 },
      { name: 'package', count: 2 },
      { name: 'building-2', count: 3 },
      { name: 'map', count: 5 },
      { name: 'map-pin', count: 2 },
      { name: 'workflow', count: 3 },
      { name: 'git-merge', count: 3 },
      { name: 'git-commit-horizontal', count: 1 },
      { name: 'square', count: 1 },
    ],
  },
  {
    title: 'Domain — RAS process & fish',
    note: 'NJORD-specific. Equipment symbols are separate.',
    icons: [
      { name: 'zap', count: 8 },
      { name: 'utensils', count: 8 },
      { name: 'wrench', count: 6 },
      { name: 'droplets', count: 2 },
      { name: 'waves', count: 1 },
      { name: 'thermometer', count: 1 },
      { name: 'fish', count: 2 },
      { name: 'heart-pulse', count: 1 },
      { name: 'flask-conical', count: 1 },
      { name: 'recycle', count: 2 },
      { name: 'cpu', count: 3 },
      { name: 'battery-full', count: 1 },
    ],
  },
  {
    title: 'People & devices',
    icons: [
      { name: 'user', count: 6 },
      { name: 'users', count: 2 },
      { name: 'user-plus', count: 1 },
      { name: 'smartphone', count: 2 },
      { name: 'monitor', count: 1 },
      { name: 'phone', count: 1 },
      { name: 'keyboard', count: 1 },
      { name: 'wifi', count: 1 },
      { name: 'signal', count: 1 },
    ],
  },
  {
    title: 'Settings & appearance',
    icons: [
      { name: 'settings-2', count: 3 },
      { name: 'cog', count: 1 },
      { name: 'palette', count: 1 },
      { name: 'sun', count: 1 },
      { name: 'star', count: 4 },
    ],
  },
]

/** Every icon name in the set, flattened. */
export const iconNames: readonly string[] = iconGroups.flatMap((g) =>
  g.icons.map((i) => i.name),
)
