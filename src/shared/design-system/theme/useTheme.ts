import { useCallback, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'
const STORAGE_KEY = 'sosacraft-theme'
const media = () => window.matchMedia('(prefers-color-scheme: dark)')

function read(): Theme {
  const forced = document.documentElement.dataset.theme
  if (forced === 'light' || forced === 'dark') return forced
  return media().matches ? 'dark' : 'light'
}

const listeners = new Set<() => void>()

function subscribe(cb: () => void) {
  listeners.add(cb)
  const mq = media()
  mq.addEventListener('change', cb)
  return () => {
    listeners.delete(cb)
    mq.removeEventListener('change', cb)
  }
}

/** Tema actual: preferencia del sistema salvo que la persona elija uno. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, read, () => 'light' as Theme)

  const toggle = useCallback(() => {
    const next: Theme = read() === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* almacenamiento no disponible: el tema dura la sesión */
    }
    listeners.forEach((l) => l())
  }, [])

  return { theme, toggle }
}
