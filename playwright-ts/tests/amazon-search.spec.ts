import { expect, test } from '../fixtures/test-fixtures';
import { env } from '../utils/env';

test.describe('Amazon search', () => {
  test.beforeEach(async ({ amazonHomePage }) => {
    await amazonHomePage.goto();
  });

  test('Search for MacBook and verify results page title', async ({ amazonHomePage, page }) => {
    await amazonHomePage.searchProduct(env.searchTerm);

    // Playwright auto-waits — no explicit sleep needed
    await expect(page).toHaveTitle(/macbook/i);
    await expect(page).toHaveURL(/s\?k=macbook/i);
  });

  test('Search box should be visible on homepage', async ({ page }) => {
    await expect(page.locator('#twotabsearchtextbox')).toBeVisible();
  });
});
