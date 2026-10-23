import { useLayoutEffect, type RefObject } from 'react'
import { useMotionValue } from 'motion/react'

export type InsetRect = {
  top: number
  right: number
  bottom: number
  left: number
  width: number
  height: number
  /** Radio de ventanilla de avión según el lado corto */
  radius: number
  ready: boolean
}

/**
 * Mide la posición de `target` dentro de `container` como un inset (px),
 * listo para usarse en clip-path. Vive en un motion value para no re-renderizar.
 */
export function useInsetRect(container: RefObject<HTMLElement | null>, target: RefObject<HTMLElement | null>) {
  const rect = useMotionValue<InsetRect>({ top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0, radius: 0, ready: false })

  useLayoutEffect(() => {
    const c = container.current
    const t = target.current
    if (!c || !t) return

    const measure = () => {
      const cr = c.getBoundingClientRect()
      const tr = t.getBoundingClientRect()
      rect.set({
        top: tr.top - cr.top,
        left: tr.left - cr.left,
        right: cr.right - tr.right,
        bottom: cr.bottom - tr.bottom,
        width: tr.width,
        height: tr.height,
        radius: Math.min(tr.width, tr.height) * 0.44,
        ready: true,
      })
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(c)
    ro.observe(t)
    return () => ro.disconnect()
  }, [container, target, rect])

  return rect
}
