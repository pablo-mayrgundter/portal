// The main entry: everything in `./core`, plus the helpers that import
// three.js at runtime (createNetGLRenderer, makeNetGLPortalTarget,
// makeNetGLPortalGuest, the stencil helpers). A host without three (a
// deck.gl app) imports `@pablo-mayrgundter/portal-netgl/core` instead.

export * from './core'
export {
  makeNetGLPortalTarget,
  type NetGLPortalTargetConfig,
  type NetGLPortalTarget
} from './target'
export {
  makeNetGLPortalGuest,
  type NetGLPortalGuestConfig,
  type NetGLPortalGuestHandle,
  type NetGLSetPoseMessage
} from './guest'
export {
  createNetGLRenderer,
  attachNetGLReceiver,
  type NetGLRendererConfig,
  type NetGLReceiverConfig,
  type NetGLReceiverHandle
} from './renderer'
export {
  applyPortalStencilTest,
  applyObliqueClipFromAnchor,
  PORTAL_STENCIL_REF
} from './three-helpers'
