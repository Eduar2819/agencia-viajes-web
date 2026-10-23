import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/cn'

type BezelProps = ComponentProps<'div'> & {
  /** Clases del núcleo interior */
  coreClassName?: string
}

/**
 * Doble bisel: una bandeja exterior con línea fina y un núcleo interior
 * con su propio brillo. Radios concéntricos (2rem y 2rem - 0.5rem).
 */
export function Bezel({ className, coreClassName, children, ...props }: BezelProps) {
  return (
    <div className={cn('rounded-shell bg-ink/[0.035] p-2 ring-1 ring-line', className)} {...props}>
      <div className={cn('relative h-full overflow-hidden rounded-core bg-surface shadow-highlight', coreClassName)}>
        {children}
      </div>
    </div>
  )
}
