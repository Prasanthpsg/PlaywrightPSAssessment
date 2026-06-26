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
