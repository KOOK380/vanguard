"use client";

import { useSyncExternalStore } from "react";

/**
 * The visitor's analytics choice (decisions 174, 175 and 289): one choice each for GA4 and Clarity,
 * kept in localStorage for 12 months, as the Privacy Policy says. Nothing here identifies the
 * visitor. Storage can be blocked, so every read and write is guarded, and a blocked store means
 * "no choice yet", which loads nothing.
 */

export type Consent = { ga: boolean; clarity: boolean };
type Stored = Consent & { v: 1; at: number };

const KEY = "vt-consent";
const MAX_AGE = 365 * 864e5;
const OPEN_SETTINGS = "vt:cookie-settings";
const MEMORY = "__memory__";
const listeners = new Set<() => void>();
let cache: { raw: string | null; value: Consent | null } = { raw: null, value: null };

function read(): Consent | null {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return cache.raw === MEMORY ? cache.value : null;
  }
  if (raw === cache.raw) return cache.value;
  let value: Consent | null = null;
  try {
    const s = raw ? (JSON.parse(raw) as Partial<Stored>) : null;
    if (s && s.v === 1 && typeof s.at === "number" && Date.now() - s.at < MAX_AGE) value = { ga: s.ga === true, clarity: s.clarity === true };
  } catch {
    value = null;
  }
  cache = { raw, value };
  return value;
}

export function saveConsent(choice: Consent) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ v: 1, at: Date.now(), ...choice } satisfies Stored));
  } catch {
    // Storage blocked: the choice lasts for this page view only.
    cache = { raw: MEMORY, value: choice };
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => e.key === KEY && listener();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/**
 * The stored choice. undefined on the server and during hydration, so nothing shows or loads until
 * the browser has read it; null when the visitor has not chosen yet.
 */
export function useConsent(): Consent | null | undefined {
  return useSyncExternalStore(subscribe, read, () => undefined);
}

/** Opens Cookie settings from anywhere, such as the footer link. */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS));
}

export function onOpenCookieSettings(handler: () => void) {
  window.addEventListener(OPEN_SETTINGS, handler);
  return () => window.removeEventListener(OPEN_SETTINGS, handler);
}
