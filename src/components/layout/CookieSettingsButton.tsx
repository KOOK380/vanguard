"use client";

import { openCookieSettings } from "@/lib/consent";

/** The footer's "Cookie settings" link, a button because it opens a dialog (decision 289). */
export function CookieSettingsButton({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {label}
    </button>
  );
}
