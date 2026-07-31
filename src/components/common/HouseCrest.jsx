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
//
// `primaryRgb`/`secondaryRgb` accept literal "r, g, b" strings so this
// component can be used inside html-to-image export targets, where CSS
// custom properties set via style.setProperty() on a distant ancestor are
// unreliable — pass the resolved theme's own values explicitly there
// instead of relying on var(--theme-*) lookups.
//
// `flatten` disables mix-blend-mode (also unreliable under html-to-image)
// and instead matches the card background to solid black so opaque-bg
// crests still look correct when exported.
export default function HouseCrest({
  houseKey,
  src,
  size = 'md',
  glow = false,
  className = '',
  primaryRgb = 'var(--theme-primary-rgb)',
  secondaryRgb = 'var(--theme-secondary-rgb)',
  flatten = false,
}) {
  const needsBlend = CRESTS_NEEDING_BLEND.has(houseKey) && !flatten
  const needsSolidCard = CRESTS_NEEDING_BLEND.has(houseKey) && flatten

  return (
    <div
      className={`relative flex items-center justify-center rounded-full ${SIZES[size]} ${className}`}
      style={{
        background: needsSolidCard
          ? '#050505'
          : `radial-gradient(circle at 50% 40%, rgba(${primaryRgb}, 0.55), rgba(5,7,15,0.92) 75%)`,
        boxShadow: glow
          ? `0 0 28px rgba(${secondaryRgb}, 0.45), inset 0 0 20px rgba(0,0,0,0.5)`
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
