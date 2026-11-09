import "server-only";
import { steps } from "./shared";
import { cell, field, list, page, records, section, texts } from "./source";

const homeSteps = section(page("home"), "How we work");
const after = section(page("contact"), "What happens after your enquiry");
const apply = section(page("careers"), "How to apply");

/**
 * Illustrative photos for each step, on About (decision 291). Files from image-credits.md, none on
 * Hold; next/image serves them resized. Alt text is in site-content.md.
 */
const stepPhotos: Record<string, { src: string; width: number; height: number }> = {
  Consult: { src: "/images/control-room-wall-panels-desk.webp", width: 2000, height: 1333 },
  Design: { src: "/images/electrical-panel-testing.webp", width: 2000, height: 1500 },
  Supply: { src: "/images/switchgear-panel-room.webp", width: 2000, height: 2667 },
  Install: { src: "/images/cable-trays-ceiling.webp", width: 2000, height: 1500 },
  Maintain: { src: "/images/electric-motor-service.webp", width: 1412, height: 941 },
};

/** Home "How we work". Step numbers show order only; they are not statistics. */
export const deliveryProcess = {
  heading: homeSteps.heading,
  steps: records(homeSteps, "Step").map((r) => {
    const title = cell(r["Title"] ?? "");
    const photo = stepPhotos[title];
    if (!photo) throw new Error(`process.ts: no photo for the step "${title}".`);
    return { number: Number(r["Step"]), title, text: r["Sentence"] ?? "", photo: { ...photo, alt: field(homeSteps, `Photo alt text, ${title}`) } };
  }),
};

/** Contact: the planned process after an enquiry, which the company must confirm (open fact 61). */
export const enquiryProcess = { heading: after.heading, steps: steps(after) };

/** Careers: how to apply, with the privacy line under the steps. */
/** Careers: how to apply. raw keeps each step as one sentence, with its bold start and link. */
export const applicationProcess = { heading: apply.heading, steps: list(apply).map((i) => ({ title: i.lead ?? "", text: i.rest ?? i.raw, raw: i.raw })), note: texts(apply)[0] ?? "" };
