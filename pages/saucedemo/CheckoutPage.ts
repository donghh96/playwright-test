import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page:Page) {};

  get pageTitle() : Locator {return this.page.getByTestId('title')};

  get firstName() : Locator {return this.page.getByTestId('firstName')};
  get lastName() : Locator {return this.page.getByTestId('lastName')};
  get postCode() : Locator {return this.page.getByTestId('postalCode')};
  get cancelButton() : Locator {return this.page.getByTestId('cancel')};
  get continueButton() : Locator {return this.page.getByTestId('continue')};
  get finishButton() :  Locator {return this.page.getByTestId('finish')};
  get firstnameRequiredMsg() : Locator {return this.page.getByText('Error: First Name is required')};
  get lastnameRequiredMsg() : Locator {return this.page.getByText('Error: Last Name is required')};
  get postcodeRequiredMsg() : Locator {return this.page.getByText('Error: Postal Code is required')};

  get itemTotal() : Locator {return this.page.getByTestId('subtotal-label')};
  get tax() : Locator { return this.page.getByTestId('tax-label')};
  get total() : Locator { return this.page.getByTestId('total-label')};
  
  get productsNames() : Locator {return this.page.getByTestId('inventory-item-name')};
  get completeHeader() : Locator {return this.page.getByTestId('complete-header')};
  get completeText() : Locator {return this.page.getByTestId('complete-text')};
  get bakeHomeButton() : Locator {return this.page.getByTestId('back-to-products')};
  get generatePDFButton() : Locator {return this.page.getByTestId('generate-pdf-order')};

  async fillCheckoutInfo(firstname: string, lastname: string, postcode: string) {
    await this.firstName.fill(firstname);
    await this.lastName.fill(lastname);
    await this.postCode.fill(postcode);
  } 

  async continueCheckout() {
    await this.continueButton.click();
  }
  
  async cancelCheckout() {
    await this.cancelButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }
}