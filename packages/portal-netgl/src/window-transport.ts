// Self-contained postMessage transport. Inlined from `@portal/portal-iframe`'s
// `windowTransport` so portal-netgl can be a single npm package with no
// cross-workspace runtime deps. Surface matches what `NetGLTransport`
// expects: `post(msg)` and `onMessage(listener) → unsubscribe`.

export type WindowTransportOptions = {
  /** Window to post messages to. iframe: `parent`. host: `iframe.contentWindow`. */
  output: Window
  /** postMessage `targetOrigin`. Defaults to `'*'`. Set in prod when origins are known. */
  outputOrigin?: string
  /** Only accept inbound messages whose `event.source` matches this. Null = any source. */
  inputFilter?: MessageEventSource | null
}

export type WindowTransport = {
  post(msg: unknown, transfer?: Transferable[]): void
  onMessage(listener: (msg: unknown) => void): () => void
}

export const windowTransport = (opts: WindowTransportOptions): WindowTransport => {
  const origin = opts.outputOrigin ?? '*'
  const filter = opts.inputFilter ?? null
  return {
    post(msg, transfer) {
      opts.output.postMessage(msg, origin, transfer ?? [])
    },
    onMessage(listener) {
      const onMessage = (ev: MessageEvent): void => {
        if (filter !== null && ev.source !== filter) return
        const data = ev.data
        if (!data || typeof data !== 'object') return
        listener(data)
      }
      window.addEventListener('message', onMessage)
      return () => window.removeEventListener('message', onMessage)
    }
  }
}
