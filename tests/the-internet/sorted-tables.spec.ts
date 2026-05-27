import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/tables');
});

test('should sort table1 by last name', async ({ page }) => {
  await page.locator('#table1').getByText('Last Name').click();
  const lastNames = await page.locator('#table1 tbody tr td:nth-child(1)').allTextContents();

  // get all last names and sort them in ascending order
  const LastNamesAscending = lastNames.sort();
  // console.log(lastNames);
  // console.log(LastNamesAscending);

  // compare last names in the table with sorted last names
  expect(lastNames).toEqual(LastNamesAscending);

  // click again to sort in descending order
  await page.locator('#table1').getByText('Last Name').click();
  const LastNamesDescending = lastNames.sort().reverse();
  expect(lastNames).toEqual(LastNamesDescending);
});

test('should sort table1 by Due', async ({ page }) => {
  await page.locator('#table1').getByText('Due').click();
  const dues = await page.locator('#table1 tbody tr td:nth-child(4)').allTextContents();
  const duesSorted = dues.sort((a, b) => {
    const aValue = parseFloat(a.replace('$', ''));
    const bValue = parseFloat(b.replace('$', ''));
    return aValue - bValue;
  });
  expect(dues).toEqual(duesSorted);

  // click again to sort in descending order
  await page.locator('#table1').getByText('Due').click();  
  const duesSortedDescending = dues.sort((a, b) => {
    const aValue = parseFloat(a.replace('$', ''));
    const bValue = parseFloat(b.replace('$', ''));
    return bValue - aValue;
  } );
  expect(dues).toEqual(duesSortedDescending);
}); 

test('should sort table2 by Last Name', async ({ page }) => {
  // await page.locator('.tablesorter .header .last-name').click();
  //await page.locator('#table2').getByText('Last Name').click();
  await page.locator('#table2').getByRole('columnheader', { name: 'Last Name' }).click();
  const lastNames = await page.locator('.tablesorter .last-name').allTextContents();
  const LastNamesAscending = lastNames.sort();
  expect(lastNames).toEqual(LastNamesAscending);  

  // console.log(lastNames);
  // console.log(LastNamesAscending);

  // click again to sort in descending order
  await page.locator('#table2').getByText('Last Name').click();
  const LastNamesDescending = lastNames.sort().reverse();

  console.log(lastNames);
  console.log(LastNamesDescending);
  expect(lastNames).toEqual(LastNamesDescending);
});

test('should sort table2 by Due', async ({ page }) => {
  await page.locator('#table2').getByText('Due').click();
  const dues = await page.locator('.tablesorter .dues').allTextContents();
  
  //sort dues in ascending order
  const duesSorted = dues.sort((a, b) => {
    const aValue = parseFloat(a.replace('$', ''));  
    const bValue = parseFloat(b.replace('$', ''));
    return aValue - bValue;
  });

  // console.log(dues);
  // console.log(duesSorted);
  expect(dues).toEqual(duesSorted);  

  // click again to sort in descending order
  await page.locator('#table2').getByText('Due').click(); 
  const duesSortedDescending = dues.sort((a, b) => {
    const aValue = parseFloat(a.replace('$', ''));
    const bValue = parseFloat(b.replace('$', ''));
    return bValue - aValue;
  } );
  // console.log(dues);
  // console.log(duesSortedDescending);
  expect(dues).toEqual(duesSortedDescending);
}); 

