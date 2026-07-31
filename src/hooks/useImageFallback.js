import { useState } from 'react'

// Tracks whether a given <img src> has failed to load, so callers can
// swap to a CSS fallback instead of showing a broken-image icon.
export function useImageFallback(src) {
  const [failed, setFailed] = useState(false)
  return {
    failed: failed || !src,
    onError: () => setFailed(true),
  }
}
