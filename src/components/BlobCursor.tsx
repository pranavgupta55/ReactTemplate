import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function BlobCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="pointer-events-none fixed z-50 h-32 w-32 rounded-full bg-gradient-to-r from-primary-500/40 via-secondary-500/40 to-accent-500/40 blur-3xl"
      animate={{
        x: mousePosition.x - 64,
        y: mousePosition.y - 64,
      }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 200,
        mass: 0.5,
      }}
    />
  )
}
