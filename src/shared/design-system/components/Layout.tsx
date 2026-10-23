import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-[1400px] px-[clamp(1rem,0.5rem+2.5vw,2.5rem)]', className)} {...props} />
}

type Space = 'none' | 'tight' | 'base' | 'loose'

const spaceTop: Record<Space, string> = {
  none: 'pt-0',
  tight: 'pt-[var(--space-section-tight)]',
  base: 'pt-[var(--space-section-base)]',
  loose: 'pt-[var(--space-section-loose)]',
}

const spaceBottom: Record<Space, string> = {
  none: 'pb-0',
  tight: 'pb-[var(--space-section-tight)]',
  base: 'pb-[var(--space-section-base)]',
  loose: 'pb-[var(--space-section-loose)]',
}

type SectionProps = ComponentProps<'section'> & {
  children: ReactNode
  /** Aire arriba y abajo. Cada sección lo elige según con quién colinda. */
  top?: Space
  bottom?: Space
}

/** Ritmo vertical orgánico: pasos fluidos distintos arriba y abajo. */
export function Section({ className, top = 'base', bottom = 'base', ...props }: SectionProps) {
  return <section className={cn('relative', spaceTop[top], spaceBottom[bottom], className)} {...props} />
}

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3'
  size?: 'display' | 'h2' | 'h3'
  className?: string
  children: ReactNode
  id?: string
}

const headingSize = {
  display: 'text-display font-[640] [font-stretch:88%]',
  h2: 'text-h2 font-[620] [font-stretch:90%]',
  h3: 'text-h3 font-[600]',
}

export function Heading({ as: Tag = 'h2', size = 'h2', className, children, id }: HeadingProps) {
  return (
    <Tag id={id} className={cn('font-display text-balance', headingSize[size], className)}>
      {children}
    </Tag>
  )
}

export function Lead({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn('max-w-[58ch] text-lead text-pretty text-ink-muted', className)} {...props} />
}
