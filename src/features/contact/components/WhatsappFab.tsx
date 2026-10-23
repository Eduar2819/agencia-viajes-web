import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { spring } from '@/shared/design-system'
import { defaultWhatsappMessage, whatsappUrl } from '@/shared/lib/contact-links'

/** Acceso directo a WhatsApp que aparece cuando el hero ya quedó atrás. */
export function WhatsappFab() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    // Visible pasado el hero; se retira al aterrizar en el footer, que ya muestra el contacto
    const nearEnd = y > document.documentElement.scrollHeight - window.innerHeight * 1.6
    const next = y > window.innerHeight * 2.4 && !nearEnd
    if (next !== visible) setVisible(next)
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappUrl(defaultWhatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Cotizar por WhatsApp"
          className="fixed right-4 bottom-4 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-soft hover:bg-whatsapp-hover sm:right-6 sm:bottom-6"
          style={{ zIndex: 'var(--z-fab)' }}
          initial={{ scale: 0.4, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.4, opacity: 0, y: 20 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={spring.press}
        >
          {/* Logo clásico: globo con teléfono en trazo blanco */}
          <WhatsappLogo weight="regular" className="size-[52%]" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
