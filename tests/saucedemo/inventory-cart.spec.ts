import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';
import { LoginPage } from '../../pages/saucedemo/LoginPage';
import { ShoppingCartPage } from '../../pages/saucedemo/ShoppingCartPage';

test.describe('inventory page tests', async () => {
  let inventoryPage : InventoryPage;
  let loginPage : LoginPage;
  let shoppingCartPage : ShoppingCartPage;

  test.beforeEach(async ({page}) => {
    inventoryPage = new InventoryPage(page);
    loginPage = new LoginPage(page);
    shoppingCartPage = new ShoppingCartPage(page);
    
    await inventoryPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  })

  test('check elements present', async({}) => {
    await expect(inventoryPage.products).not.toHaveCount(0);
    await expect(inventoryPage.menuButton).toBeVisible();
    await expect((inventoryPage.shoppingcartButton)).toBeVisible();
  });

  test('sort products by names A to Z', async({}) => {
    await inventoryPage.sortProducts('az');
    const productNames = await inventoryPage.productNames.allTextContents();
    console.log(productNames);
    const sortedProductNames = productNames.sort();
    console.log(sortedProductNames);
    expect(productNames).toEqual(sortedProductNames);
  });

 test('sort products by names Z to A', async({}) => {
    await inventoryPage.sortProducts('za');
    const productNames = await inventoryPage.productNames.allTextContents();
    console.log(productNames);
    const reverseSortedProductNames = productNames.sort().reverse();
    console.log(reverseSortedProductNames);    
    expect(productNames).toEqual(reverseSortedProductNames);
  });

  test('sort products by prices low to high', async({}) => {
    await inventoryPage.sortProducts('lohi');
    const prices = await inventoryPage.productPrices.allTextContents();
    // console.log(prices);
    const pirceNumbers = prices.map(price => parseFloat(price.replace('$', '')));
    // console.log(pirceNumbers);
    const sortedPrices = [...pirceNumbers].sort((a,b)=>a-b);
    // console.log(sortedPrices);
    expect(pirceNumbers).toEqual(sortedPrices);
  });

 test('sort products by prices high to low', async({}) => {
    await inventoryPage.sortProducts('hilo');
    const prices = await inventoryPage.productPrices.allTextContents();
    // console.log(prices);
    const pirceNumbers = prices.map(price => parseFloat(price.replace('$', '')));
    // console.log(pirceNumbers);
    const sortedPrices = [...pirceNumbers].sort((a,b)=>b-a);
    // console.log(sortedPrices);
    expect(pirceNumbers).toEqual(sortedPrices);
  });

  test('add product to cart', async({}) => {
    const name = 'Sauce Labs Backpack';
    await inventoryPage.addProductToCartByName(name);
    await expect(inventoryPage.getRemoveCartButtonByName(name)).toBeVisible();
    await expect(await inventoryPage.shoppingcartBadge).toHaveText('1');
    
    await inventoryPage.shoppingcartButton.click();
    await expect(shoppingCartPage.getProductByName(name)).toHaveCount(1);
  });

  test('remove product from cart', async({}) => {
    const name = 'Sauce Labs Bolt T-Shirt';
    await inventoryPage.addProductToCartByName(name);
    await expect(inventoryPage.getRemoveCartButtonByName(name)).toBeVisible();
    await inventoryPage.removeProductFromCartByName(name);
    await expect(inventoryPage.getAddCartButtonByName(name)).toBeVisible();
    
    await inventoryPage.shoppingcartButton.click();
    await expect(shoppingCartPage.getProductByName(name)).toHaveCount(0);
  });

  test('goto shopping cart', async({page}) => {
    await inventoryPage.shoppingcartButton.click();
    await expect(page).toHaveURL(/cart.html/);
  });
})