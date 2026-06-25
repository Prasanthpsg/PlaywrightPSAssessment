import { BasePage } from './BasePage';
import { Page, Locator, TestInfo } from '@playwright/test';
import { logger } from '@utils/logger';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.locator('.submit-button');
  }

  async navigateToLoginPage(): Promise<void> {
    logger.info(`Navigating to login page: ${process.env.BASE_URL || ''}`);
    await this.page.goto(process.env.BASE_URL || '');
    await this.waitForPageLoad();
  }

  async logIn(testInfo?: TestInfo): Promise<void> {
    await this.usernameInput.fill(process.env.USER_NAME || '');
    await this.passwordInput.fill(process.env.PASSWORD || '');
    await this.loginButton.click();
    await this.waitForPageLoad();
    await this.takeScreenshot('Login Page', testInfo);
  }
}
