import type { Metadata } from "next";
import { absoluteUrl, pageMetadata, postalAddress, SITE_URL } from "@/lib/seo";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm, type EnquiryCopy } from "@/components/sections/EnquiryForm";
import { PageHero } from "@/components/sections/PageHero";
import { Rich } from "@/components/ui/Rich";
import { Section } from "@/components/ui/Section";
import { contactPage, enquiryFormCopy, enquiryProcess } from "@/content";
import { a11y, menuLabel, phoneBar } from "@/content/site";
import { getSiteSettings } from "@/lib/cms/data";
import { routes } from "@/lib/routes";

export const metadata: Metadata = pageMetadata(contactPage.meta);

// "(optional)", from the copy's own optional labels, such as "Phone number (optional)".
const optionalSuffix = enquiryFormCopy.fields["Phone"]?.label.match(/\(optional\)/)?.[0] ?? "";
const formCopy: EnquiryCopy = {
  heading: enquiryFormCopy.heading,
  intro: enquiryFormCopy.intro,
  groups: enquiryFormCopy.groups,
  fields: enquiryFormCopy.fields,
  companyDocumentsHelp: enquiryFormCopy.companyDocumentsHelp,
  jobApplicationsHelp: enquiryFormCopy.jobApplicationsHelp,
  prefilledHelp: enquiryFormCopy.prefilledHelp,
  spamTrapLabel: enquiryFormCopy.spamTrapLabel,
  consent: enquiryFormCopy.consent,
  consentError: enquiryFormCopy.consentError,
  button: enquiryFormCopy.button,
  sending: enquiryFormCopy.sending,
  errorSummary: enquiryFormCopy.errorSummary,
  success: enquiryFormCopy.success,
  failed: enquiryFormCopy.failed,
  optionalSuffix,
};

/**
 * Contact (decision 282): the approved layout, with the form in three groups beside Contact
 * details and What happens after your enquiry on desktop, and above them on phones. No map and no
 * office hours: the current site shows two addresses (open fact 31) and states no hours (open fact
 * 27). WhatsApp appears once a number is set (open fact 69).
 */
export default async function ContactPage() {
  const site = await getSiteSettings();
  const c = contactPage;
  const wa = site.whatsappHref;
  const cards = [
    { key: "phone", label: "Phone", icon: Phone, href: site.phone.href, text: site.phone.display },
    ...(wa ? [{ key: "whatsapp", label: phoneBar.whatsapp, icon: MessageCircle, href: wa, text: site.phone.display, external: true }] : []),
    { key: "email", label: "Email", icon: Mail, href: site.email.href, text: site.email.display },
    { key: "address", label: "Address", icon: MapPin, href: undefined, text: site.address },
  ].map((card) => ({ ...card, title: card.key === "whatsapp" ? card.label : (c.details.items.find((d) => d.label === card.label)?.label ?? card.label) }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: site.name,
    url: absoluteUrl(routes.contact),
    image: absoluteUrl("/logos/vanguard-logo-512.png"),
    telephone: site.phone.display.replace(/\s/g, ""),
    email: site.email.display,
    address: postalAddress(site.address),
    // The company serves the UAE (site-content.md, About); no opening hours or map position are sourced.
    areaServed: { "@type": "Country", name: "United Arab Emirates" },
  };

  return (
    <main id="main">
      <PageHero breadcrumbLabel={a11y.breadcrumb} crumbs={[{ label: menuLabel(routes.home), href: routes.home }, { label: menuLabel(routes.contact) }]} h1={c.h1} intro={c.intro} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          {/* The form first, so phones reach it before the details */}
          <div className="lg:col-span-8">
            {/* Part of the static page, so it posts and shows its results without JavaScript. */}
            <EnquiryForm copy={formCopy} />
          </div>

          <aside className="flex flex-col gap-10 lg:col-span-4">
            <section aria-labelledby="contact-details">
              <h2 id="contact-details" className="text-h4 text-(color:--heading)">
                {c.details.heading}
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {cards.map((card) => {
                  const Icon = card.icon;
                  const body = (
                    <>
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-maroon-100 text-maroon-700">
                        <Icon aria-hidden="true" size={20} strokeWidth={1.5} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-small font-semibold text-muted">{card.title}</span>
                        <span className="block text-body break-words text-ink">{card.text}</span>
                      </span>
                    </>
                  );
                  return (
                    <li key={card.key}>
                      {card.href ? (
                        <a
                          href={card.href}
                          {...("external" in card && card.external ? { target: "_blank", rel: "noopener" } : {})}
                          className="flex min-h-11 items-start gap-4 rounded-lg border border-hairline bg-white p-4 transition-[box-shadow,border-color] duration-200 ease-out hover:border-border hover:shadow-md"
                        >
                          {body}
                        </a>
                      ) : (
                        <div className="flex items-start gap-4 rounded-lg border border-hairline bg-white p-4">{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>

            <section aria-labelledby="contact-after">
              <h2 id="contact-after" className="text-h4 text-(color:--heading)">
                {enquiryProcess.heading}
              </h2>
              <ol className="mt-4 flex flex-col gap-5">
                {enquiryProcess.steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span aria-hidden="true" className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-maroon-700 text-small font-semibold text-maroon-700 tabular-nums">
                      {i + 1}
                    </span>
                    <p className="text-compact text-ink">
                      <strong className="block font-semibold text-maroon-900">
                        <Rich text={s.title} />
                      </strong>
                      <Rich text={s.text} />
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </aside>
        </div>
      </Section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </main>
  );
}
