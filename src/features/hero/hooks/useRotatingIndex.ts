import { useCallback, useEffect, useState } from 'react'

/**
 * Avanza un índice cada `interval` ms. Al elegir uno a mano el
 * temporizador vuelve a empezar desde ese punto.
 */
export function useRotatingIndex(length: number, interval: number, paused = false) {
  const [state, setState] = useState({ index: 0, tick: 0 })

  useEffect(() => {
    if (paused || length < 2) return
    const id = window.setTimeout(() => {
      // Con la pestaña oculta no avanzamos, solo volvemos a programar
      setState((s) => (document.hidden ? { ...s, tick: s.tick + 1 } : { index: (s.index + 1) % length, tick: s.tick + 1 }))
    }, interval)
    return () => window.clearTimeout(id)
  }, [state, length, interval, paused])

  const select = useCallback((index: number) => setState((s) => ({ index, tick: s.tick + 1 })), [])

  return [state.index, select] as const
}
