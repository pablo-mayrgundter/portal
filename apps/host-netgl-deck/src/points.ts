// Known positions both sides draw: the host as rings (deck's projection of
// longitude, latitude and altitude), the guest as dots (ECEF metres on the
// host's Earth model, from the view). A dot centred in its ring is
// alignment. On the far side deck hides its rings itself, and the globe's
// depth hides the guest's dots.
//
// Ground markers sit 20 km up. deck's depth buffer spans its whole globe
// view, so one depth step is kilometres (z²/near · 2⁻²⁴: ~5 km at zoom 0.3).
// A dot on the ground ties with deck's land polygons and coastlines and
// loses some of the time: lift anything drawn on the ground.

export type Marker = { name: string; lng: number; lat: number; alt: number; color: [number, number, number] }

export const MARKERS: readonly Marker[] = [
  { name: 'Null Island', lng: 0, lat: 0, alt: 20e3, color: [255, 220, 60] },
  { name: 'New York, 700 km up', lng: -74, lat: 40.7, alt: 700e3, color: [80, 255, 120] },
  { name: 'London, 300 km up', lng: -0.1, lat: 51.5, alt: 300e3, color: [80, 200, 255] },
  { name: 'Recife', lng: -34.9, lat: -8.05, alt: 20e3, color: [255, 120, 220] },
  { name: 'South Atlantic, 2000 km up', lng: -20, lat: -45, alt: 2000e3, color: [255, 160, 60] },
  { name: 'San Francisco', lng: -122.4, lat: 37.8, alt: 20e3, color: [160, 140, 255] },
  { name: 'Tokyo (far side)', lng: 139.7, lat: 35.7, alt: 20e3, color: [255, 80, 80] },
  { name: 'Sydney (far side)', lng: 151.2, lat: -33.9, alt: 20e3, color: [255, 80, 80] }
]

/** An inclined circular orbit (ISS-like), for a ring the globe half hides. */
export const ORBIT = { altitude: 2000e3, inclinationDeg: 51.6, ascendingNodeLngDeg: -150, periodMin: 127 }
