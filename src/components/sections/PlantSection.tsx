import { PlantExplorer, type PlantZone } from "@/components/plant/PlantExplorer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homePage, industryLabels } from "@/content";
import stillSpots from "@/content/plant-hotspots.json";
import { footer } from "@/content/site";
import { getIndustries } from "@/lib/cms/data";
import { contactHref, isLive } from "@/lib/routes";

/** "See [System Integration](/solutions/system-integration/)." links in an industry's How Vanguard helps. */
function solutionLinks(texts: string[]): { label: string; href: string }[] {
  const seen = new Map<string, string>();
  for (const t of texts) for (const m of t.matchAll(/\[([^\]]+)\]\((\/solutions\/[^)]+)\)/g)) if (m[1] && m[2] && !seen.has(m[2])) seen.set(m[2], m[1]);
  return [...seen].map(([href, label]) => ({ label, href })).filter((l) => isLive(l.href));
}

/**
 * "From field instruments to SCADA": the interactive plant (decision 290). Each zone's label, text,
 * linked solutions, first typical system and enquiry link come from the industry records, through
 * Sanity when it is configured (src/lib/cms/data.ts), so an edit in Studio changes the plant too.
 * Positions on the still come from plant-hotspots.json, which the still render wrote.
 */
export async function PlantSection({ id, size = "full", className }: { id: string; size?: "full" | "compact"; className?: string }) {
  const p = homePage.plant;
  const industries = await getIndustries();
  const zones: PlantZone[] = industries.flatMap((ind) => {
    const spot = stillSpots.find((s) => s.page === ind.meta.url);
    if (!spot || !ind.hotspot.zone) return [];
    return [
      {
        slug: ind.slug,
        zone: ind.hotspot.zone,
        anchor: ind.hotspot.zone.replace(/^zone-/, "hotspot-"),
        label: ind.hotspot.label || ind.name,
        href: isLive(ind.meta.url) ? ind.meta.url : null,
        text: ind.hotspot.text,
        solutions: solutionLinks(ind.helps.map((h) => h.text)),
        typical: ind.typicalSystems[0] ?? "",
        talkHref: contactHref(ind.actions.primary.prefill),
        still: { x: spot.x, y: spot.y },
      },
    ];
  });

  return (
    <Section tone="stone" labelledBy={id} className={className}>
      <SectionHeading id={id} title={p.heading} />
      <PlantExplorer
        id={id}
        size={size}
        zones={zones}
        copy={{ intro: p.intro, caption: p.caption, talk: p.talk, solutions: footer.solutionsHeading, typical: industryLabels.systems }}
      />
    </Section>
  );
}
