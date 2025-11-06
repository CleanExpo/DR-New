const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('
=== Testing Homepage ===');
  try {
    const startTime = Date.now();
    await page.goto('https://disasterrecovery.com.au', { timeout: 30000 });
    const loadTime = Date.now() - startTime;
    console.log();
    console.log();
  } catch (error) {
    console.log();
  }
  
  console.log('
=== Testing /services Page ===');
  try {
    const startTime = Date.now();
    await page.goto('https://disasterrecovery.com.au/services', { timeout: 30000 });
    const loadTime = Date.now() - startTime;
    console.log();
    console.log();
  } catch (error) {
    console.log();
  }
  
  console.log('
=== Testing /services/water-damage Page ===');
  try {
    const startTime = Date.now();
    await page.goto('https://disasterrecovery.com.au/services/water-damage', { timeout: 30000 });
    const loadTime = Date.now() - startTime;
    console.log();
    console.log();
    
    const images = await page.$;
    console.log();
    
    let loadedCount = 0;
    let failedCount = 0;
    
    for (const img of images) {
      const src = await img.getAttribute('src');
      const naturalWidth = await img.evaluate(el => el.naturalWidth);
      if (naturalWidth > 0) {
        loadedCount++;
      } else {
        failedCount++;
        console.log();
      }
    }
    
    console.log();
    console.log();
    
  } catch (error) {
    console.log();
  }
  
  await browser.close();
  console.log('
=== Test Complete ===
');
})();
