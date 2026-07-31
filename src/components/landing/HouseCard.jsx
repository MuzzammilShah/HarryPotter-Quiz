import { motion } from 'framer-motion'
import HouseCrest from '../common/HouseCrest'

export default function HouseCard({ house, selected, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(house.key)}
      className={`themed-transition group flex min-w-[6rem] flex-col items-center gap-2 rounded-xl border px-3 py-4 sm:min-w-[7rem] sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-5 ${
        selected
          ? 'border-[var(--theme-secondary)] bg-[rgba(var(--theme-primary-rgb),0.35)] shadow-[0_0_28px_rgba(var(--theme-secondary-rgb),0.4)]'
          : 'border-[rgba(244,236,216,0.15)] bg-[rgba(10,15,30,0.4)] hover:border-[rgba(244,236,216,0.4)]'
      }`}
      style={selected ? { '--theme-primary-rgb': house.primaryRgb, '--theme-secondary-rgb': house.secondaryRgb } : undefined}
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
    >
      <HouseCrest houseKey={house.key} src={house.crest} size="md" glow={selected} className="!h-16 !w-16 sm:!h-24 sm:!w-24" />
      <span className="font-display text-xs font-semibold tracking-wide text-[#f4ecd8] sm:text-sm">{house.name}</span>
    </motion.button>
  )
}
