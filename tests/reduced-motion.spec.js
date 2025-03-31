import { test, expect } from "@playwright/test";

test("Checks if the site respects reduced motion settings", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("https://www.ilry.fi/en/");
  const animations = await page.evaluate(() => {
    return getComputedStyle(document.body).animationName;
  });
  expect(animations).toBe("none");
});
