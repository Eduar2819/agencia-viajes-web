import { cn } from '@/shared/lib/cn'

type LogoMarkProps = { className?: string; title?: string }

/**
 * Sello de SosaCraft: una "S" trazada como ruta de vuelo punteada
 * entre un origen y un destino, dentro de un círculo de pasaporte.
 */
export function LogoMark({ className, title }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn('shrink-0', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <rect width="32" height="32" rx="16" className="fill-accent" />
      <path
        d="M21.5 9.5C18 8.2 11 8.4 11 13c0 4.6 10 1.8 10 6.6 0 4.6-7 4.4-10.5 3"
        className="stroke-accent-ink"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="0.1 3.4"
      />
      <circle cx="10.5" cy="22.6" r="2.2" className="fill-accent-ink" />
      <circle cx="21.5" cy="9.5" r="2.2" className="fill-accent-ink" />
    </svg>
  )
}

type LogoProps = { className?: string; markClassName?: string }

export function Logo({ className, markClassName }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 text-ink', className)}>
      <LogoMark className={cn('size-8', markClassName)} />
      <span className="font-display text-[1.375rem] leading-none font-[650] tracking-[-0.04em] [font-stretch:85%]">
        sosacraft
      </span>
    </span>
  )
}
