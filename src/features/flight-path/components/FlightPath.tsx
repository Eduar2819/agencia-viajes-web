import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { Airplane } from '@phosphor-icons/react'
import { measureRoute, piecewise, scrollStops, segment, type Point } from '../lib/geometry'
import './flight-path.css'

type Route = { width: number; height: number; points: Point[]; d: string }

/**
 * Ruta de vuelo de toda la página: de "Tu idea" (al salir del hero) a
 * "Tu viaje", que aterriza sobre el formulario de contacto. Vive debajo del
 * contenido, así que el avión pasa por detrás de tarjetas y textos y
 * reaparece entre secciones.
 */
export function FlightPath() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const [route, setRoute] = useState<Route | null>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const helperRef = useRef<SVGPathElement>(null)
  const planeRef = useRef<SVGGElement>(null)
  // Fracción de la ruta recorrida (0 a 1) y su relación con el scroll
  const drawn = useMotionValue(0)
  const map = useRef<{ stops: number[]; lengths: number[]; total: number } | null>(null)

  // Medir la página y rehacer la ruta cuando cambia el layout
  useLayoutEffect(() => {
    let frame = 0
    const measure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const next = measureRoute()
        if (next) setRoute((prev) => (prev && prev.d === next.d && prev.height === next.height ? prev : next))
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('resize', measure)
    // Fuentes e imágenes pueden mover el layout después de la primera medición
    document.fonts?.ready.then(measure)
    window.addEventListener('load', measure)
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
    }
  }, [])

  // Longitud de la ruta en cada punto de paso, para ligarla al scroll
  useLayoutEffect(() => {
    const path = pathRef.current
    const helper = helperRef.current
    if (!route || !path || !helper) return
    const lengths = [0]
    let acc = 0
    for (let i = 0; i < route.points.length - 1; i++) {
      const p = route.points[i]
      helper.setAttribute('d', `M ${p.x} ${p.y} ${segment(route.points, i)}`)
      acc += helper.getTotalLength()
      lengths.push(acc)
    }
    map.current = { stops: scrollStops(route.points), lengths, total: path.getTotalLength() }
    update(scrollY.get())
  }, [route])

  // Al tocar destino, el punto suelta una onda (una vez por cada llegada)
  const [landed, setLanded] = useState(false)

  const update = (y: number) => {
    const m = map.current
    const path = pathRef.current
    const plane = planeRef.current
    if (!m || !path || !plane) return
    const at = reduce ? m.total : piecewise(y, m.stops, m.lengths)
    drawn.set(at / m.total)
    const arrived = at >= m.total - 1
    setLanded((prev) => (prev === arrived ? prev : arrived))
    const p = path.getPointAtLength(at)
    const q = path.getPointAtLength(Math.min(m.total, at + 2))
    const r = path.getPointAtLength(Math.max(0, at - 2))
    const angle = (Math.atan2(q.y - r.y, q.x - r.x) * 180) / Math.PI + 90
    plane.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${angle})`)
  }

  useMotionValueEvent(scrollY, 'change', update)
  useEffect(() => {
    if (reduce) update(0)
  }, [reduce])

  if (!route) return null
  const start = route.points[0]
  const end = route.points[route.points.length - 1]

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 z-0 w-full overflow-hidden"
      style={{ height: route.height }}
    >
      <svg
        width={route.width}
        height={route.height}
        viewBox={`0 0 ${route.width} ${route.height}`}
        className="absolute inset-0 text-accent"
      >
        <defs>
          <mask id="flight-path-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width={route.width} height={route.height}>
            <motion.path d={route.d} fill="none" stroke="#fff" strokeWidth="16" style={{ pathLength: drawn }} />
          </mask>
        </defs>

        <path ref={helperRef} fill="none" stroke="none" />
        {/* Ruta completa, apenas insinuada */}
        <path d={route.d} fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="3" strokeLinecap="round" strokeDasharray="0.1 14" />
        {/* Ruta recorrida */}
        <path
          ref={pathRef}
          d={route.d}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="0.1 14"
          mask="url(#flight-path-reveal)"
        />

        <circle cx={start.x} cy={start.y} r="9" className="fill-accent" />
        <circle cx={end.x} cy={end.y} r="18" className="fill-accent" fillOpacity="0.16" />
        <circle cx={end.x} cy={end.y} r="9" className="fill-accent" />
        {landed && (
          <g key="ripple">
            <circle cx={end.x} cy={end.y} r="22" fill="none" stroke="currentColor" strokeWidth="2" className="landing-ripple" />
            <circle cx={end.x} cy={end.y} r="22" fill="none" stroke="currentColor" strokeWidth="2" className="landing-ripple" />
          </g>
        )}

        <g ref={planeRef}>
          <circle r="25" className="fill-surface" style={{ filter: 'drop-shadow(0 8px 16px rgb(var(--sc-shadow-tint) / .18))' }} />
          <Airplane size={28} weight="fill" x={-14} y={-14} className="text-accent" />
        </g>
      </svg>

      <span
        className="absolute -translate-x-full -translate-y-1/2 pr-12 text-small font-medium whitespace-nowrap text-ink"
        style={{ left: start.x, top: start.y }}
      >
        Tu idea
      </span>
      <span
        className="absolute -translate-x-full -translate-y-1/2 pr-12 text-small font-medium whitespace-nowrap text-ink"
        style={{ left: end.x, top: end.y }}
      >
        Tu viaje
      </span>
    </div>
  )
}
