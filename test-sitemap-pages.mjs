import playwright from 'playwright';

const BASE_URL = 'https://dr-new-unite-group.vercel.app';

const sitemapPages = [
  ['/', 'Home'],
  ['/locations/brisbane', 'Brisbane Location'],
  ['/locations/gold-coast', 'Gold Coast Location'],
  ['/locations/sunshine-coast', 'Sunshine Coast Location'],
  ['/locations/ipswich', 'Ipswich Location'],
  ['/locations/logan', 'Logan Location'],
  ['/locations/toowoomba', 'Toowoomba Location'],
  ['/services/water-damage', 'Water Damage'],
  ['/services/fire-damage', 'Fire Damage'],
  ['/services/mould-remediation', 'Mould Remediation'],
  ['/case-studies', 'Case Studies'],
  ['/case-studies/brisbane-floods-2022', 'Brisbane Floods 2022'],
  ['/certifications', 'Certifications'],
  ['/certifications/iicrc-certified', 'IICRC Certified'],
  ['/resources', 'Resources'],
  ['/compare/diy-vs-professional', 'DIY vs Professional'],
  ['/privacy-policy', 'Privacy Policy'],
  ['/terms-of-service', 'Terms of Service'],
];

async function test() {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  
  console.log('Testing pages from sitemap.xml:\n');
  
  let ok = 0, fail = 0;
  const failures = [];
  
  for (const [path, name] of sitemapPages) {
    try {
      const res = await page.goto(BASE_URL + path, { waitUntil: 'domcontentloaded' });
      const status = res.status();
      if (status === 200) {
        console.log('OK   ' + name.padEnd(35) + ' ' + path);
        ok++;
      } else {
        console.log('FAIL ' + name.padEnd(35) + ' ' + path + ' (' + status + ')');
        fail++;
        failures.push({path, name, status});
      }
    } catch (e) {
      console.log('ERR  ' + name.padEnd(35) + ' ' + path);
      fail++;
      failures.push({path, name, error: e.message});
    }
  }
  
  console.log('\nResult: ' + ok + ' accessible, ' + fail + ' broken');
  console.log('Success rate: ' + ((ok / sitemapPages.length) * 100).toFixed(1) + '%');
  
  if (failures.length > 0) {
    console.log('\nFailing pages:');
    failures.forEach(f => {
      console.log('  - ' + f.path + ' (' + (f.status || f.error) + ')');
    });
  }
  
  await browser.close();
}

test();
