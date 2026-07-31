import { HOUSE_THEMES, HOUSE_ORDER } from '../../config/houseThemes'
import HouseCard from './HouseCard'

export default function HousePicker({ selected, onSelect }) {
  return (
    <div className="w-full max-w-sm">
      <p className="mb-3 text-center font-ui text-sm uppercase tracking-[0.2em] text-[rgba(244,236,216,0.7)]">
        Choose your house
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {HOUSE_ORDER.map((key) => (
          <HouseCard key={key} house={HOUSE_THEMES[key]} selected={selected === key} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}
