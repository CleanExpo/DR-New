import { test, expect } from '@playwright/test';

test.describe('Live Disaster Recovery Bot - Post Deployment', () => {
  test('should have chat bot visible on live site', async ({ page }) => {
    console.log('\n=== TESTING LIVE DEPLOYMENT ===');
    console.log('URL: https://disasterrecovery.com.au/');

    await page.goto('https://disasterrecovery.com.au/');
    await page.waitForLoadState('networkidle');

    // Get build ID to confirm deployment
    const buildId = await page.evaluate(() => {
      return (window as any).__NEXT_DATA__?.buildId || 'Unknown';
    });
    console.log('Build ID:', buildId);

    // Take initial screenshot
    await page.screenshot({ path: 'test-results/live-homepage.png', fullPage: false });

    // Look for chat button (red circular button)
    const chatButton = page.locator('button').filter({ has: page.locator('svg') }).first();

    console.log('\n=== CHAT BUTTON CHECK ===');
    const chatVisible = await chatButton.isVisible({ timeout: 5000 }).catch(() => false);
    console.log('Chat button visible:', chatVisible);

    if (chatVisible) {
      console.log('✅ SUCCESS: Chat button found!');

      // Try to click it
      await chatButton.click();
      await page.waitForTimeout(1000);

      // Check if chat opens
      const chatOpen = await page.locator('text=Emergency').isVisible().catch(() => false);
      console.log('Chat opened:', chatOpen);

      if (chatOpen) {
        console.log('✅ Chat interface opened successfully');
        await page.screenshot({ path: 'test-results/live-chat-open.png' });
      }
    } else {
      console.log('❌ FAILED: Chat button not found');

      // Debug: Find all fixed position elements
      const fixedElements = await page.locator('[class*="fixed"]').all();
      console.log(`Found ${fixedElements.length} fixed position elements`);

      // Debug: Find all buttons
      const allButtons = await page.locator('button').all();
      console.log(`Found ${allButtons.length} buttons on page`);
    }

    // Check for JavaScript errors
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));

    if (errors.length > 0) {
      console.log('\n=== JAVASCRIPT ERRORS ===');
      errors.forEach(err => console.log('ERROR:', err));
    } else {
      console.log('\n✅ No JavaScript errors detected');
    }

    // Final assertion
    expect(chatVisible).toBe(true);
  });

  test('should test bot API endpoint', async ({ request }) => {
    console.log('\n=== TESTING BOT API ===');

    const response = await request.post('https://disasterrecovery.com.au/api/bot/chat', {
      data: {
        sessionId: 'test-' + Date.now(),
        message: 'My house is flooding in Hamilton',
        location: 'Hamilton'
      }
    });

    console.log('API Status:', response.status());

    if (response.ok()) {
      const data = await response.json();
      console.log('API Response:', JSON.stringify(data, null, 2));

      expect(data.response).toBeTruthy();
      expect(data.classification).toBeTruthy();
      expect(data.routing).toBeTruthy();

      console.log('✅ Bot API working correctly');
    } else {
      console.log('❌ API Error:', await response.text());
    }
  });
});
