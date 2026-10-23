import type { CSSProperties } from 'react'
import { motion, type MotionStyle } from 'motion/react'
import { cn } from '@/shared/lib/cn'
import type { CloudSpec } from './shapes'
import './clouds.css'

type Props = {
  clouds: CloudSpec[]
  className?: string
  style?: MotionStyle
  /** Opacidad global del campo (para el tema oscuro) */
  tone?: string
}

/** Un campo de nubes que derivan con el viento dentro de su caja. */
export function CloudField({ clouds, className, style, tone }: Props) {
  return (
    <motion.div aria-hidden className={cn('cloud-field absolute', className)} style={style}>
      <div className="absolute inset-0" style={{ opacity: tone }}>
        {clouds.map((c, i) => (
          <div
            key={i}
            className="cloud-drift"
            style={
              {
                top: c.top,
                width: `${c.width}cqw`,
                opacity: c.opacity,
                '--w': `${c.width}cqw`,
                '--dur': `${c.duration}s`,
                '--delay': `${-c.offset * c.duration}s`,
                '--rest': `${c.rest}cqw`,
              } as CSSProperties
            }
          >
            <img src={c.src} alt="" draggable={false} decoding="async" />
          </div>
        ))}
      </div>
    </motion.div>
  )
}
