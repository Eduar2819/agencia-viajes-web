export type Point = { x: number; y: number }

export type FlightGeometry = {
  width: number
  height: number
  /** Puntos de paso en coordenadas del documento */
  points: Point[]
  d: string
  /** Scroll de la página al que el avión llega a cada punto */
  stops: number[]
}

/** Secciones que la ruta cruza, alternando lado. El destino es el formulario de contacto. */
const SECTIONS = ['paquetes', 'como-viajamos', 'destinos', 'opiniones', 'preguntas']

/** Altura de la pantalla donde "vuela" el avión mientras haces scroll */
export const PLANE_LINE = 0.6

const docY = (el: Element) => el.getBoundingClientRect().top + window.scrollY
const center = (el: Element): Point => {
  const r = el.getBoundingClientRect()
  return { x: r.left + r.width / 2, y: r.top + window.scrollY + r.height / 2 }
}

/** Mide la página y arma los puntos de la ruta. Null si aún no hay layout. */
export function measureRoute(): Omit<FlightGeometry, 'stops'> | null {
  const width = document.documentElement.clientWidth
  const hero = document.getElementById('inicio')
  const footer = document.querySelector('footer')
  const destination = document.querySelector('[data-flight="destination"]')
  if (!hero || !footer || !destination) return null

  const narrow = width < 768
  const left = width * (narrow ? 0.08 : 0.1)
  const right = width * (narrow ? 0.92 : 0.9)

  // Despegue: justo al salir del hero, del lado libre junto al título de paquetes
  const points: Point[] = [{ x: width * (narrow ? 0.86 : 0.84), y: docY(hero) + hero.offsetHeight + 48 }]

  SECTIONS.forEach((id, i) => {
    const el = document.getElementById(id)
    if (!el) return
    const r = el.getBoundingClientRect()
    points.push({ x: i % 2 === 0 ? left : right, y: r.top + window.scrollY + r.height * 0.5 })
  })

  // Aterrizaje: justo encima del formulario de contacto
  points.push(center(destination))

  const height = docY(footer) + footer.offsetHeight
  return { width, height, points, d: catmullRom(points) }
}

/** Curva suave que pasa por todos los puntos (Catmull-Rom a Bézier). */
export function catmullRom(points: Point[], tension = 0.5) {
  if (points.length < 2) return ''
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) d += ' ' + segment(points, i, tension)
  return d
}

/** Un tramo de la curva, del punto i al i+1 (sin el "M" inicial). */
export function segment(points: Point[], i: number, tension = 0.5) {
  const p0 = points[i - 1] ?? points[i]
  const p1 = points[i]
  const p2 = points[i + 1]
  const p3 = points[i + 2] ?? p2
  const k = tension / 3
  const c1 = { x: p1.x + (p2.x - p0.x) * k, y: p1.y + (p2.y - p0.y) * k }
  const c2 = { x: p2.x - (p3.x - p1.x) * k, y: p2.y - (p3.y - p1.y) * k }
  return `C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`
}

/**
 * Scroll en el que el avión alcanza cada punto: cuando el punto cruza
 * la línea de vuelo de la pantalla. El último punto se alcanza al final de la página.
 */
export function scrollStops(points: Point[]) {
  const vh = window.innerHeight
  const max = document.documentElement.scrollHeight - vh
  const n = points.length
  const stops: number[] = []
  points.forEach((p, i) => {
    const raw = Math.min(max, p.y - vh * PLANE_LINE)
    stops.push(Math.max((stops[i - 1] ?? 0) + 1, raw))
  })

  // Los puntos del final quedan más abajo de lo que el scroll alcanza:
  // se reparten en el último tramo para que el avión sí aterrice en "Tu viaje".
  const limit = max - vh * 0.4
  const k = stops.findIndex((s, i) => i > 0 && s > limit)
  if (k > 0) {
    const from = Math.min(stops[k - 1], limit)
    for (let i = k; i < n; i++) stops[i] = from + ((max - from) * (i - k + 1)) / (n - k)
  }
  return stops
}

/** Interpolación lineal por tramos */
export function piecewise(x: number, xs: number[], ys: number[]) {
  if (x <= xs[0]) return ys[0]
  for (let i = 1; i < xs.length; i++) {
    if (x <= xs[i]) {
      const t = (x - xs[i - 1]) / (xs[i] - xs[i - 1] || 1)
      return ys[i - 1] + (ys[i] - ys[i - 1]) * t
    }
  }
  return ys[ys.length - 1]
}
