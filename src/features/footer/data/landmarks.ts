import type { LandmarkId } from './landmark-shapes'

export type LandmarkSpec = {
  id: LandmarkId
  name: string
  /** Altura relativa: 1 es la unidad del horizonte (no es la escala real) */
  height: number
}

/** Fila del frente: alturas alternadas para un perfil vivo, la Torre Eiffel al centro. */
export const frontSkyline: LandmarkSpec[] = [
  { id: 'mayan-pyramid', name: 'Chichén Itzá', height: 0.55 },
  { id: 'taj-mahal', name: 'Taj Mahal', height: 0.62 },
  { id: 'pisa-tower', name: 'Torre de Pisa', height: 0.78 },
  { id: 'clock-tower', name: 'Big Ben', height: 0.98 },
  { id: 'sydney-opera-house', name: 'Ópera de Sídney', height: 0.5 },
  { id: 'eiffel-tower', name: 'Torre Eiffel', height: 1.3 },
  { id: 'statue-of-liberty', name: 'Estatua de la Libertad', height: 0.98 },
  { id: 'coliseum', name: 'Coliseo', height: 0.55 },
  { id: 'christ-the-redeemer', name: 'Cristo Redentor', height: 0.82 },
  { id: 'burj-khalifa', name: 'Burj Khalifa', height: 1.22 },
  { id: 'saint-basil-cathedral', name: 'Catedral de San Basilio', height: 0.7 },
  { id: 'tower-bridge', name: 'Tower Bridge', height: 0.72 },
  { id: 'pagoda', name: 'Pagoda', height: 0.64 },
  { id: 'windmill', name: 'Molinos de Holanda', height: 0.6 },
]

/** Fila lejana, más tenue: da profundidad detrás del frente. */
export const backSkyline: LandmarkSpec[] = [
  { id: 'arc-triomphe', name: 'Arco del Triunfo', height: 0.62 },
  { id: 'cn-tower', name: 'Torre CN', height: 1.12 },
  { id: 'egyptian-sphinx', name: 'Esfinge de Guiza', height: 0.55 },
  { id: 'pagoda', name: 'Pagoda', height: 0.66 },
  { id: 'clock-tower', name: 'Big Ben', height: 0.84 },
  { id: 'taj-mahal', name: 'Taj Mahal', height: 0.56 },
  { id: 'burj-khalifa', name: 'Burj Khalifa', height: 1 },
  { id: 'tower-bridge', name: 'Tower Bridge', height: 0.62 },
  { id: 'saint-basil-cathedral', name: 'Catedral de San Basilio', height: 0.64 },
  { id: 'arc-triomphe', name: 'Arco del Triunfo', height: 0.56 },
]
