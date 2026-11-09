import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { a11y, isGroup, isLive, mainMenu, quote, type NavGroup } from "@/content/site";
import { getSiteSettings } from "@/lib/cms/data";
import { HeaderBehaviour } from "./HeaderBehaviour";
import { NavLink, PathSwitch } from "./NavLink";

const MENU_ID = "phone-menu";

const desktopLink =
  "relative inline-flex min-h-11 items-center gap-1 px-3 text-compact font-medium text-ink transition-colors duration-[120ms] ease-out hover:text-maroon-700 aria-[current=page]:text-maroon-700 " +
  "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-maroon-700 after:opacity-0 after:transition-opacity after:duration-[120ms] hover:after:opacity-100 aria-[current=page]:after:opacity-100";

const panelLink =
  "flex min-h-11 items-center rounded-md px-3 py-2 text-compact font-semibold text-maroon-900 hover:bg-maroon-100 aria-[current=page]:bg-maroon-100 aria-[current=page]:text-maroon-700";

const phoneMenuLink = "flex min-h-12 items-center border-b border-hairline text-body font-semibold text-maroon-900 aria-[current=page]:text-maroon-700";

function Logo({ className }: { className: string }) {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center">
      <Image src="/logos/vanguard-lockup.svg" alt={a11y.logoAlt} width={329} height={100} unoptimized loading="eager" className={className} />
    </Link>
  );
}

function DesktopGroup({ group, id }: { group: NavGroup; id: string }) {
  const items = group.items.filter((i) => isLive(i.href));
  if (!items.length && !isLive(group.href)) return null;
  return (
    <li className="group/menu">
      <button type="button" popoverTarget={id} className={`${desktopLink} cursor-pointer`}>
        {group.label}
        <ChevronDown aria-hidden="true" size={16} strokeWidth={1.5} className="transition-transform duration-200 ease-out group-has-[:popover-open]/menu:rotate-180" />
      </button>
      {/* A popover sits in the top layer: Escape and clicking outside close it with no script. */}
      <div
        id={id}
        popover="auto"
        aria-label={group.label}
        className="on-light fixed inset-x-0 top-21 bottom-auto m-0 h-auto w-full max-w-none border-0 border-b border-hairline bg-white p-0 text-ink shadow-md"
      >
        <Container className="py-6">
          <ul className="grid grid-cols-3 gap-x-6 gap-y-1">
            {items.map((i) => (
              <li key={i.href}>
                <NavLink href={i.href} className={panelLink}>
                  {i.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {isLive(group.href) ? (
            <p className="mt-4 border-t border-hairline px-3 pt-4">
              <NavLink href={group.href} className="inline-flex min-h-11 items-center gap-2 font-semibold text-maroon-700 underline decoration-1 underline-offset-[3px] hover:decoration-2">
                {group.overviewLabel}
                <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} />
              </NavLink>
            </p>
          ) : null}
        </Container>
      </div>
    </li>
  );
}

function PhoneGroup({ group }: { group: NavGroup }) {
  const items = group.items.filter((i) => isLive(i.href));
  if (!items.length && !isLive(group.href)) return null;
  return (
    <li>
      <details className="group/details border-b border-hairline">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-body font-semibold text-maroon-900 [&::-webkit-details-marker]:hidden">
          {group.label}
          <ChevronDown aria-hidden="true" size={20} strokeWidth={1.5} className="text-maroon-700 transition-transform duration-200 ease-out group-open/details:rotate-180" />
        </summary>
        <ul className="pb-3">
          {items.map((i) => (
            <li key={i.href}>
              <NavLink href={i.href} className="flex min-h-11 items-center ps-4 text-compact text-ink aria-[current=page]:font-semibold aria-[current=page]:text-maroon-700">
                {i.label}
              </NavLink>
            </li>
          ))}
          {isLive(group.href) ? (
            <li>
              <NavLink href={group.href} className="flex min-h-11 items-center gap-2 ps-4 text-compact font-semibold text-maroon-700 underline decoration-1 underline-offset-[3px]">
                {group.overviewLabel}
                <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
              </NavLink>
            </li>
          ) : null}
        </ul>
      </details>
    </li>
  );
}

function QuoteButton({ size, className }: { size: "sm" | "md"; className?: string }) {
  if (!isLive(quote.href)) return null;
  return (
    <PathSwitch path={quote.href}>
      <Button href={quote.href} variant="gold" size={size} className={className} data-track="request_quote">
        {quote.label}
      </Button>
    </PathSwitch>
  );
}

/**
 * Sticky site header (decisions 248 to 253). Transparent at the top of the page and solid after
 * 50 px of scroll, through a CSS scroll timeline in globals.css (.site-header). Desktop menu from
 * 1280 px; below that, a phone menu in a popover.
 */
export async function Header() {
  const site = await getSiteSettings();
  return (
    <header className="site-header on-light sticky top-0 z-40 isolate">
      <Container className="flex h-17 items-center gap-4 xl:h-21 xl:gap-6">
        <Logo className="h-11 w-auto xl:h-13" />

        <nav aria-label={a11y.mainNav} className="ms-auto hidden xl:block">
          <ul className="flex items-center">
            {mainMenu.map((item) =>
              isGroup(item) ? (
                <DesktopGroup key={item.href} group={item} id={`menu-${item.href.replaceAll("/", "")}`} />
              ) : isLive(item.href) ? (
                <li key={item.href}>
                  <NavLink href={item.href} className={desktopLink}>
                    {item.label}
                  </NavLink>
                </li>
              ) : null,
            )}
          </ul>
        </nav>

        <a
          href={site.phone.href}
          className="hidden min-h-11 items-center gap-2 whitespace-nowrap text-compact font-semibold text-maroon-700 tabular-nums hover:underline xl:inline-flex"
        >
          <Phone aria-hidden="true" size={18} strokeWidth={1.5} />
          {site.phone.display}
        </a>

        {/* The wrapper hides the button, because Button already sets its own display. */}
        <div className="hidden xl:block">
          <QuoteButton size="sm" />
        </div>

        <button
          type="button"
          popoverTarget={MENU_ID}
          aria-label={a11y.menuButton}
          className="ms-auto inline-flex size-12 cursor-pointer items-center justify-center rounded-md border-[1.5px] border-maroon-700 text-maroon-700 transition-colors duration-[120ms] ease-out hover:bg-maroon-100 xl:hidden"
        >
          <Menu aria-hidden="true" size={24} strokeWidth={1.5} />
        </button>
      </Container>

      {/* Phone menu. A direct child of the header, so that HeaderBehaviour can make the rest inert. */}
      <div
        id={MENU_ID}
        popover="auto"
        role="dialog"
        aria-modal="true"
        aria-label={a11y.menuButton}
        className="on-light fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain border-0 bg-paper p-0 text-ink"
      >
        <Container className="flex h-17 items-center justify-between">
          <Logo className="h-11 w-auto" />
          <button
            type="button"
            popoverTarget={MENU_ID}
            popoverTargetAction="hide"
            aria-label={a11y.closeMenu}
            className="inline-flex size-12 cursor-pointer items-center justify-center rounded-md border-[1.5px] border-maroon-700 text-maroon-700 hover:bg-maroon-100"
          >
            <X aria-hidden="true" size={24} strokeWidth={1.5} />
          </button>
        </Container>
        <Container className="pb-24">
          <nav aria-label={a11y.mainNav}>
            <ul className="border-t border-hairline">
              {mainMenu.map((item) =>
                isGroup(item) ? (
                  <PhoneGroup key={item.href} group={item} />
                ) : isLive(item.href) ? (
                  <li key={item.href}>
                    <NavLink href={item.href} className={phoneMenuLink}>
                      {item.label}
                    </NavLink>
                  </li>
                ) : null,
              )}
            </ul>
          </nav>
          <div className="mt-8 flex flex-col gap-4">
            <Button href={site.phone.href} variant="secondary" leadingIcon={<Phone size={20} strokeWidth={1.5} />} className="w-full">
              {site.phone.display}
            </Button>
            <QuoteButton size="md" className="w-full" />
          </div>
        </Container>
      </div>

      <HeaderBehaviour menuId={MENU_ID} />
    </header>
  );
}
