import { test, expect } from "@playwright/test";

test("All main menu links return status 200", async ({ page, request }) => {
  await page.goto("https://www.ilry.fi/en/");

  const acceptCookiesButton = page.getByRole("button", {name: "Allow all cookies",});
  await acceptCookiesButton.waitFor({ state: "visible" });
  await acceptCookiesButton.click();

  await page.getByRole("button", { name: "Menu" }).click();

  const menu = page.getByRole("navigation", { name: "Main menu" });
  await expect(menu).toBeVisible();

  const links = await menu.getByRole("link").all();

  for (const link of links) {
    const url = await link.getAttribute("href");
    if (url) {
      const response = await request.get(url);
      expect(response.status()).toBe(200);
    }
  }
});