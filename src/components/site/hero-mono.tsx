"use client"

import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

/**
 * Hero — print monograph name treatment.
 *
 * "STEVEREADERCLUB" is broken into three pieces that animate in sequence
 * on load (kinetic typography). On reduced-motion the page simply renders
 * the final state.
 */

const PARTS = [
  { text: "STEVE", emphasis: false },
  { text: "READER", emphasis: true },
  { text: "CLUB", emphasis: false },
]

export function HeroMono() {
  const reduce = useReducedMotion()

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.18, delayChildren: 0.1 },
    },
  }

  const word = {
    hidden: { y: reduce ? 0 : "110%", opacity: reduce ? 1 : 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: reduce ? 0 : 0.95, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  const line = {
    hidden: { width: reduce ? "100%" : 0 },
    show: {
      width: "100%",
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.4 },
    },
  }

  return (
    <section
      id="top"
      className="relative pt-32 md:pt-40 pb-16 md:pb-24 paper-bg overflow-hidden"
    >
      {/* Top meta strip */}
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="flex items-end justify-between border-b border-primary/15 pb-4 mb-10 md:mb-14">
          <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/55 font-medium">
            Vol. 07 · A Private Literary Society
          </p>
          <p className="hidden md:block text-[11px] uppercase tracking-[0.25em] text-foreground/55 font-medium">
            Edition · MMXXV
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative"
        >
          {/* Oversized name treatment */}
          <h1 className="font-serif font-semibold tracking-[-0.03em] leading-[0.86] text-primary text-[clamp(3.5rem,16vw,16rem)]">
            <span className="block overflow-hidden">
              <motion.span variants={word} className="block">
                {PARTS[0].text}
                <span className="text-accent italic">·</span>
              </motion.span>
            </span>
            <span className="block overflow-hidden -mt-[0.08em]">
              <motion.span variants={word} className="block italic text-accent">
                {PARTS[1].text}
              </motion.span>
            </span>
            <span className="block overflow-hidden -mt-[0.08em]">
              <motion.span variants={word} className="block">
                {PARTS[2].text}
                <span className="text-accent italic">.</span>
              </motion.span>
            </span>
          </h1>

          {/* Animated rule */}
          <motion.div
            variants={line}
            className="h-px bg-primary/40 mt-8 md:mt-12"
          />
        </motion.div>

        {/* Subhead row */}
        <div className="mt-8 md:mt-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <p className="font-serif text-2xl md:text-3xl leading-snug text-primary text-balance">
              Where intellectual curiosity meets companionable consideration.
            </p>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-foreground/70 max-w-xl text-pretty">
              A managed reader experience chaired by Prof Stephen. We connect
              independent authors with an elite global reading community for a
              year-long journey of deep literary engagement.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="#connect"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-7 h-12 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Apply for the Cycle
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#spreads"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 text-primary px-7 h-12 text-sm font-medium hover:bg-primary/5 transition-colors"
              >
                Read the Spreads
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-primary/15">
            <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/55 font-medium">
              From the Chair
            </p>
            <blockquote className="mt-3 font-serif text-xl md:text-2xl italic leading-snug text-primary text-balance">
              &ldquo;We treat literature not as a temporary commodity, but as a
              permanent cultural contribution.&rdquo;
            </blockquote>
            <div className="mt-5 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif font-semibold">
                PS
              </span>
              <div>
                <p className="text-sm font-semibold text-primary">
                  Prof Stephen
                </p>
                <p className="text-xs text-foreground/60">
                  Selection Committee Chair · Est. 2018
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Stats strip */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-4 border-t border-primary/15">
          {[
            { v: "21,000+", l: "Global Hub Members" },
            { v: "2,000+", l: "Active Salon Readers" },
            { v: "150+", l: "Reviews per Selection" },
            { v: "15", l: "Authors Per Annual Cycle" },
          ].map((s, i) => (
            <div
              key={s.l}
              className={`py-6 px-1 md:px-4 ${
                i % 2 === 1 ? "lg:border-l border-primary/15" : ""
              } ${i === 2 || i === 3 ? "border-t lg:border-t-0 border-primary/15" : ""}`}
            >
              <p className="font-serif text-3xl md:text-4xl font-semibold text-primary leading-none">
                {s.v}
              </p>
              <p className="mt-2 text-xs md:text-sm text-foreground/65 leading-snug">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
