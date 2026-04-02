import { expect, test } from '../fixtures/test-fixtures';
import { env } from '../utils/env';

test.describe('Amazon search', () => {
  test('Navigate to Amazon and search for MacBook', async ({ amazonHomePage, page }) => {
    await amazonHomePage.goto();
    await amazonHomePage.searchProduct(env.searchTerm);

    await expect(page).toHaveTitle(/macbook/i);
  });
});
