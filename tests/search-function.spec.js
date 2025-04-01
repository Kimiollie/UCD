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

  const salaryCell = await page.getByRole("cell", { name: "3,600" });
  const value = await salaryCell.textContent();
  console.log(value); //3,600

  await expect(value).toBe("3,600");

  // Wait for results to load and take an accessibility snapshot
  await page.waitForLoadState("domcontentloaded");
  const a11yTree = await page.accessibility.snapshot({ interestingOnly: true });
  // Capture a screenshot for visual regression testing
  await page.screenshot({ path: "snapshots/salary-search.png" });
  // Log accessibility tree for debugging (without textual content)
  console.log(JSON.stringify(a11yTree, null, 2));
});

