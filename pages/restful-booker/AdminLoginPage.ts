import {Locator, Page} from '@playwright/test';

export class AdminLoginPage{

  constructor(private page: Page) {};
  
  get usernameInput() : Locator {
    return this.page.getByRole('textbox', {name: 'Username'});
  }
  get passwordInput() : Locator {
    return this.page.getByRole('textbox', {name: 'Password'});
  }
  get loginButton() : Locator {
    return this.page.getByRole('button', {name: 'Login'});
  }
  get invalidCredentialsMessage() : Locator {
    return this.page.getByText('Invalid credentials');
  }
  async goto() {
    await this.page.goto('https://automationintesting.online/admin');
  }
  async inputLogininfo(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }
  async clickLoginButton() {
    await this.loginButton.click();
  }
}