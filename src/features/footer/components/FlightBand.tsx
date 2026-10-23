import { useRef } from 'react'
import { useScroll, useSpring } from 'motion/react'
import { CloudField } from '@/shared/design-system'
import { useMediaQuery } from '@/shared/hooks/useMediaQuery'
import { bandBackClouds, bandFrontClouds } from '../data/footer'
import { backSkyline, frontSkyline } from '../data/landmarks'
import { Skyline, skylineSize } from './Skyline'

/**
 * Cierre de la página: el cielo vuelve y, al bajar, los monumentos del
 * mundo van saliendo del horizonte entre las nubes.
 * El cielo y las nubes lejanas van en z negativo, debajo de cualquier capa decorativa.
 */
export function FlightBand() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.0005 })
  const front = skylineSize(frontSkyline)
  const wide = useMediaQuery('(min-width: 1024px)')

  return (
    <div ref={ref} className="relative overflow-hidden">
      <div aria-hidden className="sky-up absolute inset-0 -z-10" />
      <CloudField clouds={bandBackClouds} className="inset-0 -z-10" tone="var(--sc-cloud-sky)" />

      <div className="relative pt-[var(--space-section-tight)]">
        <div
          role="img"
          aria-label={`Monumentos del mundo: ${frontSkyline.map((l) => l.name).join(', ')}`}
          className="relative mx-auto min-h-[170px] w-full max-w-[1800px] lg:min-h-0"
          // La proporción del horizonte manda: en escritorio se ve completo, en móvil se recorta a los lados
          style={{ aspectRatio: `${front.width} / ${front.height}` }}
        >
          {/* Fila lejana: tenue, sale primero y más lento */}
          <div aria-hidden className="absolute inset-x-0 top-0 bottom-[8%] opacity-[0.22]">
            <Skyline items={backSkyline} progress={progress} from={0.08} stagger={0.045} span={0.45} gap={34} />
          </div>
          {/* Fila del frente: completa en escritorio con margen lateral, recortada en pantallas angostas */}
          <div aria-hidden className="absolute inset-y-0 inset-x-0 lg:inset-x-[clamp(1rem,3vw,3rem)]">
            <Skyline items={frontSkyline} progress={progress} from={0.22} stagger={0.05} span={0.36} fit={wide ? 'meet' : 'slice'} />
          </div>
        </div>
        {/* Suelo donde se apoyan los monumentos */}
        <div aria-hidden className="h-[clamp(14px,1.6vw,24px)] bg-accent" />
      </div>

      <CloudField clouds={bandFrontClouds} className="inset-x-0 bottom-0 h-[40%]" tone="var(--sc-cloud-front)" />
    </div>
  )
}
