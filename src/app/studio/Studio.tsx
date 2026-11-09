"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

/**
 * Sanity Studio (decision 283). A client component, because the config holds functions. It covers
 * the site's header and footer in its own full-screen layer, and Lenis leaves its scrolling alone.
 */
export function Studio() {
  return (
    <div data-lenis-prevent className="fixed inset-0 z-50 bg-white">
      <NextStudio config={config} />
    </div>
  );
}
