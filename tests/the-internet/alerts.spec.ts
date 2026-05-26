  import { test, expect } from '@playwright/test';

  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  });

  test('should handle javascript alert', async ({ page }) => {
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('I am a JS Alert');
      await dialog.accept();
    });

    await page.click('text=Click for JS Alert');
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
  });

  test('should handle javascript confirmation', async ({ page }) => {
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('I am a JS Confirm');
      await dialog.accept();
    });

    await page.click('text=Click for JS Confirm');
    await expect(page.locator('#result')).toHaveText('You clicked: Ok');
  });

  test('should handle javascript cancel', async({page}) => {
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('I am a JS Confirm');
      await dialog.dismiss();
    });
    await page.click('text=Click for JS Confirm');
    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
  });

  test('should handle javascript prompt', async ({ page }) => {
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('I am a JS prompt');
      await dialog.accept('Playwright');
    });

    await page.click('text=Click for JS Prompt');
    await expect(page.locator('#result')).toHaveText('You entered: Playwright');
  });

  test('should handle javascript prompt cancel', async ({ page }) => {
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('I am a JS prompt');
      await dialog.dismiss();
    });
    await page.click('text=Click for JS Prompt');
    await expect(page.locator('#result')).toHaveText('You entered: null');
  });



