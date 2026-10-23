export type Region = 'mexico' | 'internacional'

/** Paquete completo (con vuelo), tour de un día o solo hospedaje */
export type TripKind = 'paquete' | 'tour' | 'hospedaje'

export type TravelPackage = {
  id: string
  name: string
  place: string
  region: Region
  kind: TripKind
  days: number
  nights: number
  /** Precio por persona en MXN (ocupación doble en paquetes y hospedaje) */
  priceFrom: number
  photoId: string
  alt: string
  summary: string
  includes: string[]
  itinerary: { day: string; title: string }[]
}

/*
 * Precios de ejemplo. Reemplázalos con las tarifas vigentes de la agencia
 * antes de publicar: aquí solo se muestran, no se cobra nada en el sitio.
 */
export const packages: TravelPackage[] = [
  {
    id: 'tulum-bacalar',
    name: 'Tulum y Bacalar',
    place: 'Quintana Roo, México',
    region: 'mexico',
    kind: 'paquete',
    days: 6,
    nights: 5,
    priceFrom: 18900,
    photoId: 'photo-1605217074767-688b113d3b43',
    alt: 'Palmeras sobre arena blanca frente al mar Caribe',
    summary: 'Cenotes, zona arqueológica frente al mar y un día entero navegando la laguna de los siete colores.',
    includes: ['Vuelo redondo desde CDMX', 'Hotel boutique con desayuno', 'Tour en velero por Bacalar', 'Traslados aeropuerto y entre ciudades'],
    itinerary: [
      { day: 'Día 1', title: 'Llegada a Cancún y traslado a Tulum' },
      { day: 'Día 2', title: 'Zona arqueológica y tarde en la playa' },
      { day: 'Día 3', title: 'Ruta de cenotes con guía local' },
      { day: 'Día 4', title: 'Traslado a Bacalar' },
      { day: 'Día 5', title: 'Velero por la laguna de los siete colores' },
      { day: 'Día 6', title: 'Regreso a casa' },
    ],
  },
  {
    id: 'japon-esencial',
    name: 'Japón esencial',
    place: 'Tokio, Kioto y Osaka',
    region: 'internacional',
    kind: 'paquete',
    days: 12,
    nights: 10,
    priceFrom: 64900,
    photoId: 'photo-1578469645742-46cae010e5d4',
    alt: 'Pagoda tradicional japonesa entre casas de madera',
    summary: 'Tres ciudades en tren bala, templos al amanecer y una noche en ryokan con baños termales.',
    includes: ['Vuelo redondo con una escala', 'Japan Rail Pass de 7 días', 'Hoteles céntricos y una noche en ryokan', 'Asistencia en español 24/7'],
    itinerary: [
      { day: 'Días 1 a 4', title: 'Tokio: Shibuya, Asakusa y Monte Fuji' },
      { day: 'Día 5', title: 'Tren bala a Kioto' },
      { day: 'Días 6 a 8', title: 'Templos, Arashiyama y Nara' },
      { day: 'Día 9', title: 'Noche en ryokan' },
      { day: 'Días 10 a 12', title: 'Osaka y regreso' },
    ],
  },
  {
    id: 'peru-cusco',
    name: 'Cusco y Machu Picchu',
    place: 'Perú',
    region: 'internacional',
    kind: 'paquete',
    days: 8,
    nights: 7,
    priceFrom: 38500,
    photoId: 'photo-1587595431973-160d0d94add1',
    alt: 'Ciudadela de Machu Picchu entre montañas',
    summary: 'Lima para comer, el Valle Sagrado para aclimatarte y Machu Picchu con entrada y guía reservados.',
    includes: ['Vuelos internacionales e internos', 'Tren panorámico a Aguas Calientes', 'Entrada y guía en Machu Picchu', 'Hoteles con desayuno'],
    itinerary: [
      { day: 'Días 1 y 2', title: 'Lima y su cocina' },
      { day: 'Día 3', title: 'Vuelo a Cusco, tarde libre para aclimatarte' },
      { day: 'Días 4 y 5', title: 'Valle Sagrado, Pisac y Ollantaytambo' },
      { day: 'Día 6', title: 'Machu Picchu' },
      { day: 'Días 7 y 8', title: 'Cusco y regreso' },
    ],
  },
  {
    id: 'oaxaca',
    name: 'Oaxaca en cuatro tiempos',
    place: 'Oaxaca, México',
    region: 'mexico',
    kind: 'paquete',
    days: 4,
    nights: 3,
    priceFrom: 11400,
    photoId: 'photo-1686448921254-b326a7914d2f',
    alt: 'Calle colonial de Oaxaca adornada con banderas de colores',
    summary: 'Mercados, mezcal en palenque familiar, Monte Albán e Hierve el Agua con transporte privado.',
    includes: ['Vuelo redondo desde CDMX', 'Casona en el centro histórico', 'Tour privado a Hierve el Agua', 'Clase de cocina oaxaqueña'],
    itinerary: [
      { day: 'Día 1', title: 'Centro histórico y mercado 20 de Noviembre' },
      { day: 'Día 2', title: 'Monte Albán y clase de cocina' },
      { day: 'Día 3', title: 'Hierve el Agua y palenque de mezcal' },
      { day: 'Día 4', title: 'Regreso a casa' },
    ],
  },
  {
    id: 'grecia',
    name: 'Atenas y Santorini',
    place: 'Grecia',
    region: 'internacional',
    kind: 'paquete',
    days: 10,
    nights: 9,
    priceFrom: 57300,
    photoId: 'photo-1570077188670-e3a8d69ac5ff',
    alt: 'Cúpulas azules de Santorini sobre el mar Egeo',
    summary: 'La Acrópolis a pie, ferry por las islas y atardeceres en Oia desde un hotel con vista a la caldera.',
    includes: ['Vuelo redondo con una escala', 'Ferry Atenas, Mykonos y Santorini', 'Hotel con vista a la caldera', 'Paseo en catamarán'],
    itinerary: [
      { day: 'Días 1 a 3', title: 'Atenas y la Acrópolis' },
      { day: 'Días 4 y 5', title: 'Ferry a Mykonos' },
      { day: 'Días 6 a 9', title: 'Santorini y catamarán al atardecer' },
      { day: 'Día 10', title: 'Regreso a casa' },
    ],
  },
  {
    id: 'san-miguel',
    name: 'San Miguel y Guanajuato',
    place: 'Bajío, México',
    region: 'mexico',
    kind: 'paquete',
    days: 4,
    nights: 3,
    priceFrom: 9800,
    photoId: 'photo-1739582766847-a4051d6d5f04',
    alt: 'Vista de San Miguel de Allende con flores en primer plano',
    summary: 'Callejones, viñedos del Bajío y una noche de callejoneada en Guanajuato capital.',
    includes: ['Transporte terrestre privado', 'Hotel boutique en San Miguel', 'Visita a viñedo con cata', 'Callejoneada en Guanajuato'],
    itinerary: [
      { day: 'Día 1', title: 'Llegada a San Miguel de Allende' },
      { day: 'Día 2', title: 'Ruta del vino y cata' },
      { day: 'Día 3', title: 'Guanajuato capital y callejoneada' },
      { day: 'Día 4', title: 'Regreso a casa' },
    ],
  },
]

/* Tours de un día en la Riviera Maya. Precios de ejemplo por persona. */
const tours: TravelPackage[] = [
  {
    id: 'xcaret-plus',
    name: 'Xcaret Plus',
    place: 'Riviera Maya, Quintana Roo',
    region: 'mexico',
    kind: 'tour',
    days: 1,
    nights: 0,
    priceFrom: 3450,
    photoId: 'photo-1583354198740-1e575c285d86',
    alt: 'Guacamaya roja y azul posada en una rama',
    summary: 'Ríos subterráneos, aviario, playa y el espectáculo nocturno México Espectacular, con comida buffet incluida.',
    includes: ['Entrada Xcaret Plus', 'Comida buffet y equipo de snorkel', 'Show nocturno México Espectacular', 'Traslado redondo desde tu hotel'],
    itinerary: [
      { day: '8:00', title: 'Recogida en tu hotel de Cancún o Riviera Maya' },
      { day: '9:30', title: 'Ríos subterráneos y aviario' },
      { day: '14:00', title: 'Comida buffet y tarde de playa' },
      { day: '19:00', title: 'Show México Espectacular' },
    ],
  },
  {
    id: 'ruta-cenotes',
    name: 'Ruta de cenotes',
    place: 'Puerto Morelos, Quintana Roo',
    region: 'mexico',
    kind: 'tour',
    days: 1,
    nights: 0,
    priceFrom: 1890,
    photoId: 'photo-1719941463960-f3310fe64e46',
    alt: 'Cenote de agua azul dentro de una cueva',
    summary: 'Tres cenotes distintos (abierto, semiabierto y de caverna) con guía local, snorkel y comida típica.',
    includes: ['Entradas a tres cenotes', 'Guía certificado y equipo de snorkel', 'Comida yucateca', 'Traslado redondo desde tu hotel'],
    itinerary: [
      { day: '8:30', title: 'Recogida en tu hotel' },
      { day: '10:00', title: 'Cenote abierto y tirolesa' },
      { day: '12:00', title: 'Cenote de caverna con snorkel' },
      { day: '14:30', title: 'Comida típica y regreso' },
    ],
  },
  {
    id: 'chichen-itza',
    name: 'Chichén Itzá y Valladolid',
    place: 'Yucatán, México',
    region: 'mexico',
    kind: 'tour',
    days: 1,
    nights: 0,
    priceFrom: 1990,
    photoId: 'photo-1518638150340-f706e86654de',
    alt: 'Pirámide de El Castillo en Chichén Itzá',
    summary: 'Una de las siete maravillas del mundo moderno con guía, nado en el cenote Ik Kil y paseo por Valladolid.',
    includes: ['Entrada a Chichén Itzá con guía', 'Cenote Ik Kil', 'Comida buffet', 'Transporte con aire acondicionado'],
    itinerary: [
      { day: '7:00', title: 'Recogida en tu hotel' },
      { day: '10:30', title: 'Recorrido guiado por Chichén Itzá' },
      { day: '13:30', title: 'Comida y nado en el cenote Ik Kil' },
      { day: '16:00', title: 'Paseo por Valladolid y regreso' },
    ],
  },
  {
    id: 'isla-mujeres',
    name: 'Isla Mujeres en catamarán',
    place: 'Cancún, Quintana Roo',
    region: 'mexico',
    kind: 'tour',
    days: 1,
    nights: 0,
    priceFrom: 1590,
    photoId: 'photo-1769610352818-cf8fa29ccf9a',
    alt: 'Catamarán blanco navegando sobre agua turquesa',
    summary: 'Navegación en catamarán, snorkel en arrecife, club de playa y tiempo libre en el centro de la isla.',
    includes: ['Catamarán con barra libre nacional', 'Snorkel en arrecife', 'Comida en club de playa', 'Traslado desde tu hotel en Cancún'],
    itinerary: [
      { day: '9:00', title: 'Salida en catamarán desde Cancún' },
      { day: '10:30', title: 'Snorkel en el arrecife' },
      { day: '12:30', title: 'Club de playa y comida' },
      { day: '15:00', title: 'Centro de Isla Mujeres y regreso' },
    ],
  },
]

/* Solo hospedaje (sin vuelo). Precios de ejemplo por persona en ocupación doble. */
const stays: TravelPackage[] = [
  {
    id: 'riviera-maya-todo-incluido',
    name: 'Riviera Maya todo incluido',
    place: 'Playa del Carmen, Quintana Roo',
    region: 'mexico',
    kind: 'hospedaje',
    days: 5,
    nights: 4,
    priceFrom: 14800,
    photoId: 'photo-1733253870641-2504a05f32ff',
    alt: 'Gran alberca de resort con camastros y sombrillas',
    summary: 'Resort cinco estrellas frente al mar con alimentos, bebidas y actividades incluidas. Ideal para descansar sin pendientes.',
    includes: ['4 noches en resort 5 estrellas', 'Plan todo incluido', 'Traslado aeropuerto - hotel - aeropuerto', 'Acceso a club de playa y actividades'],
    itinerary: [
      { day: 'Llegada', title: 'Traslado del aeropuerto de Cancún al hotel' },
      { day: 'Estancia', title: 'Todo incluido: alimentos, bebidas y actividades' },
      { day: 'Extra', title: 'Agrega tours como Xcaret o cenotes' },
      { day: 'Salida', title: 'Traslado al aeropuerto' },
    ],
  },
  {
    id: 'tulum-boutique',
    name: 'Hotel boutique en Tulum',
    place: 'Tulum, Quintana Roo',
    region: 'mexico',
    kind: 'hospedaje',
    days: 4,
    nights: 3,
    priceFrom: 9600,
    photoId: 'photo-1683914791736-9b0e739565e4',
    alt: 'Alberca de hotel boutique rodeada de selva',
    summary: 'Hotel de diseño entre la selva y el mar, con desayuno incluido y a minutos de la zona arqueológica.',
    includes: ['3 noches en hotel boutique', 'Desayuno diario', 'Bicicletas para moverte por Tulum', 'Traslado desde el aeropuerto de Tulum'],
    itinerary: [
      { day: 'Llegada', title: 'Traslado y check-in en el hotel' },
      { day: 'Estancia', title: 'Desayunos, alberca y playa a unos pasos' },
      { day: 'Extra', title: 'Agrega la ruta de cenotes o Bacalar' },
      { day: 'Salida', title: 'Traslado al aeropuerto' },
    ],
  },
  {
    id: 'cancun-zona-hotelera',
    name: 'Cancún zona hotelera',
    place: 'Cancún, Quintana Roo',
    region: 'mexico',
    kind: 'hospedaje',
    days: 5,
    nights: 4,
    priceFrom: 12900,
    photoId: 'photo-1630252523549-c7e7b5109f60',
    alt: 'Vista aérea de los hoteles de Cancún junto al mar Caribe',
    summary: 'Hotel todo incluido en la zona hotelera, entre la laguna y el mar, cerca de restaurantes y vida nocturna.',
    includes: ['4 noches en hotel todo incluido', 'Habitación con vista al mar', 'Traslado aeropuerto - hotel - aeropuerto', 'Descuento en tours a Isla Mujeres'],
    itinerary: [
      { day: 'Llegada', title: 'Traslado del aeropuerto al hotel' },
      { day: 'Estancia', title: 'Todo incluido frente al mar' },
      { day: 'Extra', title: 'Agrega Isla Mujeres o Chichén Itzá' },
      { day: 'Salida', title: 'Traslado al aeropuerto' },
    ],
  },
]

/** Paquetes, tours y hospedaje en un solo catálogo */
export const catalog: TravelPackage[] = [...packages, ...tours, ...stays]

export const kindFilters: { value: TripKind; label: string }[] = [
  { value: 'paquete', label: 'Paquetes' },
  { value: 'tour', label: 'Tours' },
  { value: 'hospedaje', label: 'Hospedaje' },
]
