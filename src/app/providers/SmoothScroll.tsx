import Lenis from 'lenis'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'motion/react'

const LenisContext = createContext<Lenis | null>(null)

/** Acceso a Lenis para pausar el scroll (diálogos, menú) o navegar a anclas. */
export const useLenis = () => useContext(LenisContext)

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduce) return
    const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, anchors: { offset: -16 } })
    setLenis(instance)
    let frame = requestAnimationFrame(function raf(time) {
      instance.raf(time)
      frame = requestAnimationFrame(raf)
    })
    return () => {
      cancelAnimationFrame(frame)
      instance.destroy()
      setLenis(null)
    }
  }, [reduce])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
