import { Locator, Page } from '@playwright/test';

export class AmazonHomePage {
  readonly page: Page;
  readonly searchTextbox: Locator;
  readonly searchSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchTextbox = page.locator('#twotabsearchtextbox');
    this.searchSubmitButton = page.locator('#nav-search-submit-button');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async searchProduct(productName: string): Promise<void> {
    await this.searchTextbox.fill(productName);
    await this.searchSubmitButton.click();
  }
}
