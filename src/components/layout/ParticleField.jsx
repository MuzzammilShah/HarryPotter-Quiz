import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const PARTICLE_COUNT = 32

export default function ParticleField() {
  const canvasRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.4,
      speed: Math.random() * 0.15 + 0.03,
      drift: (Math.random() - 0.5) * 0.08,
      twinkle: Math.random() * Math.PI * 2,
    }))

    let rafId
    let running = true

    function resize() {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', resize)

    function tick() {
      if (!running) return
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.y -= p.speed
        p.x += p.drift
        p.twinkle += 0.02
        if (p.y < -5) p.y = height + 5
        if (p.x < -5) p.x = width + 5
        if (p.x > width + 5) p.x = -5

        const opacity = 0.35 + Math.sin(p.twinkle) * 0.25
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(244, 236, 216, ${Math.max(0, opacity)})`
        ctx.fill()
      }
      rafId = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      running = false
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 -z-[5] h-full w-full"
      aria-hidden="true"
    />
  )
}
