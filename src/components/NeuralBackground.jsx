import { useEffect, useRef } from 'react'

// Warm gold-family node colors so the network reads as part of the brand.
const NODE_COLORS = ['#C5A059', '#B8860B', '#E8D5A5']
const LINK_COLOR = '197, 160, 89' // rgb channels for gold, reused at varying alpha
const LINK_DISTANCE = 150
const LINK_DISTANCE_SQ = LINK_DISTANCE * LINK_DISTANCE
const MOUSE_RADIUS = 190
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS
const RESIZE_DEBOUNCE_MS = 150
const POINTER_THROTTLE_MS = 32 // ~30fps sampling is plenty for a repulsion cursor
// Physics is expressed in px/second and integrated against real elapsed
// time, so motion speed stays identical whether the tab is doing 30fps or
// 144fps — no baked-in per-frame assumption.
const BASE_SPEED = 18

export default function NeuralBackground() {
  const canvasRef = useRef(null)
  const stateRef = useRef({
    nodes: [],
    mouse: { x: -9999, y: -9999 },
    raf: null,
    resizeTimer: null,
    reduced: false,
    visible: true,
    lastPointerSample: 0,
    lastFrameTime: 0,
    width: 0,
    height: 0,
    dpr: 1,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })
    const state = stateRef.current
    state.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Node budget scales down on high-DPI screens — a 3x-DPR phone already
    // pays a 9x fill-rate tax per pixel, so it gets fewer, not more, nodes.
    const dprBudgetFactor = () => {
      const dpr = window.devicePixelRatio || 1
      if (dpr >= 3) return 0.55
      if (dpr >= 2) return 0.75
      return 1
    }

    const nodeCountFor = (w, h) => {
      const raw = Math.round((w * h) / 15000)
      const budget = Math.round(raw * dprBudgetFactor())
      return Math.max(30, Math.min(100, budget))
    }

    const seedNodes = () => {
      const { width, height } = state
      const count = nodeCountFor(width, height)
      state.nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * BASE_SPEED,
        vy: (Math.random() - 0.5) * BASE_SPEED,
        r: Math.random() * 1.5 + 1,
        color: NODE_COLORS[(Math.random() * NODE_COLORS.length) | 0],
      }))
    }

    const applyCanvasSize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      state.width = rect.width
      state.height = rect.height
      // Cap DPR at 1.5 — visually indistinguishable from 2-3x here, but a
      // meaningful cut to the pixel count the GPU has to fill every frame.
      state.dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = state.width * state.dpr
      canvas.height = state.height * state.dpr
      canvas.style.width = `${state.width}px`
      canvas.style.height = `${state.height}px`
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0)
      seedNodes()
    }

    // Debounced resize — avoids re-seeding/reflowing on every intermediate
    // pixel during a drag-resize or viewport change.
    const scheduleResize = () => {
      clearTimeout(state.resizeTimer)
      state.resizeTimer = setTimeout(applyCanvasSize, RESIZE_DEBOUNCE_MS)
    }

    const drawFrame = () => {
      const { nodes, mouse, width, height } = state
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        const aDx = a.x - mouse.x
        const aDy = a.y - mouse.y
        const aNearMouse = aDx * aDx + aDy * aDy < MOUSE_RADIUS_SQ

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distSq = dx * dx + dy * dy
          if (distSq >= LINK_DISTANCE_SQ) continue

          const bDx = b.x - mouse.x
          const bDy = b.y - mouse.y
          const nearMouse = aNearMouse || bDx * bDx + bDy * bDy < MOUSE_RADIUS_SQ

          const base = (1 - Math.sqrt(distSq) / LINK_DISTANCE) * 0.4
          const opacity = nearMouse ? Math.min(base * 2.2, 0.85) : base
          ctx.strokeStyle = `rgba(${LINK_COLOR}, ${opacity})`
          ctx.lineWidth = nearMouse ? 1.1 : 0.6
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      for (const n of nodes) {
        const dx = n.x - mouse.x
        const dy = n.y - mouse.y
        const nearMouse = dx * dx + dy * dy < MOUSE_RADIUS_SQ
        ctx.beginPath()
        ctx.arc(n.x, n.y, nearMouse ? n.r * 1.6 : n.r, 0, Math.PI * 2)
        ctx.fillStyle = n.color
        ctx.globalAlpha = nearMouse ? 1 : 0.85
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    const step = (now) => {
      // requestAnimationFrame is only ever scheduled while the section is
      // in view and the tab is foregrounded — see the IntersectionObserver
      // and visibilitychange wiring below. That covers "disable off-screen
      // rendering": no rAF calls happen when there's nothing to see.
      const { nodes, mouse, width, height } = state
      const dt = state.lastFrameTime ? Math.min((now - state.lastFrameTime) / 1000, 0.05) : 0
      state.lastFrameTime = now

      for (const n of nodes) {
        n.x += n.vx * dt
        n.y += n.vy * dt
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1

        const dx = n.x - mouse.x
        const dy = n.y - mouse.y
        const distSq = dx * dx + dy * dy
        if (distSq < MOUSE_RADIUS_SQ) {
          const dist = Math.sqrt(distSq) || 1
          const force = (1 - dist / MOUSE_RADIUS) * 30 * dt
          n.x += (dx / dist) * force
          n.y += (dy / dist) * force
        }
      }

      drawFrame()
      state.raf = requestAnimationFrame(step)
    }

    const handlePointerMove = (e) => {
      const now = performance.now()
      if (now - state.lastPointerSample < POINTER_THROTTLE_MS) return
      state.lastPointerSample = now
      const rect = canvas.getBoundingClientRect()
      state.mouse.x = e.clientX - rect.left
      state.mouse.y = e.clientY - rect.top
    }
    const handlePointerLeave = () => {
      state.mouse.x = -9999
      state.mouse.y = -9999
    }

    const startLoop = () => {
      if (state.raf) return
      state.lastFrameTime = 0
      state.raf = requestAnimationFrame(step)
    }
    const stopLoop = () => {
      if (state.raf) cancelAnimationFrame(state.raf)
      state.raf = null
    }

    applyCanvasSize()

    if (state.reduced) {
      // Single static frame for reduced-motion users — no rAF loop at all.
      drawFrame()
    } else {
      startLoop()
    }

    const ro = new ResizeObserver(scheduleResize)
    ro.observe(canvas.parentElement)

    // Pause the animation entirely when the canvas scrolls out of view or
    // the tab is backgrounded — this is the "disable off-screen canvas
    // rendering" requirement, not just a lighter draw call.
    const io = new IntersectionObserver(
      ([entry]) => {
        state.visible = entry.isIntersecting
        if (state.reduced) return
        if (state.visible && document.visibilityState === 'visible') startLoop()
        else stopLoop()
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    const handleVisibilityChange = () => {
      if (state.reduced) return
      if (document.visibilityState === 'visible' && state.visible) startLoop()
      else stopLoop()
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      stopLoop()
      clearTimeout(state.resizeTimer)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
      aria-hidden="true"
    />
  )
}
