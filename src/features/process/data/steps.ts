export type ProcessStep = {
  title: string
  body: string
  photoId: string
  alt: string
  /** Lo que se resuelve en este paso */
  tags: string[]
}

/** Es una secuencia real, por eso se muestra en orden. */
export const steps: ProcessStep[] = [
  {
    title: 'Nos cuentas tu idea',
    body: 'Por WhatsApp o correo: fechas, presupuesto, con quién viajas y qué no te puedes perder. Sin formularios eternos.',
    photoId: 'photo-1524850011238-e3d235c7d4c9',
    alt: 'Personas señalando destinos sobre un mapa impreso',
    tags: ['WhatsApp o correo', 'Cotización sin costo', 'Respuesta en un día'],
  },
  {
    title: 'Armamos tu itinerario',
    body: 'Te enviamos una propuesta con vuelos, hospedaje y experiencias. La ajustamos contigo hasta que se sienta tuya.',
    photoId: 'photo-1516546453174-5e1098a4b4af',
    alt: 'Lentes de sol sobre un mapa durante la planeación de un viaje',
    tags: ['Vuelos', 'Hospedaje', 'Tours', 'Ajustes ilimitados'],
  },
  {
    title: 'Viajas con respaldo',
    body: 'Antes, durante y después del viaje respondemos por WhatsApp. Si algo cambia, lo resolvemos nosotros.',
    photoId: 'photo-1491582990992-68ec88e070a3',
    alt: 'Pareja sentada en una roca mirando un lago entre montañas',
    tags: ['Acompañamiento 24/7', 'Cambios de último momento', 'Asistencia en destino'],
  },
]
