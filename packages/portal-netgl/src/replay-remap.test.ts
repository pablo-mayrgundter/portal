// Tests for makeNetGLReplay's viewport-remap + bind-transition logic.
//
// Tests don't need real WebGL — we mock the receiver context as a plain
// object whose methods record their calls. That gives us a deterministic
// way to verify what gl call sequence the replay actually emitted, with
// no headless-gl dependency (which doesn't run in this env's sandbox).

import { describe, expect, it } from 'vitest'
import type { NetGLCall } from './messages'
import { makeNetGLReplay } from './replay'

type CallLog = { name: string; args: unknown[] }

const makeMockGl = (): { gl: unknown; calls: CallLog[] } => {
  const calls: CallLog[] = []
  // A fake WebGLFramebuffer object — anything non-null + typeof object.
  const handler = {
    get(_: unknown, prop: string) {
      return (...args: unknown[]) => {
        calls.push({ name: prop, args })
        // Return objects for handle-returning calls so the replay's
        // idToHandle map stores them.
        if (prop === 'createFramebuffer' || prop === 'createTexture' || prop === 'createProgram') {
          return { __mock: prop }
        }
        return undefined
      }
    }
  }
  const gl = new Proxy({}, handler)
  return { gl, calls }
}

describe('makeNetGLReplay viewport remap', () => {
  it('passes viewport calls through when no remap is configured', () => {
    const { gl, calls } = makeMockGl()
    const replay = makeNetGLReplay(gl as WebGLRenderingContext as unknown as WebGL2RenderingContext)
    replay({ name: 'viewport', args: [0, 0, 1024, 768] } as NetGLCall)
    const viewports = calls.filter((c) => c.name === 'viewport')
    expect(viewports).toHaveLength(1)
    expect(viewports[0].args).toEqual([0, 0, 1024, 768])
  })

  it('remaps a screen-target viewport call to the rect the host returns', () => {
    const { gl, calls } = makeMockGl()
    const replay = makeNetGLReplay(gl as unknown as WebGL2RenderingContext, {
      remapScreenViewport: () => [100, 200, 300, 400]
    })
    // No bindFramebuffer call yet → currentDrawFb starts at null (default
    // framebuffer / host canvas), so the remap fires.
    replay({ name: 'viewport', args: [0, 0, 1024, 768] } as NetGLCall)
    const viewports = calls.filter((c) => c.name === 'viewport')
    expect(viewports).toHaveLength(1)
    expect(viewports[0].args).toEqual([100, 200, 300, 400])
  })

  it('does NOT remap viewport when an RT is bound', () => {
    const { gl, calls } = makeMockGl()
    const replay = makeNetGLReplay(gl as unknown as WebGL2RenderingContext, {
      remapScreenViewport: () => [100, 200, 300, 400]
    })
    // Bind an RT framebuffer (handle id 1, minted before this call so we
    // pass the fbo as a __netgl_handle arg).
    replay({
      name: 'createFramebuffer',
      args: [],
      returnId: 1
    } as NetGLCall)
    replay({
      name: 'bindFramebuffer',
      // GL_FRAMEBUFFER = 0x8D40
      args: [0x8D40, { __netgl_handle: 1 }]
    } as NetGLCall)
    replay({ name: 'viewport', args: [0, 0, 1024, 768] } as NetGLCall)
    // Find the viewport call that was emitted AFTER the bindFramebuffer.
    // (The bind transition itself re-issues a post-bind viewport using the
    // last intended args, which is empty initially — see next test for
    // that behaviour. Here we only assert the explicit viewport call's
    // args were not remapped.)
    const viewports = calls.filter((c) => c.name === 'viewport')
    // The explicit viewport call we made should be in the list with
    // original args (no remap).
    expect(viewports.some((v) => v.args[0] === 0 && v.args[1] === 0 && v.args[2] === 1024 && v.args[3] === 768)).toBe(true)
  })

  it('re-issues viewport on bindFramebuffer transitions (RT → screen → RT)', () => {
    const { gl, calls } = makeMockGl()
    const replay = makeNetGLReplay(gl as unknown as WebGL2RenderingContext, {
      remapScreenViewport: () => [100, 200, 300, 400]
    })
    // Sequence: viewport(W,H), bindFramebuffer(RT), bindFramebuffer(null), bindFramebuffer(RT)
    // We expect explicit viewport re-issues at each bind transition.
    replay({ name: 'viewport', args: [0, 0, 1024, 768] } as NetGLCall) // screen-target, remapped
    replay({ name: 'createFramebuffer', args: [], returnId: 1 } as NetGLCall)
    replay({ name: 'bindFramebuffer', args: [0x8D40, { __netgl_handle: 1 }] } as NetGLCall)
    // Transition null → RT: post-bind re-issue uses intended (0,0,1024,768)
    replay({ name: 'bindFramebuffer', args: [0x8D40, null] } as NetGLCall)
    // Transition RT → null: post-bind re-issue uses remapped (100,200,300,400)
    replay({ name: 'bindFramebuffer', args: [0x8D40, { __netgl_handle: 1 }] } as NetGLCall)
    // Transition null → RT again: post-bind re-issue uses intended (0,0,1024,768)

    const viewports = calls.filter((c) => c.name === 'viewport')
    // Initial explicit viewport: remapped.
    expect(viewports[0].args).toEqual([100, 200, 300, 400])
    // Post-bind re-issues, in order: RT-bind → intended, null-bind →
    // remapped, RT-bind → intended.
    expect(viewports[1].args).toEqual([0, 0, 1024, 768])
    expect(viewports[2].args).toEqual([100, 200, 300, 400])
    expect(viewports[3].args).toEqual([0, 0, 1024, 768])
  })

  it('skips post-bind viewport re-issue when no intended viewport has been seen', () => {
    const { gl, calls } = makeMockGl()
    const replay = makeNetGLReplay(gl as unknown as WebGL2RenderingContext, {
      remapScreenViewport: () => [100, 200, 300, 400]
    })
    replay({ name: 'createFramebuffer', args: [], returnId: 1 } as NetGLCall)
    // Bind without a prior viewport call.
    replay({ name: 'bindFramebuffer', args: [0x8D40, { __netgl_handle: 1 }] } as NetGLCall)
    const viewports = calls.filter((c) => c.name === 'viewport')
    expect(viewports).toHaveLength(0)
  })

  it('ignores READ_FRAMEBUFFER bindings (only DRAW affects screen vs RT routing)', () => {
    const { gl, calls } = makeMockGl()
    const replay = makeNetGLReplay(gl as unknown as WebGL2RenderingContext, {
      remapScreenViewport: () => [100, 200, 300, 400]
    })
    replay({ name: 'viewport', args: [0, 0, 1024, 768] } as NetGLCall) // remapped (drawFb=null)
    replay({ name: 'createFramebuffer', args: [], returnId: 1 } as NetGLCall)
    // GL_READ_FRAMEBUFFER = 0x8CA8 — should NOT trigger a viewport re-issue
    // (no draw-framebuffer transition).
    replay({ name: 'bindFramebuffer', args: [0x8CA8, { __netgl_handle: 1 }] } as NetGLCall)
    replay({ name: 'viewport', args: [0, 0, 512, 512] } as NetGLCall)
    const viewports = calls.filter((c) => c.name === 'viewport')
    // Two viewport calls: both still remapped (drawFb stayed null).
    expect(viewports).toHaveLength(2)
    expect(viewports[0].args).toEqual([100, 200, 300, 400])
    expect(viewports[1].args).toEqual([100, 200, 300, 400])
  })

  it('passes the sender args to remapScreenViewport so callers can compute cover/contain rects', () => {
    const { gl } = makeMockGl()
    const received: Array<[number, number, number, number]> = []
    const replay = makeNetGLReplay(gl as unknown as WebGL2RenderingContext, {
      remapScreenViewport: (x, y, w, h) => {
        received.push([x, y, w, h])
        return [0, 0, 10, 10]
      }
    })
    replay({ name: 'viewport', args: [50, 60, 700, 800] } as NetGLCall)
    expect(received).toEqual([[50, 60, 700, 800]])
  })
})
