import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/LoginPage';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';
import { ShoppingCartPage } from '../../pages/saucedemo/ShoppingCartPage';
import { CheckoutPage } from '../../pages/saucedemo/CheckoutPage';

test.describe( 'checkout tests', ()=> {
  let inventoryPage : InventoryPage;
  let loginPage : LoginPage;
  let shoppingCartPage : ShoppingCartPage;
  let checkoutPage : CheckoutPage;

  // let cartItemNames: string[];
  let cartItemPrices: number[];

  test.beforeEach(async({page}) => {
    inventoryPage = new InventoryPage(page);
    loginPage = new LoginPage(page);
    shoppingCartPage = new ShoppingCartPage(page);
    checkoutPage = new CheckoutPage(page);

    await inventoryPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
    await inventoryPage.addProductToCartByName('Sauce Labs Bike Light');

    await inventoryPage.gotoShoppingCart();
    // cartItemNames = await shoppingCartPage.cartProductsNames.allTextContents();
    cartItemPrices = await shoppingCartPage.getItemPrices();

    await shoppingCartPage.gotoCheckout();
  });

  test('check out with empty firstname', async() => {
    await checkoutPage.fillCheckoutInfo('', 'Smith', '0212');
    await checkoutPage.continueCheckout();
    await expect(checkoutPage.firstnameRequiredMsg).toBeVisible();
  });

  test('check out with empty lastname', async() => {
    await checkoutPage.fillCheckoutInfo('Bill', '', '0323');
    await checkoutPage.continueCheckout();
    await expect(checkoutPage.lastnameRequiredMsg).toBeVisible();
  });

  test('check out with empty zipcode', async() => {
    await checkoutPage.fillCheckoutInfo('Bill', 'Smith', '');
    await checkoutPage.continueCheckout();
    await expect(checkoutPage.postcodeRequiredMsg).toBeVisible();
  });

  test('cancel checkout on step1', async({page}) => {
    await checkoutPage.fillCheckoutInfo('Bill', 'Smith', '0123');
    await checkoutPage.cancelCheckout();
    //should return to shopping cart page
    await expect(page).toHaveURL(/cart/);
    await expect(shoppingCartPage.pageTitle).toHaveText('Your Cart');
  });

  test('continue checkout on step 1', async({page}) => {
    await checkoutPage.fillCheckoutInfo('Bill', 'Smith', '0123');
    await checkoutPage.continueCheckout();
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(checkoutPage.pageTitle).toHaveText('Checkout: Overview');
    //todo - check products same with shopping cart
    const expectedProductNames = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
    const productNames = await checkoutPage.productsNames.allTextContents();
    console.log(productNames);
    await expect(productNames).toEqual(expectedProductNames);
    //todo - check total price
    const expectedItemTotal = cartItemPrices.reduce(
     (sum, price) => sum + price,
      0
    );
    // console.log(cartItemPrices);
    // console.log(expectedItemTotal);
    const expectedTax = Number((expectedItemTotal * 0.08).toFixed(2));
    const expectedPriceTotal = expectedItemTotal + expectedTax;
    
    await expect(checkoutPage.itemTotal).toHaveText(`Item total: $${expectedItemTotal.toFixed(2)}`);
    await expect(checkoutPage.tax).toHaveText(`Tax: $${expectedTax.toFixed(2)}`);
    await expect((checkoutPage.total)).toHaveText(`Total: $${expectedPriceTotal.toFixed(2)}`);
  });

  test('cancel checkout on step 2', async({page}) => {
    await checkoutPage.fillCheckoutInfo('Bill', 'Smith', '0123');
    await checkoutPage.continueCheckout();
    await expect(page).toHaveURL(/checkout-step-two/);
    await checkoutPage.cancelCheckout();
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });

  test('finish checkout on step 2', async({page}) => {
    await checkoutPage.fillCheckoutInfo('Bill', 'Smith', '0123');
    await checkoutPage.continueCheckout();
    await expect(page).toHaveURL(/checkout-step-two/);
    await checkoutPage.finishCheckout();
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(checkoutPage.pageTitle).toHaveText('Checkout: Complete!');
  });

});