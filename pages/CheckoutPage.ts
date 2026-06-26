import { BasePage } from './BasePage';
import { Page, Locator } from '@playwright/test';

export class CheckoutPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continue: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postalCode = page.getByPlaceholder('Zip/Postal Code');
    this.continue = page.locator('#continue');
  }

  async fillForm(): Promise<void> {
    await this.firstName.fill(process.env.FIRST_NAME?.trim() ?? '');
    await this.lastName.fill(process.env.LAST_NAME?.trim() ?? '');
    await this.postalCode.fill(process.env.ZIP?.trim() ?? '');
  }

  async clickContinueButton(): Promise<void> {
    await this.continue.click();
  }
}
