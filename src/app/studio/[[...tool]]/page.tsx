import type { Metadata } from "next";
import { Suspense } from "react";
import { Studio } from "../Studio";

export { viewport } from "next-sanity/studio";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/** The Studio's own pages are client-side routes under /studio/; only the root is prerendered. */
export async function generateStaticParams() {
  return [{ tool: [] }];
}

/** /studio: the Sanity Studio for editors (decision 283). Not indexed. */
export default function StudioPage() {
  return (
    <Suspense fallback={null}>
      <Studio />
    </Suspense>
  );
}
