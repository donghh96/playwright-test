import { Page, Locator } from "@playwright/test";

export class LoginPage {
  constructor (private page: Page) {};

  get usernameInput() : Locator {return this.page.getByTestId('username')};
  get passwordInput() : Locator {return this.page.getByTestId('password')};
  get loginButton() : Locator {return this.page.getByTestId('login-button')};

  get emptyUsernameMsg() : Locator {return this.page.getByText('Epic sadface: Username is required')};
  get emptyPasswordMsg() : Locator {return this.page.getByText('Epic sadface: Password is required')};
  get loginNotmatchMsg() : Locator {return this.page.getByText('Epic sadface: Username and password do not match any user in this service')};
  get lockedUserMsg() : Locator {return this.page.getByText('Epic sadface: Sorry, this user has been locked out.')};
  async goto() {
    this.page.goto('/');
  }
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

}