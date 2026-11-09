/**
 * True when GA4 or Clarity is configured. The cookie banner and the footer's Cookie settings link
 * appear only then, because asking for consent to tools that are not installed would mislead
 * visitors (decisions 170 and 289). Read on the server and inlined in the browser.
 */
export const analyticsConfigured = Boolean(process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_CLARITY_ID);
