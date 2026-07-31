import { CRESTS_NEEDING_BLEND } from '../../config/assetPaths'

const SIZES = {
  sm: 'h-16 w-16',
  md: 'h-24 w-24',
  lg: 'h-36 w-36',
  xl: 'h-48 w-48',
}

// Composites a house/hogwarts crest on a dark tinted card. Crests whose
// source PNG has an opaque black background (see CRESTS_NEEDING_BLEND) get
// mix-blend-mode: screen so the black vanishes into the card instead of
// rendering as a visible box.
export default function HouseCrest({ houseKey, src, size = 'md', glow = false, className = '' }) {
  const needsBlend = CRESTS_NEEDING_BLEND.has(houseKey)

  return (
    <div
      className={`themed-transition relative flex items-center justify-center rounded-full ${SIZES[size]} ${className}`}
      style={{
        background:
          'radial-gradient(circle at 50% 40%, rgba(var(--theme-primary-rgb), 0.55), rgba(5,7,15,0.92) 75%)',
        boxShadow: glow
          ? '0 0 28px rgba(var(--theme-secondary-rgb), 0.45), inset 0 0 20px rgba(0,0,0,0.5)'
          : 'inset 0 0 20px rgba(0,0,0,0.5)',
      }}
    >
      <img
        src={src}
        alt=""
        className="h-[78%] w-[78%] object-contain"
        style={needsBlend ? { mixBlendMode: 'screen' } : undefined}
        draggable={false}
      />
    </div>
  )
}
