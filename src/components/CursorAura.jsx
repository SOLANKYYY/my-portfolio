import { useEffect, useRef } from 'react'

// A soft radial glow that trails the cursor across the whole page, giving
// the flat ivory background a sense of depth. Position updates are written
// to CSS custom properties and read by the .cursor-aura class in index.css,
// so the actual paint work stays on a single composited layer instead of
// re-rendering React on every mouse move.
export default function CursorAura() {
  const auraRef = useRef(null)
  const target = useRef({ x: 0.5, y: 0.5 })
  const current = useRef({ x: 0.5, y: 0.5 })
  const raf = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = auraRef.current
    if (!el) return

    const setVars = (x, y) => {
      el.style.setProperty('--mx', `${x * 100}%`)
      el.style.setProperty('--my', `${y * 100}%`)
    }

    if (reduced) {
      setVars(0.5, 0.35)
      return
    }

    const handleMove = (e) => {
      target.current.x = e.clientX / window.innerWidth
      target.current.y = e.clientY / window.innerHeight
    }

    const tick = () => {
      // Lerp toward the real cursor position so the glow drifts smoothly
      // rather than snapping — cheap (two multiplies) and frame-independent
      // enough at 60fps for this purely decorative effect.
      current.current.x += (target.current.x - current.current.x) * 0.08
      current.current.y += (target.current.y - current.current.y) * 0.08
      setVars(current.current.x, current.current.y)
      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    setVars(0.5, 0.35)
    raf.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('pointermove', handleMove)
    }
  }, [])

  return <div ref={auraRef} className="cursor-aura" aria-hidden="true" />
}
