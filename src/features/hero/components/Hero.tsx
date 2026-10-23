import { useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, WhatsappLogo } from '@phosphor-icons/react'
import { Button, CloudField, Container, Heading, ease } from '@/shared/design-system'
import { defaultWhatsappMessage, whatsappUrl } from '@/shared/lib/contact-links'
import { foregroundClouds, skyClouds, windowClouds } from '../data/clouds'
import { windowViews } from '../data/views'
import { useInsetRect } from '../hooks/useInsetRect'
import { useRotatingIndex } from '../hooks/useRotatingIndex'
import { HeroArrival } from './HeroArrival'
import { WindowFrame } from './WindowFrame'
import { WindowPhotos } from './WindowPhotos'

const headline = ['Viajes', 'hechos', 'a', 'mano.']

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** Tramo del scroll (0 a 1) en el que la ventanilla crece a pantalla completa */
const EXPAND_END = 0.6
/** Tiempo que cada destino se queda en la ventanilla */
const VIEW_INTERVAL = 6000

export function Hero() {
  const reduce = useReducedMotion() ?? false
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const slotRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const rect = useInsetRect(stageRef, slotRef)
  const [index, selectView] = useRotatingIndex(windowViews.length, VIEW_INTERVAL, reduce)

  // La ventanilla se abre: el recorte pasa del hueco de la ventana a toda la pantalla.
  const clipPath = useTransform(() => {
    const r = rect.get()
    if (!r.ready) return 'inset(50% 50% 50% 50% round 0px)'
    const k = 1 - easeInOutCubic(clamp01(scrollYProgress.get() / EXPAND_END))
    return `inset(${r.top * k}px ${r.right * k}px ${r.bottom * k}px ${r.left * k}px round ${r.radius * k}px)`
  })
  // Mientras es ventanilla, el centro de la foto se alinea con el centro de la ventana.
  const photoX = useTransform(() => {
    const r = rect.get()
    const k = 1 - easeInOutCubic(clamp01(scrollYProgress.get() / EXPAND_END))
    return ((r.left - r.right) / 2) * k
  })
  const photoY = useTransform(() => {
    const r = rect.get()
    const k = 1 - easeInOutCubic(clamp01(scrollYProgress.get() / EXPAND_END))
    return ((r.top - r.bottom) / 2) * k
  })
  const radius = useTransform(() => rect.get().radius)
  const photoScale = useTransform(scrollYProgress, [0, EXPAND_END], [1.16, 1])
  const frameOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])

  const introOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0])
  const introY = useTransform(scrollYProgress, [0, 0.32], [0, -90])
  const introVisibility = useTransform(scrollYProgress, (v) => (v < 0.34 ? 'visible' : 'hidden'))

  // Nubes. La caja de la ventanilla ancla las nubes interiores y la de primer plano.
  const winLeft = useTransform(() => rect.get().left)
  const winTop = useTransform(() => rect.get().top)
  const winWidth = useTransform(() => rect.get().width)
  const winHeight = useTransform(() => rect.get().height)
  // Cielo: sube despacio, como si el avión ganara altura
  const skyY = useTransform(scrollYProgress, [0, EXPAND_END], [0, -140])
  // Interior: al abrirse la ventana atravesamos la capa de nubes hacia su centro
  const throughScale = useTransform(scrollYProgress, [0, 0.45], [1, 2.8])
  const throughOpacity = useTransform(scrollYProgress, [0.04, 0.4], [1, 0])
  // Primer plano: su carril es la ventanilla, ensanchada a los lados
  const frontLeft = useTransform(() => rect.get().left - rect.get().width * 0.5)
  const frontWidth = useTransform(() => rect.get().width * 2)
  // Al hacer scroll la nube pasa junto a la cámara y se va
  const frontScale = useTransform(scrollYProgress, [0, 0.32], [1, 2.4])
  const frontX = useTransform(scrollYProgress, [0, 0.32], [0, 260])
  const frontY = useTransform(scrollYProgress, [0, 0.32], [0, 160])
  const frontOpacity = useTransform(scrollYProgress, [0.02, 0.28], [1, 0])

  const scrimOpacity = useTransform(scrollYProgress, [0.4, 0.75], [0, 1])
  const outroOpacity = useTransform(scrollYProgress, [0.62, 0.82], [0, 1])
  const outroY = useTransform(scrollYProgress, [0.62, 0.82], [60, 0])
  const outroVisibility = useTransform(scrollYProgress, (v) => (v > 0.6 ? 'visible' : 'hidden'))

  return (
    <section
      id="inicio"
      ref={sectionRef}
      aria-label="Bienvenida"
      className={reduce ? 'relative' : 'relative h-[260vh]'}
    >
      <div ref={stageRef} className="sky-down sticky top-0 h-[100dvh] min-h-[560px] overflow-hidden">
        {/* Capa 0: el cielo con nubes lejanas */}
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: ease.out, delay: 0.1 }}
        >
          <CloudField
            clouds={skyClouds}
            className="inset-x-0 -top-[6%] bottom-0"
            style={{ y: skyY }}
            tone="var(--sc-cloud-sky)"
          />
        </motion.div>

        {/* Capa 1: la vista, recortada por la ventanilla */}
        <motion.div
          className="absolute inset-0"
          style={{ clipPath, WebkitClipPath: clipPath }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: ease.out, delay: 0.45 }}
        >
          <WindowPhotos views={windowViews} index={index} scale={photoScale} x={photoX} y={photoY} />
          {/* Nubes que pasan frente al destino, visibles solo a través de la ventanilla */}
          <CloudField
            clouds={windowClouds}
            style={{
              left: winLeft,
              top: winTop,
              width: winWidth,
              height: winHeight,
              scale: throughScale,
              opacity: throughOpacity,
            }}
          />
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(to_top,rgb(8_14_28/0.85)_0%,rgb(8_14_28/0.45)_38%,transparent_70%),radial-gradient(ellipse_at_0%_100%,rgb(8_14_28/0.5),transparent_60%)]"
            style={{ opacity: scrimOpacity }}
          />
        </motion.div>

        {/* Capa 2: texto de bienvenida y hueco de la ventanilla */}
        <Container className="relative flex h-full flex-col gap-6 pt-24 pb-6 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-20 lg:pb-0">
          <motion.div
            style={{ opacity: introOpacity, y: introY, visibility: introVisibility }}
            className="order-2 lg:order-1 lg:col-span-7"
          >
            <Heading as="h1" size="display" className="max-w-[11ch]">
              {headline.map((word, i) => (
                <span key={word}>
                  <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={reduce ? false : { y: '105%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1.1, ease: ease.out, delay: 0.2 + i * 0.08 }}
                    >
                      {word}
                    </motion.span>
                  </span>
                  {i < headline.length - 1 && ' '}
                </span>
              ))}
            </Heading>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: ease.out, delay: 0.7 }}
            >
              <p className="mt-6 max-w-[42ch] text-body text-pretty text-ink-muted sm:text-lead lg:mt-8">
                Diseñamos tu itinerario contigo, de la primera idea al despegue. Tú eliges el destino; nosotros
                cuidamos cada detalle.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 lg:mt-10">
                <Button href="#paquetes" size="lg" icon={<ArrowDown size={18} weight="light" />}>
                  Ver paquetes
                </Button>
                <Button
                  href={whatsappUrl(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  variant="whatsapp"
                  icon={<WhatsappLogo size={18} weight="regular" />}
                >
                  Cotizar por WhatsApp
                </Button>
              </div>
            </motion.div>
          </motion.div>

          <div className="order-1 flex min-h-0 flex-1 flex-col lg:order-2 lg:col-span-4 lg:col-start-9 lg:h-[72dvh] lg:flex-none">
            <motion.div
              ref={slotRef}
              className="relative min-h-[200px] flex-1"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: ease.out, delay: 0.45 }}
            >
              <WindowFrame radius={radius} opacity={frameOpacity} />
            </motion.div>
            <motion.p
              className="mt-6 hidden h-6 items-center gap-2 text-small text-ink-muted lg:flex"
              style={{ opacity: frameOpacity }}
              aria-live="polite"
            >
              <span>Desde tu ventanilla:</span>
              <span className="relative inline-block overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={windowViews[index].place}
                    className="inline-block font-medium text-ink"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.5, ease: ease.fluid }}
                  >
                    {windowViews[index].place}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.p>
          </div>
        </Container>

        {/* Capa 3: nube en primer plano que cruza por delante del marco */}
        <motion.div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          initial={reduce ? false : { opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2.2, ease: ease.out, delay: 1.5 }}
        >
          <CloudField
            clouds={foregroundClouds}
            tone="var(--sc-cloud-front)"
            style={{
              left: frontLeft,
              top: winTop,
              width: frontWidth,
              height: winHeight,
              scale: frontScale,
              x: frontX,
              y: frontY,
              opacity: frontOpacity,
            }}
          />
        </motion.div>

        {/* Capa 4: aterrizaje, cuando la ventanilla ya ocupa toda la pantalla */}
        {!reduce && (
          <HeroArrival
            views={windowViews}
            index={index}
            onSelect={selectView}
            interval={VIEW_INTERVAL}
            opacity={outroOpacity}
            y={outroY}
            visibility={outroVisibility}
          />
        )}
      </div>
    </section>
  )
}
