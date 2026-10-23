import { cloudShapes, type CloudSpec } from '@/shared/design-system'

const { cumulus, puff, wisp } = cloudShapes

export const exploreLinks = [
  { href: '#paquetes', label: 'Paquetes' },
  { href: '#como-viajamos', label: 'Cómo viajamos' },
  { href: '#opiniones', label: 'Opiniones' },
  { href: '#preguntas', label: 'Preguntas frecuentes' },
  { href: '#contacto', label: 'Contacto' },
]

/** Nubes detrás de la ruta de vuelo */
export const bandBackClouds: CloudSpec[] = [
  { src: cumulus, top: '6%', width: 30, duration: 160, offset: 0.2, opacity: 0.9, rest: 8 },
  { src: wisp, top: '30%', width: 46, duration: 210, offset: 0.65, opacity: 0.7, rest: 52 },
  { src: puff, top: '48%', width: 20, duration: 130, offset: 0.45, opacity: 0.85, rest: 74 },
]

/** Nubes que pasan por delante del nombre */
export const bandFrontClouds: CloudSpec[] = [
  { src: wisp, top: '30%', width: 72, duration: 120, offset: 0.3, opacity: 0.9, rest: 10 },
  { src: cumulus, top: '42%', width: 34, duration: 95, offset: 0.75, opacity: 1, rest: 62 },
]
