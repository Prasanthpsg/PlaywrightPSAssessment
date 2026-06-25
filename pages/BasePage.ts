import { Page } from '@playwright/test';
import { logger } from '../utils/logger';
import fs from 'fs';
import { TestInfo } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    logger.debug('Page DOM content loaded');
  }

  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('load');
    logger.debug('Page load state: load');
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
  }

  async scrollToTop(): Promise<void> {
    await this.page.evaluate('window.scrollTo(0, 0)');
  }

  async takeScreenshot(filename: string, testInfo?: TestInfo): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const dir = 'test-results/screenshots';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = `${dir}/${filename}_${timestamp}.png`;

    await this.page.screenshot({
      path: filePath,
      fullPage: true,
    });

    if (testInfo) {
      await testInfo.attach(filename, {
        path: filePath,
        contentType: 'image/png',
      });
    }
  }
}
