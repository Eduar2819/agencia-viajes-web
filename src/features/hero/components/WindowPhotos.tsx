import { AnimatePresence, motion, useReducedMotion, type MotionValue } from 'motion/react'
import { photo, photoSrcSet } from '@/shared/lib/images'
import type { WindowView } from '../data/views'

type Props = {
  views: WindowView[]
  index: number
  /** Escala ligada al scroll: la vista "se acerca" al crecer la ventana */
  scale: MotionValue<number>
  x: MotionValue<number>
  y: MotionValue<number>
}

/** Capa de fotos a pantalla completa. Se recorta con clip-path desde el Hero. */
export function WindowPhotos({ views, index, scale, x, y }: Props) {
  const reduce = useReducedMotion()
  const view = views[index]

  return (
    <motion.div className="absolute inset-0 bg-surface-2" style={{ scale, x, y }}>
      <AnimatePresence initial={false}>
        <motion.img
          key={view.photoId}
          src={photo(view.photoId, 1600)}
          srcSet={photoSrcSet(view.photoId)}
          sizes="100vw"
          alt={view.alt}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.4, ease: [0.32, 0.72, 0, 1] },
            scale: { duration: 7, ease: [0.16, 1, 0.3, 1] },
          }}
        />
      </AnimatePresence>
    </motion.div>
  )
}
