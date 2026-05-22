import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
})

test('remove button', async({page}) => {
  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(page.getByText('It\'s gone!')).toBeVisible();
});

test('remove and add button back', async ({page}) => {
  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(page.getByRole('checkbox')).not.toBeVisible();

  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByText('It\'s back!')).toBeVisible();
  await expect(page.getByRole('checkbox')).toBeVisible();
})

test('enable input', async({page}) => {
  await page.getByRole('button', { name: 'Enable' }).click();
  await expect(page.getByText('It\'s enabled!')).toBeVisible();
  await expect(page.getByRole('textbox')).toBeEnabled();

  await page.locator('input[type="text"]').fill('abc');
  await expect(page.locator('input[type="text"]')).toHaveValue('abc');
});

test('disable input', async({page}) => {
  await page.getByRole('button', { name: 'Enable' }).click();
  await expect(page.getByText('It\'s enabled!')).toBeVisible();
  await expect(page.getByRole('textbox')).toBeEnabled();

  await page.getByRole('button', { name: 'Disable' }).click();
  await expect(page.getByText('It\'s disabled!')).toBeVisible();
  await expect(page.getByRole('textbox')).toBeDisabled();
});