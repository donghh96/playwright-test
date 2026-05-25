import { test, expect } from "@playwright/test";

test.beforeEach( async ( {page} ) => {
  page.goto( 'https://the-internet.herokuapp.com/hovers' );
})

const users = ['user1' , 'user2', 'user3'];
for(const [index, user] of users.entries()) {
  test(`hover and view ${user} profile`, async({page}) => {
  await expect(page.getByRole('heading', { name: `name: ${user}`})).not.toBeVisible();
  await expect(page.getByRole('link', {name: 'View profile'})).not.toBeVisible();

  await page.getByRole('img', { name: 'User Avatar' }).nth(index).hover();
  await expect(page.getByRole('heading', { name: `name: ${user}`})).toBeVisible();
  await page.getByRole('link', {name: 'View profile'}).click();
  await expect(page.getByRole('heading')).toContainText('Not Found');
  });
}

