// Side-nav drawer shared by all four demo apps. Injects a hamburger toggle
// fixed top-right and a slide-in drawer on the right edge with links to
// each demo, the current page highlighted. Self-contained: inline styles
// scoped under #portal-nav-*, DOM appended to body, no external assets.
//
// The "Local three" demo lives at the deploy root; the other three live at
// /<key>/ siblings. Drawer URLs are relative so they work under any base
// (e.g. /portal/, /portal/pr-preview/pr-19/).
//
// Above the demos: an intro that says what Portal is, linking to the RFC
// responses (the docs site the build puts at <base>/rfcs/) in a new tab,
// then a version pulldown. Each portal-netgl release
// keeps a snapshot of the whole site (demos and docs) at <site>/v/<version>/,
// listed in <site>/v/versions.json by the Pages workflow; the pulldown
// moves to the same demo in the chosen snapshot, or back to latest.

export type NavDemoKey = 'three' | 'iframe' | 'worker' | 'netgl' | 'netgl-celestiary' | 'netgl-cesium' | 'netgl-deck'

type DemoEntry = {
  key: NavDemoKey
  label: string
  description: string
}

const DEMOS: readonly DemoEntry[] = [
  {
    key: 'three',
    label: 'Local three',
    description: 'Two scenes in one process. Per-pixel halfspace stencil; no transport.'
  },
  {
    key: 'iframe',
    label: 'Iframe (frame-RPC)',
    description: 'Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites.'
  },
  {
    key: 'worker',
    label: 'Web Worker',
    description: 'Destination in a worker via OffscreenCanvas; no DOM.'
  },
  {
    key: 'netgl',
    label: 'NetGL (command-stream)',
    description: "Destination's GL calls cross the wire and execute in the host's WebGL2 context."
  },
  {
    key: 'netgl-celestiary',
    label: 'NetGL + celestiary',
    description: 'NetGL carrying celestiary (textured planets, custom shaders, RT post-processing).'
  },
  {
    key: 'netgl-cesium',
    label: 'NetGL + Cesium',
    description: 'A Cesium globe composited into a three.js host: through a door, or in place of an Earth sphere.'
  },
  {
    key: 'netgl-deck',
    label: 'NetGL + deck.gl',
    description: "A cross-origin three.js guest drawn over a deck.gl globe, in deck's clip space, occluded by the Earth."
  }
] as const

const STYLES = `
#portal-nav-toggle {
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 1001;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(4, 9, 18, 0.65);
  border: 1px solid rgba(216, 231, 255, 0.20);
  border-radius: 8px;
  color: #d8e7ff;
  cursor: pointer;
  padding: 0;
  font: inherit;
}
#portal-nav-toggle:hover { background: rgba(93, 169, 255, 0.15); border-color: rgba(93, 169, 255, 0.45); }
#portal-nav-toggle:focus-visible { outline: 2px solid rgba(93, 169, 255, 0.8); outline-offset: 2px; }
#portal-nav-toggle svg { display: block; }

#portal-nav-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 320px;
  max-width: 85vw;
  z-index: 1000;
  background: rgba(8, 11, 19, 0.94);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-left: 1px solid rgba(216, 231, 255, 0.15);
  color: #d8e7ff;
  font-family: Inter, system-ui, sans-serif;
  padding: 60px 22px 24px;
  box-sizing: border-box;
  overflow-y: auto;
  transform: translateX(100%);
  transition: transform 200ms ease;
}
#portal-nav-drawer[aria-hidden="false"] { transform: translateX(0); }

#portal-nav-drawer h2 { font-size: 18px; margin: 0 0 4px; letter-spacing: -0.02em; }
#portal-nav-drawer .portal-nav-subtitle { color: #8fa7c4; font-size: 12px; margin: 0 0 18px; }
#portal-nav-drawer ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
#portal-nav-drawer li { margin: 0; padding: 0; }
#portal-nav-drawer a {
  display: block;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(216, 231, 255, 0.10);
  border-radius: 8px;
  color: inherit;
  text-decoration: none;
  transition: background 120ms ease, border-color 120ms ease;
}
#portal-nav-drawer a:hover { background: rgba(93, 169, 255, 0.10); border-color: rgba(93, 169, 255, 0.45); }
#portal-nav-drawer .portal-nav-current a { background: rgba(93, 169, 255, 0.14); border-color: rgba(93, 169, 255, 0.50); }
#portal-nav-drawer .portal-nav-label { display: block; font-size: 14px; font-weight: 600; margin-bottom: 3px; }
#portal-nav-drawer .portal-nav-desc { display: block; font-size: 12px; color: #8fa7c4; line-height: 1.45; }
#portal-nav-drawer .portal-nav-intro { font-size: 13px; line-height: 1.5; color: #c9c3ea; margin: 0 0 16px; padding: 10px 12px; background: rgba(154, 140, 255, 0.08); border-left: 2px solid rgba(154, 140, 255, 0.55); border-radius: 0 8px 8px 0; }
#portal-nav-drawer .portal-nav-intro a { display: inline; padding: 0; background: transparent; border: none; color: #b7a9ff; text-decoration: underline; text-underline-offset: 2px; white-space: nowrap; }
#portal-nav-drawer .portal-nav-intro a:hover { background: transparent; color: #d6ccff; }
#portal-nav-drawer .portal-nav-intro svg { display: inline-block; vertical-align: -1px; margin-left: 2px; }
#portal-nav-drawer .portal-nav-version { margin: 0 0 16px; display: flex; align-items: center; gap: 10px; font-size: 12px; color: #8fa7c4; }
#portal-nav-drawer .portal-nav-version select {
  font: 600 12px Inter, system-ui, sans-serif;
  color: #d8e7ff;
  background: rgba(93, 169, 255, 0.14);
  border: 1px solid rgba(93, 169, 255, 0.5);
  border-radius: 8px;
  padding: 5px 8px;
  cursor: pointer;
}
#portal-nav-drawer .portal-nav-repo { margin-top: 22px; font-size: 11px; color: #6d829f; }
#portal-nav-drawer .portal-nav-repo a { background: transparent; border: none; padding: 0; }
#portal-nav-drawer .portal-nav-repo a:hover { background: transparent; }
`

const EXTERNAL_SVG = '<svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>'
const HAMBURGER_SVG = '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
const CLOSE_SVG = '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'

/**
 * Build the relative URL to navigate from the current demo to the target
 * demo. The root demo ('three') lives at /<base>/ and the rest at
 * /<base>/<key>/. From the root, sibling URLs are just `<key>/`; from a
 * sub-demo we have to go up one level first.
 */
const hrefFor = (current: NavDemoKey, target: NavDemoKey): string => {
  const fromRoot = current === 'three'
  if (target === 'three') return fromRoot ? '.' : '..'
  return fromRoot ? `${target}/` : `../${target}/`
}

/**
 * Where this deploy's root is, from the page's URL: the root demo's own
 * directory, or a sub-demo's parent. If that root is a /v/<version>/
 * snapshot, `siteRoot` is the site above it and `snapshot` the version.
 */
const siteRoots = (current: NavDemoKey): { root: string; siteRoot: string; snapshot: string | null } => {
  const dir = location.pathname.replace(/[^/]*$/, '')
  const root = current === 'three' ? dir : dir.replace(/[^/]+\/$/, '')
  const m = root.match(/^(.*\/)v\/([^/]+)\/$/)
  return m ? { root, siteRoot: m[1], snapshot: m[2] } : { root, siteRoot: root, snapshot: null }
}

/**
 * Fill the version pulldown from <siteRoot>/v/versions.json and move to the
 * same demo in the chosen version. Without the file (a PR preview, a dev
 * server) the pulldown keeps its one entry.
 */
const attachVersionSelect = (select: HTMLSelectElement, current: NavDemoKey): void => {
  const { siteRoot, snapshot } = siteRoots(current)
  const demoPath = current === 'three' ? '' : `${current}/`
  const fill = (versions: string[], latest: string): void => {
    select.innerHTML = ''
    const options: Array<[string, string]> = [['latest', `latest · ${latest}`], ...versions.map((v): [string, string] => [v, `v${v} snapshot`])]
    if (snapshot && !versions.includes(snapshot)) options.push([snapshot, `v${snapshot} snapshot`])
    for (const [value, label] of options) {
      const o = document.createElement('option')
      o.value = value
      o.textContent = label
      o.selected = value === (snapshot ?? 'latest')
      select.appendChild(o)
    }
  }
  fetch(`${siteRoot}v/versions.json`, { cache: 'no-cache' })
    .then((r) => (r.ok ? r.json() : null))
    .then((j: { latest?: string; versions?: string[] } | null) => {
      if (j?.versions) fill(j.versions, j.latest ?? 'main')
    })
    .catch(() => undefined)
  select.addEventListener('change', () => {
    const v = select.value
    const target = v === 'latest' ? siteRoot : `${siteRoot}v/${v}/`
    location.href = `${target}${demoPath}${location.search}${location.hash}`
  })
}

const escapeHtml = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))

/**
 * Attach a side-nav drawer + hamburger toggle to the page. Idempotent —
 * calling twice no-ops. Inject CSS once; build DOM under document.body.
 */
export const attachNavDrawer = (current: NavDemoKey): void => {
  if (document.getElementById('portal-nav-toggle')) return

  const style = document.createElement('style')
  style.id = 'portal-nav-styles'
  style.textContent = STYLES
  document.head.appendChild(style)

  const drawer = document.createElement('aside')
  drawer.id = 'portal-nav-drawer'
  // Open by default so the demo lineup is the first thing a visitor sees;
  // they tap the close icon (or click out / press Esc) to focus on the
  // running demo.
  drawer.setAttribute('aria-hidden', 'false')
  drawer.setAttribute('aria-label', 'Portal demos')
  drawer.innerHTML = `
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <p class="portal-nav-intro">Portal links independent 3D web renderers at the GL layer: a guest's WebGL2 calls replay into the host's context, so engines compose without rewriting either. What it is, and where it's going: <a href="${current === 'three' ? 'rfcs/' : '../rfcs/'}" target="_blank" rel="noopener">the RFC responses${EXTERNAL_SVG}</a></p>
    <label class="portal-nav-version">Version
      <select id="portal-nav-version" aria-label="Site version"><option value="latest" selected>latest</option></select>
    </label>
    <ul>
      ${DEMOS.map((d) => `
        <li${d.key === current ? ' class="portal-nav-current"' : ''}>
          <a href="${hrefFor(current, d.key)}"${d.key === current ? ' aria-current="page"' : ''}>
            <span class="portal-nav-label">${escapeHtml(d.label)}</span>
            <span class="portal-nav-desc">${escapeHtml(d.description)}</span>
          </a>
        </li>
      `).join('')}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `

  const toggle = document.createElement('button')
  toggle.id = 'portal-nav-toggle'
  toggle.type = 'button'
  toggle.setAttribute('aria-label', 'Close demos menu')
  toggle.setAttribute('aria-expanded', 'true')
  toggle.setAttribute('aria-controls', 'portal-nav-drawer')
  toggle.innerHTML = CLOSE_SVG

  document.body.appendChild(drawer)
  document.body.appendChild(toggle)

  const versionSelect = drawer.querySelector<HTMLSelectElement>('#portal-nav-version')
  if (versionSelect) attachVersionSelect(versionSelect, current)

  const setOpen = (open: boolean): void => {
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true')
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false')
    toggle.setAttribute('aria-label', open ? 'Close demos menu' : 'Toggle demos menu')
    toggle.innerHTML = open ? CLOSE_SVG : HAMBURGER_SVG
  }

  toggle.addEventListener('click', (ev) => {
    ev.stopPropagation()
    setOpen(drawer.getAttribute('aria-hidden') !== 'false' ? true : false)
  })

  // Click outside the drawer (and not on the toggle) closes it.
  document.addEventListener('click', (ev) => {
    if (drawer.getAttribute('aria-hidden') === 'true') return
    const target = ev.target as Element | null
    if (target?.closest('#portal-nav-drawer, #portal-nav-toggle')) return
    setOpen(false)
  })

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && drawer.getAttribute('aria-hidden') === 'false') {
      setOpen(false)
    }
  })
}
