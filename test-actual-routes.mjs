import playwright from 'playwright';

const BASE_URL = 'https://dr-new-unite-group.vercel.app';

const testRoutes = [
  ['/', 'Home'],
  ['/service-areas', 'Service Areas'],
  ['/locations/wacol', 'Wacol Location'],
  ['/emergency/fire-damage-brisbane', 'Fire Damage Brisbane'],
  ['/emergency/water-damage-brisbane', 'Water Damage Brisbane'],
  ['/services/location-specific/brisbane-cbd-water-damage', 'Brisbane CBD Water'],
  ['/services/location-specific/ipswich-flood-recovery', 'Ipswich Flood'],
  ['/services/location-specific/logan-water-damage', 'Logan Water'],
  ['/about-phil-mcgurk', 'About Phil'],
  ['/admin', 'Admin'],
];

async function test() {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  
  console.log('Testing actual routes that exist in build:\n');
  
  let ok = 0, fail = 0;
  
  for (const [path, name] of testRoutes) {
    try {
      const res = await page.goto(BASE_URL + path, { waitUntil: 'domcontentloaded' });
      const status = res.status();
      if (status === 200) {
        console.log('OK   ' + name.padEnd(35) + ' ' + path);
        ok++;
      } else {
        console.log('FAIL ' + name.padEnd(35) + ' ' + path + ' (' + status + ')');
        fail++;
      }
    } catch (e) {
      console.log('ERR  ' + name.padEnd(35) + ' ' + path);
      fail++;
    }
  }
  
  console.log('\nResult: ' + ok + ' OK, ' + fail + ' Failed\n');
  
  await browser.close();
}

test();
