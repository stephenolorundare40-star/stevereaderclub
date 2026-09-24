"use client"

import { useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

type Swatch = {
  hex: string
  name: string
  pantone: string
  use: string
}

const SWATCHES: Swatch[] = [
  { hex: "#1B3A2A", name: "Forest Ink", pantone: "PMS 5535 C", use: "Primary · headings · structure" },
  { hex: "#B0854B", name: "Antique Brass", pantone: "PMS 7562 C", use: "Accent · numerals · marks" },
  { hex: "#FAF7F0", name: "Paper Cream", pantone: "PMS 7527 C", use: "Surface · body ground" },
  { hex: "#F4EEE0", name: "Margin", pantone: "PMS 7528 C", use: "Quiet panels · dividers" },
  { hex: "#6B6157", name: "Sepia Footnote", pantone: "PMS 405 C", use: "Secondary text · captions" },
  { hex: "#1A1A1A", name: "Press Black", pantone: "PMS BLACK 6 C", use: "Body text · max contrast" },
  { hex: "#8C6F3F", name: "Old Brass", pantone: "PMS 871 C", use: "Quiet accent · underlines" },
  { hex: "#3E5C4A", name: "Sage Vellum", pantone: "PMS 5605 C", use: "Tonal support · borders" },
]

export function PaletteStrip() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const reduce = useReducedMotion()

  // Subtle parallax: as the cursor moves over the strip horizontally, the
  // row of swatches shifts a few pixels. The effect mimics the small drift
  // of a film strip moving past a gate.
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !trackRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width
    const drift = (relX - 0.5) * -22
    trackRef.current.style.transform = `translateX(${drift}px)`
  }

  const onLeave = () => {
    if (trackRef.current) trackRef.current.style.transform = "translateX(0)"
  }

  return (
    <section className="py-20 md:py-28">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="flex items-end justify-between border-b border-primary/15 pb-5 mb-10 md:mb-14">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">
              Colour System
            </p>
            <h2 className="mt-2 font-serif text-3xl md:text-5xl font-semibold leading-[1.05] text-primary text-balance">
              A palette scrubbed like a film strip.
            </h2>
          </div>
          <p className="hidden md:block text-[11px] uppercase tracking-[0.25em] text-foreground/55 font-medium">
            Hover to drift
          </p>
        </div>

        <div
          className="overflow-hidden -mx-5 md:-mx-8 px-5 md:px-8"
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          <div
            ref={trackRef}
            className="flex gap-4 md:gap-6 transition-transform duration-300 ease-out"
          >
            {SWATCHES.map((s, i) => (
              <motion.article
                key={s.hex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: reduce ? 0 : 0.5,
                  delay: reduce ? 0 : i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                className="flex-none w-[200px] md:w-[260px] cursor-default"
              >
                <div
                  className="aspect-[3/4] rounded-sm border border-primary/15 relative overflow-hidden"
                  style={{ background: s.hex }}
                >
                  <span className="absolute top-3 left-3 text-[10px] font-mono text-white/85 mix-blend-difference">
                    {s.pantone}
                  </span>
                  <span className="absolute bottom-3 right-3 text-[10px] font-mono text-white/85 mix-blend-difference">
                    {i + 1} / {SWATCHES.length}
                  </span>
                  {/* Perforations like film strip */}
                  <span className="absolute top-0 left-0 right-0 h-2 flex justify-around">
                    {Array.from({ length: 6 }).map((_, k) => (
                      <span
                        key={k}
                        className="h-1.5 w-1.5 rounded-full bg-background/35"
                      />
                    ))}
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 h-2 flex justify-around">
                    {Array.from({ length: 6 }).map((_, k) => (
                      <span
                        key={k}
                        className="h-1.5 w-1.5 rounded-full bg-background/35"
                      />
                    ))}
                  </span>
                </div>
                <div className="mt-3 px-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-serif text-lg font-semibold text-primary">
                      {s.name}
                    </p>
                    <p className="font-mono text-[11px] text-foreground/55">
                      {s.hex}
                    </p>
                  </div>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-foreground/55 font-medium">
                    {s.use}
                  </p>
                  <motion.p
                    className="mt-2 text-xs text-accent font-medium"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoverIndex === i ? 1 : 0,
                      height: hoverIndex === i ? "auto" : 0,
                    }}
                  >
                    {s.pantone} · print-safe · CMYK fallback available
                  </motion.p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
