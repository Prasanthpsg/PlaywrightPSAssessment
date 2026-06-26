import { logger } from '@utils/logger';
import { BasePage } from './BasePage';
import { Page, Locator, expect, TestInfo } from '@playwright/test';

export class OverViewPage extends BasePage {
  readonly itemsDescriptions: Locator;
  readonly overviewPageTitle: Locator;
  readonly buttonFinish: Locator;

  constructor(page: Page) {
    super(page);
    this.overviewPageTitle = page.locator('.header_secondary_container .title');
    this.itemsDescriptions = page.locator('.inventory_item_name');
    this.buttonFinish = page.getByRole('button', { name: 'Finish' });
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
  }

  async verifyOverviewPageTitle(testInfo?: TestInfo): Promise<void> {
    await this.takeScreenshot('Overview Page', testInfo);
    await expect(this.overviewPageTitle).toHaveText('Checkout: Overview'); // asserting the title text to be 'overview'
  }

  async getSummaryItems(): Promise<string[]> {
    const addedCartItems: string[] = [];
    for (let i = 0; i < (await this.itemsDescriptions.count()); i++) {
      addedCartItems.push((await this.itemsDescriptions.nth(i).textContent())?.trim() ?? '');
    }
    logger.info(`Products available on the overview page: ${addedCartItems.join(', ')}`);
    return addedCartItems;
  }

  async clickFinish(): Promise<void> {
    await this.buttonFinish.click();
  }
}
