import { test, expect } from "@playwright/test";

test.beforeEach(async ({page}) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading');
})

test('test example 1', async({page}) => {
  await page.getByRole('link', {name: 'Example 1: Element on page that is hidden'}).click();
  await page.getByRole('button', {name: 'Start'}).click();
  await expect(page.getByRole('button', { name: 'Start' })).not.toBeVisible();
  await expect(page.locator('#loading')).toBeVisible();
  await expect(page.locator('#loading')).not.toBeVisible();
  await expect(page.getByText('Hello World!')).toBeVisible({ timeout: 10000 });
});

test('test example 2', async({page}) => {
  await page.getByRole('link', {name: 'Example 2: Element rendered after the fact'}).click();
  await page.getByRole('button', {name: 'Start'}).click();
  await expect(page.getByRole('button', { name: 'Start' })).not.toBeVisible();
  await expect(page.locator('#loading')).toBeVisible();
  await expect(page.locator('#loading')).not.toBeVisible();
  await expect(page.getByText('Hello World!')).toBeVisible({ timeout: 10000 });
});
