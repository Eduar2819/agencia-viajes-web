import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, type PanInfo } from 'motion/react'
import { cn } from '@/shared/lib/cn'
import { photo, photoSrcSet } from '@/shared/lib/images'
import type { Photo } from '../data/galleries'

type Props = {
  photos: Photo[]
  index: number
  onIndexChange: (index: number) => void
  /** Toque o clic sin arrastrar */
  onTap?: () => void
  /** Nombre del viaje, para lectores de pantalla */
  label: string
  sizes: string
  /** En escritorio, mover el cursor sobre la foto cambia de imagen */
  scrub?: boolean
  /** Carga inmediata de la primera foto */
  eager?: boolean
  /** hover: los indicadores aparecen al posicionarse (en táctil siempre visibles) */
  indicators?: 'hover' | 'always'
  className?: string
}

const SNAP = { type: 'spring', stiffness: 320, damping: 36 } as const

/**
 * Carrusel sin flechas: se cambia arrastrando (o deslizando en móvil),
 * moviendo el cursor de lado a lado en escritorio, con los indicadores
 * o con las flechas del teclado cuando tiene el foco.
 */
export function PhotoCarousel({
  photos,
  index,
  onIndexChange,
  onTap,
  label,
  sizes,
  scrub = false,
  eager = false,
  indicators = 'always',
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const reduce = useReducedMotion()
  const [width, setWidth] = useState(0)
  const dragged = useRef(false)
  const count = photos.length
  // En dispositivos con cursor se muestran al posicionarse; en táctil, siempre
  const reveal =
    indicators === 'hover'
      ? 'opacity-0 transition-opacity duration-500 ease-fluid group-hover/carousel:opacity-100 group-focus-within/carousel:opacity-100 [@media(hover:none)]:opacity-100'
      : undefined

  const go = (i: number) => onIndexChange(Math.max(0, Math.min(count - 1, i)))

  // Medir el ancho del visor (cambia con el layout del grid)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => setWidth(el.offsetWidth))
    ro.observe(el)
    setWidth(el.offsetWidth)
    return () => ro.disconnect()
  }, [])

  // Deslizar hasta la foto activa
  useEffect(() => {
    const target = -index * width
    if (reduce) {
      x.set(target)
      return
    }
    const controls = animate(x, target, SNAP)
    return () => controls.stop()
  }, [index, width, reduce, x])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info
    const next = offset.x < -width * 0.18 || velocity.x < -500 ? index + 1 : offset.x > width * 0.18 || velocity.x > 500 ? index - 1 : index
    if (next === index || next < 0 || next >= count) animate(x, -index * width, SNAP)
    go(next)
    // El toque que termina un arrastre no debe abrir el detalle
    requestAnimationFrame(() => (dragged.current = false))
  }

  const onPointerMove = (e: PointerEvent) => {
    if (!scrub || count < 2 || e.pointerType !== 'mouse' || e.buttons) return
    const r = e.currentTarget.getBoundingClientRect()
    const zone = Math.min(count - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * count)))
    if (zone !== index) onIndexChange(zone)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(index + 1)
    else if (e.key === 'ArrowLeft') go(index - 1)
    else return
    e.preventDefault()
  }

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="carrusel"
      aria-label={`Fotos de ${label}`}
      onPointerMove={onPointerMove}
      onKeyDown={onKeyDown}
      className={cn('group/carousel relative h-full w-full overflow-hidden select-none', onTap && 'cursor-pointer', className)}
    >
      <motion.div
        className="flex h-full"
        style={{ x, width: `${count * 100}%` }}
        drag={count > 1 ? 'x' : false}
        dragConstraints={{ left: -(count - 1) * width, right: 0 }}
        dragElastic={0.12}
        dragMomentum={false}
        onDragStart={() => (dragged.current = true)}
        onDragEnd={onDragEnd}
        onTap={() => !dragged.current && onTap?.()}
      >
        {photos.map((p, i) => (
          <div key={p.photoId} className="relative h-full shrink-0" style={{ width: `${100 / count}%` }}>
            <img
              src={photo(p.photoId, 1200)}
              srcSet={photoSrcSet(p.photoId, [640, 1000, 1400])}
              sizes={sizes}
              alt={i === index ? p.alt : ''}
              aria-hidden={i !== index}
              loading={eager && i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
              className="pointer-events-none h-full w-full object-cover"
            />
          </div>
        ))}
      </motion.div>

      {count > 1 && (
        <>
          <div
            aria-hidden
            className={cn('pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[rgb(8_14_28/0.4)] to-transparent', reveal)}
          />
          <div className={cn('absolute inset-x-0 bottom-3 flex justify-center gap-1', reveal)}>
            {photos.map((p, i) => (
              <button
                key={p.photoId}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  go(i)
                }}
                onPointerDownCapture={(e) => e.stopPropagation()}
                aria-label={`Foto ${i + 1} de ${count}`}
                aria-current={i === index}
                className="group/dot grid h-6 min-w-4 place-items-center rounded-full px-1 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white"
              >
                {/* Punto; el activo se alarga en píldora */}
                <span
                  className={cn(
                    'block h-1.5 rounded-full shadow-[0_1px_3px_rgb(8_14_28/0.35)] transition-[width,background-color] duration-500 ease-fluid',
                    i === index ? 'w-5 bg-on-photo' : 'w-1.5 bg-white/60 group-hover/dot:bg-white/90',
                  )}
                />
              </button>
            ))}
          </div>
          <span className="sr-only" aria-live="polite">
            Foto {index + 1} de {count}
          </span>
        </>
      )}
    </div>
  )
}
