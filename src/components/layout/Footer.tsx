import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { Container } from "@/components/ui/Container";
import { a11y, footer, industries, isLive, newsletter, newsletterEnabled, social, solutions, type NavItem } from "@/content/site";
import { getSiteSettings } from "@/lib/cms/data";
import { cookieCopy, enquiryFormCopy } from "@/content";
import { analyticsConfigured } from "@/lib/analytics-config";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { NewsletterForm, type NewsletterCopy } from "./NewsletterForm";

/** Only the words the sign-up form shows, so the confirmation email copy stays on the server. */
const newsletterFormCopy: NewsletterCopy = {
  label: newsletter.label,
  consent: newsletter.consent,
  button: newsletter.button,
  sending: newsletter.sending,
  success: newsletter.success,
  failed: newsletter.failed,
  summaryHeading: newsletter.summaryHeading,
  emailError: newsletter.emailError,
  consentError: newsletter.consentError,
  spamTrapLabel: enquiryFormCopy.spamTrapLabel,
};

// Every target is at least 44 px high (CLAUDE.md), so footer links are not tightened on desktop.
const link = "inline-flex min-h-11 min-w-11 items-center py-1 text-paper hover:text-gold-500 hover:underline";
const quiet = "inline-flex min-h-11 min-w-11 items-center text-inverse-muted hover:text-gold-500 hover:underline";
const heading = "mb-3 text-label text-gold-500";

/** The year is cached for a day, so it changes soon after New Year without a request-time render. */
async function Copyright() {
  "use cache";
  cacheLife("days");
  return <p>{footer.copyright(new Date().getFullYear())}</p>;
}

function Column({ title, items, id, className, columns = false }: { title: string; items: readonly NavItem[]; id: string; className?: string; columns?: boolean }) {
  const live = items.filter((i) => isLive(i.href));
  if (!live.length) return null;
  return (
    <nav aria-labelledby={id} className={className}>
      <h2 id={id} className={heading}>
        {title}
      </h2>
      <ul className={columns ? "columns-2 gap-x-6" : undefined}>
        {live.map((i) => (
          <li key={i.href} className="break-inside-avoid">
            <Link href={i.href} className={link}>
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Site footer (site-content.md, Footer; mock-up project-docs/design/home.html). Maroon-900, as in
 * the approved design (decision 254). On phones the Solutions and Industries columns are left out
 * and the Company list links to the two overview pages instead, as in the mock-up.
 */
export async function Footer() {
  const site = await getSiteSettings();
  const companyPhone: NavItem[] = [...footer.company.items, { label: solutions.label, href: solutions.href }, { label: industries.label, href: industries.href }];
  const showNewsletter = newsletterEnabled();

  return (
    <footer className="on-dark bg-maroon-900 text-compact text-paper">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-12 lg:grid-cols-12 lg:py-16">
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex">
              <Image src="/logos/vanguard-lockup-white.svg" alt={a11y.logoAlt} width={329} height={100} unoptimized className="h-11 w-auto lg:h-13" />
            </Link>
            <p className="mt-4 flex flex-col items-start">
              <a href={site.phone.href} className={`${link} tabular-nums`}>
                {site.phone.display}
              </a>
              <a href={site.email.href} className={link}>
                {site.email.display}
              </a>
            </p>
            <address className="mt-2 max-w-xs not-italic text-inverse-muted">{site.address}</address>
          </div>

          <Column id="footer-company" title={footer.company.heading} items={footer.company.items} className="col-span-2 hidden md:col-span-1 md:block lg:col-span-2" />
          <Column id="footer-company-phone" title={footer.company.heading} items={companyPhone} className="col-span-2 md:hidden" columns />
          <Column id="footer-solutions" title={footer.solutionsHeading} items={solutions.items} className="hidden md:col-span-1 md:block lg:col-span-4" />
          <Column id="footer-industries" title={footer.industriesHeading} items={industries.items} className="hidden md:col-span-2 md:block lg:col-span-2" />
        </div>

        {showNewsletter ? (
          <section aria-labelledby="footer-newsletter" className="grid gap-6 border-t border-inverse-muted/30 py-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <h2 id="footer-newsletter" className="text-h5 text-white">
                {newsletter.heading}
              </h2>
              <p className="mt-1 text-inverse-muted">{newsletter.intro}</p>
            </div>
            <div className="lg:col-span-7">
              <NewsletterForm copy={newsletterFormCopy} />
            </div>
          </section>
        ) : null}

        {/* With the floating WhatsApp button, extra space at the bottom keeps it clear of the last row (decision 289). */}
        <div
          className={`flex flex-col gap-2 border-t border-inverse-muted/30 pt-6 text-small text-inverse-muted md:flex-row md:items-center md:justify-between ${site.whatsappHref ? "pb-6 md:pb-24" : "pb-6"}`}
        >
          <Copyright />
          {social.length ? (
            <ul className="flex flex-wrap gap-x-6">
              {social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className={quiet} rel="me noopener" target="_blank">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <ul className="flex flex-wrap gap-x-6">
            {footer.legal
              .filter((l) => isLive(l.href))
              .map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={quiet}>
                    {l.label}
                  </Link>
                </li>
              ))}
            {/* Shown once analytics is configured and the banner can open (decisions 258 and 289). */}
            {analyticsConfigured ? (
              <li>
                <CookieSettingsButton label={cookieCopy.settings.footerLink} className={`${quiet} cursor-pointer`} />
              </li>
            ) : null}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
