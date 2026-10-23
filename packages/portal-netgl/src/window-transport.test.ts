// Cross-origin postMessage transport: origin pinning on both ends.

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  iframeTransport,
  isSerializedOrigin,
  parentTransport,
  resolveParentOrigin,
  windowTransport
} from './window-transport'

type Listener = (ev: { data: unknown; origin: string; source: unknown }) => void

const g = globalThis as unknown as Record<string, unknown>
let listeners: Listener[] = []
let saved: Record<string, unknown> = {}

const fakeWindow = () => {
  const posted: Array<{ msg: unknown; origin: string }> = []
  return {
    posted,
    postMessage(msg: unknown, origin: string) {
      posted.push({ msg, origin })
    }
  }
}

const deliver = (data: unknown, origin: string, source: unknown): void => {
  for (const l of listeners) l({ data, origin, source })
}

beforeEach(() => {
  listeners = []
  saved = { window: g.window, parent: g.parent, location: g.location, document: g.document }
  g.window = {
    addEventListener: (_: string, l: Listener) => listeners.push(l),
    removeEventListener: (_: string, l: Listener) => {
      listeners = listeners.filter((x) => x !== l)
    }
  }
})

afterEach(() => {
  for (const [k, v] of Object.entries(saved)) g[k] = v
})

describe('windowTransport — origin checks', () => {
  it('drops messages from origins not on the allow-list, and from other windows', () => {
    const guest = fakeWindow()
    const rejected: unknown[] = []
    const t = windowTransport({
      output: guest as unknown as Window,
      inputFilter: guest as unknown as Window,
      allowedOrigins: ['https://celestiary.org'],
      onReject: (r) => rejected.push(r)
    })
    const got: unknown[] = []
    t.onMessage((m) => got.push(m))
    deliver({ name: 'drawArrays', args: [] }, 'https://evil.example', guest)
    deliver({ name: 'drawArrays', args: [] }, 'https://celestiary.org', {})
    expect(got).toEqual([])
    expect(rejected).toEqual([
      { origin: 'https://evil.example', reason: 'origin' },
      { origin: 'https://celestiary.org', reason: 'source' }
    ])
    deliver({ name: 'drawArrays', args: [] }, 'https://celestiary.org', guest)
    expect(got).toEqual([{ name: 'drawArrays', args: [] }])
  })

  it('a source check alone passes a navigated frame; the origin check does not', () => {
    // The same WindowProxy, now showing another origin's page.
    const frame = fakeWindow()
    const loose = windowTransport({ output: frame as unknown as Window, inputFilter: frame as unknown as Window })
    const strict = windowTransport({ output: frame as unknown as Window, inputFilter: frame as unknown as Window, allowedOrigins: ['https://celestiary.org'] })
    const a: unknown[] = []
    const b: unknown[] = []
    loose.onMessage((m) => a.push(m))
    strict.onMessage((m) => b.push(m))
    deliver({ type: 'netgl:ready' }, 'https://attacker.example', frame)
    expect(a).toHaveLength(1)
    expect(b).toHaveLength(0)
  })

  it('posts with the single allowed origin as targetOrigin, never "*"', () => {
    const w = fakeWindow()
    const t = windowTransport({ output: w as unknown as Window, allowedOrigins: ['https://celestiary.org'] })
    t.post({ type: 'layer:view' })
    expect(w.posted[0].origin).toBe('https://celestiary.org')
    expect(t.outputOrigin).toBe('https://celestiary.org')
  })

  it('keeps the old defaults when no allow-list is given', () => {
    const w = fakeWindow()
    const t = windowTransport({ output: w as unknown as Window })
    t.post({})
    expect(w.posted[0].origin).toBe('*')
  })

  it('refuses unsafe or malformed configurations', () => {
    const w = fakeWindow() as unknown as Window
    expect(() => windowTransport({ output: w, allowedOrigins: ['*'] })).toThrow(/not an origin/)
    expect(() => windowTransport({ output: w, allowedOrigins: ['https://celestiary.org/'] })).toThrow(/serialized origin/)
    expect(() => windowTransport({ output: w, allowedOrigins: ['https://a.org/path'] })).toThrow(/serialized origin/)
    expect(() => windowTransport({ output: w, allowedOrigins: [] })).toThrow(/empty/)
    expect(() => windowTransport({ output: w, allowedOrigins: ['null'], outputOrigin: '*' })).toThrow(/inputFilter/)
    expect(() => windowTransport({ output: w, allowedOrigins: ['https://a.org', 'https://b.org'] })).toThrow(/outputOrigin/)
    expect(() => windowTransport({ output: w, outputOrigin: 'null' })).toThrow(/outputOrigin/)
    expect(isSerializedOrigin('http://localhost:5190')).toBe(true)
    expect(isSerializedOrigin('localhost:5190')).toBe(false)
  })
})

describe('iframeTransport / parentTransport', () => {
  it('host side: pins the iframe window and the guest origin', () => {
    const win = fakeWindow()
    const t = iframeTransport({ contentWindow: win } as unknown as HTMLIFrameElement, { origin: 'http://localhost:5191' })
    t.post({ type: 'layer:view' })
    expect(win.posted[0].origin).toBe('http://localhost:5191')
    const got: unknown[] = []
    t.onMessage((m) => got.push(m))
    deliver({ type: 'netgl:ready' }, 'http://localhost:5190', win)
    deliver({ type: 'netgl:ready' }, 'http://localhost:5191', win)
    expect(got).toHaveLength(1)
  })

  it('host side, sandboxed (opaque) guest: posts "*" but accepts only that frame', () => {
    const win = fakeWindow()
    const t = iframeTransport({ contentWindow: win } as unknown as HTMLIFrameElement, { origin: 'null' })
    t.post({})
    expect(win.posted[0].origin).toBe('*')
    const got: unknown[] = []
    t.onMessage((m) => got.push(m))
    deliver({ a: 1 }, 'null', {}) // another sandboxed frame
    deliver({ a: 2 }, 'null', win)
    expect(got).toEqual([{ a: 2 }])
  })

  it('guest side: resolves the parent among several allowed hosts', () => {
    const parentWin = fakeWindow()
    g.parent = parentWin
    ;(g.window as Record<string, unknown>).parent = parentWin
    g.location = { ancestorOrigins: ['https://pablo-mayrgundter.github.io'] }
    g.document = { referrer: '' }
    const hosts = ['http://localhost:5190', 'https://pablo-mayrgundter.github.io']
    expect(resolveParentOrigin(hosts)).toBe('https://pablo-mayrgundter.github.io')
    const t = parentTransport({ hostOrigins: hosts })
    t.post({ type: 'netgl:ready' })
    expect(parentWin.posted[0].origin).toBe('https://pablo-mayrgundter.github.io')
    // Falls back to the referrer (Firefox has no ancestorOrigins).
    g.location = {}
    g.document = { referrer: 'http://localhost:5190/index.html?x=1' }
    expect(resolveParentOrigin(hosts)).toBe('http://localhost:5190')
    // An embedding page that isn't allowed.
    g.document = { referrer: 'https://evil.example/' }
    expect(() => resolveParentOrigin(hosts)).toThrow(/not one of/)
    // With one allowed origin, that is the target whatever the page is:
    // the browser drops a message to the wrong origin.
    expect(resolveParentOrigin(['http://localhost:5190'])).toBe('http://localhost:5190')
  })

  it('guest side: refuses to run unframed', () => {
    ;(g.window as Record<string, unknown>).parent = g.window
    expect(() => resolveParentOrigin(['https://a.org'])).toThrow(/not in a frame/)
  })
})
