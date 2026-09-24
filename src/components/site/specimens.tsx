"use client"

import { useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Minus, Plus, Download, GripHorizontal } from "lucide-react"

type Specimen = {
  id: string
  label: string
  kicker: string
  type: string
  body: string
  source: string
  baseSize: number
}

const SPECIMENS: Specimen[] = [
  {
    id: "sp-01",
    label: "Reading Note · 01",
    kicker: "On Pacing",
    type: "Specimen No. 1",
    body:
      "A book read in three sittings is a different object from a book read in thirty. The committee structures the cycle so that members sit with each chapter long enough to forget its opening. The forgetting is the work. What returns, returns for good.",
    source: "Cycle Reader · Vol. III",
    baseSize: 16,
  },
  {
    id: "sp-02",
    label: "Reading Note · 02",
    kicker: "On Silence",
    type: "Specimen No. 2",
    body:
      "Our salons begin with two minutes of silence. Not ceremony. Practical silence. The reader arrives carrying the noise of the day. Two minutes is enough for that noise to settle. What is said afterwards is said more carefully because of it.",
    source: "Salon Etiquette · Lagos Hub",
    baseSize: 18,
  },
  {
    id: "sp-03",
    label: "Reading Note · 03",
    kicker: "On Margins",
    type: "Specimen No. 3",
    body:
      "We ask members to mark in the margins. Underline, asterisk, question. A clean book is an unread book. The committee collects these annotated copies at the close of each cycle and ships them to the author as a record of the year their book passed through our hands.",
    source: "Annotation Protocol · §4",
    baseSize: 20,
  },
]

export function Specimens() {
  const reduce = useReducedMotion()
  const [scale, setScale] = useState<number>(
    () => SPECIMENS.map(() => 1)
  )

  const bumpScale = (i: number, delta: number) => {
    setScale((prev) => {
      const next = [...prev]
      const target = Math.min(1.6, Math.max(0.6, next[i] + delta))
      next[i] = target
      return next
    })
  }

  return (
    <section
      id="specimens"
      className="py-20 md:py-32 bg-secondary/50 border-y border-primary/10"
    >
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="flex items-end justify-between border-b border-primary/15 pb-5 mb-10 md:mb-14">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">
              Section 03 · Reading Specimens
            </p>
            <h2 className="mt-2 font-serif text-3xl md:text-5xl font-semibold leading-[1.05] text-primary text-balance">
              Drag the cards. Pinch to resize.
            </h2>
          </div>
          <p className="hidden md:block text-[11px] uppercase tracking-[0.25em] text-foreground/55 font-medium">
            Live type specimens
          </p>
        </div>

        <p className="max-w-2xl text-base md:text-lg leading-relaxed text-foreground/70 text-pretty">
          Three reading notes from the committee archive, rendered as movable
          type specimens. Each card can be dragged anywhere on the workspace,
          and resized with the + and − controls (or pinch on a touch device).
          The cards do not snap back. The page is yours to arrange.
        </p>

        <div
          className="relative mt-10 md:mt-14"
          style={{ minHeight: "560px" }}
        >
          {SPECIMENS.map((spec, i) => {
            const left = 40 + (i % 3) * 28
            const top = 30 + (i % 3) * 90
            return (
              <motion.article
                key={spec.id}
                drag={!reduce}
                dragMomentum={false}
                dragElastic={0.08}
                initial={{
                  opacity: reduce ? 1 : 0,
                  y: reduce ? 0 : 24,
                  x: 0,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: reduce ? 0 : 0.6,
                  delay: reduce ? 0 : i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileDrag={{
                  scale: (scale[i] ?? 1) * 1.02,
                  boxShadow: "0 30px 60px -20px rgba(27, 58, 42, 0.35)",
                }}
                className="absolute"
                style={{
                  left: `${left}%`,
                  top: `${top}px`,
                  width: "min(360px, 80vw)",
                  zIndex: 10 + i,
                }}
              >
                <div
                  className="rounded-sm border border-primary/15 bg-card shadow-[0_18px_40px_-26px_rgba(27,58,42,0.25)] overflow-hidden"
                  style={{
                    transform: `scale(${scale[i] ?? 1})`,
                    transformOrigin: "top left",
                  }}
                >
                  {/* Specimen header */}
                  <div className="flex items-center justify-between border-b border-primary/10 bg-secondary/60 px-4 py-2">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-foreground/65 font-medium">
                      <GripHorizontal className="h-3.5 w-3.5 text-accent" />
                      {spec.label}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => bumpScale(i, -0.1)}
                        className="inline-flex h-6 w-6 items-center justify-center rounded-sm border border-primary/20 text-primary hover:bg-primary/5 transition-colors"
                        aria-label="Shrink specimen"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => bumpScale(i, 0.1)}
                        className="inline-flex h-6 w-6 items-center justify-center rounded-sm border border-primary/20 text-primary hover:bg-primary/5 transition-colors"
                        aria-label="Enlarge specimen"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Specimen body */}
                  <div className="p-5 md:p-6">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
                      {spec.kicker}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-primary">
                      {spec.type}
                    </h3>
                    <p
                      className="mt-4 leading-relaxed text-foreground/80"
                      style={{
                        fontSize: `${spec.baseSize}px`,
                        lineHeight: 1.55,
                      }}
                    >
                      {spec.body}
                    </p>
                    <p className="mt-5 pt-3 border-t border-primary/10 text-[10px] uppercase tracking-[0.2em] text-foreground/55 font-medium">
                      {spec.source}
                    </p>
                  </div>

                  {/* Specimen footer */}
                  <div className="flex items-center justify-between px-5 py-3 border-t border-primary/10 bg-secondary/40">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/55 font-medium">
                      {Math.round((scale[i] ?? 1) * 100)}%
                    </span>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-medium text-primary hover:text-accent transition-colors"
                      onClick={() =>
                        toastSpecimen(spec)
                      }
                    >
                      <Download className="h-3.5 w-3.5" />
                      Save as PDF
                    </button>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        <p className="mt-12 text-center text-xs text-foreground/55 italic">
          The committee will release a printed specimen booklet at the close
          of each annual cycle. Members receive one by post.
        </p>
      </div>
    </section>
  )
}

function toastSpecimen(spec: Specimen) {
  if (typeof window === "undefined") return
  // Print the specimen as a clean PDF via the browser's print dialog.
  const printWindow = window.open("", "_blank", "width=640,height=820")
  if (!printWindow) return
  printWindow.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>${spec.label} — ${spec.type}</title>
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap");
          body { font-family: Inter, system-ui, sans-serif; color: #1A1A1A; background: #FAF7F0; margin: 0; padding: 48px; }
          .wrap { max-width: 540px; margin: 0 auto; border: 1px solid rgba(27,58,42,0.14); padding: 36px 40px; background: #fff; }
          .kicker { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #B0854B; font-weight: 600; }
          h1 { font-family: "Playfair Display", Georgia, serif; color: #1B3A2A; font-size: 28px; margin: 8px 0 20px; font-weight: 600; }
          .body { font-size: 17px; line-height: 1.6; color: #333; }
          .src { margin-top: 24px; padding-top: 14px; border-top: 1px solid rgba(27,58,42,0.12); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #6B6157; }
          .foot { margin-top: 28px; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #888; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <p class="kicker">${spec.label} · ${spec.kicker}</p>
          <h1>${spec.type}</h1>
          <p class="body">${spec.body}</p>
          <p class="src">${spec.source}</p>
          <p class="foot">STEVEREADERCLUB · A Private Literary Society · Est. 2018</p>
        </div>
        <script>window.onload = function(){ window.print(); }</script>
      </body>
    </html>
  `)
  printWindow.document.close()
}
