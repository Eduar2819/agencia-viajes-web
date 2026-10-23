import type { ComponentProps, ElementType, ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

type Variant = 'primary' | 'secondary' | 'on-photo' | 'whatsapp'
type Size = 'md' | 'lg'

const base =
  'group relative inline-flex items-center gap-3 whitespace-nowrap rounded-full font-medium ' +
  'transition-[transform,background-color,box-shadow,color] duration-500 ease-fluid ' +
  'active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent ' +
  'disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-ink shadow-soft hover:shadow-lifted',
  secondary: 'bg-surface text-ink ring-1 ring-line shadow-highlight hover:bg-surface-2',
  'on-photo':
    'bg-[rgb(10_17_32/0.35)] text-on-photo ring-1 ring-white/25 backdrop-blur-md hover:bg-[rgb(10_17_32/0.5)]',
  whatsapp: 'bg-whatsapp-deep text-white shadow-soft hover:bg-whatsapp-deep-hover hover:shadow-lifted',
}

const islands: Record<Variant, string> = {
  primary: 'bg-accent-ink/15',
  secondary: 'bg-ink/6',
  'on-photo': 'bg-white/15',
  whatsapp: 'bg-white/15',
}

const sizes: Record<Size, { root: string; island: string }> = {
  md: { root: 'h-12 pl-5 pr-1.5 text-small', island: 'size-9' },
  lg: { root: 'h-14 pl-6 pr-2 text-body', island: 'size-10' },
}

type ButtonOwnProps = {
  variant?: Variant
  size?: Size
  /** Icono Phosphor que vive dentro de su propia isla circular */
  icon?: ReactNode
  children: ReactNode
  className?: string
}

type AsButton = ButtonOwnProps & Omit<ComponentProps<'button'>, keyof ButtonOwnProps> & { href?: undefined }
type AsLink = ButtonOwnProps & Omit<ComponentProps<'a'>, keyof ButtonOwnProps> & { href: string }

export function Button({ variant = 'primary', size = 'md', icon, children, className, ...rest }: AsButton | AsLink) {
  const Tag: ElementType = 'href' in rest && rest.href ? 'a' : 'button'
  const s = sizes[size]
  const props = rest as Record<string, unknown>
  return (
    <Tag className={cn(base, variants[variant], s.root, !icon && 'pr-6', className)} {...props}>
      <span>{children}</span>
      {icon && (
        <span
          aria-hidden
          className={cn(
            'grid place-items-center rounded-full transition-transform duration-500 ease-fluid',
            'group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105',
            islands[variant],
            s.island,
          )}
        >
          {icon}
        </span>
      )}
    </Tag>
  )
}
