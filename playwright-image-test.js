const { chromium } = require('playwright');

async function testImageLoading() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('Testing DR-New website image loading...');
    
    await page.goto('http://localhost:3004', { waitUntil: 'networkidle' });
    
    await page.waitForSelector('section');
    
    const heroImages = await page.$$('img');
    console.log('Found', heroImages.length, 'images on the page');
    
    let loadedImages = 0;
    let failedImages = 0;
    
    for (let i = 0; i < heroImages.length; i++) {
      const img = heroImages[i];
      const src = await img.getAttribute('src');
      const alt = await img.getAttribute('alt');
      
      const isLoaded = await img.evaluate((img) => {
        return img.complete && img.naturalHeight !== 0;
      });
      
      if (isLoaded) {
        console.log('Image loaded:', src);
        loadedImages++;
      } else {
        console.log('Image failed:', src, 'alt:', alt);
        failedImages++;
      }
    }
    
    console.log('Loaded:', loadedImages);
    console.log('Failed:', failedImages);
    
    await page.screenshot({ 
      path: 'dr-new-with-images.png', 
      fullPage: true 
    });
    
    console.log('Screenshot saved as dr-new-with-images.png');
    
  } catch (error) {
    console.error('Error during testing:', error);
  } finally {
    await browser.close();
  }
}

testImageLoading();
