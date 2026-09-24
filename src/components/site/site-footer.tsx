"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-px mx-auto max-w-[1400px] py-14 md:py-20">
        <div className="grid gap-10 md:gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              href="#top"
              className="flex items-center gap-3"
              aria-label="STEVEREADERCLUB"
            >
              <Image
                src="/brand/logo.png"
                alt="STEVEREADERCLUB mark"
                width={48}
                height={48}
                className="h-12 w-12 object-contain bg-primary-foreground/95 rounded-sm p-1"
              />
              <span className="flex items-baseline gap-2">
                <span className="font-serif font-semibold tracking-tight text-primary-foreground text-2xl md:text-3xl">
                  Steve<span className="italic text-accent">Reader</span>Club
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-primary-foreground/55 font-medium">
                  Est. MMXVIII
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-primary-foreground/65 text-pretty">
              An independent private literary society and curated cultural
              hub. We treat literature not as a temporary commodity, but as a
              permanent cultural contribution.
            </p>
            <a
              href="mailto:profstephenbookclub@gmail.com"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary-foreground link-underline"
            >
              <Mail className="h-4 w-4 text-accent" />
              profstephenbookclub@gmail.com
            </a>
          </div>

          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">
              The Society
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-y-2.5 gap-x-4">
              {[
                { href: "#manifesto", label: "Manifesto" },
                { href: "#spreads", label: "The Cycle" },
                { href: "#specimens", label: "Specimens" },
                { href: "#committee", label: "Committee" },
                { href: "#talks", label: "Talks" },
                { href: "#catalog", label: "Catalog" },
                { href: "#connect", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">
              Colophon
            </p>
            <p className="mt-4 text-xs text-primary-foreground/65 leading-relaxed">
              Set in Playfair Display and Inter. Printed on warm cream.
              Independent funding. Merit-based selection. Capped at fifteen
              standout authors per annual cycle.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-primary-foreground/55">
            © 2018–{new Date().getFullYear()} STEVEREADERCLUB. All rights
            reserved.
          </p>
          <p className="text-xs text-primary-foreground/55">
            A private literary society · No commercial placement · No
            pay-to-play
          </p>
        </div>
      </div>
    </footer>
  )
}
