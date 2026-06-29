import {expect, test} from '@playwright/test';
import {HomePage} from '../../pages/restful-booker/HomePage';
import {BookingPage} from '../../pages/restful-booker/BookingPage';

test.describe('restful-booker basic tests', () => {
  let homePage: HomePage;
  let bookingPage: BookingPage;

  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    bookingPage = new BookingPage(page);
    await homePage.goto();
  });

  test('search rooms availability', async() => {
    await homePage.selectDate(1,1);
    await homePage.clickSearch();
    //verify search results
    await expect(homePage.bookButtons).not.toHaveCount(0);
  });

  test('book a room', async() => {
    await homePage.selectDate(30,1);
    await homePage.clickSearch();
    await homePage.bookButtons.nth(0).click();
    await bookingPage.clickReserve();
    await bookingPage.fillBookingForm('Rabbit', 'White', 'rabbit.white@example.com', '12345678900');
    await bookingPage.clickReserve();
    //verify booking confirmation
    await expect(bookingPage.bookingConfirmationMessage).toBeVisible();
  });
});
