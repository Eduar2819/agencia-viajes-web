import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'motion/react'
import { LogoMark } from '@/shared/design-system'
import { destinations } from '../data/destinations'

const BASE_SPEED = 2.2 // % del carril por segundo

/**
 * Única marquesina de la página. Avanza sola y acelera (o se invierte)
 * con la velocidad del scroll, como paisaje visto desde un tren.
 */
export function DestinationsMarquee() {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 })
  const factor = useTransform(velocity, [-2000, 0, 2000], [-4, 0, 4], { clamp: false })
  const skew = useTransform(velocity, [-2500, 0, 2500], [6, 0, -6])
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    const move = direction.current * BASE_SPEED * (delta / 1000) * (1 + Math.abs(f))
    baseX.set(baseX.get() - move)
  })

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

  return (
    <section
      id="destinos"
      aria-label="Destinos a los que viajamos"
      className="relative overflow-hidden py-[var(--space-section-tight)]"
    >
      <ul className="sr-only">
        {destinations.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
      <motion.div aria-hidden className="flex w-max" style={reduce ? undefined : { x, skewX: skew }}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {destinations.map((d) => (
              <span key={`${copy}-${d}`} className="flex items-center">
                <span className="px-[clamp(1rem,2vw,2rem)] font-display text-[clamp(3.5rem,2rem+7vw,9rem)] leading-none font-[560] tracking-[-0.04em] whitespace-nowrap text-ink [font-stretch:78%]">
                  {d}
                </span>
                <LogoMark className="size-[clamp(1.5rem,1rem+1.5vw,2.75rem)]" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  )
}
