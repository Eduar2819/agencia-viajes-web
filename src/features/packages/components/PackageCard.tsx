import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { cn } from '@/shared/lib/cn'
import type { TravelPackage } from '../data/packages'
import { photosOf } from '../data/galleries'
import { formatDuration, formatPrice } from '../lib/format'
import { PhotoCarousel } from './PhotoCarousel'

type Props = {
  pkg: TravelPackage
  wide: boolean
  /** Abre el detalle en la foto que se está viendo */
  onOpen: (pkg: TravelPackage, photoIndex: number) => void
}

export function PackageCard({ pkg, wide, onOpen }: Props) {
  const [index, setIndex] = useState(0)
  const photos = photosOf(pkg)
  const open = () => onOpen(pkg, index)

  return (
    <article className="group h-full rounded-shell bg-ink/[0.035] p-2 ring-1 ring-line transition-shadow duration-700 ease-fluid hover:shadow-lifted">
      <div className="flex h-full flex-col overflow-hidden rounded-core bg-surface shadow-highlight">
        <motion.div
          layoutId={`pkg-media-${pkg.id}`}
          className="relative h-[280px] overflow-hidden rounded-core sm:h-[340px] lg:h-[420px]"
        >
          <PhotoCarousel
            photos={photos}
            index={index}
            onIndexChange={setIndex}
            onTap={open}
            label={pkg.name}
            scrub
            indicators="hover"
            sizes={wide ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 42vw, 100vw'}
          />
        </motion.div>

        {/* Toda esta zona abre el detalle: el botón se estira sobre ella */}
        <div className="relative flex flex-1 items-end justify-between gap-6 p-5 sm:p-7">
          <div>
            <h3 className="font-display text-h3 font-[600] text-ink">{pkg.name}</h3>
            <p className="mt-1.5 text-small text-ink-muted">
              {pkg.place}. {formatDuration(pkg)}
            </p>
            <p className="mt-5 text-small text-ink-muted">
              Desde{' '}
              <span className="font-display text-[1.625rem] font-[600] tracking-[-0.02em] text-ink tabular-nums">
                {formatPrice(pkg.priceFrom)}
              </span>
              <span className="block sm:inline"> por persona</span>
            </p>
          </div>
          <button
            type="button"
            onClick={open}
            aria-haspopup="dialog"
            aria-label={`Ver detalle de ${pkg.name}`}
            className={cn(
              'grid size-12 shrink-0 place-items-center rounded-full bg-accent-soft text-accent',
              'transition-transform duration-500 ease-fluid group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105 active:scale-95',
              'after:absolute after:inset-0 after:content-[""]',
            )}
          >
            <ArrowUpRight size={20} weight="light" />
          </button>
        </div>
      </div>
    </article>
  )
}
