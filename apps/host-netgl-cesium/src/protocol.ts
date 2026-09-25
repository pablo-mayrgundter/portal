// App-level messages between the three.js host and the Cesium guest, on top
// of NetGL's own call / frame-end / ready traffic.

/**
 * Host → guest, once per host frame. The guest renders exactly one Cesium
 * frame per tick (Cesium's own render loop is off), so guest frames pace
 * to host frames.
 */
export type CesiumTick = {
  type: 'cesium:tick'
  seq: number
  time: number
  /**
   * Earth mode: the host camera expressed in Cesium's frame (ECEF, metres).
   * Absent in door mode, where the guest flies its own camera.
   */
  view?: {
    position: [number, number, number]
    direction: [number, number, number]
    up: [number, number, number]
    /** Vertical field of view, radians. */
    fovy: number
  }
}

/** Guest → host, after the frame for `seq` has been posted. */
export type CesiumRendered = {
  type: 'cesium:rendered'
  seq: number
  /** Guest drawing-buffer size, for the host's viewport remap. */
  width: number
  height: number
}

/** Guest → host: an error the host should surface. */
export type CesiumError = { type: 'cesium:error'; message: string }

export type Mode = 'door' | 'earth'

export const readMode = (search: string): Mode =>
  new URLSearchParams(search).get('mode') === 'earth' ? 'earth' : 'door'
