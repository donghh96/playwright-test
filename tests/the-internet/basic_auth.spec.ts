import { test, expect } from '@playwright/test';

test('basic_auth_tests', async ({ page }) => {
  //success
  const success_response = await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');
  await expect(success_response?.status()).toBe(200);
  await expect(page.locator('p')).toContainText('Congratulations!');
  //wrong password
  const fail_response = await page.goto('https://admin:wrong_pwd@the-internet.herokuapp.com/basic_auth')
  await expect(fail_response?.status()).toBe(401);
  //cancel no credencial
  const cancel_response = await page.goto('https://the-internet.herokuapp.com/basic_auth')
  await expect(cancel_response?.status()).toBe(401);
  await expect(page.locator('body')).toContainText('Not authorized');
});


test.describe('basic_auth_success', ()=> {
  test.use({
    httpCredentials: { username: 'admin', password: 'admin' },
  });

  test('basic_auth_pass_2', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/basic_auth');
  await expect(page.locator('p')).toContainText('Congratulations!');
  });

});

test.describe('basic_auth_wrong_password', ()=> {

  test.use({
    httpCredentials: { username: 'admin', password: 'wrong_password' },
  })
  test('basic_auth_fail', async ({ page }) => {
  const response = await page.goto('https://the-internet.herokuapp.com/basic_auth');
  expect(response?.status()).toBe(401);

  const bodyText = await page.locator('body').textContent();
  expect(bodyText).toContain('Not authorized'); 
  expect(bodyText).not.toContain('Congratulations!');
  });
});

test.describe('basic_auth_no_credential', ()=> {
  test('basic_auth_cancel', async ({page}) => {
    const response = await page.goto('https://the-internet.herokuapp.com/basic_auth');
    expect(response?.status()).toBe(401);

    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toContain('Not authorized'); 
    expect(bodyText).not.toContain('Congratulations!');
  })
});
