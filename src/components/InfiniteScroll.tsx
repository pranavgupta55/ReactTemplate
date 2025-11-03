import { ReactNode } from 'react'
import clsx from 'clsx'

interface InfiniteScrollProps {
  children: ReactNode
  speed?: 'slow' | 'normal' | 'fast'
  direction?: 'left' | 'right'
  className?: string
}

export function InfiniteScroll({
  children,
  speed = 'normal',
  direction = 'left',
  className
}: InfiniteScrollProps) {
  const duration = {
    slow: '60s',
    normal: '40s',
    fast: '20s'
  }[speed]

  const animationDirection = direction === 'right' ? 'reverse' : 'normal'

  return (
    <div className={clsx('group relative flex overflow-hidden', className)}>
      <div
        className="flex min-w-full shrink-0 animate-scroll items-center justify-around gap-8"
        style={{
          animationDuration: duration,
          animationDirection: animationDirection
        }}
      >
        {children}
      </div>
      <div
        className="flex min-w-full shrink-0 animate-scroll items-center justify-around gap-8"
        style={{
          animationDuration: duration,
          animationDirection: animationDirection
        }}
      >
        {children}
      </div>
      <div
        className="flex min-w-full shrink-0 animate-scroll items-center justify-around gap-8"
        style={{
          animationDuration: duration,
          animationDirection: animationDirection
        }}
      >
        {children}
      </div>
    </div>
  )
}
