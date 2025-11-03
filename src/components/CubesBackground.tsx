import { motion } from 'framer-motion'

export function CubesBackground() {
  const cubes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {cubes.map((cube) => (
        <motion.div
          key={cube.id}
          className="absolute rounded-lg border border-primary-500/10 bg-primary-500/5"
          style={{
            width: cube.size,
            height: cube.size,
            left: `${cube.x}%`,
            top: `${cube.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: cube.duration,
            delay: cube.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
