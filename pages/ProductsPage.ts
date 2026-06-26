import { logger } from '@utils/logger';
import { BasePage } from './BasePage';
import { Page, Locator, expect, TestInfo } from '@playwright/test';

export class ProductsPage extends BasePage {
  readonly productPageTitle: Locator;
  readonly allProducts: Locator;
  readonly shoppingCartLink: Locator;
  readonly openMenu: Locator;
  readonly logOut: Locator;
  readonly clickDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.productPageTitle = page.getByText('Products');
    this.allProducts = page.locator('.inventory_list .inventory_item');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.openMenu = page.getByRole('button', { name: 'Open Menu' });
    this.logOut = page.getByText('Logout', { exact: true });
    this.clickDropdown = page.locator('.product_sort_container');
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
  }

  async verifyProductPageTitle(testInfo?: TestInfo): Promise<void> {
    await this.takeScreenshot('Products Page', testInfo);
    await expect(this.productPageTitle).toHaveText('Products'); // asserting the title text to be 'Products'
  }

  async addToCartAvailableItems(): Promise<string[]> {
    const selectedProducts: string[] = [];

    const totalCount: number = await this.allProducts.count(); // return all the product count
    for (let i = 0; i < totalCount && selectedProducts.length < 2; i++) {
      const product: Locator = this.allProducts.nth(i); // get nth product
      const btnName: string =
        (await product.locator('.pricebar .btn_inventory').textContent())?.trim() ?? ''; //get nth product button name
      if (btnName === 'Add to cart') {
        const productName: string =
          (await product.locator('.inventory_item_name').textContent())?.trim() ?? ''; //get nth product desc
        await product.locator('.pricebar .btn_inventory').click();
        logger.info(`The product "${productName}" is added into the cart`);
        selectedProducts.push(productName.trim());
      }
    }

    logger.info(`Selected Products: ${selectedProducts.join(', ')}`);
    return selectedProducts;
  }

  async clickShoppingCartLink(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async clickOpenMenu(): Promise<void> {
    await this.openMenu.click();
  }

  async clickLogout(): Promise<void> {
    await this.logOut.click();
  }

  async getPriceDetails(): Promise<number[]> {
    const priceDetails: number[] = [];

    const totalCount: number = await this.allProducts.count(); // return all the product count
    for (let i = 0; i < totalCount; i++) {
      const product: Locator = this.allProducts.nth(i); // get nth product
      const price: string =
        (await product.locator('.pricebar .inventory_item_price').textContent())
          ?.split('$')[1]
          ?.trim() ?? '';
      const amount = Number(price);
      priceDetails.push(amount);
    }

    // logger.info(`Product amount: ${priceDetails.join(', ')}`);

    return priceDetails;
  }

  async selectDropdownValue(): Promise<void> {
    await this.clickDropdown.selectOption({ label: 'Price (low to high)' });
  }

  async captureScreenshot(testInfo?: TestInfo) {
    await this.takeScreenshot('Products Page', testInfo);
  }
}
