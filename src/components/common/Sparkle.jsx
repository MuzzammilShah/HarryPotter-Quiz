import { motion } from 'framer-motion'

export default function Sparkle({ className = '', delay = 0 }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={className}
      initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
      animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.6], rotate: 20 }}
      transition={{ duration: 1.1, delay, ease: 'easeOut' }}
      fill="currentColor"
    >
      <path d="M12 0c.6 4.8 2.2 6.4 7 7-4.8.6-6.4 2.2-7 7-.6-4.8-2.2-6.4-7-7 4.8-.6 6.4-2.2 7-7z" />
    </motion.svg>
  )
}
