import { useLayoutEffect } from 'react'
import { getTheme, FEEDBACK_COLORS } from '../config/houseThemes'

// Applies the active theme as CSS custom properties on the given ref's element,
// before paint, so switching houses never flashes the previous palette.
export function useHouseTheme(rootRef, houseKey) {
  const theme = getTheme(houseKey)

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    el.style.setProperty('--theme-primary', theme.primary)
    el.style.setProperty('--theme-primary-rgb', theme.primaryRgb)
    el.style.setProperty('--theme-secondary', theme.secondary)
    el.style.setProperty('--theme-secondary-rgb', theme.secondaryRgb)
    el.style.setProperty('--theme-accent', theme.accent)
    el.style.setProperty('--feedback-correct', FEEDBACK_COLORS.correct)
    el.style.setProperty('--feedback-correct-rgb', FEEDBACK_COLORS.correctRgb)
    el.style.setProperty('--feedback-incorrect', FEEDBACK_COLORS.incorrect)
    el.style.setProperty('--feedback-incorrect-rgb', FEEDBACK_COLORS.incorrectRgb)
  }, [rootRef, theme])

  return theme
}
