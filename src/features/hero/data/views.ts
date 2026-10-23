export type WindowView = {
  photoId: string
  /** Nombre corto del destino, protagonista al aterrizar */
  destination: string
  place: string
  alt: string
  /** Paquete que lleva a este destino */
  packageId: string
  /** Aeropuerto de llegada del paquete (IATA); todos salen de CDMX */
  arrival: string
  arrivalCity: string
}

/** Lo que se ve por la ventanilla. Cada vista corresponde a un paquete real. */
export const windowViews: WindowView[] = [
  {
    photoId: 'photo-1581710862235-eb6e05d8783f',
    destination: 'Tulum',
    place: 'Tulum, Quintana Roo',
    alt: 'Palmera inclinada sobre agua turquesa en la costa de Tulum',
    packageId: 'tulum-bacalar',
    arrival: 'CUN',
    arrivalCity: 'Cancún',
  },
  {
    photoId: 'photo-1587595431973-160d0d94add1',
    destination: 'Machu Picchu',
    place: 'Machu Picchu, Perú',
    alt: 'Ruinas de Machu Picchu entre montañas verdes',
    packageId: 'peru-cusco',
    arrival: 'LIM',
    arrivalCity: 'Lima',
  },
  {
    photoId: 'photo-1580502304784-8985b7eb7260',
    destination: 'Santorini',
    place: 'Oia, Santorini',
    alt: 'Casas blancas de Oia sobre el acantilado al atardecer',
    packageId: 'grecia',
    arrival: 'ATH',
    arrivalCity: 'Atenas',
  },
  {
    photoId: 'photo-1578469645742-46cae010e5d4',
    destination: 'Japón',
    place: 'Japón',
    alt: 'Pagoda tradicional japonesa entre casas de madera',
    packageId: 'japon-esencial',
    arrival: 'NRT',
    arrivalCity: 'Tokio',
  },
  {
    photoId: 'photo-1686448921254-b326a7914d2f',
    destination: 'Oaxaca',
    place: 'Oaxaca, México',
    alt: 'Calle colonial de Oaxaca adornada con banderas de colores',
    packageId: 'oaxaca',
    arrival: 'OAX',
    arrivalCity: 'Oaxaca',
  },
]
