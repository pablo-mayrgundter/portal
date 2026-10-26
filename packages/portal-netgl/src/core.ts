// The three.js-free entry point: `@pablo-mayrgundter/portal-netgl/core`.
// Everything here runs without three installed (three is an optional peer
// dependency): the recorder and replay, guest context, links and receiver,
// transports, the Cesium shim, the deck.gl / luma.gl host adapter, and the
// three.js overlay guest (which takes your three's classes as arguments).
// The main entry adds the helpers that import three itself.

export { makeNetGLProxy, type NetGLProxyConfig } from './proxy'
export {
  makeNetGLRecorder,
  makeNetGLRecorderSession,
  trimSource,
  unpackExtent,
  DEFAULT_UNPACK,
  type NetGLRecorderPost,
  type NetGLUnpackState,
  type NetGLRecorderSession,
  type NetGLRecorderSessionOptions
} from './recorder'
export { makeNetGLReplay, type NetGLReplay, type NetGLReplayConfig, type NetGLReprojectStats, type NetGLViewportRemap } from './replay'
export {
  reprojectVertexShader,
  reprojection,
  mat4Invert,
  NETGL_REPROJECT_UNIFORM,
  NETGL_REPROJECT_MAIN
} from './reproject'
export type { NetGLScreenPolicy } from './screen-policy'
export {
  captureCheckpoint,
  makeBindingTracker,
  makeScalarStateTracker,
  type BindingTracker,
  type ScalarStateTracker
} from './checkpoint'
export {
  makeNetGLGuestContext,
  type NetGLGuestContext,
  type NetGLGuestContextConfig,
  type NetGLEndFrameOptions,
  type NetGLGuestWire,
  type NetGLReadyMessage,
  type NetGLReadyAckMessage
} from './guest-context'
export {
  makeNetGLImmediateLink,
  type NetGLImmediateLink,
  type NetGLImmediateLinkConfig
} from './immediate-link'
export {
  makeNetGLHostReceiver,
  type NetGLHostReceiver,
  type NetGLHostReceiverConfig,
  type NetGLReceiverReprojectConfig,
  type NetGLHostWire
} from './host-receiver'
export {
  makeNetGLCesiumGuest,
  type NetGLCesiumGuest,
  type NetGLCesiumGuestConfig,
  type CesiumContextOptions,
  type CesiumSceneLike
} from './frameworks/cesium'
export type { NetGLTransport } from './renderer'
export type {
  NetGLCall,
  NetGLEncodedValue,
  NetGLFrameEnd,
  NetGLWireMessage,
  NetGLBatch,
  NetGLStreamItem,
  NetGLPortOpenMessage
} from './messages'
export { isNetGLCall, isNetGLFrameEnd, isNetGLBatch, NETGL_WIRE_VERSION } from './messages'
export type {
  ColorRGB,
  Mat4,
  PortalAnchor,
  PortalPose,
  Vec3,
  Viewport
} from './portal-types'
export {
  windowTransport,
  iframeTransport,
  parentTransport,
  resolveParentOrigin,
  isSerializedOrigin,
  type WindowTransport,
  type WindowTransportOptions,
  type IframeTransportOptions,
  type ParentTransportOptions
} from './window-transport'
export {
  attachNetGLDeckLayer,
  globeLayerView,
  globeFrameOfViewport,
  withLumaState,
  type DeckLike,
  type DeckViewportLike,
  type LumaDeviceLike,
  type GlobeFrame,
  type GlobeLayerViewOptions,
  type NetGLDeckLayer,
  type NetGLDeckLayerConfig,
  type NetGLDeckLayerStats,
  type NetGLDeckReprojection,
  type DeckImmediateLayerConfig,
  type DeckReceiverLayerConfig
} from './frameworks/luma'
export {
  makeNetGLThreeOverlayGuest,
  type NetGLThreeOverlayGuest,
  type NetGLThreeOverlayGuestConfig
} from './frameworks/three-overlay'
export {
  isNetGLLayerViewMessage,
  isNetGLLayerInvalidateMessage,
  isNetGLLayerHelloMessage,
  isNetGLLayerAnchorsMessage,
  postLayerInvalidate,
  type NetGLAnchor,
  type NetGLLayerAnchorsMessage,
  type NetGLLayerAnchorsSubscribeMessage,
  type NetGLLayerHelloMessage,
  type NetGLLayerHelloAckMessage,
  type NetGLLayerHelloAnswer,
  type NetGLLayerInvalidateMessage,
  mat4Multiply,
  mat4InvertRigid,
  mat4TransformVec4,
  projectToPixels,
  sphereToEcef,
  type NetGLLayerView,
  type NetGLLayerViewMessage,
  type NetGLMat4
} from './layer-view'
