"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  BookOpen,
  Users,
  Compass,
  Library,
  Award,
  Quote,
  Shield,
} from "lucide-react"
import { CursorTrail } from "@/components/site/cursor-trail"
import { SiteHeader } from "@/components/site/site-header"
import { HeroMono } from "@/components/site/hero-mono"
import { CycleSpreads } from "@/components/site/cycle-spreads"
import { Specimens } from "@/components/site/specimens"
import { PaletteStrip } from "@/components/site/palette-strip"
import { Talks as TalksSection } from "@/components/site/talks"
import { BookSearch } from "@/components/site/book-search"
import { ContactForm } from "@/components/site/contact-form"
import { SiteFooter } from "@/components/site/site-footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <CursorTrail />
      <SiteHeader />
      <main className="flex-1">
        <HeroMono />
        <Manifesto />
        <CycleSpreads />
        <Engagement />
        <Specimens />
        <PaletteStrip />
        <Committee />
        <Voices />
        <TalksSection />
        <Founding />
        <BookSearch />
        <Connect />
      </main>
      <SiteFooter />
    </div>
  )
}

/* ============================================================ *
 * 01 · MANIFESTO
 * ============================================================ */
function Manifesto() {
  const reduce = useReducedMotion()
  return (
    <section
      id="manifesto"
      className="py-20 md:py-32 border-b border-primary/10"
    >
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">
              Section 01
            </p>
            <p className="mt-2 font-serif text-2xl font-semibold text-primary">
              Manifesto
            </p>
            <div className="mt-5 h-px w-16 bg-accent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-9"
          >
            <p className="font-serif text-2xl md:text-3xl lg:text-[2.4rem] leading-[1.25] tracking-tight text-primary text-balance">
              STEVEREADERCLUB bridges literature, human progress, and
              community. We scout independent works that deserve a legacy
              spotlight, and we introduce those authors to a network of
              deeply engaged thinkers.
            </p>
            <p className="mt-7 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/70 text-pretty">
              We treat literature not as a temporary commodity, but as a
              permanent cultural contribution. The work of this society is
              to make sure a small number of carefully chosen books are read
              the way they were written — slowly, with company, and with
              their full weight felt.
            </p>

            <div className="mt-12 grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: Compass,
                  title: "Independent Curation",
                  body:
                    "We scout exceptional, independently published works that deserve a legacy spotlight. No pay-to-play, no commercial shortcuts. Every selection is read, debated, and chosen for its lasting contribution to literature.",
                },
                {
                  icon: Users,
                  title: "A Disciplined Reader Base",
                  body:
                    "Our members are not casual browsers. They are committed readers who finish, annotate, and discuss. That discipline is what turns a good book into a benchmark work on major reading platforms.",
                },
                {
                  icon: Library,
                  title: "Long-Tail Recognition",
                  body:
                    "We do not chase the spike of a launch week. We design momentum that lasts a full year, building review velocity and intellectual weight that compounds long after the press cycle moves on.",
                },
              ].map((p, i) => {
                const Icon = p.icon
                return (
                  <motion.article
                    key={p.title}
                    initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: reduce ? 0 : 0.5,
                      delay: reduce ? 0 : i * 0.1,
                    }}
                    className="border-t border-primary/15 pt-5"
                  >
                    <Icon className="h-5 w-5 text-accent mb-3" />
                    <h3 className="font-serif text-xl font-semibold text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                      {p.body}
                    </p>
                  </motion.article>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================ *
 * Engagement & Review Velocity
 * ============================================================ */
function Engagement() {
  const reduce = useReducedMotion()
  return (
    <section className="py-20 md:py-28">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">
              High-Signal Engagement
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl font-semibold leading-[1.05] tracking-tight text-primary text-balance">
              Authentic feedback that compounds into review velocity.
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-foreground/70 text-pretty">
              Our community thrives on considered commentary. Through private
              channels and active social salons, we generate analytical
              discussion that reflects the true depth of a work. This
              structured engagement translates into a benchmark of one
              hundred and fifty high-quality review clusters on major
              reading platforms — proof that when the right minds meet the
              right text, impact follows.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Private salon channels with moderated, high-signal discussion.",
                "Guided reading notes that surface themes most readers miss.",
                "Author Q&A sessions hosted across the annual cycle.",
                "Considered reviews that land on major reading platforms as a natural by-product.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent/15 text-accent text-[11px]">
                    ✓
                  </span>
                  <span className="text-[15px] leading-relaxed text-foreground/80">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="lg:col-span-5">
            <div className="rounded-sm border border-primary/15 bg-secondary/40 p-8 md:p-10 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif">
                  150
                </span>
                <p className="text-[11px] uppercase tracking-[0.25em] text-primary font-medium">
                  Review Velocity Benchmark
                </p>
              </div>
              <p className="mt-6 font-serif text-6xl md:text-7xl font-semibold text-primary leading-none">
                150+
              </p>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                High-quality review clusters per selected title across the
                annual cycle. Not coordinated marketing. The natural product
                of readers finishing, thinking, and writing about a book
                they were guided through with care.
              </p>
              <div className="mt-8 pt-6 border-t border-primary/15">
                <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/55 font-medium">
                  What it means for authors
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">
                  A book that enters our cycle does not fade after launch
                  week. It accumulates considered commentary for twelve
                  months and carries that weight forward into permanent
                  recognition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================ *
 * Committee — Prof Stephen
 * ============================================================ */
function Committee() {
  const reduce = useReducedMotion()
  return (
    <section
      id="committee"
      className="py-20 md:py-28 bg-secondary/50 border-y border-primary/10"
    >
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: reduce ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">
              Section 04 · The Selection Committee
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl font-semibold leading-[1.05] text-primary text-balance">
              A small committee that reads the way good editors used to read.
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-foreground/70 text-pretty">
              Our curation is steered by Prof Stephen, alongside literary
              specialists, academic minds, and cultural curators. The
              committee reviews hundreds of independent titles each year to
              find the rare few that meet our standard for intellectual
              depth.
            </p>

            <div className="mt-8 rounded-sm border border-primary/15 bg-card p-5">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-14 w-14 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-xl font-semibold">
                  PS
                </span>
                <div>
                  <p className="font-serif text-lg font-semibold text-primary">
                    Prof Stephen
                  </p>
                  <p className="text-sm text-foreground/65">
                    Selection Committee Chair, STEVEREADERCLUB
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[5/4] overflow-hidden rounded-sm bg-secondary/40"
            >
              <Image
                src="/brand/prof-stephen.png"
                alt="Prof Stephen, Selection Committee Chair, at the reading desk"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover grayscale-[5%] contrast-[1.05]"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-primary/15 pointer-events-none" />
              <figcaption className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-primary-foreground/85 font-medium">
                <span>Plate I</span>
                <span>The Chair · Reading Desk</span>
              </figcaption>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.15 }}
              className="rounded-sm border border-primary/15 bg-card p-7 md:p-9"
            >
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-accent" />
                <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">
                  How We Operate
                </p>
              </div>
              <h3 className="mt-3 font-serif text-2xl md:text-3xl font-semibold text-primary leading-tight text-balance">
                An independent society, transparent about its structure.
              </h3>
              <p className="mt-4 text-[15px] md:text-base leading-relaxed text-foreground/75">
                STEVEREADERCLUB operates as an independent private literary
                society. We are transparent about our structure. Our
                community is built on mutual respect and intellectual rigor,
                not commercial pay-to-play marketing. We fund our
                distribution and engagement programs through our private
                network, so selection criteria stay focused on literary
                merit.
              </p>

              <div className="mt-7 grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Shield, label: "Independent funding", sub: "Private network, not author fees." },
                  { icon: BookOpen, label: "Merit-based selection", sub: "No commercial pressure." },
                  { icon: Users, label: "Capped intake", sub: "15 authors per annual cycle." },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className="rounded-sm bg-secondary/50 p-4 border border-primary/10"
                    >
                      <Icon className="h-5 w-5 text-primary mb-2" />
                      <p className="text-sm font-semibold text-primary">
                        {item.label}
                      </p>
                      <p className="text-xs text-foreground/60 mt-0.5 leading-snug">
                        {item.sub}
                      </p>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================ *
 * Voices — testimonials
 * ============================================================ */
function Voices() {
  const reduce = useReducedMotion()
  const items = [
    {
      quote:
        "The depth of discussion generated around my book was staggering. STEVEREADERCLUB did not just give me readers, they gave my work a legacy, treating the text with a level of consideration that is incredibly rare in the modern publishing landscape.",
      author: "Residency Alumnus",
      role: "Independent Author",
    },
    {
      quote:
        "In a sea of surface-level internet commentary, this salon is a sanctuary. The discussions are consistently high-signal, challenging, and deeply rewarding. I have read more carefully this year than I have in a decade.",
      author: "Core Salon Member",
      role: "Reader, Lagos Hub",
    },
    {
      quote:
        "Prof Stephen and the committee read the way good editors used to read. They understand that a book is not a product, it is a record of someone thinking. That posture changes the entire conversation.",
      author: "Residency Alumnus",
      role: "Independent Author",
    },
  ]
  return (
    <section className="py-20 md:py-28">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="flex items-end justify-between border-b border-primary/15 pb-5 mb-10 md:mb-14">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">
              Voices From the Hub
            </p>
            <h2 className="mt-2 font-serif text-3xl md:text-5xl font-semibold leading-[1.05] text-primary text-balance">
              What authors and readers say after a cycle in the salon.
            </h2>
          </div>
          <p className="hidden md:block text-[11px] uppercase tracking-[0.25em] text-foreground/55 font-medium">
            Three of the cycle
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {items.map((t, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: reduce ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: reduce ? 0 : 0.6,
                delay: reduce ? 0 : i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col rounded-sm border border-primary/15 bg-card p-7 md:p-8"
            >
              <Quote className="h-7 w-7 text-accent/70" />
              <p className="mt-4 font-serif text-lg md:text-xl leading-snug text-primary text-pretty">
                {t.quote}
              </p>
              <div className="mt-6 pt-5 border-t border-primary/15">
                <p className="text-sm font-semibold text-primary">
                  {t.author}
                </p>
                <p className="text-xs text-foreground/60 mt-0.5">{t.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================ *
 * Founding — Est. 2018 timeline
 * ============================================================ */
function Founding() {
  const reduce = useReducedMotion()
  const milestones = [
    {
      year: "2018",
      title: "The First Salon",
      body:
        "Prof Stephen convenes the first reading circle in a borrowed office above a Lagos bookshop. Twelve readers. One book. The shape of the annual cycle is set on a single handwritten page.",
    },
    {
      year: "2020",
      title: "The Hub Goes Global",
      body:
        "The private channel opens to readers outside Lagos for the first time. The first Residency Alumnus publishes under the cycle banner. The review velocity benchmark emerges organically, not as a goal.",
    },
    {
      year: "2022",
      title: "The Selection Committee Forms",
      body:
        "Literary specialists, academic minds, and cultural curators join Prof Stephen as formal committee members. The intake is capped at fifteen standout authors per annual cycle to protect the depth of engagement.",
    },
    {
      year: "2025",
      title: "21,000 Members and Counting",
      body:
        "The community passes twenty-one thousand global hub members and two thousand active salon readers. The committee still reads every submission in full. The structure has not changed since 2018.",
    },
  ]

  return (
    <section className="py-20 md:py-28">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="flex items-end justify-between border-b border-primary/15 pb-5 mb-10 md:mb-14">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">
              Colophon · Est. MMXVIII
            </p>
            <h2 className="mt-2 font-serif text-3xl md:text-5xl font-semibold leading-[1.05] text-primary text-balance">
              Seven years of slow reading.
            </h2>
          </div>
          <p className="hidden md:block text-[11px] uppercase tracking-[0.25em] text-foreground/55 font-medium">
            2018 → present
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-28 rounded-sm border border-primary/15 bg-secondary/40 p-7 md:p-8"
            >
              <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">
                Founded
              </p>
              <p className="mt-2 font-serif text-6xl md:text-7xl font-semibold text-primary leading-none">
                2018
              </p>
              <p className="mt-3 text-sm text-foreground/65 leading-relaxed">
                Above a bookshop in Lagos, with twelve readers and a single
                handwritten page of rules.
              </p>
              <div className="mt-6 pt-5 border-t border-primary/15">
                <Award className="h-5 w-5 text-accent mb-2" />
                <p className="text-sm font-semibold text-primary">
                  Independent funding since day one
                </p>
                <p className="text-xs text-foreground/60 mt-1 leading-snug">
                  No author has ever paid for selection, review, or
                  placement. Not in seven years. Not ever.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-8">
            <ol className="relative border-l-2 border-primary/20 ml-3">
              {milestones.map((m, i) => (
                <motion.li
                  key={m.year}
                  initial={{ opacity: 0, x: reduce ? 0 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: reduce ? 0 : 0.6,
                    delay: reduce ? 0 : i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative pl-8 pb-10 last:pb-0"
                >
                  <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-accent ring-4 ring-background" />
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent font-semibold">
                    {m.year}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl md:text-3xl font-semibold text-primary leading-tight">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-[15px] md:text-base leading-relaxed text-foreground/75 text-pretty">
                    {m.body}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================ *
 * Connect — selection committee contact
 * ============================================================ */
function Connect() {
  const reduce = useReducedMotion()
  return (
    <section id="connect" className="py-20 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 15%, #FAF7F0 0, transparent 40%), radial-gradient(circle at 20% 85%, #B0854B 0, transparent 45%)",
        }}
      />
      <div className="container-px mx-auto max-w-[1400px] relative">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">
              Section 07 · Connect
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl font-semibold leading-[1.05] tracking-tight text-primary-foreground text-balance">
              Fifteen authors per cycle. Considered one at a time.
            </h2>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-primary-foreground/75 text-pretty">
              To keep our high-signal salons exceptional, we only accept 15
              standout authors per annual cycle. If you are an independent
              author whose work aligns with our mission, submit your
              details below for committee consideration.
            </p>

            <div className="mt-8 rounded-sm border border-primary-foreground/20 p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">
                Direct line to the chair
              </p>
              <a
                href="mailto:profstephenbookclub@gmail.com"
                className="mt-2 inline-flex items-center gap-2 link-underline font-serif text-xl md:text-2xl text-primary-foreground"
              >
                profstephenbookclub@gmail.com
              </a>
              <p className="mt-2 text-xs text-primary-foreground/55 leading-relaxed">
                Messages from this form land directly in the chair&apos;s
                inbox. Nothing is filtered by an autoresponder.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { v: "15", l: "Authors per cycle" },
                { v: "4 wks", l: "Avg. response time" },
                { v: "0", l: "Author fees, ever" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-sm border border-primary-foreground/15 p-3"
                >
                  <p className="font-serif text-2xl md:text-3xl font-semibold text-accent leading-none">
                    {s.v}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-primary-foreground/65 font-medium leading-snug">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
