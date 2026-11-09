import { NextResponse, type NextRequest } from "next/server";
import { industrySlugs, solutionSlugs } from "@/lib/routes";

/**
 * Unknown solution, industry and project slugs get a real 404 on the first request (decision 278). Under Cache
 * Components, /solutions/[slug] streams from a prerendered shell, so notFound() alone keeps a 200
 * status (with noindex) the first time a new slug is requested. Rewriting to an unmatched path
 * before rendering returns the not-found page with a 404.
 */
export function proxy(request: NextRequest) {
  const [section, slug] = request.nextUrl.pathname.split("/").filter(Boolean);
  // Published case study slugs are listed at build by next.config.ts.
  const projects = (process.env.PUBLISHED_PROJECT_SLUGS ?? "").split(",").filter(Boolean);
  // With Sanity, projects are in the dataset; the page itself returns the 404.
  if (section === "projects" && process.env.SANITY_PROJECTS) return undefined;
  const known = section === "industries" ? industrySlugs : section === "projects" ? projects : solutionSlugs;
  if (slug && !known.includes(slug)) {
    return NextResponse.rewrite(new URL("/__not-found__/", request.url));
  }
  return undefined;
}

export const config = { matcher: ["/solutions/:slug", "/industries/:slug", "/projects/:slug"] };
