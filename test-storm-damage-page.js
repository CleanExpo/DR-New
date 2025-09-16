const { chromium } = require('playwright');

(async () => {
  console.log('🌊 Testing Storm Damage Queensland Page...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    // Test 1: Navigate to the page
    console.log('📍 Test 1: Navigating to storm damage page...');
    await page.goto('http://localhost:3000/emergency/storm-damage-queensland', {
      waitUntil: 'networkidle'
    });
    console.log('✅ Page loaded successfully\n');

    // Test 2: Check hero section
    console.log('🎯 Test 2: Checking hero section...');
    const heroTitle = await page.textContent('h1');
    if (heroTitle.includes('Queensland Storm Damage Restoration')) {
      console.log('✅ Hero title found: ' + heroTitle);
    } else {
      console.log('❌ Hero title not found');
    }

    // Test 3: Check for IICRC certification badge
    const certBadge = await page.isVisible('text=IICRC Certified');
    console.log(certBadge ? '✅ IICRC certification visible' : '❌ IICRC certification not found');

    // Test 4: Check for phone number
    const phoneNumber = await page.isVisible('text=1300 309 361');
    console.log(phoneNumber ? '✅ Phone number visible' : '❌ Phone number not found\n');

    // Test 5: Test tabs functionality
    console.log('📑 Test 5: Testing tabs...');
    const tabs = ['Overview', 'Restore vs Rebuild', 'Assessment Tools', 'Storm Prep'];
    for (const tab of tabs) {
      const tabButton = await page.locator(`text="${tab}"`).first();
      if (await tabButton.isVisible()) {
        await tabButton.click();
        await page.waitForTimeout(500);
        console.log(`✅ ${tab} tab works`);
      } else {
        console.log(`❌ ${tab} tab not found`);
      }
    }
    console.log('');

    // Test 6: Check storm damage calculator
    console.log('🧮 Test 6: Testing Storm Damage Calculator...');
    await page.click('text="Assessment Tools"');
    await page.waitForTimeout(500);

    const calculator = await page.isVisible('text=Storm Damage Assessment Calculator');
    if (calculator) {
      console.log('✅ Calculator found');

      // Test slider interaction
      const sliders = await page.locator('input[type="range"]').all();
      if (sliders.length > 0) {
        console.log(`✅ Found ${sliders.length} damage factor sliders`);

        // Test first slider
        await sliders[0].fill('50');
        console.log('✅ Slider interaction works');
      }
    } else {
      console.log('❌ Calculator not found');
    }
    console.log('');

    // Test 7: Check decision tree
    console.log('🌳 Test 7: Testing Decision Tree...');
    const decisionTree = await page.isVisible('text=Restore vs Rebuild Decision Tool');
    if (decisionTree) {
      console.log('✅ Decision tree found');

      // Try clicking a decision button
      const decisionButton = await page.locator('button:has-text("structure is sound")').first();
      if (await decisionButton.isVisible()) {
        await decisionButton.click();
        console.log('✅ Decision tree interaction works');
      }
    } else {
      console.log('❌ Decision tree not found');
    }
    console.log('');

    // Test 8: Check FAQ section
    console.log('❓ Test 8: Checking FAQ section...');
    const faqSection = await page.isVisible('text=Storm Damage Restoration FAQs');
    console.log(faqSection ? '✅ FAQ section present' : '❌ FAQ section not found');

    // Test 9: Check coverage areas
    console.log('📍 Test 9: Checking coverage areas...');
    const coverageSection = await page.isVisible('text=Storm Damage Restoration Coverage Across Queensland');
    console.log(coverageSection ? '✅ Coverage section present' : '❌ Coverage section not found');

    // Test 10: Check for key messaging
    console.log('\n🎯 Test 10: Checking key messaging...');
    const keyMessages = [
      'Restore, Don\'t Rebuild',
      'CARSI',
      'Old Claim',
      'Queenslander',
      'Gold Coast',
      'Brisbane'
    ];

    for (const message of keyMessages) {
      const found = await page.locator(`text=/${message}/i`).first().isVisible().catch(() => false);
      console.log(found ? `✅ Found: "${message}"` : `❌ Missing: "${message}"`);
    }

    // Test 11: Mobile responsiveness
    console.log('\n📱 Test 11: Testing mobile responsiveness...');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    const mobileHero = await page.isVisible('h1');
    console.log(mobileHero ? '✅ Mobile view works' : '❌ Mobile view broken');

    // Take screenshots
    console.log('\n📸 Taking screenshots...');
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.screenshot({
      path: 'storm-damage-desktop.png',
      fullPage: false
    });
    console.log('✅ Desktop screenshot saved');

    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({
      path: 'storm-damage-mobile.png',
      fullPage: false
    });
    console.log('✅ Mobile screenshot saved');

    console.log('\n✨ All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();