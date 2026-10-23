import { MotionConfig } from 'motion/react'
import { SmoothScroll } from './providers/SmoothScroll'
import { SiteNav } from '@/features/navigation'
import { Hero } from '@/features/hero'
import { PackagesSection } from '@/features/packages'
import { ProcessSection } from '@/features/process'
import { DestinationsMarquee } from '@/features/destinations'
import { TestimonialsSection } from '@/features/testimonials'
import { FaqSection } from '@/features/faq'
import { ContactSection, WhatsappFab } from '@/features/contact'
import { SiteFooter } from '@/features/footer'
import { FlightPath } from '@/features/flight-path'

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <a
          href="#paquetes"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-accent-ink"
          style={{ zIndex: 'var(--z-dialog)' }}
        >
          Saltar al contenido
        </a>
        {/* Primero en el DOM: queda debajo de todas las secciones */}
        <FlightPath />
        <SiteNav />
        <main>
          <Hero />
          <PackagesSection />
          <ProcessSection />
          <DestinationsMarquee />
          <TestimonialsSection />
          <FaqSection />
          <ContactSection />
        </main>
        <SiteFooter />
        <WhatsappFab />
        <div className="grain" aria-hidden />
      </SmoothScroll>
    </MotionConfig>
  )
}
