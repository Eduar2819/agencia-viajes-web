/** Foto de Unsplash (licencia Unsplash, hotlink permitido) recortada al ancho pedido. */
export function photo(id: string, width = 1600, height?: number) {
  const h = height ? `&h=${height}` : ''
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}${h}&q=72`
}

/** srcset responsivo para una foto */
export function photoSrcSet(id: string, widths = [640, 960, 1400, 2000]) {
  return widths.map((w) => `${photo(id, w)} ${w}w`).join(', ')
}
