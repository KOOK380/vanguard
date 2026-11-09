/**
 * Sanity settings from environment variables (decision 283). With no project ID the site uses the
 * src/content layer as before, so builds work with Sanity unset.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-11-01";
export const sanityConfigured = /^[a-z0-9-]+$/.test(projectId);
