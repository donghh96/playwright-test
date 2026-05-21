import {test, expect} from '@playwright/test';

function isCritical(src: string | null) {
  // return src?.includes('broken') === false;
  return src? src.includes('asdf') : false;
}

test('image count', async({page}) => {
  await page.goto('https://the-internet.herokuapp.com/broken_images');
  const images = page.locator('div.example img');
  await expect(images).toHaveCount(3);
});

test('check if broken images exist', async({page}) => {
  await page.goto('https://the-internet.herokuapp.com/broken_images');
  //css=div.example img (no need to write css, css by default)
  const images = page.locator('div.example img');
  const count = await images.count();

  for (let i = 0; i < count; i++) {
    const img = images.nth(i);
    
    const isBroken = await img.evaluate((element) => {
      return (element as HTMLImageElement).naturalWidth === 0;
    })

    if (isBroken) {
      console.log(`The ${i + 1} image is broken`);
    } else {
      console.log(`The ${i + 1} image is correct`);
    }
  }
});

test('broken images count', async({page}) => {
  await page.goto('https://the-internet.herokuapp.com/broken_images');
  const container = page.locator('div.example');
  const images = container.locator('img');
  const count = await images.count();

  for (let i = 0; i < count; i++) {
    const width = await images.nth(i).evaluate(img => (img as HTMLImageElement).naturalWidth);

    if (width === 0) {
      console.warn(`image ${i+1} is broken`);
    }
  }
});

test('throw error practice', async({page}) => {
  await page.goto('https://the-internet.herokuapp.com/broken_images');
  const container = page.locator('div.example');
  const images = container.locator('img');
  const count = await images.count();
  
  for (let i = 0; i < count; i++) {
    const width = await images.nth(i).evaluate(img => (img as HTMLImageElement).naturalWidth);
    const src = await images.nth(i).getAttribute('src');

    if (width === 0) {

      try {
        if (isCritical(src)) {
          throw new Error(`critical image broken: ${src}`);
        } else {
        console.warn(`non critical image broken: ${src}`);
        }
      } catch (error) {
        console.warn(`Critical failure`, error);
      }
    }
  }
});