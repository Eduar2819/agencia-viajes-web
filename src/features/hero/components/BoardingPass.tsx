import { AnimatePresence, motion } from 'motion/react'
import { AirplaneTilt, ArrowUpRight } from '@phosphor-icons/react'
import { Button, LogoMark, ease } from '@/shared/design-system'
import { formatPrice, openPackage, type TravelPackage } from '@/features/packages'
import type { WindowView } from '../data/views'
import './hero.css'

type Props = { view: WindowView; pkg: TravelPackage }

/** Pase de abordar de cristal con el paquete que lleva al destino en pantalla. */
export function BoardingPass({ view, pkg }: Props) {
  return (
    <div className="boarding-pass rounded-[1.75rem] bg-[rgb(10_17_32/0.42)] p-1.5 text-on-photo ring-1 ring-white/20 backdrop-blur-xl">
      <div className="rounded-[calc(1.75rem-0.375rem)] shadow-[inset_0_1px_0_rgb(255_255_255/0.18)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: ease.out }}
          >
            {/* Ruta del vuelo */}
            <div className="px-5 pt-5 pb-6 sm:px-6">
              <div className="flex items-center justify-between text-small text-on-photo/70">
                <span className="inline-flex items-center gap-2">
                  <LogoMark className="size-5" />
                  Pase de abordar
                </span>
                <span>{pkg.days} días</span>
              </div>
              <div className="mt-4 flex items-end justify-between gap-3">
                <Airport code="MEX" city="CDMX" />
                <span aria-hidden className="mb-3 flex flex-1 items-center gap-2 text-on-photo/60">
                  <span className="h-px flex-1 border-t border-dashed border-white/35" />
                  <AirplaneTilt size={18} weight="fill" className="rotate-45" />
                  <span className="h-px flex-1 border-t border-dashed border-white/35" />
                </span>
                <Airport code={view.arrival} city={view.arrivalCity} alignEnd />
              </div>
            </div>

            {/* Perforación */}
            <div aria-hidden className="mx-5 border-t-2 border-dotted border-white/25" />

            {/* Paquete y precio */}
            <div className="flex flex-col gap-5 px-5 pt-5 pb-5 sm:px-6 sm:pb-6">
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-small text-on-photo/70">Paquete</p>
                  <p className="truncate text-body font-medium">{pkg.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-small text-on-photo/70">Desde</p>
                  <p className="font-display text-[1.5rem] leading-tight font-[600] tracking-[-0.02em] whitespace-nowrap tabular-nums">
                    {formatPrice(pkg.priceFrom)}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                onClick={() => openPackage(pkg.id)}
                icon={<ArrowUpRight size={18} weight="light" />}
                className="w-full justify-between"
              >
                Ver paquete
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function Airport({ code, city, alignEnd }: { code: string; city: string; alignEnd?: boolean }) {
  return (
    <div className={alignEnd ? 'text-right' : undefined}>
      <p className="font-display text-[2.25rem] leading-none font-[620] tracking-[-0.03em] [font-stretch:85%]">{code}</p>
      <p className="mt-1.5 text-small text-on-photo/70">{city}</p>
    </div>
  )
}
