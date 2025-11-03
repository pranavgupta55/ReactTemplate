import { ReactNode } from 'react'
import clsx from 'clsx'

interface DarkVeilProps {
  children: ReactNode
  className?: string
  opacity?: number
}

export function DarkVeil({ children, className, opacity = 0.5 }: DarkVeilProps) {
  return (
    <div className={clsx('relative', className)}>
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"
        style={{ opacity }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
