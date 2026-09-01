import type { Ignition } from './ComponentDoc'

/**
 * Ignition Perspective implementation notes, one entry per component.
 * Kept in a single module so a change to the token names or the style-class
 * layout is a single-file edit rather than a sweep across 36 pages.
 *
 * Shared foundation (theme file, resource layout, severity binding, alarm
 * query) lives on /styles/ignition.
 */

const C = ({ children }: { children: string }) => (
  <code className="font-mono text-xs">{children}</code>
)

export const ignitionSpecs: Record<string, Ignition> = {
  // ── Actions & input ──────────────────────────────────────────────────────
  button: {
    maps: (
      <>
        <C>ia.input.button</C> with a <C>njord/btn/*</C> style class. The mobile
        variants are the same component with <C>njord/btn/m-*</C>.
      </>
    ),
    styles: {
      path: 'style-classes/njord/btn/secondary/style.json',
      json: `{
  "base": {
    "style": {
      "fontFamily": "var(--njord-font-sans)",
      "fontSize": "var(--njord-text-body)", "fontWeight": 600,
      "color": "var(--njord-ink)",
      "backgroundColor": "#FFFFFF",
      "borderStyle": "solid", "borderWidth": "1px",
      "borderColor": "var(--njord-slate-300)",
      "borderRadius": "var(--njord-r-md)",
      "padding": "var(--njord-sp-8) var(--njord-sp-14)",
      "boxShadow": "var(--njord-shadow-sm)",
      "cursor": "pointer"
    }
  },
  "hover":    { "style": { "backgroundColor": "var(--njord-slate-50)" } },
  "disabled": { "style": { "opacity": 0.45, "cursor": "not-allowed", "boxShadow": "none" } }
}`,
    },
    view: {
      path: 'style-classes/njord/btn/m-primary/style.json: mobile',
      json: `{
  "base": {
    "style": {
      "height": "50px", "flexGrow": 1,
      "borderRadius": "14px",
      "fontSize": "var(--njord-text-body)", "fontWeight": 700,
      "color": "#FFFFFF",
      "backgroundColor": "var(--njord-primary)",
      "borderStyle": "none"
    }
  },
  "disabled": {
    "style": {
      "backgroundColor": "var(--njord-slate-100)",
      "color": "var(--njord-slate-400)",
      "borderStyle": "solid", "borderWidth": "1px",
      "borderColor": "var(--njord-slate-200)"
    }
  }
}`,
    },
    notes: [
      <>
        Desktop primary is <C>--njord-ink</C>, not brand cyan. Do not swap in{' '}
        <C>--njord-primary</C> because it looks more like a button: cyan is
        reserved for links, focus and selection.
      </>,
      <>
        A green action surface must use <C>--njord-success-solid</C>. The bare{' '}
        <C>--njord-success</C> is a 2.3:1 indicator green and cannot carry a
        white label.
      </>,
    ],
  },

  input: {
    maps: (
      <>
        <C>ia.input.text-field</C> and <C>ia.input.text-area</C>, wrapped in an{' '}
        <C>ia.container.flex</C> when an icon sits inside the field.
      </>
    ),
    styles: {
      path: 'style-classes/njord/field/style.json',
      json: `{
  "base": {
    "style": {
      "fontFamily": "var(--njord-font-sans)",
      "fontSize": "var(--njord-text-body)",
      "color": "var(--njord-ink)",
      "backgroundColor": "#FFFFFF",
      "borderStyle": "solid", "borderWidth": "1px",
      "borderColor": "var(--njord-slate-300)",
      "borderRadius": "var(--njord-r-md)",
      "padding": "var(--njord-sp-8) var(--njord-sp-12)"
    }
  },
  "focus": {
    "style": {
      "borderColor": "var(--njord-primary)",
      "boxShadow": "0 0 0 3px var(--njord-primary-bg)",
      "outline": "none"
    }
  },
  "placeholder": { "style": { "color": "var(--njord-slate-400)" } }
}`,
    },
    view: {
      path: 'style-classes/njord/field/m-field/style.json: mobile',
      json: `{
  "base": {
    "style": {
      "height": "48px",
      "fontSize": "var(--njord-text-card-title)",
      "borderRadius": "12px",
      "borderColor": "var(--njord-slate-200)",
      "padding": "0 var(--njord-sp-14)"
    }
  }
}`,
    },
    notes: [
      <>
        Mobile fields are 15px for a reason: below 16px iOS zooms the viewport on
        focus, and a Perspective mobile session inherits that behaviour.
      </>,
      <>
        Put <C>props.style.classes</C> on the field itself, not a wrapper;
        Perspective applies the focus variant to the input element.
      </>,
    ],
  },

  select: {
    maps: (
      <>
        <C>ia.input.dropdown</C> for short lists; an{' '}
        <C>ia.display.flex-repeater</C> for the stacked enum and the mobile
        option sheet.
      </>
    ),
    styles: {
      path: 'style-classes/njord/select/style.json',
      json: `{
  "base": {
    "style": {
      "fontFamily": "var(--njord-font-sans)",
      "fontSize": "var(--njord-text-body)",
      "color": "var(--njord-ink)",
      "backgroundColor": "#FFFFFF",
      "borderStyle": "solid", "borderWidth": "1px",
      "borderColor": "var(--njord-slate-300)",
      "borderRadius": "var(--njord-r-md)",
      "padding": "var(--njord-sp-6) var(--njord-sp-8) var(--njord-sp-6) var(--njord-sp-12)"
    }
  },
  "hover": { "style": { "borderColor": "var(--njord-slate-400)" } }
}`,
    },
    view: {
      path: 'style-classes/njord/select/option-selected/style.json',
      json: `{
  "base": {
    "style": {
      "backgroundColor": "var(--njord-primary-bg)",
      "borderColor": "var(--njord-primary)",
      "borderStyle": "solid", "borderWidth": "1px",
      "borderRadius": "var(--njord-r-md)",
      "fontWeight": 600,
      "minHeight": "48px",
      "padding": "var(--njord-sp-10) var(--njord-sp-12)"
    }
  }
}`,
    },
    notes: [
      <>
        Past roughly five options, or any option longer than a few words, build
        the stacked list with a flex-repeater. A dropdown hides its options until
        it is opened.
      </>,
      <>
        The dropdown popup is rendered by the browser, so the theme must set{' '}
        <C>color-scheme</C> or the OS paints a light list under light text in the
        dark skin.
      </>,
    ],
  },

  checkbox: {
    maps: (
      <>
        <C>ia.input.checkbox</C> and <C>ia.input.radio-group</C>. The table
        selection column uses the checkbox column type on{' '}
        <C>ia.display.table</C>.
      </>
    ),
    styles: {
      path: 'style-classes/njord/checkbox/style.json',
      json: `{
  "base": {
    "style": {
      "width": "16px", "height": "16px",
      "borderStyle": "solid", "borderWidth": "1.5px",
      "borderColor": "var(--njord-slate-300)",
      "borderRadius": "4px",
      "backgroundColor": "#FFFFFF",
      "cursor": "pointer"
    }
  },
  "selected":      { "style": { "backgroundColor": "var(--njord-primary)", "borderColor": "var(--njord-primary)", "color": "#FFFFFF" } },
  "indeterminate": { "style": { "backgroundColor": "var(--njord-primary)", "borderColor": "var(--njord-primary)", "color": "#FFFFFF" } },
  "hover":         { "style": { "borderColor": "var(--njord-primary)" } }
}`,
    },
    notes: [
      <>
        A header checkbox over a partial selection binds to{' '}
        <C>props.indeterminate</C>, not <C>props.selected</C>. Perspective
        supports the tri-state: use it rather than showing a full check.
      </>,
      <>
        Mobile scales the box to 22px but the row stays the target. Put the click
        handler on the containing flex, not the checkbox.
      </>,
    ],
  },

  'toggle-switch': {
    maps: (
      <>
        <C>ia.input.toggle-switch</C> for the mobile settings rows; a styled{' '}
        <C>ia.display.label</C> pill for the desktop account menu.
      </>
    ),
    styles: {
      path: 'style-classes/njord/switch/style.json',
      json: `{
  "base": {
    "style": {
      "width": "46px", "height": "28px",
      "borderRadius": "20px",
      "backgroundColor": "var(--njord-slate-300)",
      "transition": "background-color .2s"
    }
  },
  "selected": { "style": { "backgroundColor": "var(--njord-success)" } },
  "handle":   { "style": { "width": "22px", "height": "22px", "backgroundColor": "#FFFFFF", "boxShadow": "var(--njord-shadow-sm)" } }
}`,
    },
    notes: [
      <>
        A switch writes immediately. If the change needs a Save step it is a
        checkbox in a form; in Ignition that difference is whether the binding is
        bidirectional.
      </>,
      <>
        On is <C>--njord-success</C>, not brand cyan: the control reports a system
        condition.
      </>,
    ],
  },

  stepper: {
    maps: (
      <>
        <C>ia.input.numeric-entry-field</C> between two <C>ia.input.button</C>{' '}
        components inside an <C>ia.container.flex</C>.
      </>
    ),
    styles: {
      path: 'style-classes/njord/stepper/value/style.json',
      json: `{
  "base": {
    "style": {
      "fontFamily": "var(--njord-font-mono)",
      "fontVariantNumeric": "tabular-nums",
      "fontSize": "var(--njord-text-metric)", "fontWeight": 700,
      "letterSpacing": "-0.5px",
      "color": "var(--njord-ink)",
      "textAlign": "center",
      "borderStyle": "none",
      "backgroundColor": "transparent"
    }
  }
}`,
    },
    script: {
      label: "Change script: gate the commit on the tag's engineering range",
      code: `lo = system.tag.readBlocking([tagPath + ".EngLow"])[0].value
hi = system.tag.readBlocking([tagPath + ".EngHigh"])[0].value

ok = lo <= currentValue.value <= hi
self.getSibling("SaveButton").props.enabled = ok
self.getSibling("Reason").props.text = (
    "" if ok else "Outside the %.1f - %.1f range for this tag." % (lo, hi)
)`,
    },
    notes: [
      <>
        Read the range from the tag&rsquo;s own EngLow / EngHigh rather than
        hard-coding it in the view; the stepper then stays correct when the tag
        is re-ranged.
      </>,
      <>
        Disable the commit and explain why in words. A red border with no sentence
        tells an operator nothing.
      </>,
    ],
  },

  // ── Containers ───────────────────────────────────────────────────────────
  card: {
    maps: (
      <>
        <C>ia.container.flex</C> in column mode. Header and body are child flex
        containers, not separate views.
      </>
    ),
    styles: {
      path: 'style-classes/njord/card/style.json',
      json: `{
  "base": {
    "style": {
      "backgroundColor": "#FFFFFF",
      "borderStyle": "solid", "borderWidth": "1px",
      "borderColor": "var(--njord-slate-200)",
      "borderRadius": "var(--njord-r-lg)",
      "boxShadow": "var(--njord-shadow)",
      "overflow": "hidden"
    }
  }
}`,
    },
    view: {
      path: 'style-classes/njord/card/head/style.json',
      json: `{
  "base": {
    "style": {
      "padding": "var(--njord-sp-16) var(--njord-sp-20)",
      "borderBottomStyle": "solid", "borderBottomWidth": "1px",
      "borderBottomColor": "var(--njord-slate-200)",
      "fontSize": "var(--njord-text-card-title)", "fontWeight": 700,
      "color": "var(--njord-ink)"
    }
  }
}`,
    },
    notes: [
      <>
        When the card holds a full-bleed child (a table, filter bar or bulk bar)
        give the card no padding and let the child own the edges. Doing both
        double-pads it.
      </>,
      <>
        Do not hard-code the shadow. The legacy skin sets it to <C>none</C> and
        leans on a heavier border instead.
      </>,
    ],
  },

  'kpi-card': {
    maps: (
      <>
        <C>ia.container.flex</C> (column) holding three <C>ia.display.label</C>{' '}
        components: eyebrow, metric, delta.
      </>
    ),
    styles: {
      path: 'style-classes/njord/kpi/metric/style.json',
      json: `{
  "base": {
    "style": {
      "fontFamily": "var(--njord-font-mono)",
      "fontVariantNumeric": "tabular-nums",
      "fontSize": "var(--njord-text-metric)",
      "lineHeight": "32px",
      "letterSpacing": "-0.5px",
      "color": "var(--njord-ink)"
    }
  }
}`,
    },
    view: {
      path: 'The row · reflows by column, never by squeeze',
      json: `{
  "type": "ia.container.flex",
  "props": { "direction": "row", "wrap": "wrap", "style": { "gap": "var(--njord-sp-16)" } },
  "children": [
    { "type": "ia.display.view",
      "props": { "path": "Njord/Components/KpiCard" },
      "position": { "grow": 1, "shrink": 1, "basis": "208px" } }
  ]
}`,
    },
    notes: [
      <>
        Set basis to 208px with grow and shrink on; that is what makes the row
        drop from four columns to two instead of squeezing four cramped cards.
      </>,
      <>
        <C>tabular-nums</C> is not optional. A polling KPI with proportional digits
        visibly jitters.
      </>,
    ],
  },

  'empty-state': {
    maps: (
      <>
        <C>ia.container.flex</C> bound to the row count, sharing the container
        with the list it replaces.
      </>
    ),
    styles: {
      path: 'style-classes/njord/empty/style.json',
      json: `{
  "base": {
    "style": {
      "padding": "var(--njord-sp-32) var(--njord-sp-20)",
      "textAlign": "center",
      "fontSize": "var(--njord-text-body)",
      "color": "var(--njord-slate-400)"
    }
  }
}`,
    },
    script: {
      label: 'Expression binding → props.text · say WHICH kind of empty',
      code: `// "no results" and "nothing is wrong" are opposite meanings
// and must never share wording.
if({../rowCount} > 0, "",
  if({../filterCount} > 0,
     "No alarms match these filters.",
     "No active alarms."))`,
    },
    notes: [
      <>
        Never render a blank area. An empty table keeps its header; a blank region
        is indistinguishable from a failed query.
      </>,
      <>
        All-clear uses the success well, nothing-yet uses the neutral slate well.
        Tone tells the operator whether this is good news before they read a word.
      </>,
    ],
  },

  // ── Status & markers ─────────────────────────────────────────────────────
  badge: {
    maps: (
      <>
        <C>ia.display.label</C> with a <C>njord/badge/*</C> class, bound through
        the shared severity expression.
      </>
    ),
    styles: {
      path: 'style-classes/njord/badge/critical/style.json',
      json: `{
  "base": {
    "style": {
      "fontFamily": "var(--njord-font-sans)",
      "fontSize": "var(--njord-text-badge)", "fontWeight": 700,
      "letterSpacing": "0.5px",
      "textTransform": "uppercase",
      "whiteSpace": "nowrap",
      "padding": "var(--njord-sp-4) var(--njord-sp-8)",
      "borderRadius": "var(--njord-r-sm)",
      "color": "#FFFFFF",
      "backgroundColor": "var(--njord-critical-solid)"
    }
  }
}`,
    },
    script: {
      label: 'Expression binding → props.style.classes',
      code: `case(
  {../alarm.level},
  "critical", "njord/badge/critical",
  "high",     "njord/badge/high",
  "medium",   "njord/badge/medium",
  "low",      "njord/badge/low",
              "njord/badge/diagnostic"
)`,
    },
    notes: [
      <>
        Only critical takes a solid fill, and it uses{' '}
        <C>--njord-critical-solid</C>; the bare mark is 3.73:1 on white and
        cannot hold white text.
      </>,
      <>
        Medium uses its own royal blue. Never point it at <C>--njord-primary</C>:
        under ISA-101 alarm colour is reserved for alarm state.
      </>,
    ],
  },

  'status-dot': {
    maps: (
      <>
        A zero-text <C>ia.display.label</C> sized to 9px, or{' '}
        <C>ia.shapes.ellipse</C> inside a mimic.
      </>
    ),
    styles: {
      path: 'style-classes/njord/dot/style.json',
      json: `{
  "base": {
    "style": {
      "width": "9px", "height": "9px",
      "borderRadius": "50%",
      "flexShrink": 0,
      "boxShadow": "0 0 0 1px rgba(15,24,43,.16)"
    }
  }
}`,
    },
    script: {
      label: 'Expression binding → props.style.backgroundColor',
      code: `case(
  {../status},
  "critical", "var(--njord-sev-crit)",
  "high",     "var(--njord-sev-high)",
  "medium",   "var(--njord-sev-med)",
  "low",      "var(--njord-sev-low)",
  "ok",       "var(--njord-sev-ok)",
              "var(--njord-sev-diag)"
)`,
    },
    notes: [
      <>
        The 1px ring is not decoration. Without it a bright dot dissolves into a
        status tint of the same hue.
      </>,
      <>
        Never ship a dot without an adjacent label. In the dark skin the ring flips
        to white at 20%.
      </>,
    ],
  },

  tag: {
    maps: (
      <>
        <C>ia.display.label</C> with the <C>njord/tag</C> class; also the column
        style for tag and value columns on <C>ia.display.table</C>.
      </>
    ),
    styles: {
      path: 'style-classes/njord/tag/style.json',
      json: `{
  "base": {
    "style": {
      "fontFamily": "var(--njord-font-mono)",
      "fontVariantNumeric": "tabular-nums",
      "fontSize": "var(--njord-text-tag)",
      "lineHeight": "16px",
      "letterSpacing": "0.3px",
      "color": "var(--njord-slate-600)"
    }
  }
}`,
    },
    notes: [
      <>
        Bind the text to the tag&rsquo;s display path, not a hand-typed string, so
        a re-pathed tag cannot leave a stale label behind.
      </>,
      <>Everything mono is tabular. A column of durations must align on the digit.</>,
    ],
  },

  'state-tag': {
    maps: (
      <>
        <C>ia.container.flex</C> (row) holding a glyph and a text{' '}
        <C>ia.display.label</C>, classed by <C>njord/state/*</C>.
      </>
    ),
    styles: {
      path: 'style-classes/njord/state/unack/style.json',
      json: `{
  "base": {
    "style": {
      "fontFamily": "var(--njord-font-mono)",
      "fontSize": "var(--njord-text-badge)", "fontWeight": 700,
      "letterSpacing": "0.6px",
      "padding": "var(--njord-sp-2) var(--njord-sp-8) var(--njord-sp-2) var(--njord-sp-6)",
      "borderRadius": "var(--njord-r-sm)",
      "borderStyle": "solid", "borderWidth": "1px",
      "backgroundColor": "var(--njord-critical-bg)",
      "color": "var(--njord-critical-text)",
      "borderColor": "color-mix(in srgb, var(--njord-critical) 22%, transparent)"
    }
  }
}`,
    },
    script: {
      label: 'Expression: process state crossed with acknowledgement',
      code: `// Perspective alarm objects expose isAcked() and isActive() separately.
// The four lifecycle states are the PRODUCT of the two, not one field.
if({../alarm.active} && !{../alarm.acked}, "unack",
if({../alarm.active} &&  {../alarm.acked}, "ack",
if(!{../alarm.active} && !{../alarm.acked}, "rtn", "normal")))`,
    },
    notes: [
      <>
        Suppression is a second, independent axis. A shelved alarm that is still
        active is both; render the state tag and the suppression tag side by
        side, never collapsed into one.
      </>,
      <>
        Keep the letter glyph. In a dense table colour alone fails for roughly one
        in twelve male operators.
      </>,
    ],
  },

  // ── Alarms ───────────────────────────────────────────────────────────────
  'alarm-row': {
    maps: (
      <>
        <C>ia.display.alarm-status-table</C> with row and column style bindings;
        or an embedded view in <C>ia.display.flex-repeater</C> when the row needs
        custom actions.
      </>
    ),
    styles: {
      path: 'style-classes/njord/table/row-crit/style.json',
      json: `{
  "base": {
    "style": {
      "backgroundColor": "color-mix(in srgb, var(--njord-critical) 7%, #FFFFFF)",
      "boxShadow": "inset 3px 0 0 var(--njord-critical)"
    }
  }
}`,
    },
    view: {
      path: 'Alarm table · row style by priority',
      json: `{
  "type": "ia.display.alarm-status-table",
  "props": {
    "rows": { "count": 25 },
    "sort": [ { "field": "priority",   "dir": "desc" },
              { "field": "activeTime", "dir": "asc"  } ],
    "rowStyles": {
      "Critical": { "classes": "njord/table/row-crit" },
      "High":     { "classes": "njord/table/row-warn" }
    },
    "columns": [
      { "field": "priority",    "render": "view", "viewPath": "Njord/Components/Badge" },
      { "field": "eventState",  "render": "view", "viewPath": "Njord/Components/StateTag" },
      { "field": "label",       "style": { "classes": "njord/table/cell-strong" } },
      { "field": "displayPath", "style": { "classes": "njord/tag" } },
      { "field": "activeTime",  "style": { "classes": "njord/data" } }
    ]
  }
}`,
    },
    notes: [
      <>
        Sort priority first, then age. Ignition defaults to newest-first, which is
        wrong here: a three-hour-old critical outranks a one-minute-old low.
      </>,
      <>
        The tint is 6–7%, not a fill. Full saturated rows belong to the legacy
        skin, where hue codes state and lightness codes priority.
      </>,
      <>
        Acknowledging must not drop the row. Filter on state, not on{' '}
        <C>acked</C>, or the alarm vanishes while still active.
      </>,
    ],
  },

  'alarm-ribbon': {
    maps: (
      <>
        <C>ia.container.flex</C> docked above the page content, bound to the
        highest-priority unacknowledged alarm.
      </>
    ),
    styles: {
      path: 'style-classes/njord/annun/critical/style.json',
      json: `{
  "base": {
    "style": {
      "minHeight": "56px",
      "padding": "var(--njord-sp-8) var(--njord-sp-20) var(--njord-sp-8) var(--njord-sp-24)",
      "backgroundColor": "var(--njord-critical-bg)",
      "borderLeftStyle": "solid", "borderLeftWidth": "4px",
      "borderLeftColor": "var(--njord-critical)",
      "borderBottomStyle": "solid", "borderBottomWidth": "1px",
      "borderBottomColor": "var(--njord-slate-200)"
    }
  }
}`,
    },
    script: {
      label: 'Property binding → the one alarm to annunciate',
      code: `# The ribbon shows ONE alarm plus a count. Same sort as the table.
order = {"Critical": 0, "High": 1, "Medium": 2, "Low": 3, "Diagnostic": 4}

unacked = [a for a in system.alarm.queryStatus(state=["ActiveUnacked"])
           if not a.isShelved()]
unacked.sort(key=lambda a: (order.get(str(a.getPriority()), 9),
                            a.getActiveData().getTimestamp()))

if not unacked:
    return {"clear": True, "count": 0}

top = unacked[0]
return {
    "clear": False,
    "count": len(unacked) - 1,
    "level": str(top.getPriority()).lower(),
    "alarm": top.getLabel(),
    "tag":   top.getDisplayPath().toString(),
    "id":    str(top.getId()),
}`,
    },
    notes: [
      <>
        The ribbon is never hidden. When nothing is unacknowledged it collapses to
        a 30px all-clear line; binding <C>props.visible</C> to false makes
        &ldquo;no alarms&rdquo; look identical to a broken binding.
      </>,
      <>
        Shelved and out-of-service alarms are excluded from the ribbon but still
        counted in the register. Filter with <C>isShelved()</C> as above.
      </>,
    ],
  },

  'bulk-bar': {
    maps: (
      <>
        <C>ia.container.flex</C> bound to the table&rsquo;s selection, with{' '}
        <C>ia.input.button</C> children.
      </>
    ),
    styles: {
      path: 'style-classes/njord/bulkbar/style.json',
      json: `{
  "base": {
    "style": {
      "display": "flex", "alignItems": "center",
      "flexWrap": "wrap", "rowGap": "var(--njord-sp-10)", "gap": "var(--njord-sp-12)",
      "padding": "var(--njord-sp-10) var(--njord-sp-16)",
      "backgroundColor": "var(--njord-ink)",
      "color": "#FFFFFF",
      "borderRadius": "var(--njord-r-md)"
    }
  }
}`,
    },
    script: {
      label: 'Acknowledge the whole selection in one call',
      code: `selected = self.getSibling("AlarmTable").props.selection.selectedRows
ids = [row["id"] for row in selected]

system.alarm.acknowledge(ids, "Bulk ack from HMI", system.security.getUsername())
system.perspective.sendMessage("njord.toast",
    {"text": "%d alarms acknowledged" % len(ids), "undo": True})`,
    },
    notes: [
      <>
        Bind <C>props.visible</C> to <C>selectedRows.length &gt; 0</C> so the bar
        appears only in selection mode.
      </>,
      <>
        Always include a visible clear-selection action. Selection mode must never
        be a trap.
      </>,
    ],
  },

  'swipe-row': {
    maps: (
      <>
        Perspective has no built-in swipe gesture. Ship{' '}
        <C>ia.input.button</C> row actions, and add swipe only via a custom
        module.
      </>
    ),
    styles: {
      path: 'style-classes/njord/swipe/action/style.json',
      json: `{
  "base": {
    "style": {
      "backgroundColor": "var(--njord-success-solid)",
      "color": "#FFFFFF",
      "fontSize": "var(--njord-text-body)", "fontWeight": 700,
      "display": "flex", "alignItems": "center",
      "justifyContent": "flex-end",
      "paddingRight": "var(--njord-sp-20)"
    }
  }
}`,
    },
    notes: [
      <>
        This is the one component with no clean Perspective equivalent. Ship the
        visible action buttons first and treat swipe as an enhancement.
      </>,
      <>
        Because the gesture is unavailable, the row actions are not optional;
        acknowledge must be reachable as a button in the detail view and in the
        bulk bar.
      </>,
      <>
        The reveal uses <C>--njord-success-solid</C>. The bare success green is
        2.3:1 and cannot carry a white label.
      </>,
    ],
  },

  // ── Navigation ───────────────────────────────────────────────────────────
  'top-bar': {
    maps: (
      <>
        <C>ia.container.flex</C> (row) holding the scope{' '}
        <C>ia.input.dropdown</C> components, the page title, and the action
        cluster.
      </>
    ),
    styles: {
      path: 'style-classes/njord/topbar/style.json',
      json: `{
  "base": {
    "style": {
      "height": "64px",
      "padding": "0 var(--njord-sp-28)",
      "backgroundColor": "#FFFFFF",
      "borderBottomStyle": "solid", "borderBottomWidth": "1px",
      "borderBottomColor": "var(--njord-slate-200)",
      "display": "flex", "alignItems": "center",
      "justifyContent": "space-between", "gap": "var(--njord-sp-16)"
    }
  }
}`,
    },
    view: {
      path: 'Shrink weights · the title survives the squeeze',
      json: `{
  "children": [
    { "meta": { "name": "Scope" },   "position": { "grow": 0, "shrink": 2, "basis": "auto" } },
    { "meta": { "name": "Crumb" },   "position": { "grow": 0, "shrink": 2, "basis": "auto" } },
    { "meta": { "name": "Title" },   "position": { "grow": 0, "shrink": 1, "basis": "auto" },
      "props": { "style": { "minWidth": "7ch", "overflow": "hidden",
                            "textOverflow": "ellipsis", "whiteSpace": "nowrap" } } },
    { "meta": { "name": "Actions" }, "position": { "grow": 0, "shrink": 0, "basis": "auto" } }
  ]
}`,
    },
    notes: [
      <>
        Do not set <C>overflow: hidden</C> on the bar. The scope dropdowns are
        absolutely positioned inside it and clipping renders them invisible;
        control the squeeze with shrink weights instead.
      </>,
      <>
        Right-side order is fixed: clock, search, critical pill, high pill, bell,
        notes, maneuver history, help.
      </>,
      <>
        Every icon button is drawn at 19px but occupies 40×40 so it clears WCAG
        2.5.5.
      </>,
    ],
  },

  sidebar: {
    maps: (
      <>
        <C>ia.container.flex</C> (column) of <C>ia.input.button</C> components;
        not <C>ia.display.menu-tree</C>, which cannot carry the alarm badge.
      </>
    ),
    styles: {
      path: 'style-classes/njord/sb/item/style.json',
      json: `{
  "base": {
    "style": {
      "height": "38px",
      "padding": "0 var(--njord-sp-12)",
      "borderRadius": "var(--njord-r-md)",
      "backgroundColor": "transparent",
      "color": "var(--njord-slate-350)",
      "fontSize": "var(--njord-text-body)", "fontWeight": 500,
      "justifyContent": "space-between",
      "transition": "background-color .12s, color .12s"
    }
  },
  "hover":    { "style": { "backgroundColor": "var(--njord-slate-800)", "color": "#FFFFFF" } },
  "selected": { "style": { "backgroundColor": "var(--njord-slate-800)", "color": "#FFFFFF" } }
}`,
    },
    script: {
      label: 'Unacknowledged count on the Alarms item',
      code: `# Counts UNACKNOWLEDGED only: a badge that includes acked alarms
# never clears, and a badge that never clears stops being read.
return len(system.alarm.queryStatus(state=["ActiveUnacked", "ClearUnacked"]))`,
    },
    notes: [
      <>
        The rail is dark chrome in every theme, so its muted tone is{' '}
        <C>--njord-slate-350</C>: the slate-400 used on white pages only reaches
        3.8:1 here.
      </>,
      <>
        Collapsed, the rail is 72px and the numeric badge becomes an 8px dot. The
        account flyout must open to the right of the rail at its own width, not
        inside it.
      </>,
    ],
  },

  'tab-bar': {
    maps: (
      <>
        <C>ia.container.flex</C> (row) of <C>ia.input.button</C> components pinned
        to the bottom of a mobile view. The segmented control is{' '}
        <C>ia.input.multi-state-button</C>.
      </>
    ),
    styles: {
      path: 'style-classes/njord/tabbar/style.json',
      json: `{
  "base": {
    "style": {
      "display": "flex", "alignItems": "stretch",
      "padding": "var(--njord-sp-6) var(--njord-sp-6) calc(26px + env(safe-area-inset-bottom))",
      "backgroundColor": "#FFFFFF",
      "borderTopStyle": "solid", "borderTopWidth": "1px",
      "borderTopColor": "var(--njord-slate-200)"
    }
  }
}`,
    },
    view: {
      path: 'style-classes/njord/seg/active/style.json',
      json: `{
  "base": {
    "style": {
      "backgroundColor": "#FFFFFF",
      "color": "var(--njord-ink)",
      "borderRadius": "9px",
      "boxShadow": "var(--njord-shadow-sm)",
      "fontSize": "var(--njord-text-small)", "fontWeight": 600
    }
  }
}`,
    },
    notes: [
      <>
        The tab bar navigates between views; the multi-state button filters within
        one. Swapping them loses the back stack.
      </>,
      <>
        Include <C>env(safe-area-inset-bottom)</C> in the bottom padding or the
        labels sit under the home indicator.
      </>,
    ],
  },

  'page-header': {
    maps: (
      <>
        <C>ia.container.flex</C> (column): a summary row above an{' '}
        <C>ia.input.multi-state-button</C> tab strip.
      </>
    ),
    styles: {
      path: 'style-classes/njord/pagehead/summary/style.json',
      json: `{
  "base": {
    "style": {
      "fontSize": "var(--njord-text-body)",
      "lineHeight": "20px",
      "color": "var(--njord-slate-600)",
      "textWrap": "pretty",
      "minHeight": "24px",
      "display": "flex", "alignItems": "center"
    }
  }
}`,
    },
    view: {
      path: 'Position · the row breaks, never the sentence',
      json: `{
  "props": { "direction": "row", "wrap": "wrap", "justify": "space-between" },
  "children": [
    { "meta": { "name": "Summary" },
      "position": { "grow": 1, "shrink": 1, "basis": "300px" },
      "props": { "style": { "minWidth": "260px" } } },
    { "meta": { "name": "Actions" },
      "position": { "grow": 0, "shrink": 0, "basis": "auto" } }
  ]
}`,
    },
    notes: [
      <>
        Give the summary a real basis and minWidth. Without them the text side
        collapses to a sliver and breaks one word per line.
      </>,
      <>
        Screens carry no in-page title; the top bar owns it. Adding one here makes
        the tab strip sit at a different height on every screen.
      </>,
    ],
  },

  'quick-links': {
    maps: (
      <>
        <C>ia.display.flex-repeater</C> of an embedded row view, or an{' '}
        <C>ia.container.flex</C> grid of tiles.
      </>
    ),
    styles: {
      path: 'style-classes/njord/quicklink/style.json',
      json: `{
  "base": {
    "style": {
      "display": "flex", "alignItems": "center", "gap": "var(--njord-sp-14)",
      "padding": "var(--njord-sp-12) var(--njord-sp-14)",
      "backgroundColor": "#FFFFFF",
      "borderStyle": "solid", "borderWidth": "1px",
      "borderColor": "var(--njord-slate-200)",
      "borderRadius": "var(--njord-r-md)",
      "cursor": "pointer"
    }
  },
  "hover": { "style": { "backgroundColor": "var(--njord-slate-50)", "borderColor": "var(--njord-slate-300)" } }
}`,
    },
    notes: [
      <>
        Put the click handler on the outer flex, not the label; the whole row is
        the target and the chevron is only a hint.
      </>,
      <>
        The subtitle is required. Without it this is a plain nav item and the
        operator has to guess what is on the other side.
      </>,
    ],
  },

  'command-palette': {
    maps: (
      <>
        <C>system.perspective.openPopup</C> holding an{' '}
        <C>ia.input.text-field</C> over an <C>ia.display.flex-repeater</C> of
        results.
      </>
    ),
    styles: {
      path: 'style-classes/njord/cmdk/row-selected/style.json',
      json: `{
  "base": {
    "style": {
      "backgroundColor": "var(--njord-primary-bg)",
      "borderRadius": "8px",
      "padding": "var(--njord-sp-10) var(--njord-sp-10)"
    }
  }
}`,
    },
    script: {
      label: 'Bind the shortcut on the shell view',
      code: `# Ignition has no global hotkey API, so bind it on the root/shell
# view and let every page inherit it.
if event.key == "k" and (event.metaKey or event.ctrlKey):
    system.perspective.openPopup("cmdk", "Njord/CommandPalette",
        modal=True, overlayDismiss=True,
        position={"top": "14vh"})`,
    },
    notes: [
      <>
        Selection is a fill plus a leading dot, never a border: a border shifts
        the row by a pixel as you arrow through.
      </>,
      <>
        There is no mobile counterpart. The phone uses the search bottom sheet,
        where the keyboard already owns half the screen.
      </>,
    ],
  },

  // ── Data ─────────────────────────────────────────────────────────────────
  'filter-tabs': {
    maps: (
      <>
        <C>ia.input.multi-state-button</C>; its built-in state model is exactly
        this component.
      </>
    ),
    styles: {
      path: 'style-classes/njord/seg/track/style.json',
      json: `{
  "base": {
    "style": {
      "backgroundColor": "var(--njord-slate-100)",
      "borderStyle": "solid", "borderWidth": "1px",
      "borderColor": "var(--njord-slate-200)",
      "borderRadius": "var(--njord-r-md)",
      "padding": "var(--njord-sp-4)",
      "gap": "var(--njord-sp-2)",
      "flexWrap": "wrap"
    }
  }
}`,
    },
    view: {
      path: 'States',
      json: `{
  "type": "ia.input.multi-state-button",
  "props": {
    "value": "active",
    "style": { "classes": "njord/seg/track" },
    "states": [
      { "value": "active",  "text": "Active",         "enabled": true },
      { "value": "shelved", "text": "Shelved",        "enabled": true },
      { "value": "oos",     "text": "Out of service", "enabled": true },
      { "value": "history", "text": "History",        "enabled": true }
    ]
  }
}`,
    },
    notes: [
      <>
        Tabs filter the same dataset; they never navigate. If the browser back
        button should undo it, it is navigation.
      </>,
      <>
        An unavailable tab is <C>enabled: false</C> at 42% opacity, not removed. A
        disappearing tab makes the strip jump.
      </>,
    ],
  },

  'filter-chips': {
    maps: (
      <>
        <C>ia.display.flex-repeater</C> over the active filter list, each row an{' '}
        <C>ia.display.label</C> pair.
      </>
    ),
    styles: {
      path: 'style-classes/njord/chip/style.json',
      json: `{
  "base": {
    "style": {
      "display": "inline-flex", "alignItems": "center", "gap": "var(--njord-sp-6)",
      "fontSize": "var(--njord-text-small)", "fontWeight": 600,
      "color": "var(--njord-ink)",
      "backgroundColor": "var(--njord-slate-100)",
      "borderStyle": "solid", "borderWidth": "1px",
      "borderColor": "var(--njord-slate-200)",
      "borderRadius": "var(--njord-r-pill)",
      "padding": "var(--njord-sp-4) var(--njord-sp-6) var(--njord-sp-4) var(--njord-sp-12)",
      "flexShrink": 0,
      "whiteSpace": "nowrap"
    }
  },
  "selected": { "style": { "backgroundColor": "var(--njord-ink)", "borderColor": "var(--njord-ink)", "color": "#FFFFFF" } }
}`,
    },
    notes: [
      <>
        Set <C>flexShrink: 0</C> on the chip and wrap on the strip. A chip that
        shrinks clips its own nowrap label.
      </>,
      <>
        Every applied filter must be visible as a chip. An alarm list with a hidden
        filter is a safety problem, not a UI preference.
      </>,
    ],
  },

  'list-row': {
    maps: (
      <>
        An embedded view inside <C>ia.display.flex-repeater</C>: the mobile
        equivalent of a table row.
      </>
    ),
    styles: {
      path: 'style-classes/njord/lrow/style.json',
      json: `{
  "base": {
    "style": {
      "display": "flex", "alignItems": "center", "gap": "var(--njord-sp-12)",
      "padding": "var(--njord-sp-14) var(--njord-sp-16)",
      "minHeight": "48px",
      "backgroundColor": "#FFFFFF",
      "borderBottomStyle": "solid", "borderBottomWidth": "1px",
      "borderBottomColor": "var(--njord-slate-100)",
      "cursor": "pointer"
    }
  },
  "active": { "style": { "backgroundColor": "var(--njord-slate-50)" } }
}`,
    },
    notes: [
      <>
        The subtitle truncates; the title does not. If both can shrink the row
        loses its identity at exactly the width where you need it.
      </>,
      <>
        Drop the bottom border on the repeater&rsquo;s last child so no hairline
        floats against the card edge.
      </>,
    ],
  },

  'param-row': {
    maps: (
      <>
        <C>ia.container.flex</C> (row) pairing an <C>ia.display.label</C> with an{' '}
        <C>ia.input.numeric-entry-field</C>.
      </>
    ),
    styles: {
      path: 'style-classes/njord/param/changed/style.json',
      json: `{
  "base": {
    "style": {
      "color": "var(--njord-primary-text)",
      "fontWeight": 700
    }
  }
}`,
    },
    script: {
      label: 'Governed write · reason required above a threshold',
      code: `def writeSetpoint(tagPath, newValue, reason):
    old = system.tag.readBlocking([tagPath])[0].value
    if newValue > 12.0 and not reason:
        system.perspective.sendMessage("njord.toast",
            {"text": "A rationalization record is required above 12.0."})
        return False

    system.tag.writeBlocking([tagPath], [newValue])
    system.db.runPrepUpdate(
        "INSERT INTO param_audit (tag, old_val, new_val, reason, usr, ts) "
        "VALUES (?,?,?,?,?,CURRENT_TIMESTAMP)",
        [tagPath, old, newValue, reason, system.security.getUsername()])
    return True`,
    },
    notes: [
      <>
        A pending edit reads <C>--njord-primary-text</C> until committed, so the
        operator can see what they touched before saving.
      </>,
      <>
        Write and audit in the same call. A setpoint change with no recorded reason
        is what alarm-management audits fail on.
      </>,
    ],
  },

  'data-table': {
    maps: (
      <>
        <C>ia.display.table</C>. Do not rebuild it from flex containers: the
        built-in table brings sorting, virtualisation and column resizing.
      </>
    ),
    styles: {
      path: 'style-classes/njord/table/header/style.json',
      json: `{
  "base": {
    "style": {
      "fontSize": "var(--njord-text-badge)", "fontWeight": 700,
      "letterSpacing": "0.8px",
      "textTransform": "uppercase",
      "color": "var(--njord-slate-500)",
      "backgroundColor": "var(--njord-slate-50)",
      "padding": "var(--njord-sp-12) var(--njord-sp-14)",
      "whiteSpace": "nowrap",
      "borderBottomStyle": "solid", "borderBottomWidth": "1px",
      "borderBottomColor": "var(--njord-slate-200)"
    }
  }
}`,
    },
    view: {
      path: 'Numeric columns are mono, tabular and right-aligned',
      json: `{
  "columns": [
    { "field": "tag",   "header": "Tag",
      "style": { "classes": "njord/tag" } },
    { "field": "value", "header": "Value", "justify": "right",
      "style": { "classes": "njord/data" }, "numberFormat": "0.00" },
    { "field": "state", "header": "State",
      "render": "view", "viewPath": "Njord/Components/Badge" }
  ],
  "props": {
    "rows": { "count": 50 },
    "emptyMessage": "No instruments match these filters."
  }
}`,
    },
    notes: [
      <>
        Set <C>emptyMessage</C> explicitly. The default is a bare blank area, which
        is indistinguishable from a failed query.
      </>,
      <>Compact density changes padding only; never a font size or a hit target.</>,
      <>
        On a mobile session use the card layout instead. A horizontally scrolling
        table on a 393px screen is unusable in a plant.
      </>,
    ],
  },

  pagination: {
    maps: (
      <>
        Built into <C>ia.display.table</C> via <C>props.pager</C>. Only build a
        custom pager when the data source is not the table.
      </>
    ),
    styles: {
      path: 'style-classes/njord/pg/active/style.json',
      json: `{
  "base": {
    "style": {
      "minWidth": "30px", "height": "30px",
      "borderRadius": "var(--njord-r-md)",
      "backgroundColor": "var(--njord-ink)",
      "color": "#FFFFFF",
      "fontSize": "var(--njord-text-body)", "fontWeight": 600
    }
  }
}`,
    },
    view: {
      path: 'Table pager configuration',
      json: `{
  "props": {
    "pager": {
      "bottom": true,
      "hidePager": false,
      "rowsPerPageOptions": [25, 50, 100, 200],
      "initialRowsPerPage": 50,
      "showJump": true,
      "showFirstLast": true,
      "showRowCount": true
    }
  }
}`,
    },
    notes: [
      <>
        Always show the range against the total. A page number with no total tells
        the operator nothing about how much is left.
      </>,
      <>
        The rows-per-page control is a native select, so the theme must set{' '}
        <C>color-scheme</C> or the dark skin paints a light popup under light text.
      </>,
    ],
  },

  sparkline: {
    maps: (
      <>
        <C>ia.chart.simple-timeseries</C> with axes, grid and tooltip disabled; or
        the sparkline column renderer on <C>ia.display.table</C>.
      </>
    ),
    view: {
      path: 'Chart props · a shape, not a chart',
      json: `{
  "type": "ia.chart.simple-timeseries",
  "props": {
    "series": [ { "name": "value", "color": "var(--njord-sev-crit)", "width": 1.6 } ],
    "xAxis":   { "visible": false },
    "yAxis":   { "visible": false },
    "grid":    { "visible": false },
    "legend":  { "visible": false },
    "tooltip": { "enabled": false },
    "style":   { "height": "26px", "width": "96px" }
  }
}`,
    },
    notes: [
      <>
        The row must also state the value in text. A sparkline has no scale and is
        invisible to a screen reader; it can never be the only carrier.
      </>,
      <>
        The moment you need an axis, a threshold or a tooltip, the component is a
        Trend chart instead.
      </>,
    ],
  },

  'trend-chart': {
    maps: (
      <>
        <C>ia.chart.power-chart</C> for the operator-facing trend, or{' '}
        <C>ia.chart.xy-chart</C> for a fixed chart in a dialog.
      </>
    ),
    view: {
      path: 'Thresholds as plot lines',
      json: `{
  "type": "ia.chart.xy-chart",
  "props": {
    "series": [ { "name": "DO", "color": "var(--njord-primary)", "width": 2 } ],
    "xAxes": [ { "label": { "style": { "classes": "njord/data" } } } ],
    "yAxes": [ {
      "label": { "style": { "classes": "njord/data" } },
      "plotLines": [
        { "value": 7.5, "color": "var(--njord-warning)",  "dashArray": "5 4", "width": 1.4 },
        { "value": 7.0, "color": "var(--njord-critical)", "dashArray": "5 4", "width": 1.4 }
      ]
    } ]
  }
}`,
    },
    script: {
      label: 'props.accessibility.label · describe the trend, not the picture',
      code: `return "%s %s from %.1f to %.1f %s over %d hours%s" % (
    tagName,
    "rising" if last > first else "falling",
    first, last, units, hours,
    ", crossing the low limit" if last < loLimit else "",
)`,
    },
    notes: [
      <>
        Thresholds are dashed and use the status ramp; the series itself is brand
        cyan or a pen colour. A series painted in a severity colour reads as
        permanently alarming.
      </>,
      <>
        Charts scale with their pane. Never set a minimum width; it breaks every
        two-pane workspace.
      </>,
    ],
  },

  'scada-symbols': {
    maps: (
      <>
        Perspective ships P&amp;ID symbols: <C>ia.symbol.pump</C>,{' '}
        <C>ia.symbol.valve</C>, <C>ia.symbol.motor</C>, <C>ia.symbol.vessel</C>.
        Place them in <C>ia.container.coord</C>: the one place absolute geometry
        is correct.
      </>
    ),
    view: {
      path: 'Symbol state · neutral is normal, colour is abnormal',
      json: `{
  "type": "ia.symbol.pump",
  "props": {
    "value": 1,
    "variant": "centrifugal",
    "elements": {
      "PUMP": {
        "0": { "fill": "var(--njord-sc-stop)" },
        "1": { "fill": "var(--njord-sc-run)"  },
        "2": { "fill": "var(--njord-sc-abnormal)" }
      }
    },
    "style": { "stroke": "var(--njord-sc-edge)", "strokeWidth": 1.6 }
  }
}`,
    },
    script: {
      label: 'Pipes · fluid line coding, gases dashed',
      code: `{
  "type": "ia.shapes.path",
  "props": {
    "path": "M144 112 H212",
    "style": {
      "stroke": "var(--njord-fl-proc)",
      "strokeWidth": 5,
      "strokeLinecap": "round"
    }
  }
}

/* gas lines add strokeDasharray so the coding survives a
   monochrome print and a colour-blind reader */
"strokeDasharray": "7 5"     /* --njord-fl-o2, --njord-fl-gas */`,
    },
    notes: [
      <>
        Normal is gray. Running and stopped differ by lightness, not hue:{' '}
        <C>--njord-sc-abnormal</C> is the only saturated symbol colour on a mimic.
      </>,
      <>
        Readouts go in white node boxes, not floating over the schematic. A label
        that must float needs the halo outline.
      </>,
      <>
        Give clickable groups a keyboard path. A <C>role=&quot;button&quot;</C>{' '}
        that only responds to a mouse fails WCAG 2.1.1.
      </>,
    ],
  },

  // ── Overlays ─────────────────────────────────────────────────────────────
  dialog: {
    maps: (
      <>
        <C>system.perspective.openPopup</C> with a dedicated popup view.
      </>
    ),
    styles: {
      path: 'style-classes/njord/dlg/style.json',
      json: `{
  "base": {
    "style": {
      "backgroundColor": "#FFFFFF",
      "borderRadius": "var(--njord-r-lg)",
      "boxShadow": "var(--njord-shadow-lg)",
      "display": "flex", "flexDirection": "column",
      "overflow": "hidden"
    }
  }
}`,
    },
    script: {
      label: 'Open it anchored near the top, not centred',
      code: `system.perspective.openPopup(
    id="shelve-alarm",
    view="Njord/Dialogs/ShelveAlarm",
    params={"alarmId": alarmId},
    title="Shelve alarm",
    modal=True,
    resizable=False,
    draggable=False,
    # anchor near the top: a dialog whose content changes height then
    # grows downward, and its header never jumps
    position={"top": "9vh"},
    overlayDismiss=True,
)`,
    },
    notes: [
      <>
        Anchor to the top rather than centring. A centred popup jumps every time
        its content resizes: switching a tab inside it, for instance.
      </>,
      <>
        The body scrolls; the header and footer do not. Actions must stay reachable
        in a long dialog.
      </>,
      <>
        A destructive confirm names the object in mono. &ldquo;Are you sure?&rdquo;
        without stating what is not a confirmation.
      </>,
    ],
  },

  drawer: {
    maps: (
      <>
        <C>system.perspective.openPopup</C> positioned to the right edge, or a
        docked <C>ia.container.flex</C> for a persistent detail pane.
      </>
    ),
    styles: {
      path: 'style-classes/njord/drawer/style.json',
      json: `{
  "base": {
    "style": {
      "width": "min(440px, 94vw)",
      "height": "100vh",
      "backgroundColor": "#FFFFFF",
      "borderLeftStyle": "solid", "borderLeftWidth": "1px",
      "borderLeftColor": "var(--njord-slate-200)",
      "boxShadow": "-12px 0 40px rgba(0,0,0,.18)",
      "display": "flex", "flexDirection": "column"
    }
  }
}`,
    },
    script: {
      label: 'Selecting another row swaps the contents · it does not reopen',
      code: `# Table selection change script. Reuse the SAME popup id so the
# drawer updates in place instead of stacking popups.
sel = self.props.selection.selectedRows
if sel:
    system.perspective.openPopup(
        id="alarm-detail",                 # stable id = update, not stack
        view="Njord/Drawers/AlarmDetail",
        params={"alarmId": sel[0]["id"]},
        modal=False,                       # the list stays usable
        position={"right": 0, "top": 0},
    )`,
    },
    notes: [
      <>
        Keep <C>modal=False</C> so the list behind stays usable; a drawer is
        context, not an interruption.
      </>,
      <>
        Reuse one popup id. A new id per row stacks popups and the operator ends up
        closing five drawers.
      </>,
    ],
  },

  'bottom-sheet': {
    maps: (
      <>
        <C>system.perspective.openPopup</C> anchored to the bottom, in a
        Perspective mobile session.
      </>
    ),
    styles: {
      path: 'style-classes/njord/sheet/style.json',
      json: `{
  "base": {
    "style": {
      "backgroundColor": "#FFFFFF",
      "borderTopLeftRadius": "22px",
      "borderTopRightRadius": "22px",
      "maxHeight": "82%",
      "padding": "var(--njord-sp-8) var(--njord-sp-16) calc(20px + env(safe-area-inset-bottom))",
      "display": "flex", "flexDirection": "column"
    }
  }
}`,
    },
    script: {
      label: 'Sheet for options, centred pop for destructive confirms',
      code: `# options / picker / search → rises from the bottom
system.perspective.openPopup("sheet", "Njord/Mobile/ActionSheet",
    params={"alarmId": alarmId},
    modal=True, position={"bottom": 0, "left": 0, "right": 0},
    overlayDismiss=True)

# destructive confirm → centred, so a decision never appears where a
# dismiss swipe habitually lands
system.perspective.openPopup("confirm", "Njord/Mobile/Confirm",
    params={"title": "Disable this alarm?"},
    modal=True, overlayDismiss=False)`,
    },
    notes: [
      <>
        Cap the height at 82%. A sheet that fills the screen is a page and should
        have been pushed onto the navigation stack.
      </>,
      <>
        Any input goes at the top of the sheet; the keyboard takes the lower half
        and a field below it is unreachable.
      </>,
    ],
  },

  toast: {
    maps: (
      <>
        <C>system.perspective.sendMessage</C> to a session-scoped listener,
        rendered by a docked view. Not <C>system.perspective.notify</C>, which
        cannot carry an Undo action.
      </>
    ),
    styles: {
      path: 'style-classes/njord/toast/style.json',
      json: `{
  "base": {
    "style": {
      "backgroundColor": "var(--njord-ink)",
      "color": "#FFFFFF",
      "borderRadius": "13px",
      "padding": "var(--njord-sp-14) var(--njord-sp-16)",
      "fontSize": "var(--njord-text-body)", "fontWeight": 600,
      "boxShadow": "var(--njord-shadow-lg)",
      "display": "flex", "alignItems": "center", "gap": "var(--njord-sp-10)"
    }
  }
}`,
    },
    script: {
      label: 'Fire it with the object and the count',
      code: `system.perspective.sendMessage(
    messageType="njord.toast",
    payload={
        "text": "%d alarms acknowledged" % len(ids),
        "tone": "success",
        "undo": {"action": "unack", "ids": ids},
    },
    scope="session",
)`,
    },
    notes: [
      <>Name the object and the count. &ldquo;Saved&rdquo; is useless after a bulk action.</>,
      <>
        Anything reversible carries Undo in the toast; that is the only place the
        operator will look for it.
      </>,
      <>
        Connection loss is not a toast. It is a persistent banner with a
        queued-write count, because it does not resolve on its own.
      </>,
    ],
  },
}
