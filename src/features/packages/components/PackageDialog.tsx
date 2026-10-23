import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, EnvelopeSimple, WhatsappLogo, X } from '@phosphor-icons/react'
import { Button, ease } from '@/shared/design-system'
import { useLenis } from '@/app/providers/SmoothScroll'
import { mailtoUrl, whatsappUrl } from '@/shared/lib/contact-links'
import type { TravelPackage } from '../data/packages'
import { photosOf } from '../data/galleries'
import { PhotoCarousel } from './PhotoCarousel'
import { formatDuration, formatPrice, packageEmail, packageWhatsappMessage, planLabel, priceNote } from '../lib/format'

type Props = {
  pkg: TravelPackage | null
  onClose: () => void
  /** La foto se expande desde la tarjeta (layoutId) */
  shared?: boolean
  /** Foto en la que abre el carrusel (la que se veía en la tarjeta) */
  startPhoto?: number
}

export function PackageDialog({ pkg, onClose, shared = true, startPhoto = 0 }: Props) {
  const lenis = useLenis()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!pkg) return
    const previous = document.activeElement as HTMLElement | null
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      previous?.focus({ preventScroll: true })
    }
  }, [pkg, lenis, onClose])

  return (
    <AnimatePresence>
      {pkg && (
        <div
          className="fixed inset-0 flex items-end justify-center p-0 sm:items-center sm:p-6"
          style={{ zIndex: 'var(--z-dialog)' }}
        >
          <motion.div
            className="absolute inset-0 bg-scrim backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: ease.fluid }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`dialog-${pkg.id}`}
            className="relative grid max-h-[92dvh] w-full max-w-[1080px] overflow-hidden rounded-t-shell bg-surface shadow-lifted ring-1 ring-line sm:rounded-shell md:grid-cols-[1fr_1.05fr]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30, transition: { duration: 0.3, ease: ease.fluid } }}
            transition={{ duration: 0.6, ease: ease.out }}
          >
            <motion.div
              layoutId={shared ? `pkg-media-${pkg.id}` : undefined}
              className="relative h-[220px] overflow-hidden md:h-auto md:min-h-[560px]"
            >
              <DialogGallery key={pkg.id} pkg={pkg} start={startPhoto} />
            </motion.div>

            <div data-lenis-prevent className="overflow-y-auto overscroll-contain p-6 sm:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 id={`dialog-${pkg.id}`} className="font-display text-h2 font-[620] text-ink [font-stretch:90%]">
                    {pkg.name}
                  </h2>
                  <p className="mt-2 text-small text-ink-muted">
                    {pkg.place}. {formatDuration(pkg)}
                  </p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar detalle del paquete"
                  className="grid size-11 shrink-0 place-items-center rounded-full text-ink ring-1 ring-line transition-colors duration-300 ease-fluid hover:bg-ink/5 active:scale-[0.96]"
                >
                  <X size={18} weight="light" />
                </button>
              </div>

              <p className="mt-6 max-w-[52ch] text-body text-ink-muted">{pkg.summary}</p>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="text-small font-semibold text-ink">Qué incluye</h3>
                  <ul className="mt-3 space-y-2.5">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex gap-2.5 text-small text-ink-muted">
                        <Check size={16} weight="regular" className="mt-0.5 shrink-0 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-small font-semibold text-ink">{planLabel[pkg.kind]}</h3>
                  <ol className="mt-3 space-y-2.5">
                    {pkg.itinerary.map((step) => (
                      <li key={step.day} className="text-small">
                        <span className="block font-medium text-ink">{step.day}</span>
                        <span className="text-ink-muted">{step.title}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-5 rounded-core bg-surface-2/60 p-5 sm:p-6">
                <p className="text-small text-ink-muted">
                  Desde{' '}
                  <span className="font-display text-[2rem] font-[600] tracking-[-0.02em] text-ink tabular-nums">
                    {formatPrice(pkg.priceFrom)}
                  </span>{' '}
                  {priceNote[pkg.kind]}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    href={whatsappUrl(packageWhatsappMessage(pkg))}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="whatsapp"
                    icon={<WhatsappLogo size={18} weight="regular" />}
                  >
                    Cotizar por WhatsApp
                  </Button>
                  <Button
                    variant="secondary"
                    href={mailtoUrl(packageEmail(pkg).subject, packageEmail(pkg).body)}
                    icon={<EnvelopeSimple size={18} weight="light" />}
                  >
                    Enviar correo
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

/** Carrusel del detalle: arranca en la foto de la tarjeta y responde a las flechas del teclado. */
function DialogGallery({ pkg, start }: { pkg: TravelPackage; start: number }) {
  const photos = photosOf(pkg)
  const [index, setIndex] = useState(() => Math.min(start, photos.length - 1))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(photos.length - 1, i + 1))
      else if (e.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [photos.length])

  return (
    <div className="absolute inset-0">
      <PhotoCarousel photos={photos} index={index} onIndexChange={setIndex} label={pkg.name} sizes="(min-width: 768px) 50vw, 100vw" eager />
    </div>
  )
}
