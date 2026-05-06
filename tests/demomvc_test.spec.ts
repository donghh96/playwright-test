import { test, expect } from '@playwright/test';

test('mvctest', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Bake a cake');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Run 3 km');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Study');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Do laundry');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Cook');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  // await page.getByRole('button', { name: 'Delete' }).click();
  // await page
  // .locator('li')
  // .filter({ hasText: 'Cook' })
  // .getByRole('button', { name: 'Delete' })
  // .click();
  // const todoItem = page.getByText('Cook');
  // await todoItem.locator('..').getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Run 3 km' }).getByLabel('Toggle Todo').check();
  await page.getByRole('listitem').filter({ hasText: 'Do laundry' }).getByLabel('Toggle Todo').check();
  await page.getByRole('listitem').filter({ hasText: 'Bake a cake' }).getByLabel('Toggle Todo').check();

  //delete Cook
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await newTodoInput.fill('Cook');
  await newTodoInput.press('Enter');
  const todoItem = page.getByTestId('todo-item');
  await expect(todoItem).toHaveText('Cook');
  const targetRow = todoItem.filter({hasText: 'Cook'});
  await targetRow.hover();
  const distroyButton = targetRow.locator('button.destroy');
  await distroyButton.click();
  await expect(todoItem).not.toBeVisible();

  await page.getByRole('link', { name: 'Completed' }).click();
  await page.getByRole('link', { name: 'Active' }).click();
  await page.getByRole('link', { name: 'Completed' }).click();
  await page.getByRole('button', { name: 'Clear completed' }).click();
});