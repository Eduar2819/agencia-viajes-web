import type { ReactNode } from 'react'
import { ArrowUp, EnvelopeSimple, FacebookLogo, InstagramLogo, TiktokLogo, WhatsappLogo } from '@phosphor-icons/react'
import { Button, Container, Logo } from '@/shared/design-system'
import { site } from '@/shared/config/site'
import { whatsappUrl } from '@/shared/lib/contact-links'
import { catalog } from '@/features/packages'
import { exploreLinks } from '../data/footer'
import { FlightBand } from './FlightBand'

const socials = [
  { href: site.social.instagram, label: 'Instagram', Icon: InstagramLogo },
  { href: site.social.facebook, label: 'Facebook', Icon: FacebookLogo },
  { href: site.social.tiktok, label: 'TikTok', Icon: TiktokLogo },
]

/** Una muestra del catálogo: paquetes, tours y hospedaje */
const featured = ['tulum-bacalar', 'japon-esencial', 'xcaret-plus', 'chichen-itza', 'riviera-maya-todo-incluido']
  .map((id) => catalog.find((p) => p.id === id))
  .filter((p) => p !== undefined)

const linkClass =
  'text-ink-muted transition-colors duration-300 ease-fluid hover:text-ink focus-visible:text-ink'

export function SiteFooter() {
  return (
    <footer className="relative border-t border-line">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-12 pt-[var(--space-section-base)] md:grid-cols-12 md:gap-x-8">
        <div className="col-span-2 md:col-span-4">
          <Logo />
          <p className="mt-6 max-w-[34ch] text-body text-pretty text-ink-muted">
            Agencia de viajes en México. Diseñamos paquetes nacionales e internacionales contigo, de la idea al
            regreso.
          </p>
          <p className="mt-6 max-w-[34ch] text-small text-ink-muted">{site.schedule}</p>
        </div>

        <FooterColumn title="Explora" className="md:col-span-2 md:col-start-6">
          {exploreLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={linkClass}>
                {l.label}
              </a>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Viajes" className="md:col-span-2">
          {featured.map((p) => (
            <li key={p.id}>
              <a href="#paquetes" className={linkClass}>
                {p.name}
              </a>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Contacto" className="col-span-2 md:col-span-3">
          <li>
            <a href={whatsappUrl('Hola SosaCraft')} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
              <WhatsappLogo size={18} weight="light" className="text-accent" />
              {site.whatsappDisplay}
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className={`${linkClass} inline-flex items-center gap-2`}>
              <EnvelopeSimple size={18} weight="light" className="text-accent" />
              {site.email}
            </a>
          </li>
          <li className="pt-2">
            <ul className="flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-full bg-surface text-ink shadow-highlight ring-1 ring-line transition-[transform,background-color] duration-300 ease-fluid hover:-translate-y-0.5 hover:bg-surface-2 active:scale-[0.96]"
                  >
                    <Icon size={18} weight="light" />
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </FooterColumn>
      </Container>

      <Container className="mt-[var(--space-section-tight)]">
        <div className="flex flex-col gap-5 border-t border-line pt-6 pb-[var(--space-section-tight)] text-small text-ink-muted md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1 md:flex-row md:gap-6">
            <p>© {new Date().getFullYear()} SosaCraft. Todos los derechos reservados.</p>
            <p>Precios de referencia, sujetos a disponibilidad.</p>
            <p>
              Siluetas:{' '}
              <a href="https://game-icons.net" target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-ink hover:underline">
                game-icons.net
              </a>{' '}
              (CC BY 3.0) y Wikimedia Commons.
            </p>
          </div>
          <Button href="#inicio" variant="secondary" icon={<ArrowUp size={16} weight="light" />} className="self-start md:self-auto">
            Volver arriba
          </Button>
        </div>
      </Container>

      <FlightBand />
    </footer>
  )
}

function FooterColumn({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <nav aria-label={title} className={className}>
      <h2 className="text-small font-semibold text-ink">{title}</h2>
      <ul className="mt-4 grid gap-3 text-small">{children}</ul>
    </nav>
  )
}
