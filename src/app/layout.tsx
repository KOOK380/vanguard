import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Analytics } from "@/components/layout/Analytics";
import { CookieConsent, type CookieCopy } from "@/components/layout/CookieConsent";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { cookieCopy, homePage } from "@/content";
import { analyticsConfigured } from "@/lib/analytics-config";
import { pageMetadata, SITE_NAME, SITE_URL, TITLE_TEMPLATE } from "@/lib/seo";
import { a11y } from "@/content/site";
import "./globals.css";

const inter = localFont({
  src: "./fonts/inter-latin-wght.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
  fallback: ["Arial", "Helvetica", "sans-serif"],
  adjustFontFallback: "Arial",
});

// Defaults: the home page's metadata, the canonical origin for every relative URL, and the title
// template for any page without its own title (decision 293).
const home = pageMetadata(homePage.meta);
export const metadata: Metadata = {
  ...home,
  metadataBase: new URL(SITE_URL),
  title: { default: homePage.meta.title, template: TITLE_TEMPLATE },
  applicationName: SITE_NAME,
};

const [accept = "", decline = "", settings = ""] = cookieCopy.buttons;
const toolKey: Record<string, "ga" | "clarity"> = { "Google Analytics": "ga", "Microsoft Clarity": "clarity" };
const toolConfigured = { ga: Boolean(process.env.NEXT_PUBLIC_GA_ID), clarity: Boolean(process.env.NEXT_PUBLIC_CLARITY_ID) };
/** Cookie copy for the client banner, with only the tools that are configured (decision 289). */
const cookieBannerCopy: CookieCopy = {
  text: cookieCopy.text,
  accept,
  decline,
  settings,
  dialog: {
    heading: cookieCopy.settings.heading,
    intro: cookieCopy.settings.intro,
    button: cookieCopy.settings.button,
    toggles: cookieCopy.settings.toggles.flatMap((t) => {
      const key = toolKey[t.name];
      return key && toolConfigured[key] ? [{ ...t, key }] : [];
    }),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={inter.variable}>
      {/* The bottom padding keeps content clear of the phone action bar. */}
      <body className="min-h-full bg-paper pb-[calc(72px+env(safe-area-inset-bottom))] text-body text-ink md:pb-0">
        <a
          href="#main"
          className="fixed top-2 start-2 z-50 -translate-y-[200%] rounded-md bg-white px-4 py-3 font-semibold text-maroon-700 shadow-md focus:translate-y-0"
        >
          {a11y.skipLink}
        </a>
        <Header />
        {children}
        <Footer />
        <MobileActionBar />
        <FloatingWhatsApp />
        <OrganizationJsonLd />
        <SmoothScroll />
        {analyticsConfigured ? (
          <>
            <CookieConsent copy={cookieBannerCopy} />
            <Analytics />
          </>
        ) : null}
      </body>
    </html>
  );
}
