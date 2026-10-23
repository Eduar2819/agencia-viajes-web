import type { TravelPackage, TripKind } from '../data/packages'

const mxn = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })

export const formatPrice = (value: number) => `${mxn.format(value)} MXN`

export const formatDuration = (p: TravelPackage) => {
  if (p.kind === 'tour') return p.days === 1 ? 'Tour de un día' : `${p.days} días`
  if (p.kind === 'hospedaje') return `${p.nights} noches`
  return `${p.days} días, ${p.nights} noches`
}

/** Cómo se lee cada tipo en textos: "el paquete", "el tour", "el hospedaje" */
const noun: Record<TripKind, string> = { paquete: 'el paquete', tour: 'el tour', hospedaje: 'el hospedaje' }

/** Aclaración del precio según el tipo de viaje */
export const priceNote: Record<TripKind, string> = {
  paquete: 'por persona en ocupación doble, con vuelo desde CDMX',
  tour: 'por persona, con traslado desde tu hotel',
  hospedaje: 'por persona en ocupación doble, sin vuelo',
}

/** Título de la lista de pasos en el detalle */
export const planLabel: Record<TripKind, string> = {
  paquete: 'Itinerario',
  tour: 'Recorrido',
  hospedaje: 'Tu estancia',
}

export const packageWhatsappMessage = (p: TravelPackage) =>
  `Hola SosaCraft, me interesa ${noun[p.kind]} "${p.name}" (${formatDuration(p)}). ¿Me comparten fechas disponibles y el detalle?`

export const packageEmail = (p: TravelPackage) => ({
  subject: `Información: ${p.name}`,
  body: `Hola SosaCraft,\n\nMe interesa ${noun[p.kind]} "${p.name}" (${formatDuration(p)}, desde ${formatPrice(p.priceFrom)} ${priceNote[p.kind]}).\n\nFechas aproximadas:\nNúmero de viajeros:\nCiudad de salida u hotel:\n\nGracias.`,
})
