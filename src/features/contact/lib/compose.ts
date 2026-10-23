export type InquiryValues = {
  name: string
  destination: string
  dates: string
  travelers: string
  message: string
}

export type InquiryErrors = Partial<Record<keyof InquiryValues, string>>

export const emptyInquiry: InquiryValues = { name: '', destination: '', dates: '', travelers: '2', message: '' }

export function validateInquiry(v: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {}
  if (!v.name.trim()) errors.name = 'Escribe tu nombre para saber cómo dirigirnos a ti.'
  if (!v.destination) errors.destination = 'Elige un paquete o la opción “Aún no lo decido”.'
  const n = Number(v.travelers)
  if (!Number.isInteger(n) || n < 1 || n > 30) errors.travelers = 'Indica entre 1 y 30 viajeros.'
  return errors
}

/** Texto del mensaje, igual para WhatsApp y correo. */
export function composeInquiry(v: InquiryValues) {
  const lines = [
    `Hola SosaCraft, soy ${v.name.trim()}.`,
    `Me interesa: ${v.destination}.`,
    v.dates.trim() && `Fechas aproximadas: ${v.dates.trim()}.`,
    `Viajeros: ${v.travelers}.`,
    v.message.trim() && `\n${v.message.trim()}`,
  ]
  return lines.filter(Boolean).join('\n')
}
