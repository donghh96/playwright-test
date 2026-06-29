import {test, expect} from '@playwright/test';
import {AdminLoginPage} from '../../pages/restful-booker/AdminLoginPage';
import { AdminDashboardPage } from '../../pages/restful-booker/AdminDashboardPage';

test.describe('adminPage', () => {
  let adminLoginPage : AdminLoginPage;
  let adminDashboardPage : AdminDashboardPage;

  test.beforeEach(async ({page}) => {
    adminLoginPage = new AdminLoginPage(page);
    adminDashboardPage = new AdminDashboardPage(page);
    await adminLoginPage.goto();
  });

  test('admin login successful', async({page}) => {
    await adminLoginPage.inputLogininfo('admin', 'password');
    await adminLoginPage.clickLoginButton();
    await expect(adminDashboardPage.homeLink).toBeVisible();
    await expect(page).toHaveURL(/rooms/);
  });

  test('admin login invalic credential', async({}) => {
    await adminLoginPage.inputLogininfo('admin', 'wrongpassword');
    await adminLoginPage.clickLoginButton();
    await expect(adminLoginPage.invalidCredentialsMessage).toBeVisible();
  });

  test('admin login empty username password', async({}) => {
    await adminLoginPage.clickLoginButton();
    await expect(adminLoginPage.invalidCredentialsMessage).toBeVisible();
  });
})