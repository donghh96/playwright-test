import {test, expect} from '@playwright/test';
import { AdminDashboardPage } from '../../pages/restful-booker/AdminDashboardPage';

test.describe('admin dashboard tests', () => {
  let adminDashboardPage : AdminDashboardPage;

  test.beforeEach(async ({page}) => {
    adminDashboardPage = new AdminDashboardPage(page);
    await page.goto('https://automationintesting.online/admin/rooms');
  })

  test('should rooms count greater than 1', async({}) => {
    await expect(adminDashboardPage.rooms).not.toHaveCount(0);
  });

  test('should create a new room successfully', async () => {
    await adminDashboardPage.createRoom({
              name: '123', 
              type: 'Family', 
              accessible: 'true', 
              price: '350', 
              roomDetails: {
                tv:true, 
                wifi:true, 
                safe:true}
              });
    //verify room created
    const newroom = adminDashboardPage.getRoomByName('123');
    await expect(newroom).toBeVisible();
    await expect(newroom).toContainText('Family');
  })

  test('should show validation message when room name is empty', async({}) => {
    await adminDashboardPage.createRoom({name:'124', type: 'Single', accessible:'true', price:'',roomDetails:{}});
    await expect(adminDashboardPage.createRoomFailedMessage).toBeVisible();
  });

  test('should reject a room with price 0', async({}) => {
    await adminDashboardPage.createRoom({name:'124', type: 'Single', accessible:'true', price:'0', roomDetails:{}});
    await expect(adminDashboardPage.createRoomPriceWrongMessage).toBeVisible();
  });

  test('should delete a room successfully', async({page}) => {
    const roomName = `Room-${Date.now()}`;
    await adminDashboardPage.createRoom({name:roomName, type:'Single', accessible:'true', price:'220', roomDetails:{tv:true, wifi:true}});
    // verify room created
    const newroom = adminDashboardPage.getRoomByName(roomName);
    await expect(newroom).toBeVisible();
    await adminDashboardPage.deleteRoom(roomName);
    await expect(newroom).toHaveCount(0);
  });
});
