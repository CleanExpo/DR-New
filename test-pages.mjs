import playwright from 'playwright';

const BASE_URL = 'https://dr-new-unite-group.vercel.app';

const pages = [
  ['/', 'Homepage'],
  ['/services', 'Services'],
  ['/services/water-damage-restoration', 'Water Damage'],
  ['/services/fire-damage-restoration', 'Fire Damage'],
  ['/services/mould-remediation', 'Mould'],
  ['/services/storm-damage-repair', 'Storm Damage'],
  ['/services/smoke-damage-restoration', 'Smoke Damage'],
  ['/services/sewage-cleanup', 'Sewage'],
  ['/brisbane', 'Brisbane'],
  ['/ipswich', 'Ipswich'],
  ['/logan', 'Logan'],
  ['/brisbane/hamilton', 'Hamilton'],
  ['/brisbane/ascot', 'Ascot'],
  ['/brisbane/new-farm', 'New Farm'],
  ['/brisbane/toowong', 'Toowong'],
  ['/ipswich/karalee', 'Karalee'],
  ['/ipswich/brookwater', 'Brookwater'],
  ['/ipswich/springfield-lakes', 'Springfield Lakes'],
  ['/about', 'About'],
  ['/insurance-claims', 'Insurance Claims'],
  ['/commercial', 'Commercial'],
  ['/residential', 'Residential'],
  ['/contact', 'Contact'],
  ['/emergency', 'Emergency'],
  ['/gallery', 'Gallery'],
  ['/blog', 'Blog'],
  ['/faq', 'FAQ'],
  ['/privacy', 'Privacy'],
  ['/terms', 'Terms'],
];

async function test() {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  
  console.log('PRODUCTION AUDIT: ' + BASE_URL);
  console.log('');
  
  let passed = 0;
  let failed = 0;
  const results = [];
  
  for (const [path, name] of pages) {
    try {
      const res = await page.goto(BASE_URL + path, { waitUntil: 'domcontentloaded' });
      const status = res.status();
      results.push({ path, name, status });
      if (status === 200) {
        console.log('OK   ' + name.padEnd(25) + ' ' + path);
        passed++;
      } else {
        console.log('FAIL ' + name.padEnd(25) + ' ' + path + ' (' + status + ')');
        failed++;
      }
    } catch (e) {
      console.log('ERR  ' + name.padEnd(25) + ' ' + path);
      failed++;
      results.push({ path, name, status: 'ERROR' });
    }
  }
  
  console.log('');
  console.log('SUMMARY: ' + passed + ' passed, ' + failed + ' failed out of ' + pages.length);
  console.log('Success rate: ' + ((passed / pages.length) * 100).toFixed(1) + '%');
  
  await browser.close();
}

test();
