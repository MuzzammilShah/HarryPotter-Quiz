import { motion } from 'framer-motion'
import HouseCrest from '../common/HouseCrest'

export default function HouseCard({ house, selected, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(house.key)}
      className={`themed-transition group flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 ${
        selected
          ? 'border-[var(--theme-secondary)] bg-[rgba(var(--theme-primary-rgb),0.35)] shadow-[0_0_28px_rgba(var(--theme-secondary-rgb),0.4)]'
          : 'border-[rgba(244,236,216,0.15)] bg-[rgba(10,15,30,0.4)] hover:border-[rgba(244,236,216,0.4)]'
      }`}
      style={selected ? { '--theme-primary-rgb': house.primaryRgb, '--theme-secondary-rgb': house.secondaryRgb } : undefined}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.96 }}
    >
      <HouseCrest houseKey={house.key} src={house.crest} size="md" glow={selected} />
      <span className="font-display text-sm font-semibold tracking-wide text-[#f4ecd8]">{house.name}</span>
    </motion.button>
  )
}
