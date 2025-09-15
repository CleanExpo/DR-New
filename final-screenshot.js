const { chromium } = require('playwright');

async function takeFullScreenshot() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3005', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    await page.screenshot({ 
      path: 'dr-new-final-result.png', 
      fullPage: true 
    });
    
    console.log('Final screenshot saved as dr-new-final-result.png');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

takeFullScreenshot();
