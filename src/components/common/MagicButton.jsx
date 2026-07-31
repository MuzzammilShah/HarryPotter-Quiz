import { motion } from 'framer-motion'

export default function MagicButton({
  children,
  onClick,
  disabled = false,
  type = 'button',
  variant = 'primary',
  className = '',
}) {
  const base =
    'inline-flex items-center justify-center rounded-full px-8 py-3.5 font-ui font-semibold text-base tracking-wide transition-shadow duration-300 disabled:cursor-not-allowed disabled:opacity-40'

  const variants = {
    primary:
      'bg-gradient-to-b from-[#f6e3a8] via-[#d3a625] to-[#b8860b] text-[#241a05] shadow-[0_0_24px_rgba(211,166,37,0.45)] hover:shadow-[0_0_36px_rgba(211,166,37,0.65)]',
    ghost:
      'border border-[rgba(244,236,216,0.35)] bg-[rgba(10,15,30,0.4)] text-[#f4ecd8] hover:border-[rgba(244,236,216,0.6)]',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}
