import { njordThemeCss } from '@njord/tokens/njord-theme'

import Link from 'next/link'

import CodeBlock from '../../../components/CodeBlock'
import { ignitionSpecs } from '../../../components/ignition-specs'
import { asset } from '../../../components/asset'

const styleClass = `{
  "base": {
    "style": {
      "fontFamily": "var(--njord-font-sans)",
      "fontSize": "var(--njord-text-body)",
      "fontWeight": 600,
      "color": "#FFFFFF",
      "backgroundColor": "var(--njord-ink)",
      "borderStyle": "solid",
      "borderWidth": "1px",
      "borderColor": "var(--njord-ink)",
      "borderRadius": "var(--njord-r-md)",
      "padding": "var(--njord-sp-8) var(--njord-sp-14)",
      "whiteSpace": "nowrap",
      "cursor": "pointer",
      "transition": "background-color .12s, border-color .12s"
    }
  },
  "hover":    { "style": { "backgroundColor": "var(--njord-slate-800)" } },
  "disabled": { "style": { "opacity": 0.45, "cursor": "not-allowed", "boxShadow": "none" } }
}`

const perspectiveComponent = `{
  "type": "ia.input.button",
  "version": 0,
  "meta": { "name": "AckButton" },
  "props": {
    "text": "Acknowledge",
    "style": { "classes": "njord/btn/primary" }
  },
  "position": { "basis": "34px" },
  "events": {
    "dom": {
      "onClick": {
        "type": "script",
        "config": {
          "script": "system.alarm.acknowledge([event.source.custom.alarmId], 'Acked from HMI')"
        }
      }
    }
  }
}`

const structure = `<IgnitionInstall>/data/config/resources/core/
└── com.inductiveautomation.perspective/
    ├── themes/
    │   ├── light/                      ← base theme, copy it in first
    │   └── njord/                      ← a theme is a folder, not a file  
    │       ├── index.css               ← all tokens (the file above)
    │       ├── config.json             ← { entrypoint, isPrivate: false }
    │       └── resource.json           ← copy from a shipped theme
    ├── style-classes/
    │   └── njord/
    │       ├── btn/{primary,secondary,ghost,danger}/style.json
    │       ├── badge/{critical,high,medium,low,ok}/style.json
    │       ├── card/{base,head,body}/style.json
    │       ├── table/{header,cell,row-crit,row-warn}/style.json
    │       ├── tag/style.json          ← mono + tabular-nums
    │       └── state/{unack,ack,rtn,normal}/style.json
    └── views/
        └── Njord/
            ├── Components/             ← one embedded view per component
            └── Templates/              ← Dashboard, Alarms, Scada`

const bindingExample = `# Severity → style class. One expression, used by every alarm row,
# badge and rail so the mapping lives in exactly one place.
#
# Binding type: Expression   ·   Target: props.style.classes

case(
  {value},
  "critical", "njord/badge/critical",
  "high",     "njord/badge/high",
  "medium",   "njord/badge/medium",
  "low",      "njord/badge/low",
              "njord/badge/diagnostic"
)`

const alarmQuery = `# Perspective alarm binding — the feed behind Alarm row / Alarm ribbon.
# Binding type: Property → system.alarm.queryStatus

results = system.alarm.queryStatus(
    state=["ActiveUnacked", "ActiveAcked", "ClearUnacked"],
    priority=["Critical", "High", "Medium", "Low"],
    path=["prov:default:/tag:Site/{}/*".format(deptPath)],
)

rows = []
for a in results:
    rows.append({
        "id":       str(a.getId()),
        "alarm":    a.getLabel(),
        "tag":      a.getDisplayPath().toString(),
        "level":    str(a.getPriority()).lower(),
        "state":    "unack" if not a.isAcked() else "ack",
        "since":    a.getActiveData().getTimestamp(),
        "value":    a.getActiveData().get("eventValue"),
    })

# sort priority first, then age — never newest-first
order = {"critical": 0, "high": 1, "medium": 2, "low": 3, "diagnostic": 4}
rows.sort(key=lambda r: (order.get(r["level"], 9), r["since"]))
return rows`

export default function IgnitionPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Styles</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Ignition Perspective</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        How this design system is implemented in Ignition. One theme file carries every token, a
        style-class library carries every component variant, and views reference classes rather
        than inline styles; so a colour changes in one place and re-skins the whole HMI.
      </p>

      <div className="mt-6 rounded-lg border border-[color-mix(in_srgb,var(--color-warning)_28%,transparent)] bg-warning-bg px-4 py-3 text-[12px] leading-relaxed text-warning-text">
        Every component page carries its own <strong>Ignition Perspective</strong> block with the
        style-class JSON and view JSON for that component. This page is the shared foundation they
        all build on.
      </div>

      {/* ── 1. Theme ── */}
      <h2 className="mt-10 text-base font-bold text-ink">1 · The theme file</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        Tokens become CSS custom properties on <code className="font-mono text-xs">:root</code>,
        with an <code className="font-mono text-xs">--njord-</code> prefix so they never collide
        with Ignition&rsquo;s own variables. This is the complete file; copy or download it, drop it
        on the gateway, and every token in this system is available to every view.
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
        It is the <strong className="font-semibold text-ink">only</strong> place a value is allowed
        to live. If you find yourself typing a hex into a style class, the token for it is missing,
        raise it rather than inlining it.
      </p>

      <div className="mt-4 rounded-xl border border-warning-mid bg-warning-bg p-5">
        <p className="text-sm font-semibold text-warning-text">Installing it</p>
        <div className="mt-2 space-y-2 text-[13px] leading-relaxed text-warning-text">
          <p>
            A theme is a <strong>folder</strong> under{' '}
            <code className="font-mono text-[12px]">
              data/config/resources/core/com.inductiveautomation.perspective/themes/
            </code>
            , holding three files: <code className="font-mono text-[12px]">index.css</code> (the
            entry point; that is the file above),{' '}
            <code className="font-mono text-[12px]">config.json</code> and{' '}
            <code className="font-mono text-[12px]">resource.json</code>.
          </p>
          <p>Three ways this bites, all of which fail quietly rather than loudly:</p>
          <ul className="space-y-1.5">
            {[
              <>
                <strong>Not extending the base theme.</strong> A custom theme must{' '}
                <code className="font-mono text-[12px]">@import</code> the light theme. Anything
                light defines that yours does not is simply absent; the giveaway is buttons
                rendering with no border.
              </>,
              <>
                <strong>Leaving <code className="font-mono text-[12px]">isPrivate</code> at its
                default.</strong> It defaults to <code className="font-mono text-[12px]">true</code>
                , which keeps the theme out of the selector list. Set it{' '}
                <code className="font-mono text-[12px]">false</code>.
              </>,
              <>
                <strong>Forgetting to rescan.</strong> The gateway does not notice new theme files on
                its own; Platform → Overview → Scan File System, then restart.
              </>,
            ].map((item, i) => (
              <li key={i} className="flex gap-2.5">
                <span
                  aria-hidden
                  className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-warning-mid"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            Copy the base themes in first with a POST to{' '}
            <code className="font-mono text-[12px]">
              /data/api/v1/resources/com.inductiveautomation.perspective/themes/copy-base-themes
            </code>
            , then confirm the relative import path resolves on your install: the docs and the
            field reports differ on it, so verify rather than trust either.
          </p>
        </div>
      </div>

      <CodeBlock
        label="themes/njord/config.json"
        code={`{
  "entrypoint": "index.css",
  "isPrivate": false
}`}
      />
      <p className="mt-2 text-[12px] leading-relaxed text-slate-500">
        <code className="font-mono text-[11px]">resource.json</code> is deliberately not published
        here; its schema is internal to the gateway, and the supported route is to copy it from a
        theme your install already ships (<code className="font-mono text-[11px]">dark-cool</code> is
        the usual one) rather than hand-write it.
      </p>
      <CodeBlock
        label="themes/njord/index.css"
        code={njordThemeCss}
        maxHeight={420}
        download={{ href: asset('/downloads/njord.css'), filename: 'index.css' }}
      />

      {/* ── 1b. Fonts ── */}
      <h3 className="mt-8 text-sm font-bold text-ink">Fonts</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        Two families carry the whole system: <strong className="font-semibold text-ink">Inter</strong>{' '}
        for language and <strong className="font-semibold text-ink">JetBrains Mono</strong> for every
        number, tag, duration and setpoint. Both are open-licence (SIL OFL), so they can ship with
        the gateway. The theme already declares the stacks; you only need to make the files
        resolvable. Two ways, depending on whether the gateway can reach the internet:
      </p>
      <CodeBlock
        label="Option A; self-hosted (works air-gapped; preferred for a plant network)"
        code={`/* Put the .woff2 files beside njord.css in the themes folder, then add
   this to the TOP of njord.css. Download the families from
   fonts.google.com/specimen/Inter and .../JetBrains+Mono. */

@font-face {
  font-family: 'Inter';
  src: url('./fonts/Inter-Regular.woff2') format('woff2');
  font-weight: 400; font-display: swap;
}
@font-face {
  font-family: 'Inter';
  src: url('./fonts/Inter-SemiBold.woff2') format('woff2');
  font-weight: 600; font-display: swap;
}
@font-face {
  font-family: 'Inter';
  src: url('./fonts/Inter-Bold.woff2') format('woff2');
  font-weight: 700; font-display: swap;
}
@font-face {
  font-family: 'JetBrains Mono';
  src: url('./fonts/JetBrainsMono-Regular.woff2') format('woff2');
  font-weight: 400; font-display: swap;
}`}
      />
      <CodeBlock
        label="Option B; Google Fonts (only if the client browser has internet)"
        code={`/* First line of njord.css. Simpler, but it fails silently on an
   isolated plant network and falls back to the system sans. */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');`}
      />
      <p className="mt-3 text-[13px] leading-relaxed text-slate-500">
        The exact folder a gateway serves static assets from varies with version and reverse-proxy
        setup; confirm yours before committing to a path. What matters for the design is only that{' '}
        <code className="font-mono text-xs">Inter</code> and{' '}
        <code className="font-mono text-xs">JetBrains Mono</code> resolve; the fallback chain in the
        theme keeps everything legible if they do not, but the mono fallback will not be tabular and
        numbers will jitter.
      </p>

      {/* ── 2. Structure ── */}
      <h2 className="mt-10 text-base font-bold text-ink">2 · Project structure</h2>
      <CodeBlock label="Gateway resource layout" code={structure} />

      {/* ── 3. Style class ── */}
      <h2 className="mt-10 text-base font-bold text-ink">3 · A style class</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        Perspective style classes support <code className="font-mono text-xs">base</code>,{' '}
        <code className="font-mono text-xs">hover</code>,{' '}
        <code className="font-mono text-xs">active</code>,{' '}
        <code className="font-mono text-xs">focus</code> and{' '}
        <code className="font-mono text-xs">disabled</code> variants; which is exactly the set the
        web build uses. Values are <code className="font-mono text-xs">var()</code> references, never
        literals.
      </p>
      <CodeBlock label="style-classes/njord/btn/primary/style.json" code={styleClass} />

      {/* ── 4. Component ── */}
      <h2 className="mt-10 text-base font-bold text-ink">4 · Using it in a view</h2>
      <CodeBlock label="views/Njord/Components/Button/view.json · component fragment" code={perspectiveComponent} />

      {/* ── 5. Severity binding ── */}
      <h2 className="mt-10 text-base font-bold text-ink">5 · Severity in one expression</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        Severity drives badges, dots, rails and row tints. Bind the class name once and every
        component that shows severity stays consistent; including when the ramp is re-tuned.
      </p>
      <CodeBlock label="Expression binding → props.style.classes" code={bindingExample} />

      {/* ── 6. Alarm data ── */}
      <h2 className="mt-10 text-base font-bold text-ink">6 · The alarm feed</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        Alarm row, alarm ribbon and the alarm table all read this shape. Note the sort: priority
        first, then age. Newest-first is wrong: a three-hour-old critical outranks a one-minute-old
        low.
      </p>
      <CodeBlock label="Property binding → script transform" code={alarmQuery} />

      {/* ── 7. Style-class index ── */}
      <h2 className="mt-10 text-base font-bold text-ink">7 · Every style class</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        The complete library, one row per component. Each links to the component page, where the
        full style-class JSON, the view JSON and the implementation notes for that component live;
        ready to copy. Build them in this order and nothing later is blocked.
      </p>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {Object.entries(ignitionSpecs).map(([slug, spec], i) => (
          <Link
            key={slug}
            href={`/components/${slug}`}
            className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 px-5 py-2.5 transition-colors hover:bg-slate-50 ${
              i > 0 ? 'border-t border-slate-100' : ''
            }`}
          >
            <span className="w-6 shrink-0 font-mono text-[10px] text-slate-400">{i + 1}</span>
            <span className="w-40 shrink-0 text-[13px] font-semibold text-ink">
              {slug.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase())}
            </span>
            <span className="font-mono text-[11px] text-primary-text">
              {spec.styles?.path ?? '—'}
            </span>
          </Link>
        ))}
      </div>

      {/* ── Rules ── */}
      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Rules</p>
        <ul className="mt-3 space-y-2">
          {[
            <>
              Never set a colour, radius or shadow inline on a component. Inline styles cannot be
              re-skinned, and the legacy and dark themes both depend on re-pointing tokens.
            </>,
            <>
              Prefer Ignition&rsquo;s built-in{' '}
              <code className="font-mono text-[12px]">ia.display.alarm-status-table</code> for the
              full alarm register; then style it with the{' '}
              <code className="font-mono text-[12px]">njord/table/*</code> classes rather than
              rebuilding the table from flex containers.
            </>,
            <>
              Set <code className="font-mono text-[12px]">fontVariantNumeric: tabular-nums</code> on
              every numeric readout. Without it a polling value shifts the layout on each update.
            </>,
            <>
              Use <code className="font-mono text-[12px]">ia.container.flex</code> for everything
              that reflows, and reserve{' '}
              <code className="font-mono text-[12px]">ia.container.coord</code> for SCADA mimics,
              where absolute geometry is the point.
            </>,
            <>
              Perspective mobile sessions get the mobile variants. Do not scale the desktop view
              down; the layouts are rebuilt, not reflowed.
            </>,
          ].map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-600">
              <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
