import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Action } from "@/content";
import { contactHref, isLive } from "@/lib/routes";

/** The href for a button from the buttons table: the enquiry form with its pre-filled fields, or the given link. */
export function actionHref(a: Action): string | null {
  if (!a.href) return null;
  return a.href.startsWith("/contact-us/") ? contactHref(a.prefill) : a.href;
}

/**
 * The page's two buttons on a dark hero: gold primary, hidden on phones where the action bar has
 * the primary action (decision 208), and a dark secondary. A button to a page that is not built
 * is left out (decision 253).
 */
export function HeroActions({ primary, secondary }: { primary: Action; secondary: Action }) {
  const p = actionHref(primary);
  const s = actionHref(secondary);
  return (
    <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
      {p && isLive(p) ? (
        <div className="hidden md:block">
          <Button href={p} variant="gold" onDark>
            {primary.label}
          </Button>
        </div>
      ) : null}
      {s && isLive(s) ? (
        <Button
          href={s}
          variant="secondary"
          onDark
          leadingIcon={s.startsWith("tel:") ? <Phone size={20} strokeWidth={1.5} /> : undefined}
          icon={s.startsWith("tel:") ? undefined : <ArrowRight size={20} strokeWidth={1.5} />}
          className="w-full md:w-auto"
        >
          {secondary.label}
        </Button>
      ) : null}
    </div>
  );
}
