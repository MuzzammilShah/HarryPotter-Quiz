import { HOUSE_THEMES, HOUSE_ORDER } from '../../config/houseThemes'
import HouseCard from './HouseCard'

export default function HousePicker({ selected, onSelect }) {
  return (
    <div className="w-full max-w-2xl">
      <p className="mb-3 text-center font-ui text-xs uppercase tracking-[0.2em] text-[rgba(244,236,216,0.7)] sm:mb-4 sm:text-sm">
        Choose your house
      </p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-4 px-2 py-2 sm:grid-cols-4 sm:gap-x-5 sm:gap-y-6 sm:py-3">
        {HOUSE_ORDER.map((key) => (
          <HouseCard key={key} house={HOUSE_THEMES[key]} selected={selected === key} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}
