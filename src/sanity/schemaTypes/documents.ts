import { defineArrayMember, defineField, defineType } from "sanity";
import { metaFields, stringList } from "./shared";

/*
  Document types (decision 283). Fields mirror the src/content types, so Sanity and the fallback
  return the same shapes. Copy imported from src/content is word for word; facts changed here still
  need a source in research.md (CLAUDE.md).
*/

const slugField = defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() });
const orderField = defineField({ name: "order", title: "Order", type: "number", initialValue: 0 });

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "companyName", title: "Company name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "phone", title: "Phone, as displayed", type: "string", validation: (r) => r.required() }),
    defineField({ name: "email", type: "string", validation: (r) => r.required().email() }),
    defineField({ name: "address", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp number",
      description: "Digits only, with the country code. Leave empty until a number is confirmed (open fact 69).",
      type: "string",
      validation: (r) => r.regex(/^\d{8,15}$/, { name: "digits" }),
    }),
    defineField({
      name: "socialLinks",
      title: "Social profiles",
      description: "Only confirmed company profiles (open fact 28).",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: [defineField({ name: "platform", type: "string" }), defineField({ name: "url", type: "url" })] })],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

export const solution = defineType({
  name: "solution",
  title: "Solution",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Page name", type: "string", validation: (r) => r.required() }),
    slugField,
    orderField,
    defineField({ name: "cardTitle", title: "Card title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "cardText", title: "Card sentence", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "homeOrder", title: "Order on Home", type: "number" }),
    defineField({ name: "icon", title: "Icon", type: "string", options: { list: ["gear", "gauge", "reel", "hook", "clipboard", "wrench", "plc", "monitor", "speaker"] }, validation: (r) => r.required() }),
    ...metaFields,
    defineField({ name: "h1", title: "H1", type: "string", validation: (r) => r.required() }),
    defineField({ name: "intro", type: "text", rows: 3, validation: (r) => r.required() }),
    stringList("deliverables", "What we deliver"),
    defineField({ name: "steps", title: "How we work", type: "array", of: [defineArrayMember({ type: "titledText" })], validation: (r) => r.min(1) }),
    defineField({ name: "industriesServed", title: "Industries served", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "faqs", title: "FAQs", type: "array", of: [defineArrayMember({ type: "faq" })] }),
    defineField({ name: "primaryAction", title: "Primary button", type: "action", validation: (r) => r.required() }),
    defineField({ name: "secondaryAction", title: "Secondary button", type: "action", validation: (r) => r.required() }),
    defineField({ name: "closingBandHeading", title: "Closing band H2", type: "string", validation: (r) => r.required() }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
});

export const industry = defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Page name", type: "string", validation: (r) => r.required() }),
    slugField,
    orderField,
    defineField({ name: "cardTitle", title: "Card title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "cardText", title: "Card sentence", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "photo", title: "Illustrative photo", type: "imageWithAlt" }),
    ...metaFields,
    defineField({ name: "h1", title: "H1", type: "string", validation: (r) => r.required() }),
    defineField({ name: "intro", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "challenges", title: "Operator challenges", type: "array", of: [defineArrayMember({ type: "titledText" })], validation: (r) => r.min(1) }),
    defineField({ name: "helps", title: "How Vanguard helps", description: "End each with its link, such as See [System Integration](/solutions/system-integration/).", type: "array", of: [defineArrayMember({ type: "titledText" })], validation: (r) => r.min(1) }),
    stringList("typicalSystems", "Typical systems we deliver"),
    defineField({ name: "primaryAction", title: "Primary button", type: "action", validation: (r) => r.required() }),
    defineField({ name: "secondaryAction", title: "Secondary button", type: "action", validation: (r) => r.required() }),
    defineField({ name: "modelHeading", title: "Model section H2", type: "string" }),
    defineField({
      name: "hotspot",
      title: "Plant model hotspot",
      type: "object",
      fields: [defineField({ name: "label", type: "string" }), defineField({ name: "zone", type: "string" }), defineField({ name: "text", type: "text", rows: 3 })],
    }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
});

export const project = defineType({
  name: "project",
  title: "Case study",
  type: "document",
  description: "Real projects only, never invented or for testing (content/case-study-template.md).",
  groups: [{ name: "published", title: "Published fields", default: true }, { name: "internal", title: "Internal, never published" }],
  fields: [
    defineField({ name: "title", type: "string", group: "published", validation: (r) => r.required().max(70) }),
    defineField({ name: "slug", type: "slug", group: "published", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "client", type: "string", group: "published", validation: (r) => r.required() }),
    defineField({ name: "location", type: "string", group: "published", validation: (r) => r.required() }),
    defineField({ name: "year", type: "number", group: "published", description: "Leave empty while the project is in progress." }),
    defineField({
      name: "sector",
      type: "string",
      group: "published",
      options: { list: ["Oil & Gas", "Water & Wastewater", "District Cooling", "Power & Infrastructure", "HVAC & Building Management Systems"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "systems", type: "array", group: "published", of: [defineArrayMember({ type: "string" })], validation: (r) => r.min(1) }),
    defineField({ name: "scope", type: "text", rows: 4, group: "published", validation: (r) => r.required() }),
    defineField({ name: "challenge", type: "text", rows: 4, group: "published", validation: (r) => r.required() }),
    defineField({ name: "solution", type: "text", rows: 5, group: "published", validation: (r) => r.required() }),
    defineField({ name: "result", type: "text", rows: 4, group: "published", validation: (r) => r.required() }),
    defineField({
      name: "gallery",
      title: "Photos",
      group: "published",
      description: "Real photos of this project, 1 to 6, each with alt text, caption and credit.",
      type: "array",
      of: [defineArrayMember({ type: "galleryImage" })],
      validation: (r) => r.min(1).max(6),
    }),
    defineField({ name: "status", type: "string", group: "internal", options: { list: ["Draft", "In review", "Approved", "Published"] }, initialValue: "Draft", validation: (r) => r.required() }),
    defineField({ name: "projectState", title: "Project state", type: "string", group: "internal", options: { list: ["Completed", "In progress"] }, validation: (r) => r.required() }),
    defineField({ name: "clientMayBeNamed", title: "Client may be named", type: "boolean", group: "internal", initialValue: false }),
    defineField({ name: "clientApproval", title: "Client approval", type: "string", group: "internal" }),
    defineField({ name: "photoPermission", title: "Photo permission", type: "string", group: "internal" }),
    defineField({ name: "evidence", type: "string", group: "internal" }),
    defineField({ name: "resultSource", title: "Result source", type: "string", group: "internal" }),
    defineField({ name: "reviewedBy", title: "Reviewed by", type: "string", group: "internal" }),
    defineField({ name: "reviewedDate", title: "Reviewed date", type: "date", group: "internal" }),
  ],
  validation: (r) =>
    r.custom((value) => {
      const doc = value as unknown as Record<string, string | undefined> | undefined;
      if (doc?.status !== "Published") return true;
      const missing = (["clientApproval", "photoPermission", "evidence", "reviewedBy", "reviewedDate"] as const).filter((k) => !doc[k]);
      return missing.length ? `Complete before publishing: ${missing.join(", ")}.` : true;
    }),
});

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Job title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "bio", type: "text", rows: 3 }),
    defineField({ name: "photo", description: "A real photo, supplied by the company.", type: "imageWithAlt" }),
    defineField({ name: "linkedin", title: "LinkedIn profile", description: "Only a confirmed profile.", type: "url" }),
    orderField,
  ],
});

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", type: "imageWithAlt", validation: (r) => r.required() }),
    defineField({ name: "permissionConfirmed", title: "Permission to show the logo", type: "boolean", initialValue: false, description: "Open fact 9." }),
    orderField,
  ],
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  description: "Real client words only, with written approval. None exists, and none may be invented (CLAUDE.md).",
  fields: [
    defineField({ name: "quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "person", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "organisation", type: "string" }),
    defineField({ name: "writtenApproval", title: "Written approval (file or link)", type: "string" }),
    defineField({ name: "published", type: "boolean", initialValue: false }),
  ],
  validation: (r) =>
    r.custom((value) => {
      const doc = value as unknown as { published?: boolean; writtenApproval?: string } | undefined;
      return doc?.published && !doc.writtenApproval ? "Add the written approval before publishing." : true;
    }),
});

export const jobOpening = defineType({
  name: "jobOpening",
  title: "Job opening",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", type: "string", validation: (r) => r.required() }),
    defineField({ name: "summary", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "published", type: "boolean", initialValue: false }),
  ],
});

/** Legal pages keep the parsed block structure of site-content.md: paragraphs, lists, tables and labelled lines. */
const legalBlocks = [
  defineArrayMember({ name: "paragraph", title: "Paragraph", type: "object", fields: [defineField({ name: "text", type: "text", rows: 4 })] }),
  defineArrayMember({
    name: "list",
    title: "List",
    type: "object",
    fields: [defineField({ name: "ordered", type: "boolean" }), defineField({ name: "items", type: "array", of: [defineArrayMember({ type: "string" })] })],
  }),
  defineArrayMember({
    name: "table",
    title: "Table",
    type: "object",
    fields: [
      defineField({ name: "head", type: "array", of: [defineArrayMember({ type: "string" })] }),
      defineField({
        name: "rows",
        type: "array",
        of: [defineArrayMember({ name: "row", type: "object", fields: [defineField({ name: "cells", type: "array", of: [defineArrayMember({ type: "string" })] })] })],
      }),
    ],
  }),
  defineArrayMember({
    name: "labelled",
    title: "Labelled line",
    type: "object",
    fields: [defineField({ name: "label", type: "string" }), defineField({ name: "value", type: "text", rows: 2 })],
  }),
];

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "H1", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", description: "privacy-policy or terms", validation: (r) => r.required() }),
    ...metaFields,
    defineField({ name: "notice", title: "Template notice (visible on the page)", type: "string" }),
    defineField({ name: "lastUpdated", title: "Last updated", type: "string" }),
    defineField({
      name: "sections",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "legalSection",
          fields: [
            defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "blocks",
              type: "array",
              of: legalBlocks,
            }),
          ],
          preview: { select: { title: "heading" } },
        }),
      ],
    }),
  ],
});
