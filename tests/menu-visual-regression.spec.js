import { test, expect } from "@playwright/test";

test("Visual regression test on main menu", async ({ page }) => {
  await page.goto("https://www.ilry.fi/en/");

  const acceptCookiesButton = page.getByRole("button", {name: "Allow all cookies"});
  await acceptCookiesButton.waitFor({ state: "visible" });
  await acceptCookiesButton.click();

  await page.getByRole("button", { name: "Menu" }).click();

  const menu = page.getByRole("navigation", { name: "Main menu" });
  await expect(menu).toBeVisible();


  const a11yTree = await page.accessibility.snapshot({
    interestingOnly: false,
  });
  console.log(JSON.stringify(a11yTree, null, 2)); 

  expect(await menu.screenshot()).toMatchSnapshot("main-menu.png");
});
