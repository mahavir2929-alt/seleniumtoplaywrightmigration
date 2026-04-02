# Playwright + TypeScript Migration (Isolated Project)

This folder contains the Playwright Test framework migrated from the Selenium Java project.

## Selenium to Playwright concept mapping

- `WebDriver` → Playwright `Browser` / `BrowserContext` / `Page`
- `By.id/css/xpath` → Playwright `locator()` / `getByRole()` / `getByLabel()`
- `@BeforeClass/@AfterClass` → `test.beforeEach()/test.afterEach()` or fixtures
- Explicit waits (`WebDriverWait`) → Playwright auto-waiting + `expect(...)`
- DriverFactory (`ThreadLocal`) → Playwright projects + isolated contexts per test
- TestNG runner → Playwright Test runner (`npx playwright test`)

## Folder structure

- `playwright.config.ts` - Playwright runner config (parallel, retries, projects)
- `tests/` - test specs
- `pages/` - page objects (POM)
- `fixtures/` - shared fixtures
- `utils/` - env/config helpers
- `.env` - environment settings

## Setup

1. `cd playwright-ts`
2. `npm install`
3. `npx playwright install`
4. `npm test`

## Run options

- `npm test` - run all tests
- `npm run test:headed` - run in headed mode
- `npm run test:amazon` - run amazon search scenario only
- `npm run report` - open HTML report

## Notes

- Existing Selenium Java project remains untouched.
- Playwright artifacts are generated under `playwright-ts/test-results` and `playwright-ts/playwright-report`.
