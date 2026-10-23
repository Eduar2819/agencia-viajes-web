import { useId } from 'react'
import { photo } from '@/shared/lib/images'
import type { Testimonial } from '../data/testimonials'
import './testimonials.css'

/** Postal de regreso: foto del destino al frente y el mensaje del viajero al reverso. */
export function Postcard({ t, active }: { t: Testimonial; active: boolean }) {
  return (
    <article
      aria-hidden={!active}
      className="grid h-full overflow-hidden rounded-[2rem] bg-surface p-2.5 shadow-lifted ring-1 ring-line sm:grid-cols-[0.95fr_1.05fr]"
    >
      <div className="relative h-52 overflow-hidden rounded-[1.5rem] sm:h-auto sm:min-h-[380px]">
        <img
          src={photo(t.tripPhotoId, 900)}
          alt={t.tripAlt}
          loading="lazy"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="relative flex flex-col p-5 sm:p-7">
        {/* Timbre con el retrato del viajero y el matasellos encima */}
        <div className="flex items-start justify-between gap-4">
          <p className="pt-1 text-small text-ink-muted">Postal de {t.trip}</p>
          <div className="relative shrink-0">
            <div className="postage-stamp rotate-3 bg-white p-[7px] shadow-soft">
              <img
                src={photo(t.photoId, 200, 240)}
                alt={t.alt}
                loading="lazy"
                draggable={false}
                className="pointer-events-none h-[4.5rem] w-[3.75rem] object-cover"
              />
            </div>
            <Postmark city={t.sentFrom} />
          </div>
        </div>

        <blockquote className="mt-4 font-display text-[clamp(1.25rem,1rem+0.9vw,1.6rem)] leading-[1.25] font-[460] tracking-[-0.015em] text-pretty text-ink">
          “{t.quote}”
        </blockquote>

        <div className="postcard-lines mt-auto pt-6 text-small leading-[2.25rem]">
          <p className="font-medium text-ink">{t.name}</p>
          <p className="text-ink-muted">Desde {t.city}, de regreso de {t.sentFrom}</p>
        </div>
      </div>
    </article>
  )
}

/** Matasellos circular con la ciudad de envío y líneas de cancelación */
function Postmark({ city }: { city: string }) {
  const id = useId()
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 80"
      className="pointer-events-none absolute -bottom-6 -left-14 w-28 -rotate-12 text-ink-muted/70"
    >
      <defs>
        <path id={id} d="M 40 40 m -27 0 a 27 27 0 1 1 54 0 a 27 27 0 1 1 -54 0" />
      </defs>
      <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
      <text fontSize="8.5" fontWeight="600" letterSpacing="1.5" fill="currentColor">
        <textPath href={`#${id}`} startOffset="2%">
          {`ENVIADO DESDE ${city.toUpperCase()}`}
        </textPath>
      </text>
      <text x="40" y="43" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor">
        2026
      </text>
      {[30, 38, 46, 54].map((y) => (
        <path key={y} d={`M 78 ${y} q 8 -4 16 0 t 16 0`} fill="none" stroke="currentColor" strokeWidth="1.3" />
      ))}
    </svg>
  )
}
