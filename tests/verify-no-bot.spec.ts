import { test, expect } from '@playwright/test';

test('Verify original landing page WITHOUT bot', async ({ page }) => {
  console.log('\n📸 Verifying ORIGINAL Landing Page');
  console.log('URL: https://disasterrecovery.com.au/\n');

  await page.goto('https://disasterrecovery.com.au/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  await page.screenshot({
    path: 'test-results/original-no-bot.png',
    fullPage: true
  });

  // Check hero text
  const heroText = await page.locator('text=/When Disaster Strikes/i').isVisible().catch(() => false);
  console.log(`Hero text present: ${heroText ? 'YES ✅' : 'NO ❌'}`);

  // Check that chat button is NOT present
  const chatButton = await page.locator('button.fixed.bottom-6.right-6').first().isVisible({ timeout: 2000 }).catch(() => false);
  console.log(`Chat button present: ${chatButton ? 'YES ❌ (SHOULD NOT BE)' : 'NO ✅ (CORRECT)'}`);

  const title = await page.title();
  console.log(`Page title: ${title}`);

  console.log(`\n✅ Original landing page ${!chatButton ? 'RESTORED' : 'STILL HAS BOT'}`);

  expect(heroText).toBe(true);
  expect(chatButton).toBe(false); // Should NOT have chat button
});
