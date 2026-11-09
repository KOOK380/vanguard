import { Rich } from "@/components/ui/Rich";
import { enquiryFormCopy, newsletterCopy } from "@/content/pages";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Mail, MapPin, Phone, Wrench } from "lucide-react";
import type { ReactNode } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Button, type ButtonVariant } from "@/components/ui/Button";
import { Card, CardLinkText, CardText, CardTitle } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { FormField } from "@/components/ui/FormField";
import { IconBox } from "@/components/ui/IconBox";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatNumber } from "@/components/ui/StatNumber";
import { contrastRatio } from "@/lib/contrast";

const F = enquiryFormCopy.fields as Record<"Phone" | "Email" | "Location" | "Request type" | "Sector" | "Scope", { label: string; help?: string; options?: string[]; error?: string }>;
// The select placeholder has no copy yet (open fact 68). This styleguide label stands in for it.
const SELECT_SAMPLE = "Placeholder (no copy yet)";

/*
  Internal reference page. Sample copy comes from project-docs/site-content.md.
  Labels on this page describe tokens and states, and are not site copy (decision 241).
*/

export const metadata: Metadata = {
  title: "Styleguide | Vanguard Technology",
  robots: { index: false, follow: false },
};

const colours: [string, string, string][] = [
  ["paper", "#FBF9F6", "Page background"],
  ["white", "#FFFFFF", "Cards, form fields"],
  ["stone-100", "#F0EBE5", "Stone bands"],
  ["stone-200", "#E4DED7", "Disabled, neutral badges"],
  ["hairline", "#D9D2CA", "Decorative dividers only"],
  ["border", "#8F857E", "Form and control borders"],
  ["muted", "#655B56", "Secondary text"],
  ["ink", "#231A1B", "Body text"],
  ["maroon-950", "#2A1014", "Primary active"],
  ["maroon-900", "#3B181E", "Headings, footer, Why Vanguard"],
  ["maroon-700", "#571926", "Primary, links, icons, closing band"],
  ["maroon-100", "#F6ECEA", "Secondary hover, selected"],
  ["inverse-muted", "#D9CCC6", "Secondary text on maroon"],
  ["gold-500", "#E19950", "On maroon; header quote button with a maroon border; rules on light"],
  ["gold-300", "#EDB98A", "Gold button hover"],
  ["gold-100", "#FBEEDF", "Gold badge background"],
  ["gold-800", "#8A5317", "Eyebrows on light"],
  ["gold-900", "#6F4210", "Gold badge text"],
  ["error", "#A8201A", "Errors"],
  ["error-100", "#FBEAE8", "Error background"],
  ["success", "#1F6B45", "Success"],
  ["success-100", "#E7F3EC", "Success background"],
];

// Text pairs and control pairs from design-system.md. Ratios are calculated here, not copied.
const pairs: [string, string, string, string, number][] = [
  ["ink", "#231A1B", "paper", "#FBF9F6", 4.5],
  ["ink", "#231A1B", "white", "#FFFFFF", 4.5],
  ["ink", "#231A1B", "stone-100", "#F0EBE5", 4.5],
  ["ink", "#231A1B", "stone-200", "#E4DED7", 4.5],
  ["muted", "#655B56", "paper", "#FBF9F6", 4.5],
  ["muted", "#655B56", "white", "#FFFFFF", 4.5],
  ["muted", "#655B56", "stone-100", "#F0EBE5", 4.5],
  ["muted", "#655B56", "stone-200", "#E4DED7", 4.5],
  ["maroon-900", "#3B181E", "paper", "#FBF9F6", 4.5],
  ["maroon-900", "#3B181E", "stone-100", "#F0EBE5", 4.5],
  ["maroon-700", "#571926", "paper", "#FBF9F6", 4.5],
  ["maroon-700", "#571926", "maroon-100", "#F6ECEA", 4.5],
  ["gold-800", "#8A5317", "paper", "#FBF9F6", 4.5],
  ["gold-800", "#8A5317", "stone-100", "#F0EBE5", 4.5],
  ["gold-900", "#6F4210", "gold-100", "#FBEEDF", 4.5],
  ["white", "#FFFFFF", "maroon-700", "#571926", 4.5],
  ["white", "#FFFFFF", "maroon-900", "#3B181E", 4.5],
  ["paper", "#FBF9F6", "maroon-900", "#3B181E", 4.5],
  ["inverse-muted", "#D9CCC6", "maroon-900", "#3B181E", 4.5],
  ["inverse-muted", "#D9CCC6", "maroon-700", "#571926", 4.5],
  ["gold-500", "#E19950", "maroon-900", "#3B181E", 4.5],
  ["gold-500", "#E19950", "maroon-700", "#571926", 4.5],
  ["maroon-900", "#3B181E", "gold-500", "#E19950", 4.5],
  ["error", "#A8201A", "error-100", "#FBEAE8", 4.5],
  ["success", "#1F6B45", "success-100", "#E7F3EC", 4.5],
  ["border (control)", "#8F857E", "white", "#FFFFFF", 3],
  ["border (control)", "#8F857E", "paper", "#FBF9F6", 3],
  ["border (control)", "#8F857E", "stone-100", "#F0EBE5", 3],
  ["gold-500 (fails)", "#E19950", "paper", "#FBF9F6", 4.5],
];

const typeScale: [string, string, string, string][] = [
  ["H1", "text-h1", "56/64, mobile 36/44, 600, -0.02em", "Industrial automation and system integration for the UAE"],
  ["H2", "text-h2", "40/48, mobile 30/38, 600, -0.015em", "Industries we serve"],
  ["H3", "text-h3", "30/38, mobile 24/32, 600, -0.01em", "Contact details"],
  ["H4", "text-h4", "24/32, mobile 20/28, 600, -0.005em", "Typical systems we deliver"],
  ["H5", "text-h5", "20/28, mobile 18/26, 600", "Proven technologies"],
  ["H6", "text-h6", "18/26, mobile 17/26, 600", "About your site"],
  ["Lead", "text-lead", "20/32, mobile 18/28, 400", "Tell us about your site, system and scope. Consultations are free."],
  ["Body", "text-body", "17/28, 400", "We implement SCADA, communications and control systems, using proven technologies and a practical approach."],
  ["Compact", "text-compact", "15/24, 400", "We offer annual maintenance contracts, field services, retrofit work and remote support."],
  ["Small", "text-small", "14/20, 400, muted", "Selected from the page you visited. You can change it."],
  ["Eyebrow", "text-eyebrow uppercase", "13/16, 600, 0.08em, uppercase", "SCADA. Control. Instrumentation."],
];

const spacing: [number, string][] = [[1, "4"], [2, "8"], [3, "12"], [4, "16"], [6, "24"], [8, "32"], [12, "48"], [16, "64"], [24, "96"], [32, "128"]];
const spacingWidth: Record<number, string> = { 1: "w-1", 2: "w-2", 3: "w-3", 4: "w-4", 6: "w-6", 8: "w-8", 12: "w-12", 16: "w-16", 24: "w-24", 32: "w-32" };
const swatch: Record<string, string> = {
  paper: "bg-paper", white: "bg-white", "stone-100": "bg-stone-100", "stone-200": "bg-stone-200", hairline: "bg-hairline", border: "bg-border", muted: "bg-muted", ink: "bg-ink",
  "maroon-950": "bg-maroon-950", "maroon-900": "bg-maroon-900", "maroon-700": "bg-maroon-700", "maroon-100": "bg-maroon-100", "inverse-muted": "bg-inverse-muted",
  "gold-500": "bg-gold-500", "gold-300": "bg-gold-300", "gold-100": "bg-gold-100", "gold-800": "bg-gold-800", "gold-900": "bg-gold-900",
  error: "bg-error", "error-100": "bg-error-100", success: "bg-success", "success-100": "bg-success-100",
};

const states = [undefined, "hover", "active", "focus"] as const;
const stateLabel = (s: (typeof states)[number]) => s ?? "default";

function Block({ id, title, note, children }: { id: string; title: string; note?: ReactNode; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-hairline py-12">
      <h2 id={id} className="text-h3 text-maroon-900">
        {title}
      </h2>
      {note ? <p className="mt-2 max-w-[47.5rem] text-compact text-muted">{note}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="mb-2 font-mono text-small text-(color:--secondary)">{children}</p>;
}

function ButtonMatrix({ variants, onDark = false }: { variants: ButtonVariant[]; onDark?: boolean }) {
  const label: Record<ButtonVariant, string> = { primary: "Start a consultation", secondary: "Explore solutions", ghost: "View all solutions", gold: "Discuss your SCADA scope" };
  return (
    <div className="flex flex-col gap-8">
      {variants.map((v) => (
        <div key={v}>
          <h3 className="mb-3 text-h6 text-(color:--heading)">{v}</h3>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-4">
            {states.map((s) => (
              <div key={stateLabel(s)}>
                <Label>{stateLabel(s)}</Label>
                <Button variant={v} onDark={onDark} demoState={s} tabIndex={-1}>
                  {label[v]}
                </Button>
              </div>
            ))}
            <div>
              <Label>disabled</Label>
              <Button variant={v} onDark={onDark} disabled>
                {label[v]}
              </Button>
            </div>
            <div>
              <Label>loading</Label>
              <Button variant={v} onDark={onDark} loading loadingLabel="Sending">
                {label[v]}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StyleguidePage() {
  if (process.env.NODE_ENV === "production" && process.env.SHOW_STYLEGUIDE !== "true") notFound();

  return (
    <main id="main">
      <Container className="py-12">
        <p className="text-eyebrow uppercase text-gold-800">Internal reference</p>
        <h1 className="mt-3 text-h1 text-maroon-900">Styleguide</h1>
        <p className="mt-4 max-w-[47.5rem] text-lead">
          Tokens and components from project-docs/design-system.md. Hover, active and focus states are forced so that each can be seen. This page is not indexed.
        </p>
        <nav aria-label="Styleguide sections" className="mt-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-compact">
            {["colours", "contrast", "type", "spacing", "radius", "grid", "motion", "buttons", "sections", "cards", "badges", "icons", "stats", "accordion", "fields"].map((s) => (
              <li key={s}>
                <a href={`#sg-${s}`} className="inline-flex min-h-11 items-center text-maroon-700 underline underline-offset-[3px]">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Block id="sg-colours" title="Colours" note="The default Tailwind palette is removed. Only these tokens exist, as bg-, text- and border- utilities.">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {colours.map(([name, hex, use]) => (
              <div key={name} className="overflow-hidden rounded-lg border border-hairline bg-white">
                <div className={`h-16 ${swatch[name]}`} />
                <div className="p-3">
                  <p className="font-mono text-small text-ink">{name}</p>
                  <p className="font-mono text-small text-muted">{hex}</p>
                  <p className="mt-1 text-small text-muted">{use}</p>
                </div>
              </div>
            ))}
          </div>
        </Block>

        <Block id="sg-contrast" title="Contrast" note="Calculated on this page with the WCAG 2.x formula. Text needs 4.5:1, including large text, and controls need 3:1.">
          <div className="overflow-x-auto" role="region" aria-label="Contrast pairs" tabIndex={0}>
            <table className="w-full min-w-[36rem] border-collapse text-compact">
              <thead>
                <tr className="border-b border-border text-left">
                  <th scope="col" className="py-2 pr-4 font-semibold">Sample</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">Foreground</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">Background</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">Ratio</th>
                  <th scope="col" className="py-2 font-semibold">Result</th>
                </tr>
              </thead>
              <tbody>
                {pairs.map(([fg, fgHex, bg, bgHex, min]) => {
                  const r = contrastRatio(fgHex, bgHex);
                  return (
                    <tr key={`${fg}-${bg}`} className="border-b border-hairline">
                      <td className="py-2 pr-4">
                        {min === 4.5 && r >= min ? (
                          <span className="inline-block rounded-sm px-2 py-1 font-semibold" style={{ color: fgHex, background: bgHex }}>
                            Aa
                          </span>
                        ) : (
                          // Control colours and failing pairs are shown as a bar, because they must never be used for text.
                          <span className="inline-flex h-8 w-12 items-center justify-center rounded-sm" style={{ background: bgHex }}>
                            <span className="h-1 w-8 rounded-sm" style={{ background: fgHex }} />
                          </span>
                        )}
                      </td>
                      <td className="py-2 pr-4 font-mono">{fg}</td>
                      <td className="py-2 pr-4 font-mono">{bg}</td>
                      <td className="py-2 pr-4 font-mono tabular-nums">{r.toFixed(2)}:1</td>
                      <td className="py-2">{r >= min ? <Badge variant="success">Pass at {min}:1</Badge> : <Badge variant="error">Fails {min}:1</Badge>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Block>

        <Block id="sg-type" title="Type" note="Inter, self-hosted through next/font/local. Sizes interpolate between 375 px and 1024 px.">
          <div className="flex flex-col gap-6">
            {typeScale.map(([name, cls, spec, sample]) => (
              <div key={name} className="grid gap-2 md:grid-cols-[12rem_1fr]">
                <div>
                  <p className="font-mono text-small text-ink">{name}</p>
                  <p className="font-mono text-small text-muted">{spec}</p>
                </div>
                <p className={`${cls} ${name.startsWith("H") ? "text-maroon-900" : name === "Eyebrow" ? "text-gold-800" : name === "Small" ? "text-muted" : "text-ink"}`}>{sample}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block id="sg-spacing" title="Spacing" note="Base unit 4 px. Use only these steps. Sections are 96 px on desktop and 64 px on mobile.">
          <div className="flex flex-col gap-2">
            {spacing.map(([step, px]) => (
              <div key={step} className="flex items-center gap-4">
                <span className="w-24 font-mono text-small text-muted">
                  {step} = {px} px
                </span>
                <span className={`h-4 ${spacingWidth[step]} rounded-sm bg-maroon-700`} />
              </div>
            ))}
          </div>
        </Block>

        <Block id="sg-radius" title="Radius and shadows">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[["rounded-sm", "2 px: badges, checkboxes"], ["rounded-md", "4 px: buttons, fields"], ["rounded-lg", "8 px: cards, images"], ["rounded-full", "999 px: radio only"]].map(([c, d]) => (
              <div key={c}>
                <div className={`h-20 border border-border bg-white ${c}`} />
                <p className="mt-2 font-mono text-small text-muted">{d}</p>
              </div>
            ))}
            {[["shadow-sm", "Sticky header"], ["shadow-md", "Card hover, 3D labels"], ["shadow-lg", "Dropdown menus only"]].map(([c, d]) => (
              <div key={c}>
                <div className={`h-20 rounded-lg bg-white ${c}`} />
                <p className="mt-2 font-mono text-small text-muted">
                  {c}: {d}
                </p>
              </div>
            ))}
          </div>
        </Block>

        <Block id="sg-grid" title="Grid and container" note="12 columns from 1024 px, 8 from 768 px and 4 below, inside a 1280 px container. Resize the window to see the change.">
          <div className="grid grid-cols-4 gap-4 md:grid-cols-8 md:gap-6 lg:grid-cols-12">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className={`h-12 rounded-sm bg-maroon-100 ${i >= 8 ? "hidden lg:block" : i >= 4 ? "hidden md:block" : ""}`} />
            ))}
          </div>
        </Block>

        <Block id="sg-motion" title="Motion and focus" note="Hover the cards to see 120 ms and 200 ms with ease-out. Tab to any control to see the focus ring. Under reduced motion, movement is removed.">
          <div className="flex flex-wrap gap-6">
            {[["duration-[120ms]", "120 ms: hover and press"], ["duration-200", "200 ms: menus, card hover"], ["duration-[320ms]", "320 ms: large panels"]].map(([d, t]) => (
              <div key={d} className={`flex h-20 w-56 items-center justify-center rounded-lg border border-hairline bg-white text-small text-muted transition-transform ease-out hover:-translate-y-1 ${d}`}>
                {t}
              </div>
            ))}
            <div className="flex h-20 w-56 items-center justify-center rounded-lg border border-hairline bg-white text-small text-muted" data-demo="focus">
              Focus ring, maroon-700
            </div>
          </div>
        </Block>

        <Block id="sg-buttons" title="Buttons" note="Primary, secondary and ghost; small, medium and large; a link when given href, otherwise a button. At most one primary in each view. Gold is for maroon, except the header quote button, which has a maroon border (decision 249).">
          <div className="mb-8 flex flex-wrap items-end gap-4">
            <div>
              <Label>sm, 44 px</Label>
              <Button size="sm" href="/contact-us/">Start a consultation</Button>
            </div>
            <div>
              <Label>md, 48 px</Label>
              <Button size="md" href="/contact-us/">Start a consultation</Button>
            </div>
            <div>
              <Label>lg, 56 px</Label>
              <Button size="lg" href="/contact-us/">Start a consultation</Button>
            </div>
            <div>
              <Label>link with icon</Label>
              <Button variant="secondary" href="/solutions/" icon={<ArrowRight size={20} strokeWidth={1.5} />}>
                Explore solutions
              </Button>
            </div>
            <div>
              <Label>tel: link</Label>
              <Button variant="secondary" href="tel:+97126268001" leadingIcon={<Phone size={18} strokeWidth={1.5} />}>
                Call +971 2 626 8001
              </Button>
            </div>
            <div>
              <Label>button element</Label>
              <Button type="submit">Send enquiry</Button>
            </div>
          </div>
          <ButtonMatrix variants={["primary", "secondary", "ghost", "gold"]} />
        </Block>
      </Container>

      <Section tone="dark" labelledBy="sg-dark-buttons">
        <h2 id="sg-dark-buttons" className="mb-6 text-h3 text-(color:--heading)">
          Buttons on maroon
        </h2>
        <ButtonMatrix variants={["gold", "secondary", "ghost"]} onDark />
      </Section>

      <Container>
        <Block id="sg-sections" title="Section and SectionHeading" note="Tones: light, stone, dark (maroon-900) and band (maroon-700). Headings, links and focus rings take their colours from the section.">
          <span />
        </Block>
      </Container>
      <Section tone="light" labelledBy="sg-h-light">
        <SectionHeading id="sg-h-light" eyebrow="SCADA. Control. Instrumentation." title="Industries we serve" intro="We work in oil and gas, power, water and infrastructure. Choose your sector to see what we offer." aside={<Button variant="ghost" href="/industries/" icon={<ArrowRight size={20} strokeWidth={1.5} />}>View all industries</Button>} />
        <Label>tone=&quot;light&quot;</Label>
      </Section>
      <Section tone="stone" labelledBy="sg-h-stone">
        <SectionHeading id="sg-h-stone" title="From field instruments to SCADA" intro="Select an area of this illustrative plant to see the work we offer there." />
        <Label>tone=&quot;stone&quot;</Label>
      </Section>
      <Section tone="dark" labelledBy="sg-h-dark">
        <SectionHeading id="sg-h-dark" eyebrow="SCADA. Control. Instrumentation." title="Why Vanguard" intro="We are based in Abu Dhabi and serve the UAE, including Dubai." />
        <p className="font-mono text-small text-(color:--secondary)">tone=&quot;dark&quot;</p>
      </Section>
      <Section tone="band" labelledBy="sg-h-band" compact>
        <SectionHeading id="sg-h-band" title="Tell us about your system" intro="Start with a free consultation. Share your sector, site and scope." aside={<Button variant="gold" onDark href="/contact-us/">Start a consultation</Button>} className="mb-0 lg:mb-0" />
      </Section>

      <Container>
        <Block id="sg-cards" title="Card" note="White, hairline border, 8 px radius, 24 px padding. A linked card is one link, and ends with a text link.">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <Label>static</Label>
              <Card>
                <CardTitle>System Integration</CardTitle>
                <CardText>We implement SCADA, communications and control systems as complete solutions.</CardText>
              </Card>
            </div>
            {states.map((s) => (
              <div key={stateLabel(s)}>
                <Label>linked, {stateLabel(s)}</Label>
                <Card href="/solutions/" demoState={s}>
                  <CardTitle>PLC/SCADA Design &amp; Validation</CardTitle>
                  <CardText>We design and validate PLC programs and implement SCADA systems.</CardText>
                  <CardLinkText>Explore solutions</CardLinkText>
                </Card>
              </div>
            ))}
            <div>
              <Label>selected, as in the 3D list</Label>
              <Card href="/industries/" selected>
                <CardTitle>Oil &amp; Gas</CardTitle>
                <CardText>SCADA, communications and control systems, with instrumentation and field installation.</CardText>
              </Card>
            </div>
          </div>
        </Block>

        <Block id="sg-badges" title="Badge" note="Non-interactive labels. Never for unsourced claims such as Certified or ISO.">
          <div className="flex flex-wrap gap-4">
            <Badge>Oil and gas</Badge>
            <Badge variant="maroon">Solutions</Badge>
            <Badge variant="gold">Illustrative model</Badge>
            <Badge variant="success">Sent</Badge>
            <Badge variant="error">Check these details</Badge>
          </div>
        </Block>

        <Block id="sg-icons" title="IconBox" note="Decorative. The text beside it carries the meaning. Line icons use a 1.5 px stroke; 3D icons are images with empty alt text.">
          <div className="flex flex-wrap items-center gap-6">
            <IconBox icon={Phone} size="sm" />
            <IconBox icon={Mail} />
            <IconBox icon={MapPin} size="lg" />
            <span className="inline-flex items-center gap-3 rounded-lg bg-maroon-900 p-3">
              <IconBox icon={Wrench} onDark />
              <span className="text-compact text-paper">onDark</span>
            </span>
            <span className="inline-flex items-center gap-3">
              <IconBox size="lg">
                {/* eslint-disable-next-line @next/next/no-img-element -- 64 px decorative image; next/image adds nothing here */}
                <img src="/images/3d/hero-still-780.webp" alt="" width={64} height={64} className="size-16 object-cover" />
              </IconBox>
              <span className="text-compact">Image inside, alt=&quot;&quot;</span>
            </span>
          </div>
        </Block>

        <Block
          id="sg-stats"
          title="StatNumber"
          note={
            <>
              Counts up once when scrolled into view, and shows the final value at once with reduced motion or no JavaScript. <strong>Not for use on the site until a sourced figure exists</strong> (decisions 69 and 239). The example counts the steps in How we work, not a company figure.
            </>
          }
        >
          <div className="flex flex-wrap gap-12">
            <StatNumber value={5} label="Steps in How we work" />
            <span className="rounded-lg bg-maroon-900 p-6">
              <StatNumber value={5} label="Steps in How we work" onDark />
            </span>
          </div>
        </Block>

        <Block id="sg-accordion" title="Accordion" note="Native details and summary, so it works by keyboard and with no JavaScript. The first item starts open.">
          <Accordion
            className="max-w-[54rem]"
            defaultOpen={["faq-platforms"]}
            items={[
              { id: "faq-platforms", question: "Which PLC and SCADA platforms do you work with?", answer: "Tell us which platform your site runs on. We will confirm how we can support it." },
              { id: "faq-existing", question: "Can you work with an existing SCADA system?", answer: "Our services include retrofit work. Share details of your current system so we can review it." },
              { id: "faq-standards", question: "Which standards apply to my project?", answer: "See \"Industry standards for this work\" on our About page, and ask us which apply. We do not claim certification against them." },
            ]}
          />
        </Block>

        <Block id="sg-fields" title="FormField" note="Label above, 48 px controls, 16 px text. Errors use a 2 px border, an icon and text, linked with aria-describedby.">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            <FormField id="sg-f-default" label="Your name" />
            <FormField id="sg-f-hover" label="Your name (hover)" demoState="hover" />
            <FormField id="sg-f-focus" label="Your name (focus)" demoState="focus" />
            <FormField id="sg-f-filled" label="Organisation" defaultValue="Example organisation" />
            <FormField id="sg-f-help" label="Email address" type="email" help="We use this to reply to you." />
            {/* Field samples read the enquiry form and newsletter copy from the content layer. */}
            <FormField id="sg-f-optional" label={F.Phone.label} type="tel" optional help={F.Phone.help} />
            <FormField id="sg-f-error" label={F.Email.label} type="email" error={F.Email.error} />
            <FormField id="sg-f-success" label={F.Email.label} type="email" defaultValue="name@example.com" success="Success state (styleguide label)." />
            <FormField id="sg-f-disabled" label={F.Location.label} disabled help="Disabled. Avoid in the enquiry form." />
            <FormField id="sg-f-readonly" label={F.Location.label} readOnly defaultValue="Abu Dhabi, UAE" help="Read-only." />
            <FormField
              id="sg-f-select"
              as="select"
              label={F["Request type"].label}
              options={F["Request type"].options ?? []}
              placeholder={SELECT_SAMPLE}
              defaultValue={F["Request type"].options?.[0]}
              prefilledNote={enquiryFormCopy.prefilledHelp}
            />
            <FormField id="sg-f-select-error" as="select" label={F.Sector.label} options={F.Sector.options ?? []} placeholder={SELECT_SAMPLE} error={F.Sector.error} />
            <FormField id="sg-f-textarea" as="textarea" label={F.Scope.label} help={F.Scope.help} className="md:col-span-2" />
            <FormField id="sg-f-check" as="checkbox" label={<Rich text={newsletterCopy.consent} />} />
            <FormField id="sg-f-check-error" as="checkbox" label={<Rich text={newsletterCopy.consent} />} error={newsletterCopy.consentError} />
          </div>
        </Block>
      </Container>
    </main>
  );
}
