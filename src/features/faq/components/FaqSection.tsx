import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from '@phosphor-icons/react'
import { Container, Heading, Reveal, Section, ease } from '@/shared/design-system'
import { cn } from '@/shared/lib/cn'
import { faqs } from '../data/faqs'

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id="preguntas" aria-labelledby="preguntas-titulo" top="none" bottom="tight">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-4">
          <Heading id="preguntas-titulo" className="max-w-[12ch]">
            Antes de hacer maleta.
          </Heading>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <div className="rounded-shell bg-ink/[0.035] p-2 ring-1 ring-line">
            <ul className="overflow-hidden rounded-core bg-surface shadow-highlight">
              {faqs.map((item, i) => (
                <FaqItem
                  key={item.q}
                  q={item.q}
                  a={item.a}
                  first={i === 0}
                  open={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

type ItemProps = { q: string; a: string; open: boolean; first: boolean; onToggle: () => void }

function FaqItem({ q, a, open, first, onToggle }: ItemProps) {
  const id = useId()
  return (
    <li className={cn(!first && 'border-t border-line')}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left text-body font-medium text-ink transition-colors duration-300 ease-fluid hover:bg-ink/[0.025] sm:px-8"
        >
          {q}
          <span
            aria-hidden
            className={cn(
              'grid size-9 shrink-0 place-items-center rounded-full ring-1 ring-line transition-[transform,background-color,color] duration-500 ease-fluid',
              open && 'rotate-45 bg-accent text-accent-ink ring-accent',
            )}
          >
            <Plus size={16} weight="light" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: ease.fluid }}
            className="overflow-hidden"
          >
            <p className="max-w-[60ch] px-6 pb-7 text-body text-ink-muted sm:px-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}
