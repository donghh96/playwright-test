import {Locator, Page} from '@playwright/test';
export class ContactPage {
  constructor(private page: Page) {}
  
  get contactName(): Locator {
    return this.page.getByTestId('ContactName');
  }
  get contactEmail(): Locator {
    return this.page.getByTestId('ContactEmail');
  }
  get contactPhone(): Locator { 
    return this.page.getByTestId('ContactPhone');
  }
  get contactSubject(): Locator {
    return this.page.getByTestId('ContactSubject');
  }
  get contactMessage(): Locator {
    return this.page.getByTestId('ContactDescription');
  }
  get submitButton(): Locator {
    return this.page.getByRole('button', { name: 'Submit' });
  }
  get submitContactFormMessage(): Locator {
    return this.page.getByText('Thanks for getting in touch'); 
  }
  get nameNotBlankMessage(): Locator {
    return this.page.getByText('Name may not be blank');
  }
  get emailNotBlankMessage(): Locator {
    return this.page.getByText('Email may not be blank');
  }
  get phoneNotBlankMessage(): Locator {
    return this.page.getByText('Phone may not be blank');
  }
  get subjectNotBlankMessage(): Locator {
    return this.page.getByText('Subject may not be blank');
  }
  get messageNotBlankMessage(): Locator {
    return this.page.getByText('Message may not be blank');
  }
  get invalidEmailMessage(): Locator {
    return this.page.getByText('must be a well-formed email address');
  }
  get invalidPhoneMessage(): Locator {
    return this.page.getByText('Phone must be between 11 and 21 characters.');
  }
  get wrongLengthMessageErrorMessage(): Locator {
    return this.page.getByText('Message must be between 20 and 2000 characters.');
  }
  async goto() {
    await this.page.goto('https://automationintesting.online/#contact');
  }
  async fillContactForm(name: string, email: string, phone: string, subject: string, message: string) {
    await this.contactName.fill(name);
    await this.contactEmail.fill(email);
    await this.contactPhone.fill(phone);
    await this.contactSubject.fill(subject);
    await this.contactMessage.fill(message);
  }
  async submitContactForm() {
    await this.submitButton.click();
  }
}