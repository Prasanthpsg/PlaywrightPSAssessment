import { expect, test } from '../fixtures';

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
});
