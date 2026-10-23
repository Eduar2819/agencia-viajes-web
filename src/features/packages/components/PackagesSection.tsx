import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { Chip, Container, Heading, Lead, Reveal, Section, spring } from '@/shared/design-system'
import { cn } from '@/shared/lib/cn'
import { catalog, kindFilters, type TravelPackage, type TripKind } from '../data/packages'
import { PackageCard } from './PackageCard'
import { PackageDialog } from './PackageDialog'
import { onOpenPackage } from '../lib/events'

/** Ritmo asimétrico 7/5, 5/7. Si queda un paquete suelto, ocupa todo el ancho. */
const spanPattern = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']

export function PackagesSection() {
  const [filter, setFilter] = useState<TripKind>('paquete')
  const [selected, setSelected] = useState<TravelPackage | null>(null)
  // Si se abre desde otra sección (el hero), la foto no viaja desde la tarjeta
  const [fromCard, setFromCard] = useState(true)
  const close = useCallback(() => setSelected(null), [])
  // Foto en la que se abre el carrusel del detalle
  const [startPhoto, setStartPhoto] = useState(0)
  const openFromCard = useCallback((pkg: TravelPackage, photoIndex: number) => {
    setFromCard(true)
    setStartPhoto(photoIndex)
    setSelected(pkg)
  }, [])

  useEffect(
    () =>
      onOpenPackage((id) => {
        const pkg = catalog.find((p) => p.id === id)
        if (!pkg) return
        setFromCard(false)
        setStartPhoto(0)
        setSelected(pkg)
      }),
    [],
  )

  const visible = useMemo(
    () => catalog.filter((p) => p.kind === filter),
    [filter],
  )

  return (
    <Section id="paquetes" aria-labelledby="paquetes-titulo" top="loose" bottom="tight">
      <Container>
        <Reveal className="max-w-[760px]">
          <Heading id="paquetes-titulo">Paquetes, tours y hospedaje, ajustables a tus fechas.</Heading>
          <Lead className="mt-6">
            Viajes completos con vuelo, tours de un día como Xcaret o Chichén Itzá y estancias en la Riviera
            Maya. Elige y lo adaptamos a tu ritmo y presupuesto.
          </Lead>
        </Reveal>

        <LayoutGroup id="packages">
          <Reveal delay={0.1} className="mt-10">
            <div
              role="group"
              aria-label="Tipo de viaje"
              className="inline-flex gap-1 rounded-full bg-ink/[0.04] p-1 ring-1 ring-line"
            >
              {kindFilters.map((f) => (
                <Chip key={f.value} group="kind" active={filter === f.value} onClick={() => setFilter(f.value)}>
                  {f.label}
                </Chip>
              ))}
            </div>
          </Reveal>

          <motion.ul layout className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((pkg, i) => {
                const lonely = visible.length % 2 === 1 && i === visible.length - 1
                const span = lonely ? 'lg:col-span-12' : spanPattern[i % spanPattern.length]
                return (
                  <motion.li
                    key={pkg.id}
                    layout
                    className={cn('min-w-0', span)}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={spring.layout}
                  >
                    <Reveal className="h-full" delay={(i % 2) * 0.08}>
                      <PackageCard pkg={pkg} wide={span !== 'lg:col-span-5'} onOpen={openFromCard} />
                    </Reveal>
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>

        <p className="mt-8 max-w-[65ch] text-small text-ink-muted">
          ¿No ves tu destino? También armamos viajes desde cero: escríbenos y lo cotizamos.
        </p>
      </Container>

      <PackageDialog pkg={selected} onClose={close} shared={fromCard} startPhoto={startPhoto} />
    </Section>
  )
}
