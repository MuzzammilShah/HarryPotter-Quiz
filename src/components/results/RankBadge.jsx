import { motion } from 'framer-motion'

export default function RankBadge({ rank }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-1.5 text-center sm:gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <span className="font-display text-xl font-semibold text-[var(--theme-secondary)] sm:text-2xl">{rank.title}</span>
      <p className="max-w-xs font-body text-base italic text-[rgba(244,236,216,0.75)] sm:text-lg">{rank.flavor}</p>
    </motion.div>
  )
}
