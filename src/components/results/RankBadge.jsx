import { motion } from 'framer-motion'

export default function RankBadge({ rank }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <span className="font-display text-2xl font-semibold text-[var(--theme-secondary)]">{rank.title}</span>
      <p className="max-w-xs font-body text-lg italic text-[rgba(244,236,216,0.75)]">{rank.flavor}</p>
    </motion.div>
  )
}
