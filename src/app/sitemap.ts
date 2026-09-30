import type { MetadataRoute } from "next"

/**
 * Generates /sitemap.xml automatically.
 *
 * Submit this URL in Google Search Console → Sitemaps:
 *   https://stevereaderclub.stevereader.workers.dev/sitemap.xml
 */
const BASE_URL = "https://stevereaderclub.stevereader.workers.dev"

const SECTIONS = [
  "#top",          // Hero
  "#manifesto",    // 01 Manifesto
  "#for-authors",  // 02 For Authors
  "#spreads",      // 03 The Annual Cycle
  "#specimens",    // 04 Reading Specimens
  "#committee",    // 05 The Selection Committee
  "#catalog",      // 06 Live Catalog (book search)
  "#connect",      // 07 Connect (contact form)
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return SECTIONS.map((hash) => ({
    url: `${BASE_URL}/${hash === "#top" ? "" : hash}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: hash === "#top" ? 1.0 : 0.8,
  }))
}
