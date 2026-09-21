import { expect, test } from "@playwright/test";

test("entrance leads into the four-work exhibition", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /MATH/ })).toBeVisible();

  await page.getByRole("link", { name: /Enter exhibition/i }).click();
  await expect(page).toHaveURL(/\/exhibition$/);
  await expect(page.getByRole("heading", { level: 1, name: "The Exhibition" })).toBeVisible();
  await expect(page.locator(".collection-card")).toHaveCount(4);
});

test("gallery arrow navigation follows the curated sequence", async ({ page }) => {
  await page.goto("/work/desmos-flower");
  await expect(page.getByRole("heading", { level: 1, name: "Desmos Flower" })).toBeVisible();

  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(/\/work\/geometric-portrait$/);
  await expect(page.getByRole("heading", { level: 1, name: "Geometric Portrait" })).toBeVisible();

  await page.keyboard.press("ArrowLeft");
  await expect(page).toHaveURL(/\/work\/desmos-flower$/);
});

test("final work exits into the closing room", async ({ page }) => {
  await page.goto("/work/fibonacci-modulo-25");
  await expect(page.getByRole("heading", { level: 1, name: "Fibonacci, Modulo 25" })).toBeVisible();

  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(/\/closing$/);
  await expect(page.getByRole("heading", { level: 1, name: "Thank You" })).toBeVisible();
});

test("interactive work never autoplays audio inside the museum", async ({ page }) => {
  await page.goto("/work/fibonacci-modulo-25");
  const portal = page.getByRole("link", { name: /Enter interactive work/i });
  await expect(portal).toBeVisible();
  await expect(portal).toHaveAttribute("target", "_blank");
  await expect(page.locator("audio, video")).toHaveCount(0);
});

for (const viewport of [
  { width: 320, height: 700 },
  { width: 390, height: 844 },
  { width: 768, height: 900 },
  { width: 1440, height: 900 }
]) {
  test(`no horizontal overflow at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);

    for (const path of ["/", "/exhibition", "/work/desmos-flower", "/work/fibonacci-modulo-25", "/about", "/closing"]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${path} overflow at ${viewport.width}px`).toBeLessThanOrEqual(1);
    }
  });
}
