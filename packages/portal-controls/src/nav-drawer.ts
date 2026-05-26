// Side-nav drawer shared by all four demo apps. Injects a hamburger toggle
// fixed top-right and a slide-in drawer on the right edge with links to
// each demo, the current page highlighted. Self-contained: inline styles
// scoped under #portal-nav-*, DOM appended to body, no external assets.
//
// The "Local three" demo lives at the deploy root; the other three live at
// /<key>/ siblings. Drawer URLs are relative so they work under any base
// (e.g. /portal/, /portal/pr-preview/pr-19/).

export type NavDemoKey = 'three' | 'iframe' | 'worker' | 'netgl'

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
#portal-nav-drawer .portal-nav-repo { margin-top: 22px; font-size: 11px; color: #6d829f; }
#portal-nav-drawer .portal-nav-repo a { background: transparent; border: none; padding: 0; }
#portal-nav-drawer .portal-nav-repo a:hover { background: transparent; }
`

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
  drawer.setAttribute('aria-hidden', 'true')
  drawer.setAttribute('aria-label', 'Portal demos')
  drawer.innerHTML = `
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
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
  toggle.setAttribute('aria-label', 'Toggle demos menu')
  toggle.setAttribute('aria-expanded', 'false')
  toggle.setAttribute('aria-controls', 'portal-nav-drawer')
  toggle.innerHTML = HAMBURGER_SVG

  document.body.appendChild(drawer)
  document.body.appendChild(toggle)

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
