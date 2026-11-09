import "server-only";
import { field, page, section } from "./source";
import type { Partner } from "./types";

const trust = section(page("home"), "Section: trust bar");

// Logo files in public/logos/partners/, 96 px high: twice the 48 px display height (decision 264).
const files: Record<string, Partner["logo"]> = {
  ADNOC: { src: "/logos/partners/adnoc.webp", width: 217, height: 96 },
  CNPC: { src: "/logos/partners/cnpc.webp", width: 74, height: 96 },
  "Khalifa University": { src: "/logos/partners/khalifa-university.webp", width: 434, height: 96 },
  SAPCO: { src: "/logos/partners/sapco.webp", width: 356, height: 96 },
};

// "ADNOC, CNPC, Khalifa University, SAPCO. Logos only, with no other text." The names are the
// first sentence; the rest is a rule for the build.
const names = (field(trust, "Logos").split(". ")[0] ?? "").split(", ");

/**
 * "Our Partners", shown as logos only. Permission to show them is unconfirmed (open fact 9).
 * Each logo's alt text is the partner's name.
 */
export const partners = {
  label: field(trust, "Label"),
  items: names.map((name): Partner => {
    const logo = files[name];
    if (!logo) throw new Error(`No logo file for partner "${name}".`);
    return { name, logo };
  }),
};
