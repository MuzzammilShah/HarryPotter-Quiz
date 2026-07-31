import { useImageFallback } from '../../hooks/useImageFallback'

// Renders the house/default background image; on load failure (all house
// backgrounds are currently unreleased placeholders), falls back to a CSS
// gradient built from the theme's own colors, scrimmed for legibility.
export default function ThemedBackground({ theme }) {
  const { failed, onError } = useImageFallback(theme.background)

  return (
    <div className="themed-transition absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {!failed && (
        <img
          key={theme.key}
          src={theme.background}
          onError={onError}
          alt=""
          className="h-full w-full object-cover opacity-60"
        />
      )}
      <div
        className="themed-transition absolute inset-0"
        style={
          failed
            ? {
                background: `linear-gradient(160deg, var(--theme-primary) 0%, #05070f 55%, var(--theme-secondary) 160%)`,
              }
            : {
                background:
                  'linear-gradient(180deg, rgba(5,7,15,0.55) 0%, rgba(5,7,15,0.75) 60%, rgba(5,7,15,0.95) 100%)',
              }
        }
      />

      {/* pulsing edge glows: left/right on desktop, top/bottom on mobile */}
      <div className="edge-glow edge-glow-a themed-transition" />
      <div className="edge-glow edge-glow-b themed-transition" />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 60% at 50% 0%, rgba(var(--theme-secondary-rgb), 0.12), transparent 60%)',
        }}
      />
    </div>
  )
}
