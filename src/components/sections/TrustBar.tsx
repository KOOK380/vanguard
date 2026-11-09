import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Partner } from "@/content";

type TrustBarProps = { proofPoints: string[]; partnersLabel: string; partners: Partner[] };

/**
 * Proof points and "Our Partners" under the hero (approved design). The proof points replace
 * statistics, which cannot be sourced. Logos are greyscale and turn to colour on hover, on devices
 * that can hover (decision 263). Permission to show them is unconfirmed (open fact 9).
 */
export function TrustBar({ proofPoints, partnersLabel, partners }: TrustBarProps) {
  return (
    <div className="on-light bg-paper">
      <Container>
        <ul className="grid grid-cols-2 gap-x-4 border-b border-hairline py-4 md:grid-cols-4 md:py-0">
          {proofPoints.map((p, i) => (
            <li
              key={p}
              className={`flex items-center gap-3 py-3 text-compact font-semibold text-maroon-900 md:py-6 ${i > 0 ? "md:border-s md:border-hairline md:ps-6" : ""}`}
            >
              <Check aria-hidden="true" size={20} strokeWidth={2} className="shrink-0 text-maroon-700" />
              {p}
            </li>
          ))}
        </ul>
        <section aria-labelledby="partners-title" className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:gap-12 lg:py-8">
          <h2 id="partners-title" className="shrink-0 text-small font-semibold text-muted">
            {partnersLabel}
          </h2>
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-4 md:gap-x-12">
            {partners.map((p) => (
              <li key={p.name}>
                <Image
                  src={p.logo.src}
                  alt={p.name}
                  width={p.logo.width}
                  height={p.logo.height}
                  unoptimized
                  className="h-10 w-auto grayscale transition-[filter] duration-200 ease-out hover:grayscale-0 md:h-12"
                />
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  );
}
