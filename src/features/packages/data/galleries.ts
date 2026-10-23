import type { TravelPackage } from './packages'

export type Photo = { photoId: string; alt: string }

/**
 * Fotos adicionales de cada viaje (Unsplash). La primera foto del carrusel
 * siempre es la principal del viaje (photoId/alt en packages.ts).
 */
const galleries: Record<string, Photo[]> = {
  'tulum-bacalar': [
    { photoId: 'photo-1622870129889-f7e0ba2603a1', alt: 'Costa rocosa del Caribe mexicano' },
    { photoId: 'photo-1670786445514-7146f3d62e60', alt: 'Palapa sobre el agua en la laguna de Bacalar' },
    { photoId: 'photo-1603131747133-e95271822da5', alt: 'Muelle de madera sobre agua azul turquesa' },
  ],
  'japon-esencial': [
    { photoId: 'photo-1558862107-d49ef2a04d72', alt: 'Túnel de torii naranjas en Fushimi Inari, Kioto' },
    { photoId: 'photo-1542051841857-5f90071e7989', alt: 'Cruce de Shibuya iluminado por la noche en Tokio' },
    { photoId: 'photo-1578637387939-43c525550085', alt: 'Monte Fuji nevado bajo un cielo despejado' },
  ],
  'peru-cusco': [
    { photoId: 'photo-1526392060635-9d6019884377', alt: 'Machu Picchu entre montañas con neblina' },
    { photoId: 'photo-1664387518989-bb1d8574f078', alt: 'Llamas frente a las ruinas de Machu Picchu' },
  ],
  oaxaca: [
    { photoId: 'photo-1660670173026-ec491dd3dd1a', alt: 'Templo con cúpula y explanada en Oaxaca' },
    { photoId: 'photo-1562869929-bda0650edb1f', alt: 'Textiles oaxaqueños de muchos colores' },
    { photoId: 'photo-1562215589-b6d0ed3cfec8', alt: 'Calle del centro histórico de Oaxaca' },
  ],
  grecia: [
    { photoId: 'photo-1603565816030-6b389eeb23cb', alt: 'La Acrópolis de Atenas en la hora dorada' },
    { photoId: 'photo-1601581875309-fafbf2d3ed3a', alt: 'Terraza de piedra junto al mar en Mykonos' },
    { photoId: 'photo-1580502304784-8985b7eb7260', alt: 'Casas blancas de Oia al atardecer' },
  ],
  'san-miguel': [
    { photoId: 'photo-1672605077489-d10d9bd02e87', alt: 'La Parroquia de San Miguel de Allende' },
    { photoId: 'photo-1657691308877-19ddae2b6eee', alt: 'Casas de colores en las laderas de Guanajuato' },
    { photoId: 'photo-1717654543196-4d6826ec4bb8', alt: 'Calle empedrada con papel picado' },
  ],
  'xcaret-plus': [
    { photoId: 'photo-1546838849-6eb6269ae2db', alt: 'Río de agua clara dentro de una caverna' },
    { photoId: 'photo-1585873587499-4c2b179c6c51', alt: 'Bailarinas de danza folclórica mexicana' },
    { photoId: 'photo-1749147074412-9b9d8249ad30', alt: 'Playa con palmeras y agua cristalina' },
  ],
  'ruta-cenotes': [
    { photoId: 'photo-1665617366582-ad4847f7c439', alt: 'Cenote abierto rodeado de vegetación' },
    { photoId: 'photo-1546831909-09b542ed0a7a', alt: 'Persona nadando en agua cristalina' },
  ],
  'chichen-itza': [
    { photoId: 'photo-1568402102990-bc541580b59f', alt: 'El Castillo de Chichén Itzá bajo un cielo azul' },
    { photoId: 'photo-1561577101-aa749bffbb70', alt: 'Templo maya de piedra en Chichén Itzá' },
    { photoId: 'photo-1695385246289-2e7d2ab5e16b', alt: 'Calle colorida de Valladolid con banderas' },
  ],
  'isla-mujeres': [
    { photoId: 'photo-1720043792249-ce6ad74dda23', alt: 'Vista aérea de lanchas en el mar turquesa' },
    { photoId: 'photo-1484507175567-a114f764f78b', alt: 'Persona haciendo snorkel bajo el agua' },
    { photoId: 'photo-1545591853-dd70186241e9', alt: 'Orilla de playa con árboles en Isla Mujeres' },
  ],
  'riviera-maya-todo-incluido': [
    { photoId: 'photo-1749147074412-9b9d8249ad30', alt: 'Playa con palmeras y agua cristalina' },
    { photoId: 'photo-1609602126247-4ab7188b4aa1', alt: 'Mesa de madera frente al mar' },
    { photoId: 'photo-1686471158567-03c65b171492', alt: 'Alberca rodeada de palmeras' },
  ],
  'tulum-boutique': [
    { photoId: 'photo-1520483601560-389dff434fdf', alt: 'Cabaña con techo de palma bajo cocoteros' },
    { photoId: 'photo-1548623832-065a018e01ce', alt: 'Pareja nadando en una alberca entre árboles' },
    { photoId: 'photo-1683914791969-1db895d01387', alt: 'Sillas frente a un muro de piedra en el hotel' },
  ],
  'cancun-zona-hotelera': [
    { photoId: 'photo-1602088113235-229c19758e9f', alt: 'Sombrillas en la playa de Cancún' },
    { photoId: 'photo-1711220465753-2450b31ea318', alt: 'Vista aérea de un resort frente a la playa' },
    { photoId: 'photo-1630252421399-ddde79af47b3', alt: 'Vista aérea de la playa con bañistas' },
  ],
}

/** Todas las fotos del viaje, empezando por la principal */
export function photosOf(pkg: TravelPackage): Photo[] {
  return [{ photoId: pkg.photoId, alt: pkg.alt }, ...(galleries[pkg.id] ?? [])]
}
