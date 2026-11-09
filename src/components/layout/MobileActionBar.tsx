import { Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { a11y, isLive, phoneBar, quote } from "@/content/site";
import { getSiteSettings } from "@/lib/cms/data";
import { PathSwitch } from "./NavLink";

/**
 * Phone action bar, fixed to the bottom under 768 px (site-content.md, Phone action bar).
 * Call | WhatsApp | Get a quote. WhatsApp appears only once a number is configured (decision 251).
 * With three buttons, Call and WhatsApp show their icons, with the labels kept for screen readers,
 * so that "Get a quote" fits at 320 px.
 */
export async function MobileActionBar() {
  const site = await getSiteSettings();
  const whatsapp = site.whatsappHref;
  const compact = whatsapp !== null;
  const icon = (I: typeof Phone) => <I size={20} strokeWidth={1.5} />;
  const label = (text: string) => (compact ? <span className="sr-only">{text}</span> : text);
  const size = compact ? "sm" : "md";

  const primary = isLive(quote.href) ? (
    <Button href={quote.href} size={size} className="w-full" data-track="request_quote">
      {quote.barLabel}
    </Button>
  ) : null;

  return (
    <nav
      aria-label={a11y.actionBar}
      className="on-light fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-paper px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] md:hidden"
    >
      <ul className={compact ? "flex gap-2 [&>li:last-child]:flex-1" : "grid grid-cols-2 gap-3"}>
        <li>
          <Button href={site.phone.href} variant="secondary" size={size} leadingIcon={icon(Phone)} className="w-full">
            {label(phoneBar.call)}
          </Button>
        </li>
        {whatsapp ? (
          <li>
            <Button href={whatsapp} variant="secondary" size={size} leadingIcon={icon(MessageCircle)} className="w-full" target="_blank" rel="noopener">
              {label(phoneBar.whatsapp)}
            </Button>
          </li>
        ) : null}
        <li>
          <PathSwitch
            path={quote.href}
            match={
              <Button href={site.email.href} variant="secondary" size={size} leadingIcon={icon(Mail)} className="w-full">
                {phoneBar.contactPage}
              </Button>
            }
          >
            {primary}
          </PathSwitch>
        </li>
      </ul>
    </nav>
  );
}
