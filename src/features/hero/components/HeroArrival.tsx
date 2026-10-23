import { AnimatePresence, motion, type MotionValue } from 'motion/react'
import { Container, ease } from '@/shared/design-system'
import { packages } from '@/features/packages'
import { cn } from '@/shared/lib/cn'
import type { WindowView } from '../data/views'
import { BoardingPass } from './BoardingPass'
import './hero.css'

type Props = {
  views: WindowView[]
  index: number
  onSelect: (index: number) => void
  interval: number
  opacity: MotionValue<number>
  y: MotionValue<number>
  visibility: MotionValue<'visible' | 'hidden'>
}

/**
 * Aterrizaje: cuando la ventanilla ya ocupa la pantalla, el destino
 * toma el protagonismo y aparece el pase de abordar de su paquete.
 */
export function HeroArrival({ views, index, onSelect, interval, opacity, y, visibility }: Props) {
  const view = views[index]
  const pkg = packages.find((p) => p.id === view.packageId)

  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 pb-[clamp(1.25rem,4vh,3.5rem)]"
      style={{ opacity, y, visibility }}
    >
      <Container className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-7">
          <p className="max-w-[32ch] text-body text-pretty text-on-photo/85 sm:text-lead">
            Asómate. Lo demás lo planeamos juntos.
          </p>

          <h2 aria-live="polite" className="mt-2 text-on-photo">
            <span className="sr-only">Destino: </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={view.destination} className="block" exit={{ opacity: 0, transition: { duration: 0.35, ease: ease.fluid } }}>
                <DestinationName text={view.destination} />
              </motion.span>
            </AnimatePresence>
          </h2>

          <DestinationTabs views={views} index={index} onSelect={onSelect} interval={interval} />
        </div>

        {pkg && (
          <div className="lg:col-span-4 lg:col-start-9">
            <BoardingPass view={view} pkg={pkg} />
          </div>
        )}
      </Container>
    </motion.div>
  )
}

/** Las letras suben desde una máscara, una tras otra. */
function DestinationName({ text }: { text: string }) {
  return (
    <span
      aria-label={text}
      className="block font-display text-[clamp(3.25rem,1.2rem+8.5vw,10rem)] leading-[0.9] font-[650] tracking-[-0.045em] [font-stretch:82%]"
    >
      {text.split(' ').map((word, w) => (
        <span key={w} aria-hidden className="mr-[0.2em] inline-block overflow-hidden pb-[0.06em] align-bottom last:mr-0">
          {[...word].map((char, c) => (
            <motion.span
              key={c}
              className="inline-block"
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              exit={{ y: '-105%' }}
              transition={{ duration: 0.75, ease: ease.out, delay: (w * 4 + c) * 0.035 }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  )
}

type TabsProps = Pick<Props, 'views' | 'index' | 'onSelect' | 'interval'>

/** Selector de destinos: cada barra se llena mientras su vista está en pantalla. */
function DestinationTabs({ views, index, onSelect, interval }: TabsProps) {
  return (
    <div role="tablist" aria-label="Elegir destino" className="mt-6 grid grid-cols-5 gap-2 sm:gap-3 lg:max-w-[640px]">
      {views.map((v, i) => {
        const active = i === index
        return (
          <button
            key={v.packageId}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={v.place}
            onClick={() => onSelect(i)}
            className="group flex flex-col gap-2.5 rounded-lg py-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/25">
              {active && (
                <span
                  key={`${index}-fill`}
                  className="destination-fill absolute inset-0 rounded-full bg-on-photo"
                  style={{ ['--dur' as string]: `${interval}ms` }}
                />
              )}
            </span>
            <span
              className={cn(
                'hidden truncate text-small transition-colors duration-300 ease-fluid sm:block',
                active ? 'text-on-photo' : 'text-on-photo/60 group-hover:text-on-photo',
              )}
            >
              {v.destination}
            </span>
          </button>
        )
      })}
    </div>
  )
}
