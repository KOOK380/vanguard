"use client";

import { useEffect, useRef } from "react";
import { useConsent } from "@/lib/consent";

/**
 * GA4 and Microsoft Clarity, each loaded only after the visitor accepts it (decisions 174, 175 and
 * 289, and the build requirements in legal.md). Nothing loads before a choice, including Clarity's
 * no-consent mode. GA4 runs with advertising storage denied, Google signals and ad personalisation
 * off, and 12-month cookies. Clarity is told ad_Storage denied and analytics_Storage granted. When
 * a tool is declined, its first-party cookies are cleared, and a page that had it loaded reloads to
 * unload it.
 *
 * It also reports clicks on phone, email and WhatsApp links and on Request a quote buttons
 * (data-track="request_quote"), to whichever tools are loaded. With neither loaded, nothing is sent.
 */

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

const GA_COOKIES = /^(_ga|_ga_.+|_gid|_gat.*)$/;
const CLARITY_COOKIES = /^(_clck|_clsk|CLID|ANONCHK|SM|MR)$/;

function clearCookies(pattern: RegExp) {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0]?.trim() ?? "";
    if (!pattern.test(name)) continue;
    for (const d of domains) document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
  }
}

function addScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadGa(id: string) {
  const w = window as AnalyticsWindow;
  w.dataLayer = w.dataLayer ?? [];
  // gtag must push the arguments object itself, as Google's snippet does.
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer?.push(arguments);
  };
  w.gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted" });
  w.gtag("js", new Date());
  w.gtag("config", id, { allow_google_signals: false, allow_ad_personalization_signals: false, cookie_expires: 365 * 24 * 60 * 60 });
  addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`);
}

function loadClarity(id: string) {
  const w = window as AnalyticsWindow;
  // Queues calls until Clarity's script loads, as Microsoft's snippet does.
  if (!w.clarity) {
    const q: unknown[] = [];
    w.clarity = Object.assign(function clarity() {
      // eslint-disable-next-line prefer-rest-params
      q.push(arguments);
    }, { q });
  }
  w.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });
  addScript(`https://www.clarity.ms/tag/${encodeURIComponent(id)}`);
}

/** Where a click happened, for the event's "location" parameter. */
function area(el: Element): string {
  const tagged = el.closest<HTMLElement>("[data-track-area]");
  if (tagged?.dataset.trackArea) return tagged.dataset.trackArea;
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  return "content";
}

function eventFor(el: Element): string | null {
  if (el instanceof HTMLElement && el.dataset.track === "request_quote") return "click_request_quote";
  const href = el.getAttribute("href") ?? "";
  if (href.startsWith("tel:")) return "click_phone";
  if (href.startsWith("mailto:")) return "click_email";
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return "click_whatsapp";
  return null;
}

export function Analytics() {
  const consent = useConsent();
  const loaded = useRef({ ga: false, clarity: false });

  useEffect(() => {
    if (!consent) return;
    if (consent.ga && GA_ID && !loaded.current.ga) {
      loadGa(GA_ID);
      loaded.current.ga = true;
    }
    if (consent.clarity && CLARITY_ID && !loaded.current.clarity) {
      loadClarity(CLARITY_ID);
      loaded.current.clarity = true;
    }
    if (!consent.ga) clearCookies(GA_COOKIES);
    if (!consent.clarity) {
      (window as AnalyticsWindow).clarity?.("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" });
      clearCookies(CLARITY_COOKIES);
    }
    // A tool that was running on this page keeps running until the page unloads it.
    if ((!consent.ga && loaded.current.ga) || (!consent.clarity && loaded.current.clarity)) window.location.reload();
  }, [consent]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target instanceof Element ? e.target.closest("a, button") : null;
      const name = el ? eventFor(el) : null;
      if (!el || !name) return;
      const w = window as AnalyticsWindow;
      w.gtag?.("event", name, { location: area(el) });
      w.clarity?.("event", name);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
