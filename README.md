# NJORD Design System

The design system behind the NJORD redesign — a fish-farming SCADA and alarm
console built to ISA-18.2 and ISA-101.

This repository produces a **published documentation site** that is the
specification handed to developers implementing the console in Ignition
Perspective. The site is self-contained: every token, component, pattern and
screen is documented on it, with the Perspective JSON ready to copy. Developers
need the URL and nothing else from here.

## Layout

```
packages/tokens/     THE source — every design value lives here, once
  src/               edit this
  dist/              generated · gitignored · never edit

apps/docs/           the documentation site (Next.js)
  app/               one route per foundation, component, pattern, template
  components/        ComponentDoc shell · ignition-specs · Sidebar nav
  public/downloads/  generated artefacts served to developers
```

## Working on it

```bash
npm install     # once, at the root
npm run dev     # builds @njord/tokens, then serves the docs
npm run build   # production build of both
```

`npm run dev` and `npm run build` both build the token package first, so the
docs never render against a stale theme.

## The one rule

A colour, size, radius, duration or spacing step is **never** typed as a
literal into a screen. It is named in `packages/tokens/src` and referenced.

One source produces four artefacts, so the web build and the HMI cannot drift:

| Artefact | For |
| --- | --- |
| `dist/tokens.css` | the web build — Tailwind v4 `@theme`, alias layer, three skins |
| `dist/index.css` | the Ignition Perspective theme (`--njord-*`) |
| `dist/index.js` | typed values for JS/TS |
| `dist/tokens.json` | a flat name → value map for anything else |

Changing a value means editing `packages/tokens/src` and running
`npm run build`. The generator fails on a duplicated token name or a colour
that is not a 6-digit hex.

Set `NJORD_DOCS_URL` before building to stamp the published documentation URL
into every generated file, so an artefact found on its own can be traced back.

## Keeping the prototype aligned

The system leads and the Claude Design prototype follows. `CLAUDE-DESIGN-PROMPT*.md`
are the briefs used to pull that project back into line — type, then spacing.
