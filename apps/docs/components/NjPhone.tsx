import type { ReactNode } from 'react'
import NjIcon from './NjIcon'

const TABS = [
  { l: 'Home', icon: 'home' },
  { l: 'Alarms', icon: 'bell-ring', badge: 4 },
  { l: 'Tanks', icon: 'map' },
  { l: 'Trends', icon: 'line-chart' },
  { l: 'More', icon: 'settings' },
]

/**
 * The NJORD phone frame at its true dimensions (iPhone 16 Pro, 393×852 screen
 * inside a 413×872 device) scaled down as a whole so proportions stay exact.
 * Source: mobile/mobile.css (.device / .screen / .m-statusbar / .m-tabbar).
 */
export default function NjPhone({
  children,
  scale = 0.62,
  active = 'Alarms',
  caption,
}: {
  children: ReactNode
  scale?: number
  active?: string
  caption?: string
}) {
  return (
    <figure className="m-0">
      <div
        className="overflow-hidden"
        style={{ width: 413 * scale, height: 872 * scale }}
      >
        <div
          style={{
            width: 413,
            height: 872,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {/* device */}
          <div className="relative h-[872px] w-[413px] rounded-[56px] bg-[#0B0E14] p-[10px] shadow-[0_0_0_2px_#23262D,0_30px_80px_rgba(15,24,43,0.4)]">
            {/* screen */}
            <div className="relative flex h-[852px] w-[393px] flex-col overflow-hidden rounded-[47px] bg-slate-50">
              {/* status bar */}
              <div className="relative z-40 flex h-[54px] flex-none items-center justify-between pl-8 pr-[34px] text-ink">
                <span className="text-[15px] font-semibold tracking-[0.3px] tabular-nums">14:32</span>
                <span className="flex items-center gap-1.5 text-[11px]">▮▮▮ ⏻</span>
              </div>
              {/* dynamic island */}
              <span className="absolute left-1/2 top-[11px] h-9 w-[126px] -translate-x-1/2 rounded-[20px] bg-black" />

              {/* app column */}
              <div className="flex min-h-0 flex-1 flex-col">{children}</div>

              {/* tab bar */}
              <div className="flex flex-none items-stretch border-t border-slate-200 bg-white px-1.5 pt-1.5 pb-[26px]">
                {TABS.map(({ l, icon, badge }) => {
                  const on = l === active
                  return (
                    <button
                      key={l}
                      className={`relative flex flex-1 flex-col items-center gap-[3px] px-0.5 py-1.5 ${
                        on ? 'text-primary-text' : 'text-slate-400'
                      }`}
                    >
                      <span className="relative inline-flex">
                        <NjIcon name={icon} size={21} />
                        {badge ? (
                          <span className="absolute -top-[5px] -right-[9px] inline-flex h-4 min-w-[16px] items-center justify-center rounded-full border-[1.5px] border-white bg-critical-solid px-1 font-mono text-[10px] font-extrabold text-white">
                            {badge}
                          </span>
                        ) : null}
                      </span>
                      <span className="text-[10px] font-semibold tracking-[0.1px]">{l}</span>
                    </button>
                  )
                })}
              </div>

              {/* home indicator */}
              <span className="absolute bottom-2 left-1/2 z-[60] h-[5px] w-[140px] -translate-x-1/2 rounded-[3px] bg-[#0B0E14] opacity-90" />
            </div>
          </div>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/** The alarm ribbon pinned under the status bar on every mobile screen. */
export function MRibbon() {
  return (
    <button className="flex flex-none items-center gap-2.5 border-b border-slate-200 border-l-4 border-l-critical bg-critical-bg py-[9px] pl-3 pr-3.5 text-left">
      <span className="flex-none rounded-[5px] bg-critical-solid px-1.5 py-[3px] text-[9px] font-extrabold uppercase tracking-[0.5px] text-white">
        Crit
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-px">
        <b className="truncate text-[12px] font-bold leading-tight text-ink">
          Dissolved oxygen low-low
        </b>
        <span className="text-[11px] text-slate-600">
          <span className="font-mono text-[11px]">DO-0403</span> · DPT1 Fish Tank · 4h
        </span>
      </span>
      <span className="flex-none rounded-full bg-[rgba(15,24,43,0.10)] px-[7px] py-0.5 font-mono text-[11px] font-extrabold text-ink">
        +3
      </span>
    </button>
  )
}

/** The large screen header: 24px/800 title, optional back arrow and subtitle. */
export function MHead({
  title,
  sub,
  back,
  actions,
}: {
  title: string
  sub?: string
  back?: boolean
  actions?: ('search' | 'filter' | 'more')[]
}) {
  return (
    <div className="flex flex-none items-start justify-between gap-2.5 px-4 pt-1.5 pb-3">
      <div className="flex min-w-0 items-center gap-1">
        {back && (
          <button className="-ml-1.5 inline-flex p-0.5 text-ink" aria-label="Back">
            <NjIcon name="chevron-left" size={24} strokeWidth={2.2} />
          </button>
        )}
        <div className="min-w-0">
          <div className="text-2xl font-extrabold leading-[1.1] tracking-[-0.5px] text-ink">{title}</div>
          {sub && <div className="mt-[3px] truncate text-[12px] text-slate-500">{sub}</div>}
        </div>
      </div>
      {actions && actions.length > 0 && (
        <div className="flex flex-none items-center gap-1.5">
          {actions.map((a) => (
            <button
              key={a}
              aria-label={a}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
            >
              <NjIcon name={a === 'search' ? 'search' : a === 'more' ? 'settings' : 'line-chart'} size={18} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
