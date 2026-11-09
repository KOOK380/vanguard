import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Rich } from "@/components/ui/Rich";
import { notFoundPage, termsPage } from "@/content";
import { isLive, routes } from "@/lib/routes";

export const metadata: Metadata = { title: notFoundPage.meta.title, robots: { index: false } };

/**
 * The 404 page (decision 281), with its copy from site-content.md: Explore solutions, and "Back to
 * home", the existing wording from the legal pages. Start a consultation joins once the contact
 * page exists. The H1 is the agreed exception to the contractions rule (decision 124).
 */
export default function NotFound() {
  const nf = notFoundPage;
  const solutions = nf.actions.primary.href ?? routes.solutions;
  const consult = nf.actions.secondary.href;
  return (
    <main id="main" className="on-dark bg-linear-to-br from-maroon-900 to-maroon-950">
      <Container className="py-24 lg:py-32">
        <div className="max-w-2xl">
          <h1 className="text-h1 text-(color:--heading)">{nf.h1}</h1>
          <p className="mt-6 text-lead text-(color:--body)">
            <Rich text={nf.text} />
          </p>
          <div className="mt-10 flex flex-col gap-4 md:flex-row md:flex-wrap">
            <Button href={solutions} variant="gold" onDark>
              {nf.actions.primary.label}
            </Button>
            <Button href={routes.home} variant="secondary" onDark>
              {termsPage.actions.secondary.label}
            </Button>
            {consult && isLive(consult) ? (
              <Button href={consult} variant="ghost" onDark>
                {nf.actions.secondary.label}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </main>
  );
}
