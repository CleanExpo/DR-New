import { test, expect } from '@playwright/test';

test.describe('Disaster Recovery Bot Live Deployment', () => {
  test('should verify chat bot is visible on production', async ({ page }) => {
    console.log('\n════════════════════════════════════════');
    console.log('TESTING LIVE DISASTER RECOVERY BOT');
    console.log('URL: https://disasterrecovery.com.au/');
    console.log('════════════════════════════════════════\n');

    // Navigate to live site
    await page.goto('https://disasterrecovery.com.au/');
    await page.waitForLoadState('networkidle');

    // Get deployment info
    const buildId = await page.evaluate(() => {
      return (window as any).__NEXT_DATA__?.buildId || 'Unknown';
    });
    console.log('📦 Build ID:', buildId);
    console.log('📅 Test Time:', new Date().toISOString());

    // Take screenshot
    await page.screenshot({ path: 'test-results/bot-live-homepage.png', fullPage: false });

    // Look for chat button (bottom-right red button)
    console.log('\n🔍 Looking for chat button...');

    // Try multiple selectors
    const chatButtonSelectors = [
      'button.bg-red-600',
      'button:has-text("Chat")',
      '[class*="fixed"][class*="bottom"]',
      'button >> text=/chat/i'
    ];

    let chatButton = null;
    let selectorUsed = '';

    for (const selector of chatButtonSelectors) {
      chatButton = page.locator(selector).first();
      const visible = await chatButton.isVisible({ timeout: 2000 }).catch(() => false);
      if (visible) {
        selectorUsed = selector;
        break;
      }
    }

    const chatVisible = chatButton ? await chatButton.isVisible().catch(() => false) : false;

    console.log('✓ Chat button visible:', chatVisible ? '✅ YES' : '❌ NO');
    if (chatVisible) {
      console.log('✓ Found using selector:', selectorUsed);
    }

    // Collect page errors
    const jsErrors: string[] = [];
    page.on('pageerror', error => jsErrors.push(error.message));

    await page.waitForTimeout(2000);

    if (jsErrors.length > 0) {
      console.log('\n⚠️  JAVASCRIPT ERRORS DETECTED:');
      jsErrors.forEach(err => console.log('  ❌', err));
    } else {
      console.log('\n✅ No JavaScript errors detected');
    }

    // Debug: List all buttons
    if (!chatVisible) {
      console.log('\n🔍 DEBUG: Listing all buttons on page');
      const allButtons = await page.locator('button').all();
      console.log(`Found ${allButtons.length} buttons total`);

      for (let i = 0; i < Math.min(allButtons.length, 10); i++) {
        const text = await allButtons[i].textContent();
        const classes = await allButtons[i].getAttribute('class');
        console.log(`  ${i + 1}. "${text}" | ${classes}`);
      }

      // Check for fixed elements
      const fixedEls = await page.locator('[class*="fixed"]').count();
      console.log(`\nFound ${fixedEls} fixed position elements`);
    }

    // Test bot interaction if visible
    if (chatVisible && chatButton) {
      console.log('\n🤖 Testing bot interaction...');
      await chatButton.click();
      await page.waitForTimeout(1500);

      const chatInterfaceVisible = await page.locator('text=/Emergency|Disaster Recovery/i').first().isVisible({ timeout: 3000 }).catch(() => false);

      console.log('✓ Chat interface opened:', chatInterfaceVisible ? '✅ YES' : '❌ NO');

      if (chatInterfaceVisible) {
        await page.screenshot({ path: 'test-results/bot-chat-interface.png' });
      }
    }

    console.log('\n════════════════════════════════════════');
    console.log('TEST COMPLETE');
    console.log('════════════════════════════════════════\n');

    // Assertion
    expect(chatVisible).toBe(true);
  });

  test('should test bot API endpoint directly', async ({ request }) => {
    console.log('\n════════════════════════════════════════');
    console.log('TESTING BOT API ENDPOINT');
    console.log('════════════════════════════════════════\n');

    const testMessage = 'My house is flooding in Hamilton';
    console.log('📤 Sending test message:', testMessage);

    const response = await request.post('https://disasterrecovery.com.au/api/bot/chat', {
      data: {
        sessionId: `test-${Date.now()}`,
        message: testMessage,
        location: 'Hamilton'
      }
    });

    console.log('📥 API Response Status:', response.status());

    if (response.ok()) {
      const data = await response.json();

      console.log('\n✅ API RESPONSE:');
      console.log('Service Type:', data.classification?.service_type || 'N/A');
      console.log('Emergency Level:', data.classification?.emergency_level || 'N/A');
      console.log('Confidence:', data.classification?.confidence || 'N/A');
      console.log('Route To:', data.routing?.route_to || 'N/A');
      console.log('Priority:', data.routing?.priority || 'N/A');
      console.log('Escalate:', data.routing?.escalate || false);
      console.log('\nResponse Preview:', data.response?.substring(0, 100) + '...');

      // Verify TypeScript bot is working
      expect(data.response).toBeTruthy();
      expect(data.classification).toBeTruthy();
      expect(data.routing).toBeTruthy();
      expect(data.classification.service_type).toBeTruthy();

      console.log('\n✅ TypeScript bot working correctly!');
    } else {
      const errorText = await response.text();
      console.log('\n❌ API ERROR:');
      console.log(errorText);
      throw new Error(`API returned ${response.status()}: ${errorText}`);
    }

    console.log('\n════════════════════════════════════════');
    console.log('API TEST COMPLETE');
    console.log('════════════════════════════════════════\n');
  });
});
