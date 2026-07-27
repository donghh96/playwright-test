import { Locator, Page } from "@playwright/test";

export class ShoppingCartPage {
  constructor (private page: Page) {};

  get pageTitle(): Locator { return this.page.getByTestId('title')};
  get continueShoppingButton(): Locator { return this.page.getByTestId('continue-shopping')};
  get checkoutButton(): Locator { return this.page.getByTestId('checkout')};

  get cartProducts(): Locator { return this.page. getByTestId('inventory-item')};
  get removeButton(): Locator { return this.page.getByRole('button', {name: 'Remove'})};

  getProductByName(name: string) {
    return this.cartProducts.filter({hasText: name});
  }
  
  getRemoveButtonByName(name: string) {
    return this.getProductByName(name).getByRole('button', {name: 'Remove'});
  }

  async removeProductByName(name: string) {
    await this.getRemoveButtonByName(name).click();
  }

  async gotoContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async gotoCheckout() {
    await this.checkoutButton.click();
  }
}