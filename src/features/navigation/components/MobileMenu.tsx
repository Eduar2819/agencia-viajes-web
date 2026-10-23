import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EnvelopeSimple, WhatsappLogo } from '@phosphor-icons/react'
import { Button, ease } from '@/shared/design-system'
import { useLenis } from '@/app/providers/SmoothScroll'
import { defaultWhatsappMessage, mailtoUrl, whatsappUrl } from '@/shared/lib/contact-links'
import { navLinks } from '../data/links'

type Props = { open: boolean; onClose: () => void }

export function MobileMenu({ open, onClose }: Props) {
  const lenis = useLenis()

  useEffect(() => {
    if (!open) return
    lenis?.stop()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [open, lenis, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-movil"
          className="fixed inset-0 flex flex-col justify-between bg-bg/85 px-6 pt-28 pb-10 backdrop-blur-3xl lg:hidden"
          style={{ zIndex: 'calc(var(--z-nav) - 1)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.15 } }}
          transition={{ duration: 0.4, ease: ease.fluid }}
        >
          <ul className="flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <li key={link.href} className="overflow-hidden">
                <motion.a
                  href={link.href}
                  onClick={(e) => {
                    // Lenis está pausado con el menú abierto: cerramos y luego navegamos
                    e.preventDefault()
                    onClose()
                    window.setTimeout(() => {
                      if (lenis) lenis.scrollTo(link.href, { offset: -16, force: true })
                      else document.querySelector(link.href)?.scrollIntoView()
                    }, 60)
                  }}
                  className="block py-1 font-display text-[clamp(2.5rem,12vw,4rem)] leading-[1.05] font-[600] tracking-[-0.03em] text-ink [font-stretch:88%]"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%', transition: { duration: 0.3, ease: ease.fluid } }}
                  transition={{ duration: 0.7, ease: ease.out, delay: 0.08 + i * 0.06 }}
                >
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>

          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: ease.out, delay: 0.35 }}
          >
            <Button
              size="lg"
              href={whatsappUrl(defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              icon={<WhatsappLogo size={20} weight="regular" />}
              className="justify-between"
            >
              Cotizar por WhatsApp
            </Button>
            <Button
              size="lg"
              variant="secondary"
              href={mailtoUrl('Quiero cotizar un viaje', '')}
              icon={<EnvelopeSimple size={20} weight="light" />}
              className="justify-between"
            >
              Enviar correo
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
