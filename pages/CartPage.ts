import { logger } from '@utils/logger';
import { BasePage } from './BasePage';
import { Page, Locator, expect, TestInfo } from '@playwright/test';

export class CartPage extends BasePage {
  readonly cartPageTitle: Locator;
  readonly itemsDescriptions: Locator;
  readonly removeFirtsItem: Locator;

  constructor(page: Page) {
    super(page);
    this.cartPageTitle = page.locator('.header_secondary_container .title');
    this.itemsDescriptions = page.locator('.inventory_item_name');
    this.removeFirtsItem = page.getByRole('button', { name: 'Remove' });
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
  }

  async verifyCartPageTitle(testInfo?: TestInfo): Promise<void> {
    await this.takeScreenshot('Cart Page', testInfo);
    await expect(this.cartPageTitle).toHaveText('Your Cart'); // asserting the title text to be 'Products'
  }

  async getCartItems(): Promise<string[]> {
    const addedCartItems: string[] = [];
    for (let i = 0; i < (await this.itemsDescriptions.count()); i++) {
      addedCartItems.push((await this.itemsDescriptions.nth(i).textContent())?.trim() ?? '');
    }
    logger.info(`Products available on the cart: ${addedCartItems.join(', ')}`);
    return addedCartItems;
  }

  async removeItem(): Promise<void> {
    await this.removeFirtsItem.nth(1).click();
  }

  async validateOneProduct(): Promise<void> {
    expect(this.itemsDescriptions).toHaveCount(1);
  }
}
