import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import { spring } from '../tokens/motion'

type ChipProps = {
  active: boolean
  onClick: () => void
  children: ReactNode
  /** Agrupa los chips que comparten el indicador animado */
  group: string
}

export function Chip({ active, onClick, children, group }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'relative h-11 rounded-full px-5 text-small font-medium transition-colors duration-300 ease-fluid',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        active ? 'text-accent-ink' : 'text-ink-muted hover:text-ink',
      )}
    >
      {active && (
        <motion.span
          layoutId={`chip-${group}`}
          transition={spring.layout}
          className="absolute inset-0 rounded-full bg-accent"
        />
      )}
      <span className="relative">{children}</span>
    </button>
  )
}
