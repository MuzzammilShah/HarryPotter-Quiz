import { useRef } from 'react'
import { useHouseTheme } from '../../hooks/useHouseTheme'
import ThemedBackground from './ThemedBackground'
import ParticleField from './ParticleField'
import Footer from './Footer'

export default function AppShell({ house, children }) {
  const rootRef = useRef(null)
  const theme = useHouseTheme(rootRef, house)

  return (
    <div
      ref={rootRef}
      className="themed-transition relative z-0 min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: '#05070f' }}
    >
      <ThemedBackground theme={theme} />
      <ParticleField />
      <div className="relative z-10 flex min-h-screen flex-col">
        {children}
        <Footer />
      </div>
    </div>
  )
}
