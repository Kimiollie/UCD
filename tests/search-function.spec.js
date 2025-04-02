import { test, expect } from "@playwright/test";

test("Search salary information for engineers graduating in 2025", async ({
  page,
}) => {
  await page.goto("https://www.ilry.fi/en/");
  const acceptCookiesButton = page.getByRole("button", {
    name: "Allow all cookies",
  });
  await acceptCookiesButton.waitFor({ state: "visible" });
  await acceptCookiesButton.click();

  const searchButton = await page.waitForSelector("button.search-toggle", {
    state: "visible",
  });
  await searchButton.click();

  const searchInput = page.getByRole("textbox", { name: "Search" });
  await searchInput.fill("salary information engineers 2025");

  await searchInput.press("Enter");

  const resultPage = page.getByRole("link", {
    name: "Student's salary matters",
  });
  await expect(resultPage).toBeVisible();
  await resultPage.click();

  await page.waitForSelector("table");
  const salaryCells = await page.locator("td").allTextContents();
  console.log("Salary information", salaryCells);
});

