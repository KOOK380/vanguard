import { Badge } from "@/components/ui/Badge";
import { Rich } from "@/components/ui/Rich";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";
import type { CapabilityProfile } from "@/content";
import { capabilityProfiles, homePage } from "@/content";
import { routes } from "@/lib/routes";

/**
 * Related typical project profiles, on solution and industry pages (decisions 278 and 280). Each
 * shows the "Typical project profile" label, as the Capabilities build rules require, and no photo.
 */
export function ProfileCards({ id, items }: { id: string; items: CapabilityProfile[] }) {
  if (!items.length) return null;
  // "Typical project profile. This describes a type of work we deliver. It is not a completed project."
  const [labelHead = "", ...rest] = capabilityProfiles.label.split(". ");
  const labelRest = rest.join(". ");
  return (
    <Section tone="stone" labelledBy={id}>
      <p className="mb-3 text-eyebrow uppercase text-(color:--eyebrow)">{capabilityProfiles.eyebrow}</p>
      <h2 id={id} className="mb-8 text-h2 text-(color:--heading)">
        {capabilityProfiles.heading}
      </h2>
      <ul className={items.length > 1 ? "grid gap-6 lg:grid-cols-2" : "max-w-[52rem]"}>
        {items.map((profile) => (
          <li key={profile.number} className="rounded-lg border border-hairline bg-white p-6 lg:p-8">
            <Badge variant="neutral">{labelHead}</Badge>
            <p className="mt-2 text-small text-muted">{labelRest}</p>
            <h3 className="mt-4 text-h4 text-maroon-900">{profile.title}</h3>
            <p className="mt-3 text-body text-ink">
              <Rich text={profile.scope} />
            </p>
            <h4 className="mt-5 text-h6 text-maroon-900">{capabilityProfiles.labels.outcome}</h4>
            <p className="mt-1 text-compact text-ink">
              <Rich text={profile.outcome} />
            </p>
            <p className="mt-2 text-compact text-muted">
              <Rich text={capabilityProfiles.closingLine} />
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <TextLink href={routes.capabilities}>{homePage.capabilities.link}</TextLink>
      </div>
    </Section>
  );
}
