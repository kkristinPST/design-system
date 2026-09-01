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
