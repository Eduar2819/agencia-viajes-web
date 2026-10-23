import { site } from '@/shared/config/site'

/** Enlace a WhatsApp con un mensaje ya escrito. */
export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}

/** Enlace mailto con asunto y cuerpo prellenados. */
export function mailtoUrl(subject: string, body: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export const defaultWhatsappMessage =
  'Hola SosaCraft, me gustaría cotizar un viaje. ¿Me pueden ayudar?'
