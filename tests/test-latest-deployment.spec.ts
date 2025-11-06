import { test } from '@playwright/test';

test('Test latest Vercel deployment directly', async ({ page }) => {
  console.log('\n🔍 Testing latest production deployment');

  await page.goto('https://dr-7yglp2ckd-unite-group.vercel.app/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  await page.screenshot({
    path: 'test-results/latest-deployment-full.png',
    fullPage: true
  });

  const heroText = await page.locator('text=/When Disaster Strikes/i').isVisible().catch(() => false);
  const chatButton = await page.locator('button.fixed.bottom-6.right-6').first().isVisible().catch(() => false);

  console.log(`\nHero text present: ${heroText ? 'YES ✅' : 'NO ❌'}`);
  console.log(`Chat button present: ${chatButton ? 'YES ✅' : 'NO ❌'}`);

  // Count sections on page
  const sections = await page.locator('section').count();
  console.log(`Sections on page: ${sections}`);

  // Get page title
  const title = await page.title();
  console.log(`Page title: ${title}`);
});
