import {test, expect} from '@playwright/test';
import { AdminDashboardPage } from '../../pages/restful-booker/AdminDashboardPage';

test.describe('admin dashboard tests', () => {
  let adminDashboardPage : AdminDashboardPage;

  test.beforeEach(async ({page}) => {
    adminDashboardPage = new AdminDashboardPage(page);
    await adminDashboardPage.goto();
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

  test('should delete a room successfully', async({}) => {
    const roomName = `Room-${Date.now()}`;
    await adminDashboardPage.createRoom({name:roomName, type:'Single', accessible:'true', price:'220', roomDetails:{tv:true, wifi:true}});
    // verify room created
    const newroom = adminDashboardPage.getRoomByName(roomName);
    await expect(newroom).toBeVisible();
    await adminDashboardPage.deleteRoom(roomName);
    await expect(newroom).toHaveCount(0);
  });

  test('should add a room description successfully', async({page}) => {
    const roomName = `Room-${Date.now()}`;
    await adminDashboardPage.createRoom({name:roomName, type:'Single', accessible:'true', price:'220', roomDetails:{tv:true, wifi:true}});
    const newroom = adminDashboardPage.getRoomByName(roomName);
    await expect(newroom).toBeVisible();
    await adminDashboardPage.viewRoomDetails(roomName);
    await adminDashboardPage.addRoomDescription('room description');

    await expect(page.getByText('room description')).toBeVisible({timeout : 10000});
  });

  test('should navigate to report page successfully', async({page}) => {
    await adminDashboardPage.clickReportLink();
    await expect(page).toHaveURL(/report/);
    await expect(adminDashboardPage.reportTabCalender).toBeVisible();
  });

  test('should navigate to branding page successfully', async({page}) => {
    await adminDashboardPage.clickBrandingLink();
    await expect(page).toHaveURL(/branding/);
    await expect(adminDashboardPage.brandingTabHeadingBB).toBeVisible();
    await expect(adminDashboardPage.brandingTabHeadingMap).toBeVisible();
    await expect(adminDashboardPage.brandingTabHeadingContact).toBeVisible();
    await expect(adminDashboardPage.brandingTabHeadingAdderess).toBeVisible();
  });

  test('should navigate to message page successfully', async({page}) => {
    await adminDashboardPage.clickMessagesLink();
    await expect(page).toHaveURL(/message/);
    await expect(adminDashboardPage.messageTabName).toBeVisible();
    await expect(adminDashboardPage.messageTabSubject).toBeVisible();
  });

  test('should be able to view the message details', async({}) => {
    await adminDashboardPage.clickMessagesLink();
    await adminDashboardPage.viewMessage(); 
    await expect(adminDashboardPage.messageDetail).toBeVisible();
    await adminDashboardPage.closeMessage();
  });
});
