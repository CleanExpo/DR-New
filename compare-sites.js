const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  // Screenshot local site
  console.log('Capturing local site...');
  const localPage = await context.newPage();
  await localPage.goto('http://localhost:3020', { waitUntil: 'networkidle', timeout: 30000 });
  await localPage.screenshot({ path: 'local-homepage.png', fullPage: true });
  const localTitle = await localPage.title();
  const localUrl = localPage.url();
  console.log(`Local - Title: ${localTitle}, URL: ${localUrl}`);

  // Screenshot production site
  console.log('Capturing production site...');
  const prodPage = await context.newPage();
  await prodPage.goto('https://disasterrecovery.com.au', { waitUntil: 'networkidle', timeout: 30000 });
  await prodPage.screenshot({ path: 'production-homepage.png', fullPage: true });
  const prodTitle = await prodPage.title();
  const prodUrl = prodPage.url();
  console.log(`Production - Title: ${prodTitle}, URL: ${prodUrl}`);

  // Get main content differences
  const localH1 = await localPage.$eval('h1', el => el.textContent).catch(() => 'No H1');
  const prodH1 = await prodPage.$eval('h1', el => el.textContent).catch(() => 'No H1');

  console.log('\n=== COMPARISON ===');
  console.log('Local H1:', localH1);
  console.log('Production H1:', prodH1);
  console.log('\nScreenshots saved:');
  console.log('- local-homepage.png');
  console.log('- production-homepage.png');

  await browser.close();
})();
