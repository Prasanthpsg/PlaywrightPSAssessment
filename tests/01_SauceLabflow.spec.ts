import { test } from '../fixtures';

test('TC_01 Sauce lab Login functionality validation', async ({
  loginPage,
  productsPage,
}, testInfo) => {
  await loginPage.navigateToLoginPage();
  await loginPage.logIn(testInfo);
  await productsPage.waitForPageLoad();
  await productsPage.verifyProductPageTitle(testInfo);
});
