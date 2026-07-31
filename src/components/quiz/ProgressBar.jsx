import { motion } from 'framer-motion'

export default function ProgressBar({ current, total }) {
  const pct = ((current + 1) / total) * 100

  return (
    <div className="relative h-1.5 w-full max-w-xs rounded-full bg-[rgba(244,236,216,0.15)]">
      <motion.div
        className="h-full rounded-full bg-[var(--theme-secondary)]"
        style={{ boxShadow: '0 0 12px rgba(var(--theme-secondary-rgb), 0.7)' }}
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white"
        style={{ boxShadow: '0 0 10px 3px rgba(255,255,255,0.8)' }}
        initial={false}
        animate={{ left: `calc(${pct}% - 6px)` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  )
}
