import { ReactNode, useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface GlareHoverProps {
  children: ReactNode
  className?: string
}

export function GlareHover({ children, className }: GlareHoverProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={clsx('group relative overflow-hidden', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut',
          }}
        />
      )}
    </div>
  )
}
