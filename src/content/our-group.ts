import "server-only";
import { actions, meta } from "./shared";
import { field, page, pipe, sections, texts } from "./source";
import type { GroupBusiness } from "./types";

const p = page("our-group");

/**
 * Businesses the current site presents with Vanguard Technology. It does not say whether they are
 * clients or group companies, so nothing claims ownership (open facts 4 and 36).
 */
export const ourGroup = {
  meta: meta(p),
  h1: field(p, "H1"),
  intro: field(p, "Intro"),
  businesses: sections(p).map((s): GroupBusiness => ({ name: s.heading, text: texts(s)[0] ?? "" })),
  buttons: pipe(field(p, "Buttons")),
  actions: actions("Our Group"),
};
