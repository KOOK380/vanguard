import "server-only";
import { createImageUrlBuilder } from "@sanity/image-url";
import { cacheLife, cacheTag } from "next/cache";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, sanityConfigured } from "@/sanity/env";

/**
 * Sanity reads (decision 283). Every query runs in a cached function tagged with its document
 * types, so a Sanity webhook can refresh exactly what changed (src/app/api/revalidate/route.ts).
 * With Sanity unset, or on any error, queries return null and callers use src/content.
 */

const client = sanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: "published", token: process.env.SANITY_API_READ_TOKEN || undefined })
  : null;

const builder = sanityConfigured ? createImageUrlBuilder({ projectId, dataset }) : null;

/** Document types, used as cache tags. */
export type SanityTag = "siteSettings" | "solution" | "industry" | "project" | "teamMember" | "partner" | "testimonial" | "jobOpening" | "legalPage";

export async function sanityQuery<T>(query: string, params: Record<string, string>, tags: SanityTag[]): Promise<T | null> {
  "use cache";
  cacheLife("max");
  for (const t of tags) cacheTag(t);
  cacheTag("sanity");
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params);
  } catch (e) {
    console.error(`Sanity query failed (${tags.join(", ")}); using src/content.`, e instanceof Error ? e.message : e);
    return null;
  }
}

export type SanityImage = { asset?: { _ref?: string }; alt?: string; decorative?: boolean; caption?: string; credit?: string; dimensions?: { width: number; height: number } };

/** A CDN URL for an image at a given width, in WebP. */
/** With height, the image is cropped to that shape, honouring the hotspot an editor sets in Studio. */
export function imageUrl(img: SanityImage | undefined, width: number, height?: number): string | null {
  if (!builder || !img?.asset?._ref) return null;
  const sized = builder.image(img).width(width).auto("format").quality(75);
  // "max" never enlarges a file past its own size, such as a 74 px wide logo asked for at 400 px.
  return (height ? sized.height(height).fit("crop") : sized.fit("max")).url();
}
