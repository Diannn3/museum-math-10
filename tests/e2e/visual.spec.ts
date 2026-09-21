import { mkdir } from "node:fs/promises";
import { expect, test } from "@playwright/test";

const routes = [
  ["entrance", "/"],
  ["exhibition", "/exhibition"],
  ["flower", "/work/desmos-flower"],
  ["fibonacci", "/work/fibonacci-modulo-25"],
  ["closing", "/closing"]
] as const;

for (const viewport of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 }
]) {
  test(`capture ${viewport.name} museum views`, async ({ page }) => {
    await mkdir("artifacts/screenshots", { recursive: true });
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.emulateMedia({ reducedMotion: "reduce" });

    for (const [name, path] of routes) {
      await page.goto(path);
      await expect(page.locator("body")).toBeVisible();
      await page.screenshot({
        path: `artifacts/screenshots/${viewport.name}-${name}.png`,
        fullPage: true
      });
    }
  });
}
