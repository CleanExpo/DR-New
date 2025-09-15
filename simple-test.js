const { chromium } = require('playwright');

async function simpleTest() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('Opening page...');
    await page.goto('http://localhost:3004');
    
    // Wait 5 seconds to see what happens
    await page.waitForTimeout(5000);
    
    console.log('Taking screenshot...');
    await page.screenshot({ path: 'error-screenshot.png' });
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

simpleTest();
