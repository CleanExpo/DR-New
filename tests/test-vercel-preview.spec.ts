import { test, expect } from '@playwright/test';

test('Test Vercel Preview Deployment', async ({ page }) => {
  console.log('\n🔍 Testing Vercel Preview URL');

  await page.goto('https://dr-new-unite-group.vercel.app/');
  await page.waitForLoadState('networkidle');

  // Wait a bit longer for dynamic import
  await page.waitForTimeout(3000);

  // Take screenshot
  await page.screenshot({ path: 'test-results/vercel-preview.png', fullPage: true });

  // Get build info
  const buildId = await page.evaluate(() => {
    return (window as any).__NEXT_DATA__?.buildId || 'Unknown';
  });
  console.log('Build ID:', buildId);

  // Check all elements
  const body = await page.content();
  const hasLiveChat = body.includes('LiveChatInterface') || body.includes('LiveChat');
  console.log('LiveChatInterface in HTML:', hasLiveChat);

  // Look for ANY fixed elements
  const fixedElements = await page.locator('[class*="fixed"]').all();
  console.log('Fixed elements found:', fixedElements.length);

  for (let i = 0; i < fixedElements.length; i++) {
    const classes = await fixedElements[i].getAttribute('class');
    const visible = await fixedElements[i].isVisible();
    const tag = await fixedElements[i].evaluate(el => el.tagName);
    console.log(`  ${i + 1}. <${tag}> visible=${visible} | ${classes}`);
  }

  // Look for z-40 or z-50 (chat button z-index)
  const zIndexElements = await page.locator('[class*="z-40"], [class*="z-50"]').all();
  console.log('\nZ-index elements (z-40, z-50):', zIndexElements.length);

  // Check if Providers is wrapping things
  const providersElement = await page.locator('body > div').first();
  const providersHTML = await providersElement.innerHTML();
  console.log('\nChecking for LiveChatInterface in body...');
  console.log('Has LiveChatInterface:', providersHTML.includes('LiveChatInterface'));
});
