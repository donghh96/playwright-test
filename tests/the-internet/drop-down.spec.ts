import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('https://the-internet.herokuapp.com/dropdown');
});


test('select option 1 by lable', async({page}) => {
  await page.selectOption('#dropdown', {label: 'Option 1'});
  await expect(page.locator('#dropdown')).toHaveValue('1');
});

test('select option 2 by value', async({page}) => {
  await page.selectOption('#dropdown', {value: '2'});
  await expect(page.locator('#dropdown')).toHaveValue('2');
});

test('disabled option should not be selectable', async({page}) => {
  const disabledOption = page.locator('#dropdown option[disabled]');
  await expect(disabledOption).toBeDisabled();
});

test('should switch between options', async({page}) => {
  await page.selectOption('#dropdown', {label: 'Option 1'});
  await page.selectOption('#dropdown', {label: 'Option 2'});
  await expect(page.locator('#dropdown')).toHaveValue('2');
});

