import { useState } from 'react'
import { motion, useReducedMotion, type PanInfo } from 'motion/react'
import { Container, Heading, Lead, Reveal, Section, spring } from '@/shared/design-system'
import { cn } from '@/shared/lib/cn'
import { photo } from '@/shared/lib/images'
import { testimonials } from '../data/testimonials'
import { Postcard } from './Postcard'

/** Inclinación de cada postal según su lugar en la pila: parecen dejadas sobre una mesa */
const tilt = [0, -4, 3.5]

export function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const count = testimonials.length
  const next = () => setActive((a) => (a + 1) % count)

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 110 || Math.abs(info.velocity.x) > 500) next()
  }

  return (
    <Section id="opiniones" aria-labelledby="opiniones-titulo" top="tight" bottom="base">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Reveal>
            <Heading id="opiniones-titulo" className="max-w-[12ch]">
              Lo que cuentan al volver.
            </Heading>
            <Lead className="mt-6">Postales de viajeros que planearon su viaje con nosotros. Desliza la de arriba para leer la siguiente.</Lead>
          </Reveal>

          {/* Remitentes: elige de quién leer la postal */}
          <Reveal delay={0.1} className="mt-10">
            <div role="tablist" aria-label="Elegir postal" className="flex flex-col gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={cn(
                    'relative flex items-center gap-3.5 rounded-full p-1.5 pr-5 text-left transition-colors duration-300 ease-fluid',
                    i === active ? 'text-ink' : 'text-ink-muted hover:text-ink',
                  )}
                >
                  {i === active && (
                    <motion.span
                      layoutId="postcard-sender"
                      transition={spring.layout}
                      className="absolute inset-0 rounded-full bg-surface shadow-soft ring-1 ring-line"
                    />
                  )}
                  <img
                    src={photo(t.photoId, 120, 120)}
                    alt=""
                    className={cn(
                      'relative size-11 rounded-full object-cover ring-2 transition-[filter] duration-500',
                      i === active ? 'ring-accent' : 'ring-transparent grayscale-[60%]',
                    )}
                  />
                  <span className="relative">
                    <span className="block text-small font-medium">{t.name}</span>
                    <span className="block text-small text-ink-muted">{t.trip}</span>
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Pila de postales: todas en la misma celda, la activa arriba */}
        <Reveal delay={0.05} className="lg:col-span-8">
          <div className="grid px-1 pt-4 pb-10 sm:px-6" aria-live="polite">
            {testimonials.map((t, i) => {
              const depth = (i - active + count) % count
              const top = depth === 0
              return (
                <motion.div
                  key={t.name}
                  className={cn('[grid-area:1/1]', top ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none')}
                  style={{ zIndex: count - depth }}
                  initial={false}
                  animate={
                    reduce
                      ? { rotate: 0, y: depth * 14, scale: 1 - depth * 0.04, opacity: depth > 0 ? 0.9 : 1 }
                      : { rotate: tilt[depth] ?? 0, y: depth * 16, x: depth * 10, scale: 1 - depth * 0.045, opacity: 1 }
                  }
                  transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                  drag={top ? 'x' : false}
                  dragSnapToOrigin
                  dragElastic={0.6}
                  onDragEnd={top ? onDragEnd : undefined}
                  whileDrag={{ rotate: 0, scale: 1.02 }}
                >
                  <Postcard t={t} active={top} />
                </motion.div>
              )
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
