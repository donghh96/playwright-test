import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://www.wikipedia.org/');
    const searchbox = page.getByRole('searchbox', { name: 'Search Wikipedia' });
    await searchbox.fill('Playwright');
    await page.getByRole('button', { name: 'Search' }).click();

    //check URL changed
    await expect(page).toHaveURL(/Playwright/);

    //check title
    await expect(page).toHaveTitle(/Playwright/);

    // //check heading
    // await expect(
    //     page.getByRole('heading', { name: 'Playwright' })
    // ).toBeVisible();
});