import { Locator, Page } from "@playwright/test";

export class BookingPage {

  constructor(private page: Page) {}

  get reserveNowButton(): Locator {
    return this.page.getByRole('button', { name: 'Reserve now' });
  }
  get cancelButton(): Locator {
    return this.page.getByRole('button', { name: 'Cancel' });
  }
  get firstNameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Firstname' });
  }
  get lastNameInput(): Locator { 
    return this.page.getByRole('textbox', { name: 'Lastname' });
  }
  get emailInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Email' });
  }
  get phoneInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Phone' });
  }
  get bookingConfirmationMessage(): Locator {
    return this.page.getByRole('heading', { name: 'Booking Confirmed' });
  }
  async fillBookingForm(firstName: string, lastName: string, email: string, phone: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
  }
  async clickReserve() {
    await this.reserveNowButton.click();
  } 
  async clickCancel() {
    await this.cancelButton.click();
  }
}

