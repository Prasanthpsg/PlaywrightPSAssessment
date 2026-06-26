import { expect, test } from '../fixtures';
import { logger } from '../utils/logger';

test('TC_01 Sauce lab Login functionality validation', async ({
  loginPage,
  productsPage,
}, testInfo) => {
  await loginPage.navigateToLoginPage();
  await loginPage.logIn(testInfo);
  await productsPage.waitForPageLoad();
  await productsPage.verifyProductPageTitle(testInfo);
});

test('TC_02 Add and Remove Items from Cart validation', async ({
  loginPage,
  productsPage,
  cartPage,
}, testInfo) => {
  await loginPage.navigateToLoginPage();
  await loginPage.logIn(testInfo);
  await productsPage.waitForPageLoad();
  const addedItems: string[] = await productsPage.addToCartAvailableItems(); // add to cart
  await productsPage.clickShoppingCartLink();
  const getaddedItems: string[] = await cartPage.getCartItems();
  expect(addedItems).toEqual(getaddedItems); // items validation in cart page
  await cartPage.removeItem(); // remove one item in the cart
  await cartPage.validateOneProduct();
  await productsPage.clickOpenMenu(); //Log out
  await productsPage.clickLogout();
});

test('TC_03 Products page sorting functionality validation', async ({
  loginPage,
  productsPage,
}, testInfo) => {
  await loginPage.navigateToLoginPage();
  await loginPage.logIn(testInfo);
  await productsPage.waitForPageLoad();
  await productsPage.verifyProductPageTitle(testInfo);
  const priceBeforeSorting: number[] = await productsPage.getPriceDetails();
  const sortedAmounts = [...priceBeforeSorting].sort((a, b) => a - b);
  logger.info(`Price sort own logic: ${JSON.stringify(sortedAmounts)}`);
  //UI sorting
  await productsPage.selectDropdownValue();
  await productsPage.waitForPageLoad();
  const priceAfterSorting: number[] = await productsPage.getPriceDetails();
  logger.info(`Price sort UI logic: ${JSON.stringify(priceAfterSorting)}`);
  expect(sortedAmounts).toEqual(priceAfterSorting); //Price sorting validationg
  await productsPage.captureScreenshot(testInfo);
  await productsPage.clickOpenMenu(); //Log out
  await productsPage.clickLogout();
});

test('TC_04 End-to-end checkout process validation', async ({
  loginPage,
  productsPage,
  cartPage,
  checkoutPage,
  overviewPage,
  confirmationPage,
}, testInfo) => {
  await loginPage.navigateToLoginPage();
  await loginPage.logIn(testInfo);
  await productsPage.waitForPageLoad();
  const addedItems: string[] = await productsPage.addToCartAvailableItems(); // add to cart
  await productsPage.clickShoppingCartLink();
  const getaddedItems: string[] = await cartPage.getCartItems();
  expect(addedItems).toEqual(getaddedItems); // items validation in cart page
  await cartPage.clickCheckOut();
  await checkoutPage.fillForm(); // fill form and continue
  await checkoutPage.clickContinueButton();
  await overviewPage.waitForPageLoad();
  const getOverviewPageItems: string[] = await overviewPage.getSummaryItems();
  expect(addedItems).toEqual(getOverviewPageItems); // items validation in overview page
  await overviewPage.clickFinish();
  await confirmationPage.waitForPageLoad();
  await confirmationPage.verifyConfirmationPageTitle(); // confirmation page verification
  await confirmationPage.verifyConfirmationPageSuccessText();
  await confirmationPage.verifyBackHomeButton();
  await productsPage.clickOpenMenu(); //Log out
  await productsPage.clickLogout();
});
