export type Testimonial = {
  name: string
  city: string
  trip: string
  quote: string
  /** Retrato del viajero (va en el timbre de la postal) */
  photoId: string
  alt: string
  /** Foto del destino (frente de la postal) */
  tripPhotoId: string
  tripAlt: string
  /** Desde dónde "se envió" la postal: va en el matasellos */
  sentFrom: string
}

/* Contenido de muestra: reemplázalo con opiniones reales de clientes (con su permiso). */
export const testimonials: Testimonial[] = [
  {
    name: 'Mariana Ugalde',
    city: 'Guadalajara',
    trip: 'Japón esencial',
    quote:
      'Nos movimos por tres ciudades sin perder un solo tren. Cada mañana sabíamos exactamente a dónde ir y qué comer.',
    photoId: 'photo-1762360008701-820c31267d15',
    alt: 'Retrato de Mariana sonriendo en un campo de flores amarillas',
    tripPhotoId: 'photo-1558862107-d49ef2a04d72',
    tripAlt: 'Túnel de torii naranjas en Fushimi Inari, Kioto',
    sentFrom: 'Kioto',
  },
  {
    name: 'Héctor Villaseñor',
    city: 'Monterrey',
    trip: 'Cusco y Machu Picchu',
    quote:
      'Me sugirieron dormir primero en el Valle Sagrado por la altura y tenían razón: subí a Machu Picchu sin un solo malestar.',
    photoId: 'photo-1568602471122-7832951cc4c5',
    alt: 'Retrato de Héctor sonriendo, con lentes y barba',
    tripPhotoId: 'photo-1526392060635-9d6019884377',
    tripAlt: 'Machu Picchu entre montañas con neblina',
    sentFrom: 'Cusco',
  },
  {
    name: 'Ximena y Rodrigo Treviño',
    city: 'Puebla',
    trip: 'Luna de miel en Grecia',
    quote:
      'Pedimos un atardecer tranquilo en Santorini y nos consiguieron el mejor balcón del hotel. Volveríamos a viajar con ellos.',
    photoId: 'photo-1501631259223-89d4e246ed23',
    alt: 'Ximena y Rodrigo sentados sobre una roca frente a un paisaje',
    tripPhotoId: 'photo-1580502304784-8985b7eb7260',
    tripAlt: 'Casas blancas de Oia sobre el acantilado al atardecer',
    sentFrom: 'Santorini',
  },
]
