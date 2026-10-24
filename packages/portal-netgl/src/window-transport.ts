// Self-contained postMessage transport. Inlined from `@portal/portal-iframe`'s
// `windowTransport` so portal-netgl can be a single npm package with no
// cross-workspace runtime deps. Surface matches what `NetGLTransport`
// expects: `post(msg)` and `onMessage(listener) → unsubscribe`.
//
// Cross-origin use. A guest served from another origin (celestiary.org
// inside a page on github.io) needs both ends pinned to each other:
//   - outbound, an explicit `targetOrigin`, so the browser drops the
//     message if the other window has navigated somewhere else since;
//   - inbound, an `event.origin` allow-list as well as the `event.source`
//     check. The source check alone isn't enough: an iframe's
//     `contentWindow` (and a guest's `parent`) is the same WindowProxy
//     after the frame navigates to another origin, so a hostile page loaded
//     into the same frame would pass it.
// `iframeTransport` (host side) and `parentTransport` (guest side) set both.
// Plain `windowTransport` keeps its old defaults (`'*'`, any origin) for
// same-origin demos.

export type WindowTransportOptions = {
  /** Window to post messages to. iframe: `parent`. host: `iframe.contentWindow`. */
  output: Window
  /**
   * postMessage `targetOrigin`. Defaults to the single entry of
   * `allowedOrigins` when that is set, else `'*'`. `'*'` is only needed
   * for a sandboxed guest without `allow-same-origin`, whose origin is
   * opaque (`'null'`) and can't be targeted.
   */
  outputOrigin?: string
  /** Only accept inbound messages whose `event.source` matches this. Null = any source. */
  inputFilter?: MessageEventSource | null
  /**
   * Only accept inbound messages whose `event.origin` is one of these
   * serialized origins (`'https://celestiary.org'`, no path or trailing
   * slash). `'null'` admits opaque origins (sandboxed frames) and then
   * requires `inputFilter`, since every sandboxed frame shares it. Unset:
   * any origin (same-origin use only).
   */
  allowedOrigins?: readonly string[]
  /** Called for each inbound message dropped by the source or origin check. */
  onReject?: (info: { origin: string; reason: 'source' | 'origin' }) => void
}

export type WindowTransport = {
  post(msg: unknown, transfer?: Transferable[]): void
  onMessage(listener: (msg: unknown) => void): () => void
  /** The `targetOrigin` this transport posts with (set by the constructors here). */
  readonly outputOrigin?: string
}

/** Whether `o` is a serialized origin (`scheme://host[:port]`) or `'null'`. */
export const isSerializedOrigin = (o: string): boolean => {
  if (o === 'null') return true
  try {
    return new URL(o).origin === o
  } catch {
    return false
  }
}

const checkOrigins = (allowed: readonly string[], inputFilter: unknown): void => {
  if (allowed.length === 0) throw new Error('windowTransport: allowedOrigins is empty')
  for (const o of allowed) {
    if (o === '*') throw new Error("windowTransport: '*' is not an origin; leave allowedOrigins unset to accept any")
    if (!isSerializedOrigin(o)) {
      throw new Error(`windowTransport: '${o}' is not a serialized origin (scheme://host[:port], no path)`)
    }
  }
  if (allowed.includes('null') && !inputFilter) {
    throw new Error("windowTransport: allowing the opaque origin 'null' needs inputFilter, since every sandboxed frame has it")
  }
}

export const windowTransport = (opts: WindowTransportOptions): WindowTransport => {
  const filter = opts.inputFilter ?? null
  const allowed = opts.allowedOrigins ?? null
  if (allowed) checkOrigins(allowed, filter)
  let origin = opts.outputOrigin
  if (origin === undefined) {
    if (!allowed) origin = '*'
    else if (allowed.length === 1 && allowed[0] !== 'null') origin = allowed[0]
    else throw new Error('windowTransport: pass outputOrigin when allowedOrigins has several entries or is opaque')
  } else if (origin !== '*' && origin !== '/' && (origin === 'null' || !isSerializedOrigin(origin))) {
    throw new Error(`windowTransport: outputOrigin '${origin}' is not '*', '/' or a serialized origin`)
  }
  const outputOrigin = origin
  return {
    outputOrigin,
    post(msg, transfer) {
      opts.output.postMessage(msg, outputOrigin, transfer ?? [])
    },
    onMessage(listener) {
      const onMessage = (ev: MessageEvent): void => {
        if (filter !== null && ev.source !== filter) {
          opts.onReject?.({ origin: ev.origin, reason: 'source' })
          return
        }
        if (allowed && !allowed.includes(ev.origin)) {
          opts.onReject?.({ origin: ev.origin, reason: 'origin' })
          return
        }
        const data = ev.data
        if (!data || typeof data !== 'object') return
        listener(data)
      }
      window.addEventListener('message', onMessage)
      return () => window.removeEventListener('message', onMessage)
    }
  }
}

export type IframeTransportOptions = {
  /**
   * The guest's origin, e.g. `'https://celestiary.org'`. `'null'` for a
   * sandboxed iframe without `allow-same-origin`: messages to it then go
   * out with `targetOrigin '*'` (an opaque origin can't be targeted), and
   * inbound messages are accepted from that frame's window only.
   */
  origin: string
  onReject?: WindowTransportOptions['onReject']
}

/**
 * Host side of a cross-origin iframe guest: posts to the iframe's window
 * with the guest's origin as `targetOrigin`, and accepts only messages from
 * that window and origin. The iframe must be in the document (it needs a
 * `contentWindow`).
 */
export const iframeTransport = (iframe: HTMLIFrameElement, opts: IframeTransportOptions): WindowTransport => {
  const win = iframe.contentWindow
  if (!win) throw new Error('iframeTransport: the iframe has no contentWindow yet (attach it to the document first)')
  return windowTransport({
    output: win,
    inputFilter: win,
    allowedOrigins: [opts.origin],
    outputOrigin: opts.origin === 'null' ? '*' : opts.origin,
    onReject: opts.onReject
  })
}

export type ParentTransportOptions = {
  /** The host origins this guest agrees to be embedded by and talk to. */
  hostOrigins: readonly string[]
  onReject?: WindowTransportOptions['onReject']
}

/**
 * Which of `hostOrigins` the embedding page is, from
 * `location.ancestorOrigins` (Chromium, WebKit) or else `document.referrer`.
 * With a single allowed origin that is the answer whatever those say:
 * posting to the wrong origin is dropped by the browser, never delivered.
 * Throws when the guest isn't framed, or when several are allowed and the
 * parent can't be told apart (a `no-referrer` policy in Firefox).
 */
export const resolveParentOrigin = (hostOrigins: readonly string[]): string => {
  if (typeof window === 'undefined' || window.parent === window) {
    throw new Error('resolveParentOrigin: not in a frame')
  }
  const candidates: string[] = []
  const ancestors = (location as Location & { ancestorOrigins?: DOMStringList }).ancestorOrigins
  if (ancestors && ancestors.length > 0) candidates.push(ancestors[0])
  if (document.referrer) {
    try {
      candidates.push(new URL(document.referrer).origin)
    } catch {
      // not a URL; ignore
    }
  }
  for (const c of candidates) if (hostOrigins.includes(c)) return c
  if (hostOrigins.length === 1) return hostOrigins[0]
  throw new Error(
    `resolveParentOrigin: parent origin ${candidates[0] ?? '(unknown)'} is not one of ${hostOrigins.join(', ')}`
  )
}

/**
 * Guest side of a cross-origin embedding: posts to `parent` with the
 * resolved host origin as `targetOrigin`, and accepts only messages from
 * `parent` whose origin is in `hostOrigins`.
 */
export const parentTransport = (opts: ParentTransportOptions): WindowTransport => {
  const hostOrigin = resolveParentOrigin(opts.hostOrigins)
  return windowTransport({
    output: parent,
    inputFilter: parent,
    allowedOrigins: opts.hostOrigins,
    outputOrigin: hostOrigin,
    onReject: opts.onReject
  })
}
