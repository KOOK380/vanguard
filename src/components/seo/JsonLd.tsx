import { jsonLd } from "@/lib/seo";

/** Structured data for search engines, serialised so that no text can close the script tag. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />;
}
