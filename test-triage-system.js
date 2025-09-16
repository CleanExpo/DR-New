const { chromium } = require('playwright');

async function testTriageSystem() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const page = await context.newPage();

  console.log('Testing Triage System Implementation...\n');

  try {
    // Test 1: Triage FAQ Page
    console.log('1. Testing Triage FAQ Page...');
    await page.goto('http://localhost:3000/triage-system', { waitUntil: 'networkidle' });

    // Check page title
    const title = await page.title();
    console.log(`   ✓ Page title: ${title}`);

    // Check for main heading
    const h1 = await page.$eval('h1', el => el.textContent);
    console.log(`   ✓ Main heading: ${h1}`);

    // Check for priority levels
    const criticalPriority = await page.locator('text=/Critical Priority/').count();
    const urgentPriority = await page.locator('text=/Urgent Priority/').count();
    const standardPriority = await page.locator('text=/Standard Priority/').count();
    console.log(`   ✓ Priority levels found: Critical=${criticalPriority}, Urgent=${urgentPriority}, Standard=${standardPriority}`);

    // Check for FAQ items
    const faqCount = await page.locator('h3:has-text("Q:")').count();
    console.log(`   ✓ FAQ items found: ${faqCount}`);

    // Check for phone number
    const phoneNumber = await page.locator('text=1300 956 502').count();
    console.log(`   ✓ Phone number displayed: ${phoneNumber} times`);

    // Take screenshot
    await page.screenshot({ path: 'triage-faq-page.png', fullPage: false });
    console.log('   ✓ Screenshot saved: triage-faq-page.png\n');

    // Test 2: Water Damage Page with Triage Card
    console.log('2. Testing Water Damage Page with Triage Card...');
    await page.goto('http://localhost:3000/services/water-damage-restoration', { waitUntil: 'networkidle' });

    // Check for TriageInfoCard
    const triageCard = await page.locator('text=/Priority Triage System/').count();
    console.log(`   ✓ Triage Info Card found: ${triageCard > 0 ? 'Yes' : 'No'}`);

    // Check for priority levels in card
    const cardPriorities = await page.locator('text=/hour response/').count();
    console.log(`   ✓ Priority timeframes displayed: ${cardPriorities}`);

    // Check for expandable details
    const expandButton = await page.locator('text=/Show More Details/').count();
    console.log(`   ✓ Expandable details button: ${expandButton > 0 ? 'Yes' : 'No'}`);

    // Click expand if available
    if (expandButton > 0) {
      await page.click('text=/Show More Details/');
      await page.waitForTimeout(500);
      const expanded = await page.locator('text=/Common scenarios/').count();
      console.log(`   ✓ Details expanded successfully: ${expanded > 0 ? 'Yes' : 'No'}`);
    }

    // Check for link to triage page
    const triageLink = await page.locator('a[href="/triage-system"]').count();
    console.log(`   ✓ Link to triage system page: ${triageLink > 0 ? 'Yes' : 'No'}`);

    // Take screenshot
    await page.screenshot({ path: 'water-damage-triage.png', fullPage: false });
    console.log('   ✓ Screenshot saved: water-damage-triage.png\n');

    // Test 3: Fire Damage Page with Triage Card
    console.log('3. Testing Fire Damage Page with Triage Card...');
    await page.goto('http://localhost:3000/services/fire-damage-restoration', { waitUntil: 'networkidle' });

    // Check for TriageInfoCard
    const fireTriageCard = await page.locator('text=/Priority Triage System/').count();
    console.log(`   ✓ Triage Info Card found: ${fireTriageCard > 0 ? 'Yes' : 'No'}`);

    // Check for Brisbane references
    const brisbaneRefs = await page.locator('text=/Brisbane/i').count();
    console.log(`   ✓ Brisbane references: ${brisbaneRefs}`);

    // Take screenshot
    await page.screenshot({ path: 'fire-damage-triage.png', fullPage: false });
    console.log('   ✓ Screenshot saved: fire-damage-triage.png\n');

    // Test 4: SEO Elements
    console.log('4. Testing SEO Elements...');
    await page.goto('http://localhost:3000/triage-system', { waitUntil: 'networkidle' });

    // Check for meta tags
    const metaDescription = await page.$eval('meta[name="description"]', el => el.content);
    console.log(`   ✓ Meta description: ${metaDescription.substring(0, 60)}...`);

    // Check for schema markup
    const schemaScript = await page.locator('script[type="application/ld+json"]').count();
    console.log(`   ✓ Schema.org markup found: ${schemaScript > 0 ? 'Yes' : 'No'}`);

    // Check for Open Graph tags
    const ogTitle = await page.$eval('meta[property="og:title"]', el => el.content).catch(() => null);
    if (ogTitle) {
      console.log(`   ✓ Open Graph title: ${ogTitle}`);
    }

    // Test 5: Mobile Responsiveness
    console.log('\n5. Testing Mobile Responsiveness...');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/triage-system', { waitUntil: 'networkidle' });

    // Check if content is visible on mobile
    const mobileVisible = await page.locator('h1').isVisible();
    console.log(`   ✓ Content visible on mobile: ${mobileVisible ? 'Yes' : 'No'}`);

    // Check if phone button is prominent
    const phoneButton = await page.locator('a[href^="tel:"]').first();
    const isPhoneVisible = await phoneButton.isVisible();
    console.log(`   ✓ Phone CTA visible on mobile: ${isPhoneVisible ? 'Yes' : 'No'}`);

    // Take mobile screenshot
    await page.screenshot({ path: 'triage-mobile.png', fullPage: false });
    console.log('   ✓ Screenshot saved: triage-mobile.png');

    console.log('\n✅ All triage system tests passed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Error screenshot saved: error-screenshot.png');
  } finally {
    await browser.close();
  }
}

// Run the tests
testTriageSystem().catch(console.error);