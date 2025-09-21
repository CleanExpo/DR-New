const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://disaster-recovery-seven.vercel.app';
const TODAY = new Date().toISOString().split('T')[0];

// Brisbane, Ipswich, Logan focus areas
const PRIMARY_LOCATIONS = {
  'brisbane': ['Hamilton', 'Ascot', 'New Farm', 'Bulimba', 'Hawthorne', 'Morningside', 'Norman Park', 'Seven Hills', 'Camp Hill', 'Carina'],
  'ipswich': ['Karalee', 'Brookwater', 'Springfield Lakes', 'Augustine Heights', 'Bellbird Park', 'Camira', 'Springfield', 'Redbank Plains', 'Goodna', 'Booval'],
  'logan': ['Springwood', 'Rochedale', 'Shailer Park', 'Daisy Hill', 'Loganholme', 'Tanah Merah', 'Underwood', 'Slacks Creek', 'Meadowbrook', 'Waterford']
};

// Priority mapping for local SEO
const PRIORITY_MAP = {
  'home': 1.0,
  'services': {
    'water-damage': 0.95,
    'fire-damage': 0.95,
    'mould-remediation': 0.95,
    'storm-damage': 0.95,
    'commercial-restoration': 0.95,
    'emergency': 0.98
  },
  'locations': {
    'brisbane': 0.9,
    'ipswich': 0.9,
    'logan': 0.9,
    'suburbs': 0.85
  },
  'about': 0.8,
  'contact': 0.9,
  'insurance': 0.85,
  'case-studies': 0.75,
  'certifications': 0.8,
  'testimonials': 0.75,
  'blog': 0.6,
  'legal': 0.3
};

// Find all pages recursively
function findPages(dir, fileList = []) {
  try {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        if (!['node_modules', '.next', '.git', 'public', 'tests', 'scripts'].includes(file)) {
          findPages(filePath, fileList);
        }
      } else if (file === 'page.tsx' || file === 'page.js') {
        const route = filePath
          .replace(path.join(process.cwd(), 'app'), '')
          .replace(/\\/g, '/')
          .replace('/page.tsx', '')
          .replace('/page.js', '')
          .replace(/\(.*?\)/g, ''); // Remove Next.js route groups

        fileList.push(route || '/');
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }

  return fileList;
}

// Calculate priority based on URL
function calculatePriority(url) {
  if (url === '/') return 1.0;

  // High priority for emergency and main services
  if (url.includes('/emergency')) return 0.98;
  if (url.includes('/services/water-damage')) return 0.95;
  if (url.includes('/services/fire-damage')) return 0.95;
  if (url.includes('/services/mould-remediation')) return 0.95;
  if (url.includes('/services/storm-damage')) return 0.95;
  if (url.includes('/services/commercial')) return 0.95;

  // Primary locations
  if (url.includes('/locations/brisbane') || url.includes('/brisbane')) return 0.9;
  if (url.includes('/locations/ipswich') || url.includes('/ipswich')) return 0.9;
  if (url.includes('/locations/logan') || url.includes('/logan')) return 0.9;

  // Suburb pages
  for (const [city, suburbs] of Object.entries(PRIMARY_LOCATIONS)) {
    for (const suburb of suburbs) {
      if (url.toLowerCase().includes(suburb.toLowerCase().replace(' ', '-'))) {
        return 0.85;
      }
    }
  }

  // Other important pages
  if (url.includes('/contact')) return 0.9;
  if (url.includes('/about')) return 0.8;
  if (url.includes('/insurance')) return 0.85;
  if (url.includes('/certifications')) return 0.8;
  if (url.includes('/case-studies')) return 0.75;
  if (url.includes('/testimonials')) return 0.75;

  // Lower priority pages
  if (url.includes('/blog')) return 0.6;
  if (url.includes('/cost')) return 0.65;
  if (url.includes('/compare')) return 0.6;
  if (url.includes('/tips')) return 0.55;
  if (url.includes('/guides')) return 0.6;
  if (url.includes('/legal') || url.includes('/privacy') || url.includes('/terms')) return 0.3;
  if (url.includes('/admin') || url.includes('/client-portal') || url.includes('/contractor')) return 0.2;

  return 0.5;
}

// Calculate change frequency
function getChangeFreq(url) {
  if (url === '/') return 'daily';
  if (url.includes('/emergency')) return 'daily';
  if (url.includes('/services')) return 'weekly';
  if (url.includes('/locations')) return 'weekly';
  if (url.includes('/blog')) return 'weekly';
  if (url.includes('/case-studies')) return 'monthly';
  if (url.includes('/about') || url.includes('/contact')) return 'monthly';
  if (url.includes('/legal') || url.includes('/privacy') || url.includes('/terms')) return 'yearly';

  return 'weekly';
}

// Generate XML sitemap
function generateXMLSitemap(pages) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
  xml += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
  xml += '                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';

  pages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority.toFixed(1)}</priority>\n`;

    // Add image information for key pages
    if (page.url === '/' || page.url.includes('/services') || page.url.includes('/locations')) {
      xml += '    <image:image>\n';
      xml += `      <image:loc>${SITE_URL}/images/disaster-recovery-brisbane.webp</image:loc>\n`;
      xml += '      <image:title>Disaster Recovery Brisbane - Master Restorer Phill McGurk</image:title>\n';
      xml += '      <image:caption>24/7 Emergency Restoration Services in Brisbane, Ipswich &amp; Logan</image:caption>\n';
      xml += '    </image:image>\n';
    }

    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
}

// Generate location-specific pages if they don't exist
function generateLocationPages() {
  const locationPages = [];

  // Main city pages
  locationPages.push('/locations/brisbane');
  locationPages.push('/locations/ipswich');
  locationPages.push('/locations/logan');

  // Suburb pages
  for (const [city, suburbs] of Object.entries(PRIMARY_LOCATIONS)) {
    suburbs.forEach(suburb => {
      const suburpSlug = suburb.toLowerCase().replace(/\s+/g, '-');
      locationPages.push(`/locations/${city}/${suburpSlug}`);

      // Service-specific suburb pages
      ['water-damage', 'fire-damage', 'mould-remediation', 'storm-damage'].forEach(service => {
        locationPages.push(`/locations/${city}/${suburpSlug}/${service}`);
      });
    });
  }

  return locationPages;
}

// Main execution
console.log('🗺️ Generating comprehensive local SEO sitemap...\n');

const appDir = path.join(process.cwd(), 'app');
const existingPages = findPages(appDir);

// Add location pages
const locationPages = generateLocationPages();

// Combine and deduplicate
const allPages = [...new Set([...existingPages, ...locationPages])];

// Filter and prepare pages
const sitemapPages = allPages
  .filter(url => !url.includes('[') && !url.includes(']')) // Remove dynamic routes
  .filter(url => !url.includes('error') && !url.includes('loading')) // Remove error/loading pages
  .map(url => ({
    url: url,
    lastmod: TODAY,
    changefreq: getChangeFreq(url),
    priority: calculatePriority(url)
  }))
  .sort((a, b) => b.priority - a.priority); // Sort by priority

// Generate XML sitemap
const xmlContent = generateXMLSitemap(sitemapPages);
const xmlPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(xmlPath, xmlContent, 'utf8');

// Generate text sitemap
const txtContent = sitemapPages
  .map(page => `${SITE_URL}${page.url}`)
  .join('\n');
const txtPath = path.join(process.cwd(), 'public', 'sitemap.txt');
fs.writeFileSync(txtPath, txtContent, 'utf8');

// Generate sitemap index if needed (for large sites)
if (sitemapPages.length > 1000) {
  const PAGES_PER_SITEMAP = 1000;
  const numSitemaps = Math.ceil(sitemapPages.length / PAGES_PER_SITEMAP);

  let indexXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  indexXml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (let i = 0; i < numSitemaps; i++) {
    const sitemapName = `sitemap-${i + 1}.xml`;
    const sitemapChunk = sitemapPages.slice(i * PAGES_PER_SITEMAP, (i + 1) * PAGES_PER_SITEMAP);

    // Write individual sitemap
    const chunkXml = generateXMLSitemap(sitemapChunk);
    fs.writeFileSync(path.join(process.cwd(), 'public', sitemapName), chunkXml, 'utf8');

    // Add to index
    indexXml += '  <sitemap>\n';
    indexXml += `    <loc>${SITE_URL}/${sitemapName}</loc>\n`;
    indexXml += `    <lastmod>${TODAY}</lastmod>\n`;
    indexXml += '  </sitemap>\n';
  }

  indexXml += '</sitemapindex>';
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap-index.xml'), indexXml, 'utf8');
  console.log(`✅ Generated sitemap index with ${numSitemaps} sitemaps`);
}

// Statistics
console.log(`✅ XML Sitemap generated at: ${xmlPath}`);
console.log(`✅ TXT Sitemap generated at: ${txtPath}`);
console.log(`\n📊 Statistics:`);
console.log(`   Total pages: ${sitemapPages.length}`);
console.log(`   High priority (>0.8): ${sitemapPages.filter(p => p.priority > 0.8).length}`);
console.log(`   Brisbane pages: ${sitemapPages.filter(p => p.url.includes('brisbane')).length}`);
console.log(`   Ipswich pages: ${sitemapPages.filter(p => p.url.includes('ipswich')).length}`);
console.log(`   Logan pages: ${sitemapPages.filter(p => p.url.includes('logan')).length}`);
console.log(`   Service pages: ${sitemapPages.filter(p => p.url.includes('/services')).length}`);
console.log(`\n🎯 Top 10 Priority Pages:`);

sitemapPages.slice(0, 10).forEach((page, index) => {
  console.log(`   ${index + 1}. [${page.priority.toFixed(1)}] ${page.url}`);
});