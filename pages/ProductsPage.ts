import { BasePage } from './BasePage';
import { Page, Locator, expect, TestInfo } from '@playwright/test';

export class ProductsPage extends BasePage {
  readonly productPageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.productPageTitle = page.getByText('Products');
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
  }

  async verifyProductPageTitle(testInfo?: TestInfo): Promise<void> {
    await this.takeScreenshot('Products Page', testInfo);
    await expect(this.productPageTitle).toHaveText('Products'); // asserting the title text to be 'Products'
  }
}
