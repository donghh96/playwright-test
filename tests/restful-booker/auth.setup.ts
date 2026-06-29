import { test as setup, expect } from '@playwright/test';
// import path from 'path';
import { AdminLoginPage } from '../../pages/restful-booker/AdminLoginPage'; 

const authFile = '.auth/admin.json';

setup('authenticate', async ({page}) => {
  let adminLoginPage : AdminLoginPage;
  adminLoginPage = new AdminLoginPage(page);
  await adminLoginPage.goto();
  await adminLoginPage.inputLogininfo('admin', 'password');
  await adminLoginPage.clickLoginButton();
  await expect(page).toHaveURL(/rooms/);

  await page.context().storageState({path: authFile});
});
