import { defineConfig } from "@playwright/test";

/**
 * End-to-end tests against a production build (decision 294). Run with `npm run test:e2e`.
 * Email goes to a local stand-in for Resend, and Turnstile and analytics are switched off, so the
 * tests send nothing to any outside service, whatever is in .env.local.
 */
const PORT = 3100;

export default defineConfig({
  testDir: "./e2e",
  workers: 1, // the tests share the stand-in's list of sent emails
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  reporter: "list",
  timeout: 45_000,
  use: { baseURL: `http://localhost:${PORT}`, browserName: "chromium", viewport: { width: 1440, height: 900 } },
  webServer: [
    { command: "node e2e/resend-stub.mjs", port: 4100, reuseExistingServer: false },
    {
      command: `npm run build && npx next start -p ${PORT}`,
      port: PORT,
      timeout: 300_000,
      reuseExistingServer: false,
      env: {
        RESEND_API_KEY: "re_e2e_stub",
        RESEND_FROM: "Vanguard Technology <website@vanguardgcc.com>",
        RESEND_BASE_URL: "http://localhost:4100",
        ENQUIRY_TO: "info@vanguardgcc.com",
        SITE_URL: `http://localhost:${PORT}`,
        TURNSTILE_SECRET_KEY: "",
        NEXT_PUBLIC_TURNSTILE_SITE_KEY: "",
        NEXT_PUBLIC_GA_ID: "",
        NEXT_PUBLIC_CLARITY_ID: "",
      },
    },
  ],
});
