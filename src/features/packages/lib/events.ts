const OPEN_PACKAGE = 'sosacraft:open-package'

/** Pide abrir el detalle de un paquete desde cualquier parte de la página. */
export function openPackage(id: string) {
  window.dispatchEvent(new CustomEvent<string>(OPEN_PACKAGE, { detail: id }))
}

export function onOpenPackage(handler: (id: string) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<string>).detail)
  window.addEventListener(OPEN_PACKAGE, listener)
  return () => window.removeEventListener(OPEN_PACKAGE, listener)
}
