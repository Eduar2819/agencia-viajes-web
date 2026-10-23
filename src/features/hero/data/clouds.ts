import { cloudShapes, type CloudSpec } from '@/shared/design-system'

const { cumulus, puff, wisp } = cloudShapes

/** Cielo de fondo: nubes grandes y lentas, muy atrás. */
export const skyClouds: CloudSpec[] = [
  { src: cumulus, top: '4%', width: 44, duration: 150, offset: 0.62, opacity: 0.95, rest: 46 },
  { src: wisp, top: '24%', width: 58, duration: 190, offset: 0.18, opacity: 0.8, rest: -6 },
  { src: puff, top: '52%', width: 26, duration: 120, offset: 0.78, opacity: 0.85, rest: 62 },
  { src: cumulus, top: '70%', width: 36, duration: 170, offset: 0.35, opacity: 0.75, rest: 18 },
]

/** Lo que pasa frente a la ventanilla: nubes cercanas y rápidas, como en vuelo. */
export const windowClouds: CloudSpec[] = [
  { src: puff, top: '6%', width: 105, duration: 24, offset: 0.1, opacity: 0.88, rest: -20 },
  { src: wisp, top: '42%', width: 150, duration: 31, offset: 0.55, opacity: 0.7, rest: -30 },
  { src: cumulus, top: '64%', width: 120, duration: 27, offset: 0.82, opacity: 0.85, rest: 40 },
]

/** Primer plano: una nube que cruza por delante del marco. */
export const foregroundClouds: CloudSpec[] = [
  { src: cumulus, top: '74%', width: 66, duration: 75, offset: 0.42, opacity: 1, rest: 50 },
]
