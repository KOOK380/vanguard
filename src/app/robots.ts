import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

/**
 * robots.txt (decision 293): everything public may be crawled. Studio, the API routes, the
 * styleguide and the newsletter confirmation link are kept out; those pages are noindex as well.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/studio/", "/api/", "/styleguide/", "/newsletter/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
