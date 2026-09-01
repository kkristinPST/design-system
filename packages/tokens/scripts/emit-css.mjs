// ─────────────────────────────────────────────────────────────────────────────
// Generator — turns the token source into the artefacts each build consumes.
//
//   dist/tokens.css      Tailwind v4 @theme + the runtime alias layer + skins
//   dist/njord.css       the Ignition Perspective gateway theme
//   dist/njord-theme.js  the same CSS as a string, so the docs can render it
//   dist/tokens.json     a flat name → value map for anything else
//
// Run via `npm run build` in packages/tokens (tsc first, then this).
// ─────────────────────────────────────────────────────────────────────────────

import { writeFileSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import {
  tokenGroups,
  allTokens,
  webToIgnition,
  aliasNames,
  skinList,
  keyframes,
  assertTokenIntegrity,
} from '../dist/index.js'

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

assertTokenIntegrity()

const RULE = '─'.repeat(77)

// These files are handed to people outside this repo — they are the deliverable.
// The banner must therefore never reference a path only this machine can reach.
// Set NJORD_DOCS_URL to stamp the published documentation URL into every file.
const DOCS_URL = process.env.NJORD_DOCS_URL?.trim()
const { version } = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'package.json'), 'utf8'),
)

function banner(what) {
  const source = DOCS_URL
    ? `   The NJORD design system is the source for every value below:\n   ${DOCS_URL}\n`
    : '   The NJORD design system documentation is the source for every value below.\n'
  return `/* ${RULE}
   ${what}
   NJORD design system · v${version}

   DO NOT HAND-EDIT. This file is generated, and it is the single place a
   colour, radius, font or shadow is allowed to live. An edit made here is
   lost the next time the design system publishes an update — and a value
   typed directly into a component cannot be re-skinned at all.

${source}   ${RULE} */
`
}

/** Longest name in a list, so the values line up in a column. */
function pad(name, width) {
  return name + ' '.repeat(Math.max(0, width - name.length))
}

function declarations(entries, indent) {
  const width = Math.max(...entries.map(([n]) => n.length)) + 1
  return entries
    .map(([name, value, comment]) => {
      const line = `${indent}${pad(`${name}:`, width + 1)} ${value};`
      return comment ? `${line} /* ${comment} */` : line
    })
    .join('\n')
}

// ── dist/tokens.css ──────────────────────────────────────────────────────────

const isRoot = (t) => t.scope === 'root'

const themeBlocks = tokenGroups()
  .map((group) => {
    const entries = group.tokens.filter((t) => !isRoot(t)).map((t) => [t.web, t.value, t.comment])
    if (!entries.length) return null
    return `  /* ── ${group.title} ── */\n${declarations(entries, '  ')}`
  })
  .filter(Boolean)
  .join('\n\n')

// Tokens that must NOT mint a Tailwind utility live on :root instead.
const rootBlocks = tokenGroups()
  .map((group) => {
    const entries = group.tokens.filter(isRoot).map((t) => [t.web, t.value, t.comment])
    if (!entries.length) return null
    return `  /* ── ${group.title} ── */\n${declarations(entries, '  ')}`
  })
  .filter(Boolean)
  .join('\n\n')

/**
 * Keyframes are shared by both stylesheets. The colour references inside them
 * are written as placeholders because the two builds name colours differently.
 */
function keyframeBlock(target) {
  const subs =
    target === 'web'
      ? { PRIMARY: '--color-primary', PRIMARY_BG: '--color-primary-bg', SURFACE: '--surface' }
      : { PRIMARY: '--njord-primary', PRIMARY_BG: '--njord-primary-bg', SURFACE: '--njord-white' }
  return Object.entries(keyframes)
    .map(([name, k]) => {
      const body = k.css.replace(/--([A-Z_]+)/g, (_, token) => subs[token] ?? `--${token}`)
      return `/* ${k.use} */\n@keyframes ${name} { ${body} }`
    })
    .join('\n')
}

const inlineAliases = declarations(
  aliasNames.map((a) => [`--color-${a}`, `var(--${a})`]),
  '  ',
)

const skinBlocks = skinList
  .map((skin) => {
    const entries = Object.entries(skin.tokens).map(([k, v]) => [`--${k}`, v])
    return `/* ${skin.name} — ${skin.description} */\n${skin.selector} {\n${declarations(entries, '  ')}\n}`
  })
  .join('\n\n')

const tokensCss = `${banner('NJORD design tokens — web build (Tailwind v4)')}
@theme {
${themeBlocks}
}

/* ${RULE}
   Runtime aliases — the semantic layer components read from. Re-pointing these
   is what re-skins every screen at once; the skins below do exactly that.
   ${RULE} */

@theme inline {
${inlineAliases}
}

/* Spacing, layout and motion — deliberately NOT in @theme, so Tailwind does
   not mint utilities from them. Reference as var(--sp-4), var(--d-press). */
:root {
${rootBlocks}
}

${skinBlocks}

/* ${RULE}
   Named keyframes the components reference.
   ${RULE} */

${keyframeBlock('web')}

/* ${RULE}
   Reduced motion — collapses the duration tokens, so every transition and
   animation that references one follows without its own media query.
   ${RULE} */

${reducedMotion('')}
`

writeFileSync(join(DIST, 'tokens.css'), tokensCss, 'utf8')

// Reduced motion. Emitted into BOTH outputs rather than left to the consuming
// app, because the tokens above promise it — d-shimmer says "disabled under
// prefers-reduced-motion" and d-spin-reduced exists solely for this block. A
// consumer that installs the stylesheet and nothing else must still honour it.
//
// Durations are collapsed at the token level so anything referencing them
// follows without knowing the media query exists. The spinner is the one
// animation that must keep turning — a frozen spinner reads as a hung screen —
// so it slows to d-spin-reduced instead of stopping. The shimmer stops dead.
function reducedMotion(prefix) {
  const v = (name) => `--${prefix}${name}`
  return `@media (prefers-reduced-motion: reduce) {
  :root {
    ${v('d-press')}: 0ms;
    ${v('d-fade')}: 0ms;
    ${v('d-rise')}: 0ms;
    ${v('d-settle')}: 0ms;
    ${v('d-travel')}: 0ms;
    ${v('d-slide')}: 0ms;
    ${v('d-pop')}: 0ms;
    ${v('d-sheet')}: 0ms;
    ${v('d-hl')}: 0ms;
    ${v('d-indeterminate')}: 0ms;

    /* A frozen spinner reads as a hung screen, so this one slows, never stops. */
    ${v('d-spin')}: var(${v('d-spin-reduced')});
  }

  /* The skeleton sweep is decoration, not feedback — it stops outright. */
  .nj-skeleton, .njord-skeleton { animation: none; }
}`
}

// ── dist/njord.css ───────────────────────────────────────────────────────────

const ignitionEntries = allTokens()
  .filter((t) => t.ignition)
  .map((t) => [t.ignition, t.ignitionValue ?? t.value, t.comment])

const nameMap = webToIgnition()

const ignitionSkins = skinList
  .filter((skin) => skin.ignitionSelector)
  .map((skin) => {
    const entries = Object.entries(skin.tokens)
      .map(([key, value]) => [nameMap.get(key), value])
      .filter(([name]) => Boolean(name))
    return `/* ${skin.name} — re-point the same names, nothing else changes */\n${skin.ignitionSelector} {\n${declarations(entries, '  ')}\n}`
  })
  .join('\n\n')

const njordCss = `${banner('NJORD design tokens — Ignition Perspective theme (8.3)')}
/* INSTALL
   A theme is a folder. Create:

     <IgnitionInstall>/data/config/resources/core/
       com.inductiveautomation.perspective/themes/njord/
         index.css      <- this file
         config.json    <- { "entrypoint": "index.css", "isPrivate": false }
         resource.json  <- copy from a shipped theme, e.g. dark-cool

   Then: Gateway webpage -> Platform -> Overview -> Scan File System, pick
   "njord" in the session's theme property, and restart the Gateway.

   These are the SAME token names as the web build behind an --njord- prefix,
   so a value only ever changes in one place. */

/* A custom theme must extend the base light theme. Anything light defines that
   this file does not is simply absent — the usual symptom is buttons rendering
   with no border. Copy the base themes in first via
   POST <gateway>/data/api/v1/resources/com.inductiveautomation.perspective/
   themes/copy-base-themes, then confirm this relative path resolves on your
   install. */
@import "../light/index.css";

:root {
${declarations(ignitionEntries, '  ')}
}

/* Every number in the HMI is tabular — a polling value must not jitter. */
.njord-data,
.njord-metric,
.psc-njord\\/data {
  font-family: var(--njord-font-mono);
  font-variant-numeric: tabular-nums;
}

${ignitionSkins}

/* Named keyframes — set animationName on a style class to use one. */
${keyframeBlock('ignition')}

/* Reduced motion — collapses the duration tokens for the whole theme. */
${reducedMotion('njord-')}
`

writeFileSync(join(DIST, 'njord.css'), njordCss, 'utf8')

// The 8.3 theme folder also needs a config.json beside index.css. Only the two
// documented keys are emitted — resource.json is deliberately NOT generated,
// because its schema is internal and the supported route is to copy it from a
// theme the gateway already ships.
writeFileSync(
  join(DIST, 'theme-config.json'),
  `${JSON.stringify({ entrypoint: 'index.css', isPrivate: false }, null, 2)}\n`,
  'utf8',
)

// ── dist/njord-theme.js — the same CSS as an importable string ───────────────

writeFileSync(
  join(DIST, 'njord-theme.js'),
  `// GENERATED FILE — DO NOT EDIT. See packages/tokens/scripts/emit-css.mjs.\nexport const njordThemeCss = ${JSON.stringify(njordCss)}\n`,
  'utf8',
)

writeFileSync(
  join(DIST, 'njord-theme.d.ts'),
  `// GENERATED FILE — DO NOT EDIT.\nexport declare const njordThemeCss: string\n`,
  'utf8',
)

// ── dist/tokens.json — flat map for any other consumer ───────────────────────

const json = {}
for (const t of allTokens()) json[t.web] = t.value

writeFileSync(join(DIST, 'tokens.json'), `${JSON.stringify(json, null, 2)}\n`, 'utf8')

const ignitionCount = ignitionEntries.length
console.log(
  `@njord/tokens: ${allTokens().length} tokens → tokens.css, ` +
    `${ignitionCount} → njord.css, ${skinList.length} skins, tokens.json`,
)
