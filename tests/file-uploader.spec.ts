import { test, expect } from "@playwright/test";

test.beforeEach(async ({page}) => {
  page.goto('https://the-internet.herokuapp.com/upload');
});

test('upload file by button', async({page}) => {
  await page.locator('#file-upload').setInputFiles('tests/fixtures/abc.txt')
  await page.getByRole('button', { name: 'Upload' }).click();
  await expect(page.getByText('File Uploaded!')).toBeVisible();
  await expect(page.getByText('abc.txt')).toBeVisible();
});
