import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { Rich } from "@/components/ui/Rich";
import type { IndustryData } from "@/lib/cms/data";
import { industryPhotos } from "@/content/media";
import { isLive } from "@/lib/routes";

/**
 * The six industry tiles with their illustrative photos (Home and the Industries overview).
 * One tile per row on phones: at two, "Infrastructure" and "Instrumented" overflow (decision 271).
 * Photos carry the alt text from site-content.md or Sanity (decision 285). headingLevel keeps the
 * page's heading order.
 */
export function IndustryTiles({ items, headingLevel = 3 }: { items: IndustryData[]; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const box = "group/card flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-white transition-[box-shadow,border-color] duration-200 ease-out";
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {items.map((i) => {
        // A photo from Sanity, or the approved file in public/, both with their alt text (decision 285).
        const local = industryPhotos[i.slug];
        const photo = i.photo ?? (local ? { ...local, alt: i.photoAlt } : undefined);
        const live = isLive(i.card.href);
        const inner = (
          <>
            {photo ? (
              <Photo
                src={photo.src840}
                sizes="(min-width: 64rem) 400px, (min-width: 48rem) 50vw, 100vw"
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                className="aspect-[3/2] object-cover"
              />
            ) : null}
            <div className="flex flex-1 flex-col p-4 md:p-6">
              <Heading className="flex items-center justify-between gap-3 text-h5 text-maroon-900">
                {i.card.title}
                {live ? (
                  <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} className="shrink-0 text-maroon-700 transition-transform duration-200 ease-out group-hover/card:translate-x-1" />
                ) : null}
              </Heading>
              <p className="mt-2 text-compact text-muted">
                <Rich text={i.card.text} />
              </p>
            </div>
          </>
        );
        return (
          <li key={i.slug}>
            {live ? (
              <Link href={i.card.href} className={`${box} hover:border-border hover:shadow-md`}>
                {inner}
              </Link>
            ) : (
              <div className={box}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
