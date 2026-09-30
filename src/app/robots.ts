import type { MetadataRoute } from "next"

/**
 * Generates /robots.txt automatically.
 *
 * Tells crawlers (Google, Bing, etc.) that they may crawl the whole site
 * and where to find the sitemap.
 */
const BASE_URL = "https://stevereaderclub.stevereader.workers.dev"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"], // contact form endpoint should not be indexed
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
