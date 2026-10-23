import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Container, Heading, Lead, Reveal, Section } from '@/shared/design-system'
import { photo } from '@/shared/lib/images'
import { steps, type ProcessStep } from '../data/steps'

export function ProcessSection() {
  const listRef = useRef<HTMLOListElement>(null)
  // Se mide sobre la lista (no sticky) para que el progreso sea estable
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start start', 'end end'] })

  return (
    <Section id="como-viajamos" aria-labelledby="como-viajamos-titulo" top="tight" bottom="none">
      <Container className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Encabezado fijo a la izquierda mientras la pila avanza */}
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-32">
            <Heading id="como-viajamos-titulo">Así planeamos contigo.</Heading>
            <Lead className="mt-6">
              Tres pasos, una sola persona de contacto de principio a fin. Tú decides cuánto quieres involucrarte.
            </Lead>
          </Reveal>
        </div>

        <ol ref={listRef} className="mt-10 lg:col-span-8 lg:mt-0">
          {steps.map((step, i) => (
            <StackCard key={step.title} step={step} index={i} total={steps.length} progress={scrollYProgress} />
          ))}
        </ol>
      </Container>
    </Section>
  )
}

type CardProps = { step: ProcessStep; index: number; total: number; progress: MotionValue<number> }

/**
 * Pila fija: cada tarjeta se queda arriba y se hace pequeña
 * conforme la siguiente sube a cubrirla.
 */
function StackCard({ step, index, total, progress }: CardProps) {
  const reduce = useReducedMotion()
  const isLast = index === total - 1
  // Tramo del scroll en el que la siguiente tarjeta sube a cubrir esta
  const start = index / total
  const end = (index + 1) / total
  const scale = useTransform(progress, [start, end], [1, isLast ? 1 : 0.92])
  const dim = useTransform(progress, [start, end], [0, isLast ? 0 : 0.5])

  return (
    <li className="sticky pb-6 lg:pb-10" style={{ top: `calc(6.5rem + ${index * 1.25}rem)` }}>
      <motion.article
        style={reduce ? undefined : { scale }}
        className="relative origin-top overflow-hidden rounded-[2.5rem] bg-surface p-2.5 shadow-soft ring-1 ring-line"
      >
        <div className="relative grid gap-2.5 sm:grid-cols-[0.8fr_1.2fr]">
          {/* Radio concéntrico: 2.5rem de la tarjeta menos su margen de 0.625rem */}
          <div className="relative h-[230px] overflow-hidden rounded-[1.875rem] sm:h-auto sm:min-h-[380px]">
            <img
              src={photo(step.photoId, 900)}
              alt={step.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center gap-6 px-4 pt-4 pb-5 sm:px-8 sm:py-10">
            <div>
              <span
                aria-hidden
                className="grid size-12 place-items-center rounded-full bg-accent-soft font-display text-[1.375rem] font-[600] text-accent tabular-nums"
              >
                {index + 1}
              </span>
              <h3 className="mt-5 font-display text-[clamp(1.6rem,1.2rem+1.2vw,2.25rem)] leading-[1.1] font-[600] tracking-[-0.02em] text-ink">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[40ch] text-body text-pretty text-ink-muted">{step.body}</p>
            </div>
            <ul className="flex flex-wrap gap-2" aria-label={`Incluye: ${step.tags.join(', ')}`}>
              {step.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-accent-soft px-3.5 py-1.5 text-small font-medium text-accent">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {!reduce && (
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-bg" style={{ opacity: dim }} />
        )}
      </motion.article>
    </li>
  )
}
