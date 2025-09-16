import { test, expect } from '@playwright/test';

test('check site status and errors', async ({ page }) => {
  const consoleMessages = [];
  page.on('console', msg => consoleMessages.push(`${msg.type()}: ${msg.text()}`));
  
  const response = await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  console.log(`HTTP Status: ${response.status()}`);
  console.log(`Page Title: ${await page.title()}`);
  
  const errors = consoleMessages.filter(msg => msg.toLowerCase().includes('error'));
  if (errors.length > 0) {
    console.log(`\nConsole Errors Found (${errors.length}):`);
    errors.slice(0, 5).forEach(error => console.log(`  - ${error}`));
  } else {
    console.log('\nNo console errors detected!');
  }
  
  await page.screenshot({ path: 'site-status.png' });
  console.log('\nScreenshot saved as site-status.png');
  
  expect(response.status()).toBe(200);
});
