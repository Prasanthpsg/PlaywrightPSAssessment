import { BasePage } from './BasePage';
import { Page, Locator, expect, TestInfo } from '@playwright/test';

export class ConfirmationPage extends BasePage {
  readonly orderConfirmationMessage: Locator;
  readonly orderConfirmationText: Locator;
  readonly buttonBackHome: Locator;
  readonly confirmationPageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.confirmationPageTitle = page.locator('.header_secondary_container .title');
    this.orderConfirmationMessage = page.getByRole('heading', {
      name: 'Thank you for your order!',
    });
    this.orderConfirmationText = page.getByText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
      { exact: true },
    );
    this.buttonBackHome = page.getByRole('button', { name: 'Back Home' });
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
  }

  async verifyConfirmationPageTitle(testInfo?: TestInfo): Promise<void> {
    await this.takeScreenshot('Overview Page', testInfo);
    await expect(this.confirmationPageTitle).toHaveText('Checkout: Complete!'); // asserting the title text to be 'Checkout: Complete!'
  }

  async verifyConfirmationPageSuccessText(): Promise<void> {
    await expect(this.orderConfirmationMessage).toBeVisible();
    await expect(this.orderConfirmationText).toBeVisible();
  }

  async verifyBackHomeButton(): Promise<void> {
    await expect(this.buttonBackHome).toBeVisible();
  }
}
