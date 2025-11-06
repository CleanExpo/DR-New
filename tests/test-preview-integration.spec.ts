import { test, expect } from '@playwright/test';

test('Test bot integration on preview deployment', async ({ page }) => {
  console.log('\n🧪 Testing Bot Integration on Preview URL');
  console.log('URL: https://dr-70que3u7n-unite-group.vercel.app/');

  await page.goto('https://dr-70que3u7n-unite-group.vercel.app/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  // Take homepage screenshot
  await page.screenshot({ path: 'test-results/preview-homepage.png', fullPage: false });

  // Verify existing site is intact
  console.log('\n✓ Checking existing site elements...');
  const heroText = await page.locator('text=/When Disaster Strikes/i').isVisible().catch(() => false);
  console.log('  - Hero section:', heroText ? '✅ Present' : '❌ Missing');

  const emergencyButton = await page.locator('text=/Emergency.*1300 309 361/i').isVisible().catch(() => false);
  console.log('  - Emergency button:', emergencyButton ? '✅ Present' : '❌ Missing');

  // Look for chat button
  console.log('\n✓ Checking bot integration...');
  const chatButton = page.locator('button.fixed.bottom-6.right-6').first();
  const chatVisible = await chatButton.isVisible({ timeout: 5000 }).catch(() => false);
  console.log('  - Chat button:', chatVisible ? '✅ Visible' : '❌ Not visible');

  if (chatVisible) {
    await chatButton.click();
    await page.waitForTimeout(1500);

    const chatInterface = await page.locator('text=/Emergency|Disaster Recovery|Chat/i').first().isVisible({ timeout: 3000 }).catch(() => false);
    console.log('  - Chat interface opens:', chatInterface ? '✅ YES' : '❌ NO');

    if (chatInterface) {
      await page.screenshot({ path: 'test-results/preview-bot-open.png' });
    }
  }

  console.log('\n📊 Test Summary:');
  console.log('  - Existing site preserved:', heroText && emergencyButton ? '✅' : '❌');
  console.log('  - Bot integrated:', chatVisible ? '✅' : '❌');

  expect(heroText).toBe(true);
  expect(emergencyButton).toBe(true);
  expect(chatVisible).toBe(true);
});
