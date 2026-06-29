import {test, expect} from '@playwright/test';
import { AdminDashboardPage } from '../../pages/restful-booker/AdminDashboardPage';

test.describe('admin dashboard tests', () => {
  let adminDashboardPage : AdminDashboardPage;

  test.beforeEach(async ({page}) => {
    adminDashboardPage = new AdminDashboardPage(page);
    await page.goto('https://automationintesting.online/admin/rooms');
  })

  test('verify rooms count greater than 1', async({}) => {
    await expect(adminDashboardPage.rooms).not.toHaveCount(0);
  });

  test('add a new room', async () => {
    await adminDashboardPage.createRoom('123', 'Family', 'true','350', {tv:true, wifi:true, safe:true});
    //verify room created
    const newroom = adminDashboardPage.rooms.filter({hasText: '123'});
    await expect(newroom).toBeVisible();
    await expect(newroom).toContainText('Family');
  })

  test('add a room with empty name and price', async({}) => {
    await adminDashboardPage.createRoom('', 'Single', 'true', '');
    await expect(adminDashboardPage.createRoomFailedMessage).toBeVisible();
  });

  test('add a room with price 0', async({}) => {
    await adminDashboardPage.createRoom('124', 'Single', 'true', '0');
    await expect(adminDashboardPage.createRoomPriceWrongMessage).toBeVisible();
  });

  test('delete a room', async({page}) => {
    await adminDashboardPage.createRoom('345', 'Single', 'true', '220', {tv:true, wifi:true});
    // verify room created
    const newroom = adminDashboardPage.rooms.filter({hasText: '345'});
    await expect(newroom).toBeVisible();
    await newroom.locator('.roomDelete').click();
    await expect(newroom).not.toBeVisible();
  });
});
