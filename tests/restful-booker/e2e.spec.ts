import {test, expect} from '@playwright/test';
import { ContactPage } from '../../pages/restful-booker/ContactPage';
import { AdminDashboardPage } from '../../pages/restful-booker/AdminDashboardPage';
import { HomePage } from '../../pages/restful-booker/HomePage';
import { BookingPage } from '../../pages/restful-booker/BookingPage';
import { RoomData } from '../../pages/restful-booker/AdminDashboardPage';

test('user submit contact message -> admin receives message', async({page}) => {
  let contactPage = new ContactPage(page);
  let adminDashBoardPage = new AdminDashboardPage(page);
  await contactPage.goto();
  const messageSubject = `e2e test ${Date.now()}`;
  await contactPage.fillContactForm('Tom Cat', 'tom@example.com', '12345678902', messageSubject, 'Test Message: Hi~ this is e2e test');
  await contactPage.submitContactForm();
  await expect(contactPage.submitContactFormMessage).toBeVisible();

  await adminDashBoardPage.goto();
  await adminDashBoardPage.clickMessagesLink();
  await expect(adminDashBoardPage.getMessageBySubject(messageSubject)).toBeVisible();
});

test('user create booking -> admin sees booking', async({page}) => {
  let homePage = new HomePage(page);
  let bookingPage = new BookingPage(page);
  let adminDashBoardPage = new AdminDashboardPage(page);

  //create a newroom
  const newroomname = `e2e-room-${Date.now()}`;
  const newroomdata : RoomData = 
  {name: newroomname, price : '200', type: 'Single', accessible : 'true', roomDetails : {tv: true, safe: true}};  
  await adminDashBoardPage.goto();
  await adminDashBoardPage.clickRoomsLink();
  await adminDashBoardPage.createRoom(newroomdata);
  await expect(adminDashBoardPage.getRoomByName(newroomname)).toBeVisible();

  //edit room add description
  const newroomdescription = `e2e-room-description-${Date.now()}`;
  await adminDashBoardPage.viewRoomDetails(newroomname);
  await adminDashBoardPage.addRoomDescription(newroomdescription);
  await expect(page.getByText(newroomdescription)).toBeVisible({timeout : 10000});

  //make booking
  const guestname = `e2e${Math.floor(Math.random() * 10000)}`;
  await homePage.goto();

  await homePage.clickSearch();
  await homePage.clickbookNowByRoomDescription(newroomdescription);

  await bookingPage.clickReserve();
  await bookingPage.fillBookingForm(guestname, 'White', `${guestname}@example.com`, '12345678900');
  await bookingPage.clickReserve();
  //verify booking confirmation
  await expect(bookingPage.bookingConfirmationMessage).toBeVisible();

  //verify booking
  await adminDashBoardPage.goto();
  await adminDashBoardPage.viewRoomDetails(newroomname);
  await expect(adminDashBoardPage.getBookingByGuestName(guestname)).toBeVisible();

  //clean up - delete room
  await adminDashBoardPage.goto();
  await adminDashBoardPage.deleteRoom(newroomname);
});
