import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

/**
 * Slugs of published case studies, for src/proxy.ts, which cannot read files. The pages
 * themselves validate each entry fully (src/content/cms.ts); this list only lets the Proxy return
 * a 404 for any other /projects/ address from the first request (decision 281).
 */
function publishedProjectSlugs(): string {
  const dir = process.env.PROJECTS_DIR ? path.resolve(process.env.PROJECTS_DIR) : path.join(process.cwd(), "content", "projects");
  if (!fs.existsSync(dir)) return "";
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
    .map((f) => fs.readFileSync(path.join(dir, f), "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "")
    .filter((fm) => /^status:\s*"?Published"?\s*$/m.test(fm))
    .map((fm) => fm.match(/^slug:\s*"?([a-z0-9-]+)"?\s*$/m)?.[1] ?? "")
    .filter(Boolean)
    .join(",");
}

const nextConfig: NextConfig = {
  // URLs end in a slash, as in project-docs/strategy.md.
  trailingSlash: true,
  cacheComponents: true,
  partialPrefetching: true,
  env: {
    PUBLISHED_PROJECT_SLUGS: publishedProjectSlugs(),
    // With Sanity, project slugs live in the dataset, so the Proxy lets /projects/ through (decision 283).
    SANITY_PROJECTS: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? "1" : "",
  },
  // Images uploaded to Sanity are served from its CDN.
  // AVIF first, WebP as the fallback; one quality, as Next 16 requires an allowlist (decision 292).
  images: { remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }], formats: ["image/avif", "image/webp"], qualities: [75] },
  // Old WordPress URLs (decisions 53 and 80; decision 293). /about-us/, /solutions/ and
  // /contact-us/ keep their addresses, so only these move. Spam URLs are never redirected (decision 59).
  async redirects() {
    // The old URLs end in a slash. A request without one first gets Next's own trailing-slash
    // redirect, then this one.
    const moved: [string, string][] = [
      ["/clientsgroups/", "/our-group/"],
      ["/hello-world/", "/"],
      ["/demo-page/", "/"],
      ["/category/uncategorized/", "/"],
    ];
    return moved.map(([source, destination]) => ({ source, destination, statusCode: 301 as const }));
  },
  experimental: {
    // Inline the Tailwind CSS (about 10 KB compressed) in the HTML, so first-time visitors on slow
    // connections render without waiting for a separate stylesheet (decision 292).
    inlineCss: true,
  },
  // Pin the project root, so a stray lockfile in a parent folder is never taken for the workspace.
  outputFileTracingRoot: process.cwd(),
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
