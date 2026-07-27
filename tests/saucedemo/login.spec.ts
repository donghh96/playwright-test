import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/LoginPage';

test.describe('Login tests', async () => {
  let loginPage : LoginPage;

  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    loginPage.goto();
  })
  test('login with valid credentials', async({page}) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
    // await expect().;
  });

  test('login with empty username', async () => {
    await loginPage.login('', '');
    await expect(loginPage.emptyUsernameMsg).toBeVisible();
  })

  test('login with empty password', async({}) => {
    await loginPage.login('standard_user', '');
    await expect(loginPage.emptyPasswordMsg).toBeVisible();
  });

  test('login with wrong credentials', async({}) => {
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.loginNotmatchMsg).toBeVisible();
  });

  test('login with locked out user', async({}) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.lockedUserMsg).toBeVisible();
  });
});