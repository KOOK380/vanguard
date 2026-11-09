import { expect, test, type Page } from "@playwright/test";

/** Launch checks (decision 294): the Home heading, phone menu, enquiry form and 3D fallback. */

const STUB = "http://localhost:4100/__sent";
type SentEmail = { to: string | string[]; reply_to?: string | string[]; subject: string; text: string };
const sentEmails = async (): Promise<SentEmail[]> => (await fetch(STUB)).json() as Promise<SentEmail[]>;
const phone = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true };

async function fillEnquiry(page: Page) {
  await page.selectOption("#enq-request", "Project enquiry");
  await page.fill("#enq-scope", "Upgrade of an existing SCADA system for a pumping station.");
  await page.selectOption("#enq-sector", "Water and wastewater");
  await page.selectOption("#enq-system", "SCADA");
  await page.fill("#enq-location", "Abu Dhabi, UAE");
  await page.selectOption("#enq-stage", "Design");
  await page.fill("#enq-name", "Test Engineer");
  await page.fill("#enq-organisation", "Test Operator");
  await page.fill("#enq-email", "engineer@example.com");
}

test.beforeEach(async () => {
  await fetch(STUB, { method: "DELETE" });
});

test("homepage shows its one H1", async ({ page }) => {
  await page.goto("/");
  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toHaveCount(1);
  await expect(h1).toBeVisible();
  await expect(h1).toHaveText("Industrial automation and system integration for the UAE");
});

test.describe("on a phone", () => {
  test.use(phone);

  test("the navigation menu opens, links and closes", async ({ page }) => {
    await page.goto("/");
    const menu = page.locator("#phone-menu");
    await expect(menu).toBeHidden();
    await page.locator('header button[popovertarget="phone-menu"]').first().click();
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: "Capabilities" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();

    await page.locator('header button[popovertarget="phone-menu"]').first().click();
    await menu.getByRole("link", { name: "Capabilities" }).click();
    await expect(page).toHaveURL(/\/capabilities\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("3D falls back to the still image at 390 px", async ({ page }) => {
    const requests: string[] = [];
    page.on("request", (r) => requests.push(r.url()));
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const still = page.locator("main figure picture img").first();
    await expect(still).toBeVisible();
    expect(await still.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    expect(await still.getAttribute("alt")).toBeTruthy();
    await expect(page.locator("canvas")).toHaveCount(0);

    await page.goto("/solutions/");
    await page.locator('section[aria-labelledby="solutions-plant"]').scrollIntoViewIfNeeded();
    await page.waitForLoadState("networkidle");
    await expect(page.locator('section[aria-labelledby="solutions-plant"] figure ul button')).toHaveCount(6);
    await expect(page.locator("canvas")).toHaveCount(0);
    expect(requests.filter((u) => u.endsWith(".glb"))).toEqual([]);
  });
});

test.describe("enquiry form", () => {
  test("an empty form shows errors and sends nothing", async ({ page }) => {
    await page.goto("/contact-us/");
    await page.getByRole("button", { name: "Send enquiry" }).click();

    const summary = page.getByRole("alert").filter({ hasText: "Check these details" });
    await expect(summary).toBeVisible();
    await expect(summary).toBeFocused();
    await expect(summary.getByRole("link", { name: "Enter your email address so we can reply." })).toBeVisible();
    await expect(summary.getByRole("link", { name: "Tick the box to confirm that we may use your details." })).toBeVisible();
    await expect(page.locator("#enq-email")).toHaveAttribute("aria-invalid", "true");
    expect(await sentEmails()).toEqual([]);
  });

  test("a bad email and missing consent are rejected", async ({ page }) => {
    await page.goto("/contact-us/");
    await fillEnquiry(page);
    await page.fill("#enq-email", "not-an-email");
    await page.getByRole("button", { name: "Send enquiry" }).click();

    const links = page.getByRole("alert").filter({ hasText: "Check these details" }).getByRole("link");
    await expect(links).toHaveText(["Enter your email address so we can reply.", "Tick the box to confirm that we may use your details."]);
    expect(await sentEmails()).toEqual([]);
  });

  test("a valid enquiry emails the company and the visitor, and reports the lead", async ({ page }) => {
    await page.goto("/contact-us/?sector=Water%20and%20wastewater");
    await expect(page.locator("#enq-sector")).toHaveValue("Water and wastewater");
    await expect(page.locator("#enq-phone")).toHaveValue("+971 ");
    await page.evaluate(() => {
      (window as Window & { dataLayer?: unknown[] }).dataLayer = [];
    });

    await fillEnquiry(page);
    await page.check("#enq-consent");
    await page.getByRole("button", { name: "Send enquiry" }).click();

    const success = page.getByRole("status");
    await expect(success.getByRole("heading", { name: "Thank you. We have received your enquiry." })).toBeVisible();
    await expect(success).toBeFocused();

    const [internal, reply] = await sentEmails();
    expect(internal?.to).toBe("info@vanguardgcc.com");
    expect(internal?.reply_to).toBe("engineer@example.com");
    expect(internal?.text).toContain("Upgrade of an existing SCADA system");
    expect(reply?.to).toBe("engineer@example.com");
    expect(reply?.subject).toBe("Thank you. We have received your enquiry.");

    const events = await page.evaluate(() => (window as Window & { dataLayer?: { event?: string; sector?: string }[] }).dataLayer ?? []);
    const lead = events.find((e) => e.event === "generate_lead");
    expect(lead?.sector).toBe("Water and wastewater");
    expect(JSON.stringify(lead)).not.toContain("example.com");
  });
});
