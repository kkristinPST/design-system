// Copies the generated token artefacts into public/downloads so the published
// site can hand them to developers directly. The site is the only thing they
// get — nothing may live outside it.
import { copyFileSync, mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const require = createRequire(import.meta.url)
const tokensDist = dirname(require.resolve('@njord/tokens/njord-theme'))
const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'downloads')

mkdirSync(out, { recursive: true })

for (const file of ['njord.css', 'tokens.json', 'tokens.css', 'theme-config.json']) {
  copyFileSync(join(tokensDist, file), join(out, file))
}

// The Ignition 8.3 theme entry point is named index.css inside the theme
// folder, so publish it under that name too — it is what devs actually save.
copyFileSync(join(tokensDist, 'njord.css'), join(out, 'index.css'))

console.log(`docs: copied njord.css, tokens.json, tokens.css → public/downloads`)
