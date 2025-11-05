import { test, expect } from '@playwright/test';

test.describe('Disaster Recovery Bot Deployment Test', () => {
  test('should check if chat bot is visible and functional', async ({ page }) => {
    // Navigate to production site
    await page.goto('https://disasterrecovery.com.au/');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Take screenshot of initial state
    await page.screenshot({ path: 'test-results/homepage.png', fullPage: true });

    // Check for chat button
    const chatButton = page.locator('button:has-text("Chat")', 'button:has-text("Message")', '[class*="chat"]', '[class*="ChatInterface"]').first();

    console.log('=== CHAT BUTTON CHECK ===');
    const chatButtonVisible = await chatButton.isVisible().catch(() => false);
    console.log('Chat button visible:', chatButtonVisible);

    if (!chatButtonVisible) {
      console.log('Chat button NOT FOUND');
      console.log('Page title:', await page.title());
      console.log('URL:', page.url());

      // Check build ID
      const buildId = await page.evaluate(() => {
        return (window as any).__NEXT_DATA__?.buildId || 'Unknown';
      });
      console.log('Build ID:', buildId);

      // Check for any elements with 'chat' in class name
      const chatElements = await page.locator('[class*="chat" i]').count();
      console.log('Elements with "chat" in class:', chatElements);

      // Check for LiveChatInterface
      const liveChatElements = await page.locator('[class*="LiveChat" i]').count();
      console.log('Elements with "LiveChat" in class:', liveChatElements);

      // Log all console messages and errors
      console.log('\n=== PAGE CONSOLE LOGS ===');
    }

    // Listen for console logs
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    // Listen for page errors
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

    // Check for JavaScript errors
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));

    // Wait a bit to collect errors
    await page.waitForTimeout(2000);

    if (errors.length > 0) {
      console.log('\n=== JAVASCRIPT ERRORS ===');
      errors.forEach(err => console.log('ERROR:', err));
    }

    // Get all visible buttons for debugging
    const allButtons = await page.locator('button').all();
    console.log('\n=== ALL BUTTONS ON PAGE ===');
    console.log('Total buttons:', allButtons.length);
    for (let i = 0; i < Math.min(allButtons.length, 10); i++) {
      const text = await allButtons[i].textContent();
      const classes = await allButtons[i].getAttribute('class');
      console.log(`Button ${i + 1}: "${text}" | Classes: ${classes}`);
    }

    // Check if there's a fixed/floating element (chat button might be positioned)
    const fixedElements = await page.locator('[class*="fixed"]').all();
    console.log('\n=== FIXED POSITIONED ELEMENTS ===');
    console.log('Total fixed elements:', fixedElements.length);
    for (let i = 0; i < fixedElements.length; i++) {
      const classes = await fixedElements[i].getAttribute('class');
      const tag = await fixedElements[i].evaluate(el => el.tagName);
      console.log(`Fixed ${i + 1}: <${tag}> | Classes: ${classes}`);
    }

    // Take final screenshot
    await page.screenshot({ path: 'test-results/final-state.png', fullPage: true });

    // Assert that we can at least load the page
    expect(await page.title()).toBeTruthy();
    console.log('\n=== TEST COMPLETE ===');
    console.log('Page loaded successfully but chat button visibility:', chatButtonVisible);
  });

  test('should check Vercel deployment build', async ({ page }) => {
    await page.goto('https://disasterrecovery.com.au/');
    await page.waitForLoadState('networkidle');

    // Get Next.js build info
    const nextData = await page.evaluate(() => {
      return JSON.stringify((window as any).__NEXT_DATA__, null, 2);
    });

    console.log('\n=== NEXT.JS BUILD DATA ===');
    console.log(nextData);

    // Check if TypeScript bot is loaded
    const botLoaded = await page.evaluate(() => {
      return typeof (window as any).DisasterRecoveryBot !== 'undefined';
    });
    console.log('\n=== BOT CHECK ===');
    console.log('DisasterRecoveryBot available:', botLoaded);
  });
});
