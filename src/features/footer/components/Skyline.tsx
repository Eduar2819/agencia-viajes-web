import type { CSSProperties } from 'react'
import { motion, useReducedMotion, useTransform, type MotionValue } from 'motion/react'
import { cn } from '@/shared/lib/cn'
import { landmarkShapes, type LandmarkShape } from '../data/landmark-shapes'
import type { LandmarkSpec } from '../data/landmarks'

/** Unidad del horizonte en el viewBox: un monumento de altura 1 mide esto */
const UNIT = 100

type Props = {
  items: LandmarkSpec[]
  progress: MotionValue<number>
  className?: string
  style?: CSSProperties
  /** Tramo del progreso en que empiezan a salir y cuánto tarda cada uno */
  from?: number
  stagger?: number
  span?: number
  /** Espacio entre monumentos, en unidades (negativo los encima un poco) */
  gap?: number
  /** meet: siempre completo. slice: recorta los lados para conservar el tamaño */
  fit?: 'meet' | 'slice'
}

/** Medidas del horizonte para que el contenedor respete su proporción. */
export function skylineSize(items: LandmarkSpec[], gap = -4) {
  const widths = items.map((it) => it.height * UNIT * aspect(landmarkShapes[it.id]))
  const width = widths.reduce((a, b) => a + b, 0) + gap * (items.length - 1)
  const height = Math.max(...items.map((it) => it.height * UNIT)) + 2
  return { width, height, widths }
}

/**
 * Horizonte de monumentos. Cada silueta sale del suelo con el scroll,
 * del centro hacia los lados. En pantallas angostas recorta los extremos
 * (slice) para conservar el tamaño de los monumentos.
 */
export function Skyline({
  items,
  progress,
  className,
  style,
  from = 0.2,
  stagger = 0.05,
  span = 0.36,
  gap = -4,
  fit = 'slice',
}: Props) {
  const reduce = useReducedMotion()
  const { width, height, widths } = skylineSize(items, gap)
  const middle = (items.length - 1) / 2

  let x = 0
  const placed = items.map((it, i) => {
    const h = it.height * UNIT
    const at = { ...it, x, w: widths[i], h }
    x += widths[i] + gap
    return at
  })

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio={`xMidYMax ${fit}`}
      className={cn('block h-full w-full text-accent', className)}
      style={style}
    >
      {placed.map((it, i) => {
        const lead = from + Math.abs(i - middle) * stagger
        return (
          <Landmark
            key={`${it.id}-${i}`}
            shape={landmarkShapes[it.id]}
            name={it.name}
            x={it.x}
            y={height - it.h}
            w={it.w}
            h={it.h}
            progress={progress}
            range={[lead, lead + span]}
            drop={height}
            still={!!reduce}
          />
        )
      })}
    </svg>
  )
}

function aspect(shape: LandmarkShape) {
  const [, , w, h] = shape.vb.split(' ').map(Number)
  return w / h
}

type LandmarkProps = {
  shape: LandmarkShape
  name: string
  x: number
  y: number
  w: number
  h: number
  progress: MotionValue<number>
  range: [number, number]
  drop: number
  still: boolean
}

function Landmark({ shape, name, x, y, w, h, progress, range, drop, still }: LandmarkProps) {
  const rise = useTransform(progress, range, [drop, 0])
  return (
    <motion.g style={still ? undefined : { y: rise }}>
      <svg x={x} y={y} width={w} height={h} viewBox={shape.vb} preserveAspectRatio="xMidYMax meet">
        <title>{name}</title>
        {shape.paths.map((p, i) => (
          <path key={i} d={p.d} transform={p.transform} fill="currentColor" fillRule={p.evenodd ? 'evenodd' : undefined} />
        ))}
      </svg>
    </motion.g>
  )
}
