import { LoginPage } from '@pages/LoginPage';
import { ProductsPage } from '@pages/ProductsPage';
import { test as base } from '@playwright/test';

type MyFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page)); // Create an instance of LoginPage
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
});

export { expect } from '@playwright/test';
