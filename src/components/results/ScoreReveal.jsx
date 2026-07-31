import { useEffect, useState } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'

export default function ScoreReveal({ score, total }) {
  const [display, setDisplay] = useState(0)
  const count = useMotionValue(0)

  useEffect(() => {
    const controls = animate(count, score, {
      duration: 1.1,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [score, count])

  return (
    <motion.div
      className="text-glow-gold flex items-baseline gap-1.5 font-display text-5xl font-bold text-[#f4ecd8] sm:gap-2 sm:text-6xl"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span>{display}</span>
      <span className="text-2xl text-[rgba(244,236,216,0.6)] sm:text-3xl">/{total}</span>
    </motion.div>
  )
}
