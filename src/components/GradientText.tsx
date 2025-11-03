import { ReactNode } from 'react'
import clsx from 'clsx'

interface GradientTextProps {
  children: ReactNode
  className?: string
  from?: string
  via?: string
  to?: string
}

export function GradientText({
  children,
  className,
  from = 'from-primary-500',
  via = 'via-secondary-500',
  to = 'to-accent-500'
}: GradientTextProps) {
  return (
    <span
      className={clsx(
        'bg-gradient-to-r bg-clip-text text-transparent',
        from,
        via,
        to,
        className
      )}
    >
      {children}
    </span>
  )
}
