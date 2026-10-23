import type { Transition } from 'motion/react'

/** Curvas de la marca. Nunca linear ni ease-in-out por defecto. */
export const ease = {
  out: [0.16, 1, 0.3, 1],
  fluid: [0.32, 0.72, 0, 1],
} as const

export const duration = {
  fast: 0.24,
  base: 0.52,
  slow: 0.9,
} as const

export const spring = {
  press: { type: 'spring', stiffness: 420, damping: 30 },
  layout: { type: 'spring', stiffness: 260, damping: 32, mass: 0.9 },
  soft: { type: 'spring', stiffness: 120, damping: 22 },
} satisfies Record<string, Transition>
