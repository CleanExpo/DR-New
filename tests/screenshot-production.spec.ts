import { test } from '@playwright/test';

test('Take fresh production screenshot', async ({ page, context }) => {
  // Clear all caches
  await context.clearCookies();

  console.log('\n📸 Taking fresh screenshot of production site...');

  await page.goto('https://disasterrecovery.com.au/', {
    waitUntil: 'networkidle'
  });

  await page.waitForTimeout(3000);

  // Full page screenshot
  await page.screenshot({
    path: 'test-results/production-current-full.png',
    fullPage: true
  });

  console.log('✅ Full page screenshot saved');

  // Just the viewport
  await page.screenshot({
    path: 'test-results/production-current-viewport.png',
    fullPage: false
  });

  console.log('✅ Viewport screenshot saved');

  // Check for chat button
  const chatButton = page.locator('button.fixed.bottom-6.right-6').first();
  const chatVisible = await chatButton.isVisible({ timeout: 2000 }).catch(() => false);

  console.log(`\n🔍 Chat button present: ${chatVisible ? 'YES ✅' : 'NO ❌'}`);

  // Get page title
  const title = await page.title();
  console.log(`📄 Page title: ${title}`);

  // Check build ID
  const buildId = await page.evaluate(() => {
    return (window as any).__NEXT_DATA__?.buildId || 'Unknown';
  });
  console.log(`🏗️  Build ID: ${buildId}`);
});
