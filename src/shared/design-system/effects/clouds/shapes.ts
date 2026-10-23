import cumulus from './assets/cloud-cumulus.svg'
import puff from './assets/cloud-puff.svg'
import wisp from './assets/cloud-wisp.svg'

/** Formas de nube procedurales (SVG con ruido fractal), rasterizadas una sola vez. */
export const cloudShapes = { cumulus, puff, wisp }

export type CloudSpec = {
  src: string
  /** Posición vertical dentro del campo (porcentaje de su alto) */
  top: string
  /** Ancho relativo al campo, en cqw */
  width: number
  /** Segundos que tarda en cruzar el campo */
  duration: number
  /** Desfase (0 a 1) para que arranque a medio camino */
  offset: number
  opacity: number
  /** Posición fija cuando el movimiento está reducido, en cqw */
  rest: number
}
