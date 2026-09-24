"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import {
  Search,
  Loader2,
  BookOpen,
  ExternalLink,
  AlertCircle,
  X,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

/**
 * Live Book Search
 * ---------------
 * Searches the open book catalog and renders real, clickable results.
 *
 * Primary API: Open Library (https://openlibrary.org/developers/api)
 *   - Free, no key required
 *   - CORS-enabled, callable from the browser
 *   - Returns title, author, first publish year, cover id
 *
 * Fallback API: Google Books
 *   - Free, no key required for unauthenticated calls from the browser
 *   - CORS-enabled
 *
 * If both fail (network or rate-limit), the user sees a clear message.
 */

type Book = {
  id: string
  title: string
  author: string
  year: string | number | null
  cover?: string
  link: string
  editions?: number
}

const SUGGESTIONS = [
  "Toni Morrison",
  "Italo Calvino",
  "Leo Tolstoy",
  "Chimamanda Adichie",
  "George Eliot",
  "Borges",
]

type Status = "idle" | "loading" | "done" | "error"

export function BookSearch() {
  const reduce = useReducedMotion()
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [results, setResults] = useState<Book[]>([])
  const [error, setError] = useState<string | null>(null)
  const [activeSuggestion, setActiveSuggestion] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  // Run a search for a query string
  const runSearch = async (q: string) => {
    const term = q.trim()
    if (!term) {
      setStatus("idle")
      setResults([])
      setError(null)
      return
    }

    // Cancel any in-flight request
    abortRef.current?.abort()
    const ac = new AbortController()
    abortRef.current = ac

    setStatus("loading")
    setError(null)
    setResults([])

    try {
      // Try Open Library first
      let books: Book[] = []
      try {
        books = await searchOpenLibrary(term, ac.signal)
        if (ac.signal.aborted) return
      } catch (olErr) {
        if (ac.signal.aborted) return
        console.warn("[book-search] Open Library failed, trying Google Books:", olErr)
      }

      // If Open Library returned nothing OR threw, fall back to Google Books
      if (books.length === 0) {
        try {
          const gb = await searchGoogleBooks(term, ac.signal)
          if (ac.signal.aborted) return
          books = gb
        } catch (gbErr) {
          if (ac.signal.aborted) return
          console.error("[book-search] Google Books also failed:", gbErr)
        }
      }

      if (ac.signal.aborted) return
      setResults(books)
      setStatus("done")
      if (books.length === 0) {
        setError(
          "We couldn't reach the open book catalog just now. Try again in a moment — the catalog is sometimes busy."
        )
      }
    } catch (e) {
      if (ac.signal.aborted) return
      console.error("[book-search] search failed:", e)
      setError(
        "We couldn't reach the open book catalog just now. Try again in a moment — the catalog is sometimes busy."
      )
      setStatus("error")
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => abortRef.current?.abort()
  }, [])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    runSearch(query)
  }

  const onSuggestion = (s: string) => {
    setActiveSuggestion(s)
    setQuery(s)
    runSearch(s)
  }

  const clear = () => {
    setQuery("")
    setActiveSuggestion(null)
    setStatus("idle")
    setResults([])
    setError(null)
  }

  return (
    <section
      id="catalog"
      className="py-20 md:py-28 border-t border-primary/10"
    >
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="flex items-end justify-between border-b border-primary/15 pb-5 mb-10 md:mb-14">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">
              Section 06 · Live Catalog
            </p>
            <h2 className="mt-2 font-serif text-3xl md:text-5xl font-semibold leading-[1.05] text-primary text-balance">
              Search the open book catalog.
            </h2>
          </div>
          <p className="hidden md:block text-[11px] uppercase tracking-[0.25em] text-foreground/55 font-medium">
            Powered by Open Library
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: search input + suggestions */}
          <div className="lg:col-span-5">
            <p className="text-base md:text-lg leading-relaxed text-foreground/70 text-pretty">
              Look up any book by title or author. Results pull live from the
              Open Library catalog — covers, editions, and the year of first
              publication. Anything you find here, the committee will consider
              for the next cycle on request.
            </p>

            <form onSubmit={onSubmit} className="mt-6 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                <Input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title or author…"
                  className="pl-10 pr-9 h-12 bg-background border-primary/25 focus-visible:ring-accent"
                  aria-label="Search the book catalog"
                />
                {query && (
                  <button
                    type="button"
                    onClick={clear}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-full text-foreground/55 hover:bg-secondary hover:text-primary transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button
                type="submit"
                disabled={status === "loading"}
                className="h-12 px-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Search"
                )}
              </Button>
            </form>

            <div className="mt-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/55 font-medium mb-2">
                Try one of these
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => {
                  const active = activeSuggestion === s
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => onSuggestion(s)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        active
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-primary/25 text-foreground/70 hover:border-primary hover:text-primary"
                      }`}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Hero image — sit alongside the search panel */}
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-sm border border-primary/15 hidden lg:block">
              <Image
                src="/brand/book-search-hero.png"
                alt="Open book on a wooden reading desk under warm library light"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover grayscale-[10%] contrast-[1.05]"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-primary/15 pointer-events-none" />
              <p className="absolute bottom-3 left-3 right-3 text-[10px] font-mono uppercase tracking-[0.18em] text-primary-foreground/85 font-medium">
                Plate II · The Reader&apos;s Desk
              </p>
            </div>
          </div>

          {/* Right: results */}
          <div className="lg:col-span-7">
            {status === "idle" && <EmptyState />}
            {status === "loading" && <LoadingState />}
            {status === "error" && (
              <ErrorState message={error || "Search failed."} onRetry={() => runSearch(query)} />
            )}
            {status === "done" && results.length === 0 && error && (
              <ErrorState message={error} onRetry={() => runSearch(query)} />
            )}
            {status === "done" && results.length > 0 && (
              <Results results={results} reduce={reduce} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Sub-states ---------- */

function EmptyState() {
  return (
    <div className="rounded-sm border border-dashed border-primary/25 p-10 md:p-14 text-center">
      <BookOpen className="h-8 w-8 text-accent mx-auto" />
      <p className="mt-4 font-serif text-xl md:text-2xl text-primary">
        The catalog is ready when you are.
      </p>
      <p className="mt-2 text-sm text-foreground/60 max-w-md mx-auto leading-relaxed">
        Search for any title or author. Results pull live from the Open
        Library catalog with covers and first publication years.
      </p>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-sm border border-primary/15 bg-secondary/40 p-4"
        >
          <div className="aspect-[2/3] bg-primary/10 animate-pulse rounded-sm" />
          <div className="mt-3 h-3 bg-primary/10 animate-pulse rounded" />
          <div className="mt-2 h-2 w-2/3 bg-primary/10 animate-pulse rounded" />
        </div>
      ))}
    </div>
  )
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string
  onRetry: () => void
}) {
  return (
    <div className="rounded-sm border border-dashed border-primary/25 p-10 md:p-14 text-center">
      <AlertCircle className="h-8 w-8 text-accent mx-auto" />
      <p className="mt-4 font-serif text-xl text-primary">{message}</p>
      <Button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Try the search again
      </Button>
    </div>
  )
}

function Results({
  results,
  reduce,
}: {
  results: Book[]
  reduce: boolean | null
}) {
  if (results.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-primary/25 p-10 md:p-14 text-center">
        <BookOpen className="h-8 w-8 text-accent mx-auto" />
        <p className="mt-4 font-serif text-xl text-primary">
          No matches found.
        </p>
        <p className="mt-2 text-sm text-foreground/60 max-w-md mx-auto">
          Try a different spelling, or use the author&apos;s last name alone.
          The catalog has millions of titles but not everything ever printed.
        </p>
      </div>
    )
  }
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-foreground/55 font-medium mb-4">
        {results.length} {results.length === 1 ? "result" : "results"}
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((book, i) => (
          <motion.a
            key={book.id}
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: reduce ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reduce ? 0 : 0.4,
              delay: reduce ? 0 : Math.min(i * 0.05, 0.4),
            }}
            className="group flex flex-col rounded-sm border border-primary/15 bg-card p-4 hover:border-primary/35 hover:shadow-[0_18px_40px_-24px_rgba(27,58,42,0.25)] transition-all"
          >
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-sm bg-secondary/50">
              {book.cover ? (
                <img
                  src={book.cover}
                  alt={`Cover of ${book.title}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-secondary/60">
                  <BookOpen className="h-6 w-6 text-foreground/40" />
                </div>
              )}
              <div className="absolute inset-0 ring-1 ring-inset ring-primary/10 pointer-events-none" />
            </div>
            <p className="mt-3 font-serif text-sm md:text-[15px] font-semibold text-primary leading-snug line-clamp-2">
              {book.title}
            </p>
            <p className="mt-1 text-xs text-foreground/65 line-clamp-1">
              {book.author || "Unknown author"}
            </p>
            <div className="mt-2 pt-2 border-t border-primary/10 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-foreground/55 font-medium">
              <span>{book.year ? String(book.year) : "—"}</span>
              <span className="inline-flex items-center gap-1 text-primary group-hover:text-accent transition-colors">
                Open
                <ExternalLink className="h-3 w-3" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}

/* ---------- API helpers ---------- */

/** Wraps a fetch with a hard timeout so the UI never hangs forever. */
function fetchWithTimeout(
  url: string,
  opts: RequestInit,
  ms: number
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Request timed out after ${ms}ms`))
    }, ms)
    fetch(url, opts)
      .then((res) => {
        clearTimeout(timer)
        resolve(res)
      })
      .catch((err) => {
        clearTimeout(timer)
        reject(err)
      })
  })
}

async function searchOpenLibrary(
  q: string,
  signal: AbortSignal
): Promise<Book[]> {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
    q
  )}&limit=24&fields=key,title,author_name,first_publish_year,cover_i,edition_count`
  const res = await fetchWithTimeout(
    url,
    { signal, headers: { Accept: "application/json" } },
    9000
  )
  if (!res.ok) throw new Error(`Open Library responded ${res.status}`)
  const data = await res.json()
  const docs: any[] = Array.isArray(data?.docs) ? data.docs : []
  return docs.map((d) => {
    const coverId = d.cover_i
    return {
      id: String(d.key || `${d.title}-${d.first_publish_year || ""}`),
      title: d.title || "Untitled",
      author: Array.isArray(d.author_name)
        ? d.author_name[0]
        : d.author_name || "",
      year: d.first_publish_year ?? null,
      cover: coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
        : undefined,
      link: d.key ? `https://openlibrary.org${d.key}` : "https://openlibrary.org",
      editions: d.edition_count,
    }
  })
}

async function searchGoogleBooks(
  q: string,
  signal: AbortSignal
): Promise<Book[]> {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    q
  )}&maxResults=24`
  const res = await fetchWithTimeout(url, { signal }, 9000)
  if (!res.ok) throw new Error(`Google Books responded ${res.status}`)
  const data = await res.json()
  const items: any[] = Array.isArray(data?.items) ? data.items : []
  return items.map((item) => {
    const v = item.volumeInfo || {}
    const id = item.id || v.title || Math.random().toString(36)
    const cover =
      v.imageLinks?.extraLarge ||
      v.imageLinks?.large ||
      v.imageLinks?.medium ||
      v.imageLinks?.thumbnail ||
      v.imageLinks?.smallThumbnail
    return {
      id: String(id),
      title: v.title || "Untitled",
      author: Array.isArray(v.authors) ? v.authors[0] : v.authors || "",
      year: v.publishedDate ? v.publishedDate.slice(0, 4) : null,
      cover: cover ? cover.replace(/^http:/, "https:") : undefined,
      link: v.infoLink || `https://books.google.com/books?id=${id}`,
      editions: undefined,
    }
  })
}
