import { ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

interface CarouselProps {
  items: ReactNode[]
  className?: string
  autoPlay?: boolean
  interval?: number
}

export function Carousel({ items, className, autoPlay = false, interval = 3000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((prev) => (prev + 1) % items.length)
  const prev = () => setCurrentIndex((curr) => (curr - 1 + items.length) % items.length)

  if (autoPlay) {
    setTimeout(next, interval)
  }

  return (
    <div className={clsx('relative overflow-hidden', className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          {items[currentIndex]}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg hover:bg-white"
      >
        ←
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg hover:bg-white"
      >
        →
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={clsx(
              'h-2 w-2 rounded-full transition-all',
              idx === currentIndex ? 'w-8 bg-white' : 'bg-white/50'
            )}
          />
        ))}
      </div>
    </div>
  )
}
