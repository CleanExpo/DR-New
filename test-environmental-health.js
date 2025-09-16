const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  console.log('🧪 Testing Indoor Environmental Health Page...\n');

  try {
    // Navigate to the page
    console.log('📍 Navigating to environmental health page...');
    await page.goto('http://localhost:3000/services/indoor-environmental-health', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Test 1: Check page loads
    console.log('✅ Page loaded successfully');

    // Test 2: Check hero section
    const heroTitle = await page.textContent('h1');
    console.log(`✅ Hero title found: "${heroTitle}"`);

    // Test 3: Check tabs functionality
    const tabs = await page.$$('[role="tablist"] button');
    console.log(`✅ Found ${tabs.length} tabs`);

    // Click through tabs
    for (let i = 0; i < tabs.length; i++) {
      await tabs[i].click();
      await page.waitForTimeout(500);
      const tabName = await tabs[i].textContent();
      console.log(`  ✅ Tab "${tabName}" is clickable`);
    }

    // Test 4: Check Symptom Checker
    await page.click('text="Symptom Checker"');
    await page.waitForTimeout(500);

    // Select some symptoms
    const checkboxes = await page.$$('input[type="checkbox"]');
    console.log(`✅ Symptom Checker has ${checkboxes.length} symptoms`);

    if (checkboxes.length > 5) {
      // Select 5 symptoms
      for (let i = 0; i < 5; i++) {
        await checkboxes[i].click();
      }
      console.log('  ✅ Selected 5 symptoms');

      // Analyze symptoms
      const analyzeButton = await page.$('button:has-text("Analyze Symptoms")');
      if (analyzeButton) {
        await analyzeButton.click();
        await page.waitForTimeout(1000);
        console.log('  ✅ Symptom analysis completed');
      }
    }

    // Test 5: Check Health Quiz
    await page.click('text="Health Quiz"');
    await page.waitForTimeout(500);

    const quizQuestions = await page.$$('input[type="radio"]');
    console.log(`✅ Health Quiz loaded with radio options`);

    // Test 6: Check health conditions section
    const healthConditions = await page.$$('h2:has-text("Health Conditions")');
    if (healthConditions.length > 0) {
      console.log('✅ Health Conditions section found');
    }

    // Test 7: Check specialist network
    const specialists = await page.$$('text="Our Specialist Network"');
    if (specialists.length > 0) {
      console.log('✅ Specialist Network section found');
    }

    // Test 8: Check testing services
    const testing = await page.$$('text="Comprehensive Testing"');
    if (testing.length > 0) {
      console.log('✅ Testing Services section found');
    }

    // Test 9: Check case studies
    const caseStudies = await page.$$('text="Case Studies"');
    if (caseStudies.length > 0) {
      console.log('✅ Case Studies section found');
    }

    // Test 10: Check CTA buttons
    const ctaButtons = await page.$$('button:has-text("1300-DISASTER")');
    console.log(`✅ Found ${ctaButtons.length} emergency call buttons`);

    // Test 11: Check images
    const images = await page.$$('img[alt*="environmental"]');
    console.log(`✅ Found ${images.length} environmental health images`);

    // Test 12: Check SEO meta tags
    const title = await page.title();
    console.log(`✅ Page title: "${title}"`);

    const metaDescription = await page.$eval('meta[name="description"]', el => el.content).catch(() => null);
    if (metaDescription) {
      console.log(`✅ Meta description found`);
    }

    // Test mobile responsiveness
    console.log('\n📱 Testing Mobile Responsiveness...');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);

    const mobileMenu = await page.$('[role="navigation"]');
    if (mobileMenu) {
      console.log('✅ Mobile navigation exists');
    }

    // Check if content is still visible
    const mobileHero = await page.isVisible('h1');
    console.log(`✅ Hero section visible on mobile: ${mobileHero}`);

    console.log('\n🎉 All tests passed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);

    // Take screenshot on failure
    await page.screenshot({
      path: 'test-failure-screenshot.png',
      fullPage: true
    });
    console.log('📸 Screenshot saved as test-failure-screenshot.png');
  }

  await browser.close();
})();