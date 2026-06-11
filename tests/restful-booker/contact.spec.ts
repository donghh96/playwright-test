import {test, expect} from '@playwright/test';
import {ContactPage} from '../../pages/restful-booker/ContactPage';

test.describe('restful-booker contact form tests', () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({page}) => {
    contactPage = new ContactPage(page);
    await contactPage.goto();
  });

  test('submit contact form successfully', async() => {
    await contactPage.fillContactForm('Kitty Cat', 'kitty@example.com', '12345678900', 'Test Subject', 'Test Message: Hello, this is a test message for the contact form.');
    await contactPage.submitContactForm();
    await expect(contactPage.submitContactFormMessage).toBeVisible();
  });

  test('submit contact form with missing required fields ', async() => {
    await contactPage.fillContactForm('', '', '', '', '');
    await contactPage.submitContactForm();
    //verify validation error messages
    await expect(contactPage.nameNotBlankMessage).toBeVisible();
    await expect(contactPage.emailNotBlankMessage).toBeVisible();
    await expect(contactPage.phoneNotBlankMessage).toBeVisible();
    await expect(contactPage.subjectNotBlankMessage).toBeVisible();
    await expect(contactPage.messageNotBlankMessage).toBeVisible();
  });

  test('submit contact form with invalid phone number', async() => {
    await contactPage.fillContactForm('Kitty Cat', 'kitty@example.com', '12345', 'Test Subject', 'Test Message: Hello, this is a test message for the contact form.');
    await contactPage.submitContactForm();
    await expect(contactPage.invalidPhoneMessage).toBeVisible();
  });

  test('submit contact form with invalid email', async() => {
    await contactPage.fillContactForm('Kitty Cat', 'invalid-email', '12345678900', 'Test Subject', 'Test Message: Hello, this is a test message for the contact form.');
    await contactPage.submitContactForm();
    await expect(contactPage.invalidEmailMessage).toBeVisible();
  });

  test('submit contact form with message outside character limit', async() => {
    await contactPage.fillContactForm('Kitty Cat', 'kitty@example.com', '12345678900', 'Test Subject', 'Short');
    await contactPage.submitContactForm();
    await expect(contactPage.wrongLengthMessageErrorMessage).toBeVisible();
  });
}); 