"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

type Spread = {
  n: string
  kicker: string
  title: string
  body: string
  pull: string
  image: string
  caption: string
}

const SPREADS: Spread[] = [
  {
    n: "01",
    kicker: "Selection",
    title: "Choosing the Fifteen",
    body:
      "The cycle opens with the committee reading hundreds of independent titles. Each manuscript is read in full, annotated, and argued over in a closed session chaired by Prof Stephen. We look for literary merit first, narrative craft second, and a willingness to be read slowly. The fifteen that survive this stage are not the loudest books of the year, they are the ones that reward sustained attention.",
    pull:
      "Fifteen books. One year. No commercial pressure, no pay-to-play, no shortcuts.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/997b0586cc63.jpg",
    caption: "Committee reading room · Lagos Hub",
  },
  {
    n: "02",
    kicker: "Onboarding",
    title: "The Author Liaison",
    body:
      "When a book is accepted, the author is paired with a dedicated committee liaison. Together they walk through the manuscript one more time, identify the themes that will resonate most with our readers, and shape the reading pathway for the months ahead. This is not a marketing meeting. It is a working session between two people who care about how the book will be read.",
    pull:
      "A working session, not a marketing meeting. The author is in the room from day one.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/765aeda76bf9.jpg",
    caption: "Liaison desk · manuscript in hand",
  },
  {
    n: "03",
    kicker: "Deep-Dive",
    title: "Structured Reading",
    body:
      "Across the year, members move through curated chapters and themes at a measured pace. Guided reading notes surface the textures most readers miss on a first pass. Live salon discussions replace the scatter of surface-level online commentary. Author Q&A sessions close each stage so the conversation does not end where the page does.",
    pull:
      "Members move through the book the way it was written, deliberately.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6f1bfb635e5b.jpeg",
    caption: "Salon evening · member session",
  },
  {
    n: "04",
    kicker: "Velocity",
    title: "Review Velocity",
    body:
      "As readers complete each stage, considered reviews begin to land on major reading platforms. This is the natural product of genuine engagement, not coordinated marketing. The benchmark is one hundred and fifty high-quality review clusters per selection across the annual cycle. The number is a by-product, never the goal.",
    pull:
      "150+ review clusters per title. The by-product of readers who finish.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1491012376fd.jpeg",
    caption: "Annotated first edition · reader copy",
  },
  {
    n: "05",
    kicker: "Recognition",
    title: "Permanent Weight",
    body:
      "By the close of the cycle, the book carries a body of analytical commentary that does not fade. It becomes a reference work within our hub and a recognised title in the broader independent literature community. Long-tail momentum is not a strategy we apply at the end. It is the structure of the entire year.",
    pull:
      "A book that does not fade after launch week. Twelve months of weight.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/063323f86cf2.jpg",
    caption: "Reference shelf · permanent file",
  },
]

export function CycleSpreads() {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const next = () => setIndex((i) => (i + 1) % SPREADS.length)
  const go = (i: number) => setIndex(i)

  // Auto-advance every 7 seconds, paused on user interaction / reduced motion
  useEffect(() => {
    if (reduce) return
    let paused = false
    const onHover = () => (paused = true)
    const onLeave = () => (paused = false)
    const root = document.getElementById("spreads-root")
    root?.addEventListener("pointerenter", onHover)
    root?.addEventListener("pointerleave", onLeave)

    autoRef.current = setInterval(() => {
      if (paused) return
      setIndex((i) => (i + 1) % SPREADS.length)
    }, 7000)

    return () => {
      if (autoRef.current) clearInterval(autoRef.current)
      root?.removeEventListener("pointerenter", onHover)
      root?.removeEventListener("pointerleave", onLeave)
    }
  }, [reduce])

  const spread = SPREADS[index]

  return (
    <section
      id="spreads"
      className="py-20 md:py-32 bg-primary text-primary-foreground"
    >
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Section header */}
        <div className="flex items-end justify-between border-b border-primary-foreground/20 pb-5 mb-10 md:mb-14">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">
              Section 02 · The Annual Cycle
            </p>
            <h2 className="mt-2 font-serif text-3xl md:text-5xl font-semibold leading-[1.05] text-balance">
              Five spreads. One year-long residency.
            </h2>
          </div>
          <p className="hidden md:block text-[11px] uppercase tracking-[0.25em] text-primary-foreground/60 font-medium">
            Cross-fade · horizontal slide
          </p>
        </div>

        <div id="spreads-root" className="relative">
          {/* Spread viewport */}
          <div className="relative min-h-[640px] md:min-h-[560px]">
            <AnimatePresence mode="wait">
              <motion.article
                key={spread.n}
                initial={{
                  opacity: 0,
                  x: reduce ? 0 : 60,
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: reduce ? 0 : -60,
                }}
                transition={{
                  duration: reduce ? 0 : 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="grid lg:grid-cols-12 gap-8 lg:gap-12"
              >
                {/* Image side */}
                <div className="lg:col-span-6 order-2 lg:order-1">
                  <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-primary-foreground/5">
                    <Image
                      src={spread.image}
                      alt={spread.caption}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover grayscale-[15%] contrast-[1.05]"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-primary-foreground/15 pointer-events-none" />
                    <figcaption className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-primary-foreground/85 font-medium">
                      <span>Fig. {spread.n}</span>
                      <span>{spread.caption}</span>
                    </figcaption>
                  </figure>
                </div>

                {/* Copy side */}
                <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col">
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-6xl md:text-7xl font-semibold text-accent leading-none">
                      {spread.n}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.25em] text-primary-foreground/55 font-medium">
                      {spread.kicker}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-3xl md:text-4xl font-semibold leading-tight text-balance">
                    {spread.title}
                  </h3>
                  <p className="mt-5 text-base md:text-lg leading-relaxed text-primary-foreground/75 text-pretty">
                    {spread.body}
                  </p>
                  <blockquote className="mt-7 pl-5 border-l-2 border-accent font-serif text-lg md:text-xl italic leading-snug text-primary-foreground text-balance">
                    {spread.pull}
                  </blockquote>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Spread navigator */}
          <div className="mt-10 md:mt-14 border-t border-primary-foreground/20 pt-6 flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              {SPREADS.map((s, i) => (
                <button
                  key={s.n}
                  onClick={() => go(i)}
                  className={`group flex items-baseline gap-2 px-3 md:px-4 py-2 transition-colors ${
                    i === index
                      ? "text-accent"
                      : "text-primary-foreground/60 hover:text-primary-foreground"
                  }`}
                  aria-label={`Go to spread ${s.n}`}
                  aria-current={i === index}
                >
                  <span className="font-mono text-[11px]">{s.n}</span>
                  <span className="hidden md:inline text-xs uppercase tracking-[0.2em] font-medium">
                    {s.kicker}
                  </span>
                  <span
                    className={`block h-px transition-all duration-500 ${
                      i === index
                        ? "w-12 bg-accent"
                        : "w-4 bg-primary-foreground/30 group-hover:bg-primary-foreground/60"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              onClick={next}
              className="group inline-flex items-center gap-2 text-sm font-medium text-primary-foreground hover:text-accent transition-colors"
            >
              <span className="hidden md:inline uppercase tracking-[0.2em] text-[11px]">
                Next Spread
              </span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/30 group-hover:border-accent group-hover:bg-accent group-hover:text-primary transition-colors">
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
