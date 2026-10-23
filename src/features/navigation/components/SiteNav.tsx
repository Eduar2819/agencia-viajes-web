import { useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { Button, Logo, ThemeToggle, ease } from '@/shared/design-system'
import { defaultWhatsappMessage, whatsappUrl } from '@/shared/lib/contact-links'
import { navLinks } from '../data/links'
import { MobileMenu } from './MobileMenu'

export function SiteNav() {
  const { scrollY } = useScroll()
  const reduce = useReducedMotion()
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  // Se esconde al bajar y regresa al subir: deja ver el contenido sin perder el acceso.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    const next = y > prev && y > 240 && !open
    if (next !== hidden) setHidden(next)
  })

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 flex justify-center px-3 pt-3 sm:pt-4"
        style={{ zIndex: 'var(--z-nav)' }}
        initial={reduce ? false : { y: -90, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: ease.fluid, delay: hidden ? 0 : 0.1 }}
      >
        <nav
          aria-label="Principal"
          className="flex h-16 w-full max-w-[1100px] items-center justify-between gap-4 rounded-full bg-surface/75 py-2 pr-2 pl-5 shadow-soft ring-1 ring-line backdrop-blur-xl"
        >
          <a href="#inicio" aria-label="SosaCraft, ir al inicio" className="rounded-full">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-small font-medium text-ink-muted transition-colors duration-300 ease-fluid hover:bg-ink/5 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden md:block">
              <Button
                href={whatsappUrl(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                icon={<WhatsappLogo size={18} weight="regular" />}
              >
                Cotizar por WhatsApp
              </Button>
            </div>
            <MenuButton open={open} onToggle={() => setOpen((v) => !v)} />
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}

function MenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="menu-movil"
      aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
      className="relative grid size-12 place-items-center rounded-full bg-ink text-bg transition-transform duration-300 ease-fluid active:scale-[0.96] lg:hidden"
    >
      <span
        className={`absolute h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-fluid ${
          open ? 'rotate-45' : '-translate-y-[4px]'
        }`}
      />
      <span
        className={`absolute h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-fluid ${
          open ? '-rotate-45' : 'translate-y-[4px]'
        }`}
      />
    </button>
  )
}
