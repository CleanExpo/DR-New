import { test, expect } from '@playwright/test';

test('Test Chat Button Click and Functionality', async ({ page }) => {
  console.log('\n🤖 Testing Chat Button Functionality');

  await page.goto('https://dr-new-unite-group.vercel.app/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000); // Wait for dynamic import

  // Find and click chat button
  const chatButton = page.locator('button.fixed.bottom-6.right-6').first();
  const visible = await chatButton.isVisible();
  console.log('Chat button visible:', visible);

  if (visible) {
    await page.screenshot({ path: 'test-results/before-click.png' });

    // Click chat button
    await chatButton.click();
    console.log('✅ Chat button clicked');

    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/after-click.png' });

    // Check if chat interface opened
    const chatHeader = page.locator('text=/Emergency|Disaster Recovery|Chat/i').first();
    const chatOpen = await chatHeader.isVisible({ timeout: 5000 }).catch(() => false);
    console.log('Chat interface opened:', chatOpen);

    if (chatOpen) {
      console.log('✅ Chat interface is working!');

      // Try sending a test message
      const input = page.locator('input[type="text"]').first();
      const inputVisible = await input.isVisible().catch(() => false);

      if (inputVisible) {
        console.log('✅ Input field found');
        await page.screenshot({ path: 'test-results/chat-open.png', fullPage: true });
      }
    }

    expect(chatOpen).toBe(true);
  } else {
    throw new Error('Chat button not visible');
  }
});
