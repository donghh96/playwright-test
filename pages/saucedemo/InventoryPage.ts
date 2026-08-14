import { Locator, Page } from "@playwright/test";

export class InventoryPage {
  constructor (private page: Page) {};

  get pageTitle(): Locator { return this.page.getByTestId('title')};
  get shoppingcartButton(): Locator {return this.page.getByTestId('shopping-cart-link')};
  get shoppingcartBadge(): Locator {return this.page.getByTestId('shopping-cart-badge')};
  get sortLink() : Locator {return this.page.getByTestId('product-sort-container')};

  get menuButton(): Locator {return this.page.getByRole('button', {name: 'Open Menu'})};
  get allItemsLink(): Locator {return this.page.getByTestId('inventory-sidebar-link')};
  get logoutLink(): Locator {return this.page.getByTestId('logout-sidebar-link')};
  get resetAppStateLink(): Locator {return this.page.getByTestId('reset-sidebar-link')};

  get products() : Locator {return this.page.getByTestId('inventory-item')};
  get productNames() : Locator {return this.page.getByTestId('inventory-item-name')};
  get productPrices() : Locator {return this.page.getByTestId('inventory-item-price')};

  getProductByItemName(name: string) {
    return this.products.filter({hasText: name});
  }

  getAddCartButtonByName(name: string): Locator {
    return this.getProductByItemName(name).getByRole('button', {name: 'Add to cart'})
  }
  getRemoveCartButtonByName(name: string): Locator {
    return this.getProductByItemName(name).getByRole('button', {name: 'Remove'})
  }
  
  async goto() {this.page.goto('/inventory.html')};

  async addProductToCartByName(name: string) {
    await this.getAddCartButtonByName(name).click();
  }

  async removeProductFromCartByName(name: string) {
    await this.getRemoveCartButtonByName(name).click();
  }

  async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortLink.selectOption(option);
  }

  async gotoShoppingCart() {
    await this.shoppingcartButton.click();
  }

  async resetAppState() {
    await this.menuButton.click();
    await this.resetAppStateLink.click();
  }

}