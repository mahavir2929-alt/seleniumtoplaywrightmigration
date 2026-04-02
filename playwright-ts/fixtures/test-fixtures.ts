import { test as base } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { AmazonHomePage } from '../pages/amazonHome.page';

type TestFixtures = {
  amazonHomePage: AmazonHomePage;
};

export const test = base.extend<TestFixtures>({
  amazonHomePage: async ({ page }, use) => {
    const amazonHomePage = new AmazonHomePage(page);
    await use(amazonHomePage);
  }
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshotsDir = path.join('test-results', 'screenshots');
    fs.mkdirSync(screenshotsDir, { recursive: true });

    const safeTitle = testInfo.title.replace(/[^a-zA-Z0-9-_]/g, '_');
    const screenshotPath = path.join(
      screenshotsDir,
      `${safeTitle}-${testInfo.project.name}.png`
    );

    await page.screenshot({ path: screenshotPath, fullPage: true });
    await testInfo.attach('failure-screenshot', {
      path: screenshotPath,
      contentType: 'image/png'
    });
  }
});

export { expect } from '@playwright/test';
