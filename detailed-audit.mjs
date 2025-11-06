import playwright from 'playwright';

const BASE_URL = 'https://dr-new-unite-group.vercel.app';

async function test() {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  
  console.log('=== DETAILED HOMEPAGE ANALYSIS ===\n');
  
  const res = await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  
  const title = await page.title();
  const h1 = await page.locator('h1').first().textContent();
  const h2s = await page.locator('h2').evaluateAll(els => els.map(e => e.textContent));
  
  console.log('Title: ' + title);
  console.log('H1: ' + h1);
  console.log('H2 sections: ' + h2s.length);
  h2s.slice(0, 8).forEach((h, i) => {
    console.log('  ' + (i+1) + '. ' + h);
  });
  
  console.log('\n=== ALL LINKS ON HOMEPAGE ===\n');
  
  const links = await page.locator('a').evaluateAll(els => 
    els.map(e => ({
      text: e.textContent.trim(),
      href: e.getAttribute('href')
    })).filter(l => l.href && !l.href.startsWith('http') && !l.href.startsWith('mailto:') && !l.href.startsWith('tel:'))
  );
  
  const unique = {};
  links.forEach(l => {
    if (!unique[l.href]) {
      unique[l.href] = l.text;
    }
  });
  
  Object.entries(unique).forEach(([href, text]) => {
    console.log('- ' + text.substring(0, 40).padEnd(40) + ' -> ' + href);
  });
  
  console.log('\n=== CHECKING .NEXT BUILD OUTPUT ===\n');
  
  await browser.close();
}

test();
