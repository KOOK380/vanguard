import type { ReactNode, SVGProps } from "react";

/**
 * Line icons for the solution rows, drawn to match the low-poly 3D icons (decision 275). They show
 * on phones, with reduced motion, without WebGL and before the 3D loads. 24 px grid, 1.5 px
 * stroke, in currentColor, like the lucide icons used elsewhere.
 */

export type SolutionIconKind = "gear" | "gauge" | "reel" | "hook" | "clipboard" | "wrench" | "plc" | "monitor" | "speaker";

const paths: Record<SolutionIconKind, ReactNode> = {
  gear: (
    <>
      <path d="M12 2.5v2.6M12 18.9v2.6M21.5 12h-2.6M5.1 12H2.5M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8M18.7 18.7l-1.8-1.8M7.1 7.1 5.3 5.3" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2.2" />
    </>
  ),
  gauge: (
    <>
      <circle cx="12" cy="13" r="8.5" />
      <path d="M12 13l4-4.5" />
      <path d="M6.5 13h1.5M16 13h1.5M12 7.5V9" />
      <path d="M8 19.5h8" />
    </>
  ),
  reel: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M20.5 12h1.5v8h-3" />
    </>
  ),
  hook: (
    <>
      <path d="M12 2.5v5" />
      <rect x="9" y="7.5" width="6" height="3.5" rx="0.5" />
      <path d="M12 11v3.5a3.5 3.5 0 1 1-3.5 3.5" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4.5" width="14" height="17" rx="1.5" />
      <rect x="9" y="2.5" width="6" height="4" rx="1" />
      <path d="M8.5 11h7M8.5 14.5h7M8.5 18h4" />
    </>
  ),
  wrench: (
    <>
      <path d="M14.5 3.5a4.5 4.5 0 0 0-4.2 6.1L3.5 16.4a1.8 1.8 0 0 0 2.6 2.6l6.8-6.8a4.5 4.5 0 0 0 6.1-4.2l-2.8 2.8-2.6-.4-.4-2.6 2.8-2.8a4.5 4.5 0 0 0-1.5-.5Z" />
    </>
  ),
  plc: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="1.5" />
      <path d="M3.5 8h17M3.5 16h17" />
      <path d="M7 12h1.5M11 12h1.5M15 12h1.5" />
      <path d="M6.5 18h0M9.5 18h0M12.5 18h0M15.5 18h0" strokeLinecap="round" strokeWidth={2} />
    </>
  ),
  monitor: (
    <>
      <rect x="2.5" y="3.5" width="19" height="13" rx="1.5" />
      <path d="M6 13l3.5-3.5 3 2.5L18 7" />
      <path d="M12 16.5v4M8 20.5h8" />
    </>
  ),
  speaker: (
    <>
      <rect x="5.5" y="2.5" width="13" height="19" rx="1.5" />
      <circle cx="12" cy="15" r="3.5" />
      <circle cx="12" cy="7" r="1.8" />
    </>
  ),
};

export function SolutionIcon({ kind, ...props }: { kind: SolutionIconKind } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
      {paths[kind]}
    </svg>
  );
}
