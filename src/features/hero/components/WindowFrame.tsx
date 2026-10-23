import { motion, useReducedMotion, type MotionValue } from 'motion/react'
import { ease } from '@/shared/design-system'

type Props = {
  radius: MotionValue<number>
  opacity: MotionValue<number>
}

/**
 * Marco de la ventanilla: bisel grueso, sombra interior de profundidad
 * y la persiana que sube al cargar la página.
 */
export function WindowFrame({ radius, opacity }: Props) {
  const reduce = useReducedMotion()

  return (
    <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ opacity }}>
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius: radius,
          boxShadow:
            '0 0 0 12px var(--sc-surface), 0 0 0 13px var(--sc-line), 0 40px 80px -30px rgb(var(--sc-shadow-tint) / .45), inset 0 0 0 1px rgb(14 23 38 / .25), inset 0 14px 40px rgb(14 23 38 / .35)',
        }}
      >
        {/* Persiana */}
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { y: '0%' }}
          animate={{ y: '-101%' }}
          transition={{ duration: 1.5, ease: ease.fluid, delay: 1.05 }}
          style={{
            background:
              'repeating-linear-gradient(180deg, var(--sc-surface-2) 0 22px, color-mix(in oklab, var(--sc-surface-2) 88%, var(--sc-ink)) 22px 23px)',
          }}
        >
          <span className="absolute bottom-5 left-1/2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-ink/25" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
