import { expect, test } from "@playwright/test";

test("entrance leads into the four-work exhibition", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /MATH/ })).toBeVisible();

  await page.getByRole("link", { name: /Enter exhibition/i }).click();
  await expect(page).toHaveURL(/\/exhibition$/);
  await expect(page.getByRole("heading", { level: 1, name: "The Exhibition" })).toBeVisible();
  await expect(page.locator(".collection-card")).toHaveCount(4);
});

test("confirmed artist credits render on overview and work labels", async ({ page }) => {
  await page.goto("/exhibition");
  const cards = page.locator(".collection-card");
  await expect(cards.nth(0)).toContainText("Dwayne Alilio");
  await expect(cards.nth(1)).toContainText("Faith Leong");
  await expect(cards.nth(2)).toContainText("Faith Leong");
  await expect(cards.nth(3)).toContainText("Aedrian Ponce");

  for (const [path, artist] of [
    ["/work/desmos-flower", "Dwayne Alilio"],
    ["/work/geometric-portrait", "Faith Leong"],
    ["/work/perspective-study", "Faith Leong"],
    ["/work/fibonacci-modulo-25", "Aedrian Ponce"]
  ] as const) {
    await page.goto(path);
    await expect(page.locator(".work__facts")).toContainText(artist);
  }
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

test("Fibonacci installation uses the light museum treatment and current preview", async ({ page }) => {
  await page.goto("/work/fibonacci-modulo-25");

  await expect(page.locator(".work-shell")).not.toHaveClass(/work-shell--interactive/);
  await expect(page.locator(".site-header")).not.toHaveClass(/site-header--dark/);

  const preview = page.locator(".work__frame img");
  await expect(preview).toHaveAttribute("src", "/artworks/fibonacci-preview.svg");
  await expect(preview).toHaveAttribute("width", "1600");
  await expect(preview).toHaveAttribute("height", "1030");

  const background = await page.locator(".work-shell").evaluate((node) =>
    getComputedStyle(node).backgroundColor
  );
  expect(background).not.toBe("rgb(11, 11, 17)");
});

test("reduced motion keeps reveal content immediately visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/exhibition");
  await expect(page.locator("html")).not.toHaveClass(/motion-ready/);
  await expect(page.locator(".collection-card").first()).toBeVisible();
});

test("interactive work never autoplays audio inside the museum", async ({ page }) => {
  await page.goto("/work/fibonacci-modulo-25");
  const portal = page.getByRole("link", { name: /Enter interactive work/i });
  await expect(portal).toBeVisible();
  await expect(portal).toHaveAttribute("target", "_blank");
  await expect(page.locator("audio, video")).toHaveCount(0);
});

test("all museum artwork images decode successfully", async ({ page }) => {
  for (const path of ["/exhibition", "/work/desmos-flower", "/work/geometric-portrait", "/work/perspective-study", "/work/fibonacci-modulo-25"]) {
    await page.goto(path);
    const images = page.locator("img");
    await expect(images.first()).toBeVisible();

    const states = await images.evaluateAll(async (elements) =>
      Promise.all(
        elements.map(async (node) => {
          const image = node as HTMLImageElement;

          if (typeof image.decode === "function") {
            await image.decode().catch(() => undefined);
          }

          return {
            src: image.getAttribute("src"),
            complete: image.complete,
            naturalWidth: image.naturalWidth,
            naturalHeight: image.naturalHeight
          };
        })
      )
    );

    for (const state of states) {
      expect(state.complete, `${path}: ${state.src} did not finish loading`).toBe(true);
      expect(state.naturalWidth, `${path}: ${state.src} has no decoded width`).toBeGreaterThan(0);
      expect(state.naturalHeight, `${path}: ${state.src} has no decoded height`).toBeGreaterThan(0);
    }
  }
});

test("static artwork sources preserve the supplied full-resolution dimensions", async ({ page }) => {
  const expected = [
    {
      path: "/work/desmos-flower",
      src: "/artworks/desmos-flower.jpg",
      width: 1194,
      height: 1207
    },
    {
      path: "/work/geometric-portrait",
      src: "/artworks/geometric-portrait.jpg",
      width: 2048,
      height: 2518
    },
    {
      path: "/work/perspective-study",
      src: "/artworks/perspective-city.jpg",
      width: 3166,
      height: 2048
    }
  ];

  for (const artwork of expected) {
    await page.goto(artwork.path);
    const image = page.locator(".work__frame img");
    await expect(image).toHaveAttribute("src", artwork.src);

    const dimensions = await image.evaluate(async (node) => {
      const element = node as HTMLImageElement;
      if (typeof element.decode === "function") {
        await element.decode();
      }

      return {
        width: element.naturalWidth,
        height: element.naturalHeight
      };
    });

    expect(dimensions.width, `${artwork.src} width`).toBe(artwork.width);
    expect(dimensions.height, `${artwork.src} height`).toBe(artwork.height);
  }

  await page.goto("/work/desmos-flower");
  const processImage = page.locator(".process__figure img");
  await expect(processImage).toHaveAttribute("src", "/artworks/desmos-flower-process.jpg");
  const processDimensions = await processImage.evaluate(async (node) => {
    const element = node as HTMLImageElement;
    if (typeof element.decode === "function") {
      await element.decode();
    }

    return {
      width: element.naturalWidth,
      height: element.naturalHeight
    };
  });

  expect(processDimensions.width).toBe(719);
  expect(processDimensions.height).toBe(996);
});

test("document chrome contains no escaped newline artifacts", async ({ page }) => {
  for (const path of ["/", "/exhibition", "/work/desmos-flower", "/work/fibonacci-modulo-25", "/about", "/closing"]) {
    await page.goto(path);
    const visibleText = await page.locator("body").innerText();
    expect(visibleText, `${path} should not render an escaped newline token`).not.toContain("\\n");
  }
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
