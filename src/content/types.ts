import type { Inline } from "./source";

export type { Inline };

export type Meta = { url: string; title: string; description: string; noindex?: boolean };

/** Fields a "pre-filled" button sets on the enquiry form (decision 81). */
export type Prefill = { request?: string; sector?: string; system?: string };

/** href is null for the Contact page's own submit button. */
export type Action = { label: string; href: string | null; prefill: Prefill };
export type Actions = { primary: Action; secondary: Action };

export type Titled = { title: Inline; text: Inline };
export type Step = { title: Inline; text: Inline };
export type Faq = { question: Inline; answer: Inline };
export type LinkItem = { label: string; href: string };

export type SolutionCard = { title: string; text: Inline; href: string };

export type Solution = {
  slug: string;
  /** Page name, as in the menu. */
  name: string;
  card: SolutionCard;
  meta: Meta;
  h1: string;
  intro: Inline;
  deliverables: Inline[];
  steps: Step[];
  industriesServed: Inline;
  faqs: Faq[];
  actions: Actions;
  closingBandHeading: string;
};

export type Hotspot = { label: string; zone: string; text: Inline; href: string };

export type Industry = {
  slug: string;
  name: string;
  card: SolutionCard;
  meta: Meta;
  h1: string;
  intro: Inline;
  /** Alt text of the industry's illustrative photo (decision 285). */
  photoAlt: string;
  challenges: Step[];
  /** Each ends with a "See [solution](/url)." link. */
  helps: Step[];
  typicalSystems: Inline[];
  actions: Actions;
  modelHeading: string;
  hotspot: Hotspot;
};

export type TeamMember = { name: string; title: string; bio: Inline };

export type Partner = { name: string; logo: { src: string; width: number; height: number } };

/** A sourced figure. None exists (decisions 69 and 122), so the list is empty. */
export type Stat = { value: number; prefix?: string; suffix?: string; label: string; source: string };

export type CapabilityProfile = {
  number: number;
  title: string;
  scope: Inline;
  systems: Inline[];
  deliverables: Inline[];
  outcome: Inline;
  related: LinkItem[];
};

/** A real, approved project, added through the CMS (content/case-study-template.md). */
export type CaseStudy = {
  slug: string;
  title: string;
  client: string | null;
  location: string;
  year: number | null;
  sector: string;
  systems: string[];
  scope: Inline;
  challenge: Inline;
  solution: Inline;
  result: Inline;
  photos: { src: string; alt: string; caption: string; credit: string }[];
};

export type GroupBusiness = { name: string; text: Inline };
