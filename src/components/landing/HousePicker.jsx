import { HOUSE_THEMES, HOUSE_ORDER } from '../../config/houseThemes'
import HouseCard from './HouseCard'

export default function HousePicker({ selected, onSelect }) {
  return (
    <div className="w-full max-w-2xl">
      <p className="mb-4 text-center font-ui text-sm uppercase tracking-[0.2em] text-[rgba(244,236,216,0.7)]">
        Choose your house
      </p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 px-2 py-3 sm:grid-cols-4 sm:gap-x-5">
        {HOUSE_ORDER.map((key) => (
          <HouseCard key={key} house={HOUSE_THEMES[key]} selected={selected === key} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}
