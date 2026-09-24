"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"

/**
 * Talks — embedded HTML5 video players.
 *
 * Each talk card hosts its own <video> element. The video file
 * /brand/talk-01.mp4 is a short cinematic clip generated for the society;
 * the chair can swap it for a recorded salon session at any time by
 * replacing the file in /public/brand/.
 */

type Talk = {
  n: string
  title: string
  speaker: string
  venue: string
  duration: string
  year: string
  poster: string
  src: string
}

const TALKS: Talk[] = [
  {
    n: "L01",
    title: "Reading Slowly in a Year of Acceleration",
    speaker: "Prof Stephen, with the cycle readers",
    venue: "Annual Opening Lecture · Lagos Hub",
    duration: "5 min preview",
    year: "2024",
    poster:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/41435ee830f1.jpg",
    src: "/brand/talk-01.mp4",
  },
  {
    n: "L02",
    title: "On Margins: Annotation as a Form of Reading",
    speaker: "Committee Salon, with Residency Authors",
    venue: "Salon Series · Vol. IV",
    duration: "5 min preview",
    year: "2023",
    poster:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0705fc51fae4.jpg",
    src: "/brand/talk-01.mp4",
  },
  {
    n: "L03",
    title: "The Quiet Atlas: A Closing Conversation",
    speaker: "Residency Alumnus in conversation with Prof Stephen",
    venue: "Cycle Close · Members Only",
    duration: "5 min preview",
    year: "2023",
    poster:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5d3f1242397f.jpg",
    src: "/brand/talk-01.mp4",
  },
]

export function Talks() {
  const reduce = useReducedMotion()

  return (
    <section
      id="talks"
      className="py-20 md:py-28 bg-secondary/50 border-y border-primary/10"
    >
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="flex items-end justify-between border-b border-primary/15 pb-5 mb-10 md:mb-14">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">
              Section 05 · Lectures & Talks
            </p>
            <h2 className="mt-2 font-serif text-3xl md:text-5xl font-semibold leading-[1.05] text-primary text-balance">
              Recorded sessions, played in place.
            </h2>
          </div>
          <p className="hidden md:block text-[11px] uppercase tracking-[0.25em] text-foreground/55 font-medium">
            Embedded · no external player
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {TALKS.map((talk, i) => (
            <motion.article
              key={talk.n}
              initial={{ opacity: 0, y: reduce ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: reduce ? 0 : 0.6,
                delay: reduce ? 0 : i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col"
            >
              <VideoPlayer talk={talk} />
              <div className="mt-4 border-t border-primary/15 pt-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">
                  {talk.n} · {talk.year}
                </p>
                <h3 className="mt-1 font-serif text-xl md:text-2xl font-semibold text-primary leading-snug text-balance">
                  {talk.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                  {talk.speaker}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-foreground/55 font-medium">
                  {talk.venue}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-foreground/55 italic max-w-xl mx-auto">
          Members receive the unedited recordings by post at the close of each
          cycle, alongside a printed transcript set in Playfair.
        </p>
      </div>
    </section>
  )
}

/* ---------- Embedded video player ---------- */

function VideoPlayer({ talk }: { talk: Talk }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [started, setStarted] = useState(false)

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
      setStarted(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  const requestFullscreen = () => {
    const v = videoRef.current
    if (!v) return
    if (v.requestFullscreen) v.requestFullscreen()
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-primary/5 group">
      <video
        ref={videoRef}
        src={talk.src}
        poster={talk.poster}
        preload="none"
        playsInline
        muted
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={togglePlay}
        className="absolute inset-0 h-full w-full object-cover grayscale-[10%] contrast-[1.05]"
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-primary/15 pointer-events-none" />

      {/* Top chrome */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-primary-foreground/85 font-medium pointer-events-none">
        <span>{talk.n} · {talk.year}</span>
        <span>{talk.duration}</span>
      </div>

      {/* Center play button — only visible when paused */}
      {!playing && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={started ? "Play video" : "Start video"}
        >
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-background/85 backdrop-blur-sm text-primary border border-primary/25 group-hover:bg-accent group-hover:text-primary-foreground group-hover:border-accent transition-colors">
            {started ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 translate-x-0.5" />
            )}
          </span>
        </button>
      )}

      {/* Bottom controls — visible once started */}
      {started && (
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-gradient-to-t from-primary/85 to-transparent text-primary-foreground">
          <button
            type="button"
            onClick={togglePlay}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-medium hover:text-accent transition-colors"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {playing ? "Pause" : "Play"}
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleMute}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-primary-foreground/15 transition-colors"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={requestFullscreen}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-primary-foreground/15 transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
