export default function BrandAndLogoPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Foundations</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Brand &amp; logo</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        Branding lives in exactly one place: the top of the navigation rail. Everywhere else the
        interface is neutral chrome, because in an alarm console every pixel of colour and emphasis
        is reserved for process state.
      </p>

      {/* ── Placement ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Placement</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <div className="bg-ink p-0">
            <div className="flex h-[72px] items-center justify-between border-b border-white/[0.06] px-[22px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/njord-wordmark.png" alt="NJORD" className="h-[26px] w-auto" />
              <button aria-label="Collapse" className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-350">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>
            </div>
            <div className="space-y-1 p-3">
              {['Overview', 'Alarms', 'Process'].map((l, i) => (
                <div key={l} className={`h-8 rounded-md px-3 text-xs leading-8 ${i === 1 ? 'bg-slate-800 text-white' : 'text-slate-350'}`}>{l}</div>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-200 bg-white px-4 py-3.5">
            <p className="text-sm font-semibold text-ink">Expanded rail — wordmark</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              72px logo band, 22px horizontal padding, a hairline of white at 6% underneath.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <div className="bg-ink">
            <div className="flex h-[72px] items-center justify-center border-b border-white/[0.06]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/njord-mark.svg" alt="NJORD" className="h-[30px] w-auto" />
            </div>
            <div className="space-y-1 p-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`h-8 rounded-md ${i === 1 ? 'bg-slate-800' : ''}`} />
              ))}
            </div>
          </div>
          <div className="border-t border-slate-200 bg-white px-4 py-3.5">
            <p className="text-sm font-semibold text-ink">Collapsed rail — mark</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              At 72px the wordmark is replaced by the mark alone, centred, and the collapse control
              moves into the nav.
            </p>
          </div>
        </div>
      </div>

      {/* ── Surfaces ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Surfaces</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Ink (default)', bg: '#0F182B', src: '/njord-wordmark.png', filter: undefined, note: 'The rail in the modern and dark skins. Uses the white wordmark as shipped.' },
          { label: 'Light', bg: '#FFFFFF', src: '/njord-logo-blue.svg', filter: undefined, note: 'Print, exported reports and the login screen.' },
          { label: 'Legacy rail', bg: '#E7EAED', src: '/njord-wordmark.png', filter: 'brightness(0) saturate(100%) invert(28%) sepia(34%) saturate(900%) hue-rotate(178deg)', note: 'The classic skin flips the rail to a light nav and recolours the same asset with a CSS filter.' },
        ].map(({ label, bg, src, filter, note }) => (
          <div key={label} className="overflow-hidden rounded-xl border border-slate-200">
            <div className="flex h-[92px] items-center justify-center" style={{ background: bg }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="NJORD" className="h-[26px] w-auto" style={{ filter }} />
            </div>
            <div className="border-t border-slate-200 bg-white px-4 py-3.5">
              <p className="text-[13px] font-semibold text-ink">{label}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Rules ── */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[color-mix(in_srgb,var(--color-success)_30%,transparent)] bg-success-bg p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.8px] text-success-text">Do</p>
          <ul className="mt-2.5 space-y-1.5 text-[13px] leading-relaxed text-slate-700">
            <li>· Keep the mark in the rail and nowhere else</li>
            <li>· Swap wordmark for mark when the rail collapses</li>
            <li>· Recolour the mark per skin using a filter, not a second asset</li>
            <li>· Leave the 72px band clear of anything but the logo and the collapse control</li>
          </ul>
        </div>
        <div className="rounded-xl border border-[color-mix(in_srgb,var(--color-critical)_28%,transparent)] bg-critical-bg p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.8px] text-critical-text">Don&rsquo;t</p>
          <ul className="mt-2.5 space-y-1.5 text-[13px] leading-relaxed text-slate-700">
            <li>· Put the logo in the top bar, on cards or in dialogs</li>
            <li>· Use brand navy as a UI colour — the interface uses the slate ramp</li>
            <li>· Recolour the mark to a status colour</li>
            <li>· Add a logo watermark behind a mimic or a chart</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-[12px] leading-relaxed text-slate-600">
        Brand assets ship with the design system:{' '}
        <code className="font-mono text-[11px]">njord-mark.svg</code>,{' '}
        <code className="font-mono text-[11px]">njord-wordmark.png</code> and{' '}
        <code className="font-mono text-[11px]">logo-collapsed.svg</code>. Use the SVG wherever the
        renderer supports it — the rail recolours it per theme with a CSS filter rather than
        shipping one asset per skin.
      </div>
    </div>
  )
}
