"use client"

import { useEffect, useRef } from "react"

/**
 * Risograph dot trail cursor effect.
 *
 * On devices with a fine pointer (mouse/trackpad) we spawn a stream of small
 * dots that follow the cursor and fade out, mimicking a Risograph print
 * registration mark. On touch devices the effect is skipped entirely.
 *
 * Implementation notes:
 *  - We use a single requestAnimationFrame loop and a pool of <span> elements
 *    so we do not thrash the DOM with appendChild on every move event.
 *  - Dots are tinted with the accent (brass) colour at low opacity, sized
 *    6-12px, and absolutely positioned within a fixed full-viewport layer.
 *  - The trail auto-disables when the system prefers reduced motion.
 */

type Dot = {
  el: HTMLSpanElement
  x: number
  y: number
  vx: number
  vy: number
  life: number
  born: number
}

const POOL = 24
const DOT_LIFETIME = 900 // ms

export function CursorTrail() {
  const layerRef = useRef<HTMLDivElement | null>(null)
  const dotsRef = useRef<Dot[]>([])
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -100,
    y: -100,
    active: false,
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const isCoarse = window.matchMedia("(pointer: coarse)").matches
    if (prefersReduced || isCoarse) return

    const layer = layerRef.current
    if (!layer) return

    // Build the dot pool once
    const dots: Dot[] = []
    for (let i = 0; i < POOL; i++) {
      const el = document.createElement("span")
      el.setAttribute("data-cursor-dot", "true")
      el.style.cssText =
        "position:absolute;left:0;top:0;width:8px;height:8px;border-radius:9999px;background:radial-gradient(circle, rgba(176,133,75,0.85) 0%, rgba(176,133,75,0) 70%);transform:translate3d(-100px,-100px,0);pointer-events:none;will-change:transform,opacity;mix-blend-mode:multiply;"
      layer.appendChild(el)
      dots.push({
        el,
        x: -100,
        y: -100,
        vx: 0,
        vy: 0,
        life: 0,
        born: 0,
      })
    }
    dotsRef.current = dots

    let lastSpawn = 0
    const onMove = (e: PointerEvent) => {
      pointerRef.current.x = e.clientX
      pointerRef.current.y = e.clientY
      pointerRef.current.active = true

      const now = performance.now()
      if (now - lastSpawn < 22) return // ~45 Hz spawn rate
      lastSpawn = now

      // find a free dot
      const dot = dots.find((d) => performance.now() - d.born > DOT_LIFETIME)
      if (!dot) return
      dot.x = e.clientX
      dot.y = e.clientY
      dot.vx = (Math.random() - 0.5) * 0.6
      dot.vy = (Math.random() - 0.5) * 0.6
      dot.born = now
      dot.life = 1
    }

    const onLeave = () => {
      pointerRef.current.active = false
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerleave", onLeave, { passive: true })

    let raf = 0
    const loop = () => {
      const now = performance.now()
      for (const dot of dots) {
        const age = now - dot.born
        if (age > DOT_LIFETIME) {
          dot.life = 0
          continue
        }
        const t = age / DOT_LIFETIME
        const op = (1 - t) * 0.5
        const scale = 1 + t * 1.2
        dot.x += dot.vx
        dot.y += dot.vy
        dot.el.style.opacity = op.toFixed(3)
        dot.el.style.transform = `translate3d(${dot.x - 4}px, ${
          dot.y - 4
        }px, 0) scale(${scale.toFixed(2)})`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerleave", onLeave)
      cancelAnimationFrame(raf)
      for (const dot of dots) dot.el.remove()
    }
  }, [])

  return (
    <div
      ref={layerRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9998,
      }}
    />
  )
}
