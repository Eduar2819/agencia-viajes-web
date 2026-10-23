import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { duration, ease } from '../tokens/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'p'
}

/** Entrada pesada y suave: sube, se desenfoca y aparece una sola vez. */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: duration.slow, ease: ease.out, delay }}
    >
      {children}
    </Tag>
  )
}
