// Genera src/features/footer/data/landmark-shapes.ts a partir de fuentes con licencia abierta.
import { writeFileSync } from 'node:fs'

const OUT = process.argv[2]

const commons = {
  christLiberty: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Christ_and_Liberty.svg',
  burj: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Dubai-CN-Sears-towers.svg',
  taj: 'https://upload.wikimedia.org/wikipedia/commons/5/53/World_landmarks_blue_icons_-_Taj_Mahal.svg',
  eiffel: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Eiffel_Tower_Silhouette.svg',
}

const tajIdx = [...Array(63).keys()].filter((i) => i !== 60)

// Medidas tomadas en el navegador (getBBox + CTM relativo a la raíz)
const commonsMeta = {
  'eiffel-tower': { src: 'eiffel', vb: [1, 1, 736, 1920], items: [[0, null, 'nonzero']], credit: 'Wikimedia Commons, Eiffel Tower Silhouette.svg (CC0)' },
  'christ-the-redeemer': { src: 'christLiberty', vb: [225.6, 454, 209, 209], items: [[1, null, 'evenodd']], credit: 'Wikimedia Commons, Christ and Liberty.svg (dominio público)' },
  'statue-of-liberty': { src: 'christLiberty', vb: [572.6, 41.6, 478.9, 618.9], items: [[0, null, 'evenodd'], [2, null, 'evenodd']], credit: 'Wikimedia Commons, Christ and Liberty.svg (dominio público)' },
  'burj-khalifa': { src: 'burj', vb: [56.9, 54.6, 123.9, 818.1], items: [[18, [1, 0, 0, 1, 1.5177, -154.8076], 'nonzero']], credit: 'Wikimedia Commons, Dubai-CN-Sears-towers.svg (dominio público)' },
  'cn-tower': { src: 'burj', vb: [212.9, 319.7, 64.9, 552.9], items: [[19, [1, 0, 0, 1, 1.5177, -154.8076], 'nonzero']], credit: 'Wikimedia Commons, Dubai-CN-Sears-towers.svg (dominio público)' },
  'taj-mahal': { src: 'taj', vb: [393.1, 109.1, 3519.9, 2190.9], items: tajIdx.map((i) => [i, null, 'nonzero']), credit: 'Wikimedia Commons, World landmarks blue icons - Taj Mahal.svg (CC0)' },
}

const gameIcons = {
  coliseum: [21, 77.8, 470, 356.4],
  'tower-bridge': [16, 43.9, 480, 443.1],
  'sydney-opera-house': [18, 148.4, 476, 292.6],
  'saint-basil-cathedral': [25, 22.8, 462, 471.2],
  // Recortada a la torre: el original trae una línea de suelo a todo lo ancho
  'pisa-tower': [132, 22, 220, 471],
  'mayan-pyramid': [25, 25, 462, 462],
  'egyptian-sphinx': [23.9, 62.5, 464.2, 423.3],
  'clock-tower': [128.2, 16.2, 255.6, 478.8],
  windmill: [84.3, 22, 343.5, 465],
  pagoda: [9.8, 23.4, 492.4, 465.2],
  'arc-triomphe': [48, 92, 416, 400],
}

const round = (d) => d.replace(/-?\d*\.\d+(?:e-?\d+)?|-?\d+/g, (n) => ' ' + +(+n).toFixed(1)).replace(/\s+/g, ' ').trim()

const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1]

function elementToD(tag) {
  const kind = tag.match(/^<(\w+)/)[1]
  if (kind === 'path') return attr(tag, 'd')
  if (kind === 'polygon' || kind === 'polyline') {
    const pts = attr(tag, 'points').trim().split(/[\s,]+/)
    let d = `M ${pts[0]} ${pts[1]}`
    for (let i = 2; i < pts.length; i += 2) d += ` L ${pts[i]} ${pts[i + 1]}`
    return d + (kind === 'polygon' ? ' Z' : '')
  }
  if (kind === 'rect') {
    const x = +attr(tag, 'x') || 0, y = +attr(tag, 'y') || 0, w = +attr(tag, 'width'), h = +attr(tag, 'height')
    return `M ${x} ${y} h ${w} v ${h} h ${-w} Z`
  }
  if (kind === 'circle' || kind === 'ellipse') {
    const cx = +attr(tag, 'cx') || 0, cy = +attr(tag, 'cy') || 0
    const rx = +(attr(tag, 'r') ?? attr(tag, 'rx')), ry = +(attr(tag, 'r') ?? attr(tag, 'ry'))
    return `M ${cx - rx} ${cy} a ${rx} ${ry} 0 1 0 ${2 * rx} 0 a ${rx} ${ry} 0 1 0 ${-2 * rx} 0 Z`
  }
  throw new Error('elemento no soportado: ' + kind)
}

const shapes = {}
const credits = new Set()

const texts = {}
for (const [k, url] of Object.entries(commons)) texts[k] = await fetch(url, { headers: { 'User-Agent': 'sosacraft-landing-build/1.0' } }).then((r) => r.text())

for (const [id, meta] of Object.entries(commonsMeta)) {
  const tags = texts[meta.src].match(/<(path|polygon|rect|circle|ellipse|polyline)\b[^>]*>/g)
  shapes[id] = {
    vb: meta.vb.join(' '),
    paths: meta.items.map(([i, m, rule]) => {
      const own = attr(tags[i], 'transform')
      if (own) throw new Error(`${id}: el elemento ${i} tiene transform propio`)
      return { d: round(elementToD(tags[i])), ...(m ? { transform: `matrix(${m.join(' ')})` } : {}), ...(rule === 'evenodd' ? { evenodd: true } : {}) }
    }),
  }
  credits.add(meta.credit)
}

const gi = await fetch('https://api.iconify.design/game-icons.json?icons=' + Object.keys(gameIcons).join(',')).then((r) => r.json())
for (const [id, vb] of Object.entries(gameIcons)) {
  const ds = [...gi.icons[id].body.matchAll(/ d="([^"]+)"/g)].map((m) => m[1])
  // Sin redondear: vienen minificadas (banderas de arco compactas) y ya son ligeras
  shapes[id] = { vb: vb.join(' '), paths: ds.map((d) => ({ d })) }
}
credits.add('game-icons.net (Lorc, Delapouite y colaboradores), CC BY 3.0')

const src = `/*
 * Siluetas de monumentos (generado; no editar a mano).
 * Fuentes y licencias:
${[...credits].map((c) => ` *  - ${c}`).join('\n')}
 * Todas se pintan con currentColor; el viewBox ya viene recortado a cada monumento.
 */
export type LandmarkShape = {
  vb: string
  paths: { d: string; transform?: string; evenodd?: boolean }[]
}

export const landmarkShapes = ${JSON.stringify(shapes, null, 2)} satisfies Record<string, LandmarkShape>

export type LandmarkId = keyof typeof landmarkShapes
`
writeFileSync(OUT, src)
console.log('ok', Object.keys(shapes).length, 'formas,', (src.length / 1024).toFixed(1), 'KB')
