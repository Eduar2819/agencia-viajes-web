import { useId, type ReactElement, cloneElement } from 'react'
import { cn } from '@/shared/lib/cn'

type FieldProps = {
  label: string
  hint?: string
  error?: string
  className?: string
  children: ReactElement<Record<string, unknown>>
}

export const inputClass =
  'w-full rounded-2xl bg-bg px-4 py-3.5 text-body text-ink ring-1 ring-line transition-[box-shadow,background-color] duration-300 ease-fluid ' +
  'placeholder:text-ink-muted/80 hover:ring-ink/25 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-accent ' +
  'aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-danger'

/** Etiqueta arriba, ayuda opcional y error debajo del control. */
export function Field({ label, hint, error, className, children }: FieldProps) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-small font-medium text-ink">
        {label}
      </label>
      {cloneElement(children, {
        id,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': [hintId, errorId].filter(Boolean).join(' ') || undefined,
      })}
      {hint && !error && (
        <p id={hintId} className="text-small text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-small font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
