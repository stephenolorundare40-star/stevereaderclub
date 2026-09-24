"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const NAV = [
  { href: "#manifesto", label: "Manifesto", n: "01" },
  { href: "#spreads", label: "The Cycle", n: "02" },
  { href: "#specimens", label: "Specimens", n: "03" },
  { href: "#committee", label: "Committee", n: "04" },
  { href: "#talks", label: "Talks", n: "05" },
  { href: "#catalog", label: "Catalog", n: "06" },
  { href: "#connect", label: "Contact", n: "07" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/92 backdrop-blur-md border-b border-primary/15 py-3"
          : "py-5"
      }`}
    >
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="#top"
            className="flex items-center gap-3 group"
            aria-label="STEVEREADERCLUB"
          >
            <Image
              src="/brand/logo.png"
              alt="STEVEREADERCLUB mark"
              width={40}
              height={40}
              priority
              className="h-9 w-9 md:h-10 md:w-10 object-contain"
            />
            <span className="flex items-baseline gap-2">
              <span className="font-serif font-semibold tracking-tight text-primary text-xl md:text-2xl">
                Steve<span className="italic text-accent">Reader</span>Club
              </span>
              <span className="hidden md:inline text-[10px] uppercase tracking-[0.25em] text-foreground/55 font-medium">
                Est. MMXVIII
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-baseline gap-1.5 text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                <span className="text-[10px] font-mono text-accent/70 group-hover:text-accent transition-colors">
                  {item.n}
                </span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              asChild
              size="sm"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-5"
            >
              <Link href="#connect">
                Apply for the Cycle
                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <button
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-primary"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-primary/15 bg-background/95 backdrop-blur-md">
          <div className="container-px mx-auto max-w-[1400px] py-3 flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-3 py-3 border-b border-primary/10 last:border-0"
              >
                <span className="text-[10px] font-mono text-accent/70">
                  {item.n}
                </span>
                <span className="font-medium text-primary">{item.label}</span>
              </Link>
            ))}
            <Button
              asChild
              className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-11"
            >
              <Link href="#connect" onClick={() => setOpen(false)}>
                Apply for the Cycle
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
