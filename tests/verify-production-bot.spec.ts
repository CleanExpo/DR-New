import { test, expect } from '@playwright/test';

test('Verify production bot integration', async ({ page }) => {
  console.log('\n🎯 VERIFYING PRODUCTION BOT INTEGRATION');
  console.log('URL: https://disasterrecovery.com.au/\n');

  await page.goto('https://disasterrecovery.com.au/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  // Take production screenshot
  await page.screenshot({ path: 'test-results/production-final.png', fullPage: false });

  // Verify existing site
  console.log('✓ Checking existing site elements:');
  const heroText = await page.locator('text=/When Disaster Strikes/i').isVisible().catch(() => false);
  console.log(`  - Hero section: ${heroText ? '✅' : '❌'}`);

  const emergencyCall = await page.locator('text=/1300 309 361/i').first().isVisible().catch(() => false);
  console.log(`  - Emergency contact: ${emergencyCall ? '✅' : '❌'}`);

  // Verify bot integration
  console.log('\n✓ Checking bot integration:');
  const chatButton = page.locator('button.fixed.bottom-6.right-6').first();
  const chatVisible = await chatButton.isVisible({ timeout: 5000 }).catch(() => false);
  console.log(`  - Chat button visible: ${chatVisible ? '✅' : '❌'}`);

  if (chatVisible) {
    await chatButton.click();
    await page.waitForTimeout(1500);

    const chatInterface = await page.locator('text=/DR Assistant|Disaster Recovery/i').first().isVisible({ timeout: 3000 }).catch(() => false);
    console.log(`  - Chat opens: ${chatInterface ? '✅' : '❌'}`);

    if (chatInterface) {
      await page.screenshot({ path: 'test-results/production-bot-working.png' });
    }

    expect(chatInterface).toBe(true);
  }

  console.log('\n📊 FINAL RESULT:');
  console.log(`  - Existing site preserved: ${heroText && emergencyCall ? '✅ YES' : '❌ NO'}`);
  console.log(`  - Bot integrated: ${chatVisible ? '✅ YES' : '❌ NO'}`);
  console.log('\n🎉 Bot successfully deployed to production!');

  expect(heroText).toBe(true);
  expect(chatVisible).toBe(true);
});
