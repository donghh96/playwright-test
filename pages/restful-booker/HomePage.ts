import {Locator, Page} from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  get checkInDate(): Locator {
    return this.page.locator('.react-datepicker__input-container input').first();
  }
  get checkOutDate(): Locator {
    return this.page.locator('.react-datepicker__input-container input').last();
  }
  get searchButton(): Locator {
    return this.page.getByRole('button', { name: 'Check Availability' });
  }
  get bookButtons(): Locator {
    return this.page.locator('#rooms').getByRole('link', { name: 'Book now' });
  }
 
  async goto() {
    await this.page.goto('https://automationintesting.online/');
  }
  private formatDate(date: Date) {
    return date.toLocaleDateString('en-NZ', { 
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric' 
      });
  }
  async selectDate(daysFromNow: number = 1, duration: number = 2) {
    duration = Math.max(1, duration);
    const today = new Date();
    const checkIn = new Date(today);
    checkIn.setDate(today.getDate() + daysFromNow);

    const checkOut = new Date(today);
    checkOut.setDate(today.getDate() + daysFromNow + duration);
    await this.checkInDate.fill(this.formatDate(checkIn));
    await this.checkOutDate.fill(this.formatDate(checkOut));
    console.log('checkIn: ', this.formatDate(checkIn));
    console.log('checkOut: ', this.formatDate(checkOut));
  }
  async clickSearch() {
    await this.searchButton.click();
  }
}