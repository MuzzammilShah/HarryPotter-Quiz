import { useImageFallback } from '../../hooks/useImageFallback'

// Renders the house/default background image; on load failure (all house
// backgrounds are currently unreleased placeholders), falls back to a CSS
// gradient built from the theme's own colors, scrimmed for legibility.
export default function ThemedBackground({ theme }) {
  const { failed, onError } = useImageFallback(theme.background)

  return (
    <div className="themed-transition absolute inset-0 -z-10" aria-hidden="true">
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
