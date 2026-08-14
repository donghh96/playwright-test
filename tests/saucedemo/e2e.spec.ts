import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/LoginPage';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';
import { ShoppingCartPage } from '../../pages/saucedemo/ShoppingCartPage';
import { CheckoutPage } from '../../pages/saucedemo/CheckoutPage';

test.describe('e2e tests', ()=>{
  let loginPage : LoginPage;
  let inventoryPage : InventoryPage;
  let shoppingCartPage : ShoppingCartPage;
  let checkoutPage : CheckoutPage;

  test.beforeEach(async({page}) => {
    inventoryPage = new InventoryPage(page);
    loginPage = new LoginPage(page);
    shoppingCartPage = new ShoppingCartPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  test('compete purchase successfully', async({page}) => {
    loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

    await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
    await inventoryPage.addProductToCartByName('Sauce Labs Bike Light');
    await inventoryPage.gotoShoppingCart();
    
    await shoppingCartPage.gotoCheckout();

    await checkoutPage.fillCheckoutInfo('Bill', 'Smith', '0123');
    await checkoutPage.continueCheckout();
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(checkoutPage.pageTitle).toHaveText('Checkout: Overview');

    await checkoutPage.finishCheckout();
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(checkoutPage.pageTitle).toHaveText('Checkout: Complete!');
  });
});
