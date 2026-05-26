import { test, expect } from "@playwright/test";

test.beforeEach( async ( {page} ) => {
  page.goto( 'https://the-internet.herokuapp.com/frames' );
})

test('up left frame', async({page}) => {
  await page.getByRole('link', {name: 'Nested Frames'}).click();
  await expect(page.locator('frame[name="frame-top"]').contentFrame().locator('frame[name="frame-left"]').contentFrame().locator('body')).toContainText('LEFT');
});

test('up middle frame', async ({page}) => {
  await page.getByRole('link', {name: 'Nested Frames'}).click();
  const content = page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-middle"]').locator('#content');
  await expect(content).toContainText('MIDDLE');
});

test('bottom frame', async({page}) => {
  await page.getByRole('link', {name: 'Nested Frames'}).click();
  const content = page.frameLocator('frame[name="frame-bottom"]').locator('body');
  await expect(content).toContainText('BOTTOM');
});