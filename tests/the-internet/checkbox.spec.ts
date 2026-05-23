import { test, expect } from "@playwright/test";

test.beforeEach(async ({page}) => {
  page.goto('https://the-internet.herokuapp.com/checkboxes');
});

test('checkboxes test', async({page}) => {
  
  const checkboxes = page.getByRole('checkbox');
  // const checkboxes = page.locator('input[type="checkboxes"]');
  // await expect(checkboxes).toHaveCount(2);
  // console.log(await checkboxes.count());
  const first = checkboxes.nth(0);
  const second = checkboxes.nth(1);

  // const first = page.getByRole('checkbox').nth(0);
  // const second = page.getByRole('checkbox').nth(1);

  await expect(first).not.toBeChecked();
  await expect(second).toBeChecked();

  await first.check();
  await second.uncheck();

  await expect(first).toBeChecked();
  await expect(second).not.toBeChecked();

  // await expect(page.getByRole('checkbox').nth(0)).not.toBeChecked();
  // await expect(page.getByRole('checkbox').nth(1)).toBeChecked();

  // await page.getByRole('checkbox').nth(0).check();
  // await page.getByRole('checkbox').nth(1).uncheck();

  // await expect(page.getByRole('checkbox').nth(0)).toBeChecked();
  // await expect(page.getByRole('checkbox').nth(1)).not.toBeChecked();

 
});