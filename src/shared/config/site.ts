/**
 * Datos de contacto de la agencia.
 * Configúralos en un archivo .env (ver .env.example) antes de publicar.
 */
export const site = {
  name: 'SosaCraft',
  /** Número en formato internacional sin "+" ni espacios, p. ej. 5215512345678 */
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER ?? '5215500000000',
  /** Número legible para mostrar en pantalla */
  whatsappDisplay: import.meta.env.VITE_WHATSAPP_DISPLAY ?? '+52 55 0000 0000',
  email: import.meta.env.VITE_CONTACT_EMAIL ?? 'hola@sosacraft.mx',
  schedule: 'Lunes a sábado, 9:00 a 19:00 (hora del centro de México)',
  social: {
    instagram: 'https://instagram.com/sosacraft',
    facebook: 'https://facebook.com/sosacraft',
    tiktok: 'https://tiktok.com/@sosacraft',
  },
} as const
