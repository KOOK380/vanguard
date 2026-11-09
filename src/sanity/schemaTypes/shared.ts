import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * An image whose alt text is required (CLAUDE.md: alt text on every image). Alt describes what is
 * visible, with no location or claim that it shows Vanguard's work. Leave it empty only for a
 * purely decorative image beside its own label, and say so in the decorative field.
 */
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "decorative",
      title: "Decorative only",
      description: "Tick only for an image beside its own text label, such as an icon. Alt text is then empty.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      description: "Describe what is visible. No location, and no claim that it shows our work.",
      type: "string",
      validation: (r) =>
        r.custom((alt, ctx) => {
          const parent = ctx.parent as { decorative?: boolean; asset?: unknown } | undefined;
          if (!parent?.asset || parent.decorative) return true;
          return alt && alt.trim().length >= 3 ? true : "Alt text is required.";
        }),
    }),
  ],
  validation: (r) => r.custom((v: { asset?: unknown; alt?: string; decorative?: boolean } | undefined) => (!v?.asset || v.decorative || (v.alt ?? "").trim() ? true : "Alt text is required.")),
});

/** A case study photo: alt text, caption and credit are all required (content/case-study-template.md). */
export const galleryImage = defineType({
  name: "galleryImage",
  title: "Photo",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({ name: "alt", title: "Alt text", type: "string", validation: (r) => r.required().min(3) }),
    defineField({ name: "caption", type: "string", validation: (r) => r.required() }),
    defineField({ name: "credit", title: "Photographer or owner", type: "string", validation: (r) => r.required() }),
  ],
});

/** A button from the buttons table: label, link, and the enquiry fields it pre-fills. */
export const action = defineType({
  name: "action",
  title: "Button",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Link", type: "string", description: "A route such as /contact-us/, or tel: or mailto:" }),
    defineField({
      name: "prefill",
      title: "Pre-filled enquiry fields",
      type: "object",
      fields: [
        defineField({ name: "request", type: "string" }),
        defineField({ name: "sector", type: "string" }),
        defineField({ name: "system", type: "string" }),
      ],
    }),
  ],
});

export const titledText = defineType({
  name: "titledText",
  title: "Titled text",
  type: "object",
  fields: [defineField({ name: "title", type: "string", validation: (r) => r.required() }), defineField({ name: "text", type: "text", rows: 3, validation: (r) => r.required() })],
  preview: { select: { title: "title", subtitle: "text" } },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "object",
  fields: [defineField({ name: "question", type: "string", validation: (r) => r.required() }), defineField({ name: "answer", type: "text", rows: 3, validation: (r) => r.required() })],
  preview: { select: { title: "question" } },
});

export const metaFields = [
  defineField({ name: "metaTitle", title: "Meta title", type: "string", validation: (r) => r.required().max(70) }),
  defineField({ name: "metaDescription", title: "Meta description", type: "text", rows: 2, validation: (r) => r.required().max(170) }),
];

export const stringList = (name: string, title: string) =>
  defineField({ name, title, type: "array", of: [defineArrayMember({ type: "string" })], validation: (r) => r.min(1) });
