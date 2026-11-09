import type { Metadata } from "next";
import { Suspense } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Rich } from "@/components/ui/Rich";
import { company, termsPage } from "@/content";
import { newsletter } from "@/content/site";
import { routes } from "@/lib/routes";
import { mailer, newsletterSegment, readNewsletterToken } from "@/lib/server/mail";

export const metadata: Metadata = { title: `${newsletter.heading} | ${company.name}`, robots: { index: false, follow: false } };

/** Subscribes the contact in the token. False when the token is invalid or expired, or Resend fails. */
async function confirm(token: string): Promise<boolean> {
  const email = readNewsletterToken(token);
  const mail = mailer();
  const segment = newsletterSegment();
  if (!email || !mail || !segment) return false;
  try {
    const updated = await mail.resend.contacts.update({ email, unsubscribed: false });
    if (updated.error) return false;
    // Already in the segment for most contacts; adding again is harmless.
    await mail.resend.contacts.segments.add({ email, segmentId: segment });
    return true;
  } catch {
    return false;
  }
}

async function Result({ searchParams }: { searchParams: Promise<{ token?: string | string[] }> }) {
  const raw = (await searchParams).token;
  const ok = await confirm(typeof raw === "string" ? raw : "");
  const Icon = ok ? CircleCheck : CircleAlert;
  return (
    <>
      <h1 className="flex items-start gap-3 text-h2 text-(color:--heading)">
        <Icon aria-hidden="true" size={32} strokeWidth={2} className={ok ? "mt-1 shrink-0 text-success" : "mt-1 shrink-0 text-error"} />
        {ok ? newsletter.confirmed : newsletter.expired.heading}
      </h1>
      {ok ? null : (
        <p className="mt-4 text-lead text-ink">
          <Rich text={newsletter.expired.text} />
        </p>
      )}
    </>
  );
}

/**
 * Opened from the newsletter confirmation email (decisions 177 and 288). A valid, unexpired link
 * marks the Resend contact as subscribed; anything else shows the expired-link message. noindex,
 * and never linked from the site.
 */
export default function NewsletterConfirmPage({ searchParams }: { searchParams: Promise<{ token?: string | string[] }> }) {
  return (
    <main id="main">
      <Container className="py-16 lg:py-24">
        <div className="max-w-2xl">
          <Suspense fallback={null}>
            <Result searchParams={searchParams} />
          </Suspense>
          <div className="mt-8">
            <Button href={routes.home} variant="secondary">
              {termsPage.actions.secondary.label}
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
