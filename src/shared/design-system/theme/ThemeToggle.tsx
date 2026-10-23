import { Moon, Sun } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useTheme } from './useTheme'
import { cn } from '@/shared/lib/cn'
import { spring } from '../tokens/motion'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      className={cn(
        'relative grid size-10 place-items-center overflow-hidden rounded-full text-ink ring-1 ring-line',
        'transition-colors duration-300 ease-fluid hover:bg-ink/5 active:scale-[0.96]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        className,
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 18, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -18, opacity: 0, rotate: 40 }}
          transition={spring.press}
          className="grid place-items-center"
        >
          {isDark ? <Sun size={18} weight="light" /> : <Moon size={18} weight="light" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
