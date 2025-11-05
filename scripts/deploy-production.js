#!/usr/bin/env node

/**
 * Production Deployment Script for disasterrecovery.com.au
 * This script prepares all optimized pages for the live website
 */

const fs = require('fs');
const path = require('path');

const PRODUCTION_URL = 'https://www.disasterrecovery.com.au';

// Update all internal links to use production URL
function updateProductionUrls() {
  console.log('🔄 Updating URLs for production...');

  const filesToUpdate = [
    'public/sitemap.xml',
    'public/sitemap.txt',
    'public/robots.txt',
  ];

  filesToUpdate.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      // Replace Vercel URLs with production URL
      content = content.replace(/https:\/\/disaster-recovery-seven\.vercel\.app/g, PRODUCTION_URL);
      content = content.replace(/https:\/\/disaster-recovery-git-[\w-]+\.vercel\.app/g, PRODUCTION_URL);
      fs.writeFileSync(filePath, content);
      console.log(`✅ Updated ${file}`);
    }
  });
}

// Generate production sitemap with all pages
function generateProductionSitemap() {
  console.log('📍 Generating production sitemap...');

  const pages = [
    // Core pages
    { url: '', priority: 1.0, changefreq: 'daily' },
    { url: '/about', priority: 0.9, changefreq: 'weekly' },
    { url: '/about', priority: 0.95, changefreq: 'weekly' },
    { url: '/contact', priority: 0.9, changefreq: 'monthly' },
    { url: '/services', priority: 0.95, changefreq: 'weekly' },

    // Service pages
    { url: '/services/water-damage', priority: 0.95, changefreq: 'weekly' },
    { url: '/services/fire-damage', priority: 0.95, changefreq: 'weekly' },
    { url: '/services/mould-remediation', priority: 0.95, changefreq: 'weekly' },
    { url: '/services/storm-damage', priority: 0.95, changefreq: 'weekly' },
    { url: '/services/biohazard', priority: 0.9, changefreq: 'weekly' },
    { url: '/services/commercial', priority: 0.95, changefreq: 'weekly' },
    { url: '/services/sewage-cleanup', priority: 0.9, changefreq: 'weekly' },
    { url: '/services/trauma-cleaning', priority: 0.9, changefreq: 'weekly' },

    // Emergency pages
    { url: '/emergency/after-hours-restoration', priority: 0.95, changefreq: 'weekly' },
    { url: '/emergency/sunday-water-damage-brisbane', priority: 0.9, changefreq: 'weekly' },

    // Guide pages
    { url: '/guides/water-damage-restoration-brisbane', priority: 0.85, changefreq: 'weekly' },
  ];

  // Brisbane locations
  const brisbaneSuburbs = [
    'hamilton', 'ascot', 'new-farm', 'bulimba', 'hawthorne',
    'morningside', 'balmoral', 'cannon-hill', 'murarrie',
    'tingalpa', 'wynnum', 'carina', 'camp-hill', 'seven-hills', 'norman-park'
  ];

  // Ipswich locations
  const ipswichSuburbs = [
    'karalee', 'brookwater', 'springfield-lakes', 'springfield',
    'augustine-heights', 'bellbird-park', 'redbank-plains',
    'goodna', 'camira', 'booval', 'bundamba', 'raceview', 'forest-lake'
  ];

  // Logan locations
  const loganSuburbs = [
    'springwood', 'shailer-park', 'daisy-hill', 'rochedale',
    'underwood', 'eight-mile-plains', 'slacks-creek',
    'meadowbrook', 'loganholme', 'tanah-merah', 'waterford',
    'beenleigh', 'eagleby'
  ];

  // Add main location pages
  pages.push({ url: '/locations/brisbane', priority: 0.95, changefreq: 'weekly' });
  pages.push({ url: '/locations/ipswich', priority: 0.95, changefreq: 'weekly' });
  pages.push({ url: '/locations/logan', priority: 0.95, changefreq: 'weekly' });

  // Add suburb pages
  brisbaneSuburbs.forEach(suburb => {
    pages.push({ url: `/locations/brisbane/${suburb}`, priority: 0.9, changefreq: 'weekly' });

    // Add service-specific pages for premium suburbs
    if (['hamilton', 'ascot', 'new-farm', 'bulimba', 'hawthorne'].includes(suburb)) {
      pages.push({ url: `/locations/brisbane/${suburb}/water-damage`, priority: 0.85, changefreq: 'weekly' });
      pages.push({ url: `/locations/brisbane/${suburb}/fire-damage`, priority: 0.85, changefreq: 'weekly' });
      pages.push({ url: `/locations/brisbane/${suburb}/mould-remediation`, priority: 0.85, changefreq: 'weekly' });
      pages.push({ url: `/locations/brisbane/${suburb}/storm-damage`, priority: 0.85, changefreq: 'weekly' });
      pages.push({ url: `/locations/brisbane/${suburb}/commercial-restoration`, priority: 0.85, changefreq: 'weekly' });
    }
  });

  ipswichSuburbs.forEach(suburb => {
    pages.push({ url: `/locations/ipswich/${suburb}`, priority: 0.9, changefreq: 'weekly' });

    // Add service-specific pages for premium suburbs
    if (['karalee', 'brookwater', 'springfield-lakes', 'augustine-heights'].includes(suburb)) {
      pages.push({ url: `/locations/ipswich/${suburb}/water-damage`, priority: 0.85, changefreq: 'weekly' });
      pages.push({ url: `/locations/ipswich/${suburb}/fire-damage`, priority: 0.85, changefreq: 'weekly' });
      pages.push({ url: `/locations/ipswich/${suburb}/mould-remediation`, priority: 0.85, changefreq: 'weekly' });
      pages.push({ url: `/locations/ipswich/${suburb}/storm-damage`, priority: 0.85, changefreq: 'weekly' });
      pages.push({ url: `/locations/ipswich/${suburb}/commercial-restoration`, priority: 0.85, changefreq: 'weekly' });
    }
  });

  loganSuburbs.forEach(suburb => {
    pages.push({ url: `/locations/logan/${suburb}`, priority: 0.9, changefreq: 'weekly' });

    // Add service-specific pages for key suburbs
    if (['springwood', 'shailer-park', 'daisy-hill', 'rochedale'].includes(suburb)) {
      pages.push({ url: `/locations/logan/${suburb}/water-damage`, priority: 0.85, changefreq: 'weekly' });
      pages.push({ url: `/locations/logan/${suburb}/fire-damage`, priority: 0.85, changefreq: 'weekly' });
      pages.push({ url: `/locations/logan/${suburb}/mould-remediation`, priority: 0.85, changefreq: 'weekly' });
      pages.push({ url: `/locations/logan/${suburb}/storm-damage`, priority: 0.85, changefreq: 'weekly' });
      pages.push({ url: `/locations/logan/${suburb}/commercial-restoration`, priority: 0.85, changefreq: 'weekly' });
    }
  });

  // Generate XML sitemap
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${pages.map(page => `  <url>
    <loc>${PRODUCTION_URL}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Generate TXT sitemap
  const txtContent = pages.map(page => `${PRODUCTION_URL}${page.url}`).join('\n');

  // Write files
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), xmlContent);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.txt'), txtContent);

  console.log(`✅ Generated sitemap with ${pages.length} pages`);
}

// Generate production robots.txt
function generateRobotsTxt() {
  console.log('🤖 Generating production robots.txt...');

  const robotsContent = `# Robots.txt for ${PRODUCTION_URL}
# Generated: ${new Date().toISOString()}

# Allow all search engines
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /static/

# Google
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 0

# AI Crawlers - Allow for knowledge graph inclusion
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

# Sitemaps
Sitemap: ${PRODUCTION_URL}/sitemap.xml
Sitemap: ${PRODUCTION_URL}/sitemap.txt

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'robots.txt'), robotsContent);
  console.log('✅ Generated robots.txt');
}

// Main execution
async function deploy() {
  console.log('🚀 Starting production deployment preparation...');
  console.log(`📍 Target domain: ${PRODUCTION_URL}`);

  generateProductionSitemap();
  generateRobotsTxt();
  updateProductionUrls();

  console.log('\n✅ Production deployment preparation complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Run: npm run build');
  console.log('2. Deploy to your hosting provider');
  console.log('3. Update DNS if needed');
  console.log('4. Submit new sitemap to Google Search Console');
  console.log('5. Verify all pages are accessible');
}

// Run deployment
deploy().catch(console.error);