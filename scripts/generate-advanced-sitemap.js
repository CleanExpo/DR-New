const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');

// Australian locations for comprehensive coverage
const LOCATIONS = {
  majorCities: [
    'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide',
    'Gold Coast', 'Newcastle', 'Canberra', 'Central Coast', 'Wollongong'
  ],
  regionalCenters: [
    'Geelong', 'Hobart', 'Townsville', 'Cairns', 'Darwin',
    'Toowoomba', 'Ballarat', 'Bendigo', 'Albury', 'Mackay'
  ],
  ruralTowns: [
    'Dubbo', 'Tamworth', 'Wagga Wagga', 'Bathurst', 'Orange',
    'Broken Hill', 'Mount Isa', 'Alice Springs', 'Broome', 'Coober Pedy'
  ]
};

const SERVICES = [
  'water-damage-restoration',
  'fire-damage-restoration',
  'mould-remediation',
  'storm-damage-repair',
  'flood-recovery',
  'sewage-cleanup',
  'biohazard-cleaning',
  'trauma-scene-cleaning',
  'vandalism-repair',
  'emergency-board-up'
];

const PROPERTY_TYPES = [
  'residential',
  'commercial',
  'industrial',
  'institutional'
];

class AdvancedSitemapGenerator {
  constructor() {
    this.baseUrl = 'https://disaster-recovery-seven.vercel.app';
    this.sitemaps = [];
    this.urlCount = 0;
  }

  async generate() {
    console.log('🗺️  Generating Advanced Sitemap System');
    console.log('=====================================\n');

    // Generate individual sitemaps
    await this.generateMainSitemap();
    await this.generateLocationsSitemap();
    await this.generateServicesSitemap();
    await this.generateImageSitemap();
    await this.generateVideoSitemap();
    await this.generateNewsSitemap();
    await this.generateSitemapIndex();

    console.log(`\n✅ Generated ${this.sitemaps.length} sitemaps with ${this.urlCount} total URLs`);
  }

  async generateMainSitemap() {
    const urls = [];

    // Core pages
    const corePages = [
      { loc: '/', priority: 1.0, changefreq: 'daily' },
      { loc: '/services', priority: 0.9, changefreq: 'weekly' },
      { loc: '/locations', priority: 0.9, changefreq: 'weekly' },
      { loc: '/about', priority: 0.8, changefreq: 'monthly' },
      { loc: '/contact', priority: 0.8, changefreq: 'monthly' },
      { loc: '/emergency', priority: 1.0, changefreq: 'always' },
      { loc: '/insurance-claims', priority: 0.9, changefreq: 'weekly' },
      { loc: '/contractor-network', priority: 0.8, changefreq: 'weekly' },
      { loc: '/certifications', priority: 0.7, changefreq: 'monthly' },
      { loc: '/resources', priority: 0.7, changefreq: 'weekly' }
    ];

    corePages.forEach(page => {
      urls.push(this.createUrlEntry(page));
    });

    // Service category pages
    SERVICES.forEach(service => {
      urls.push(this.createUrlEntry({
        loc: `/services/${service}`,
        priority: 0.8,
        changefreq: 'weekly'
      }));
    });

    const sitemap = this.createSitemap(urls);
    await fs.writeFile(
      path.join(process.cwd(), 'public', 'sitemap-main.xml'),
      sitemap
    );

    this.sitemaps.push('sitemap-main.xml');
    this.urlCount += urls.length;

    console.log(`✅ Main sitemap: ${urls.length} URLs`);
  }

  async generateLocationsSitemap() {
    const urls = [];
    let locationCount = 0;

    // Generate location-specific pages
    Object.entries(LOCATIONS).forEach(([category, cities]) => {
      cities.forEach(city => {
        // Main location page
        urls.push(this.createUrlEntry({
          loc: `/locations/${this.slugify(city)}`,
          priority: category === 'majorCities' ? 0.9 : 0.8,
          changefreq: 'weekly'
        }));

        // Location + Service combinations
        SERVICES.forEach(service => {
          urls.push(this.createUrlEntry({
            loc: `/locations/${this.slugify(city)}/${service}`,
            priority: category === 'majorCities' ? 0.8 : 0.7,
            changefreq: 'weekly'
          }));

          // Property type combinations
          PROPERTY_TYPES.forEach(propertyType => {
            urls.push(this.createUrlEntry({
              loc: `/locations/${this.slugify(city)}/${service}/${propertyType}`,
              priority: 0.7,
              changefreq: 'monthly'
            }));
          });
        });

        locationCount++;
      });
    });

    // Split into multiple sitemaps if too large
    const chunks = this.chunkArray(urls, 10000); // Max 10k URLs per sitemap

    for (let i = 0; i < chunks.length; i++) {
      const filename = `sitemap-locations-${i + 1}.xml`;
      const sitemap = this.createSitemap(chunks[i]);

      await fs.writeFile(
        path.join(process.cwd(), 'public', filename),
        sitemap
      );

      this.sitemaps.push(filename);
    }

    this.urlCount += urls.length;
    console.log(`✅ Location sitemaps: ${urls.length} URLs across ${chunks.length} files`);
  }

  async generateServicesSitemap() {
    const urls = [];

    // Service combination pages
    SERVICES.forEach(service => {
      PROPERTY_TYPES.forEach(propertyType => {
        urls.push(this.createUrlEntry({
          loc: `/services/${service}/${propertyType}`,
          priority: 0.8,
          changefreq: 'weekly'
        }));

        // Emergency variations
        urls.push(this.createUrlEntry({
          loc: `/services/${service}/${propertyType}/emergency`,
          priority: 0.9,
          changefreq: 'daily'
        }));

        // 24 hour variations
        urls.push(this.createUrlEntry({
          loc: `/services/${service}/${propertyType}/24-hour`,
          priority: 0.9,
          changefreq: 'daily'
        }));
      });
    });

    const sitemap = this.createSitemap(urls);
    await fs.writeFile(
      path.join(process.cwd(), 'public', 'sitemap-services.xml'),
      sitemap
    );

    this.sitemaps.push('sitemap-services.xml');
    this.urlCount += urls.length;

    console.log(`✅ Services sitemap: ${urls.length} URLs`);
  }

  async generateImageSitemap() {
    const images = await glob('public/images/**/*.{jpg,jpeg,png,webp,avif}', {
      cwd: process.cwd()
    });

    const imageEntries = images.map(imagePath => {
      const relativePath = imagePath.replace('public/', '');
      const title = path.basename(imagePath, path.extname(imagePath))
        .replace(/-/g, ' ')
        .replace(/_/g, ' ');

      return `
    <url>
      <loc>${this.baseUrl}/</loc>
      <image:image>
        <image:loc>${this.baseUrl}/${relativePath}</image:loc>
        <image:title>${this.escapeXml(title)}</image:title>
        <image:caption>Disaster Recovery Services - ${this.escapeXml(title)}</image:caption>
        <image:geo_location>Australia</image:geo_location>
      </image:image>
    </url>`;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${imageEntries.join('\n')}
</urlset>`;

    await fs.writeFile(
      path.join(process.cwd(), 'public', 'sitemap-images.xml'),
      sitemap
    );

    this.sitemaps.push('sitemap-images.xml');
    console.log(`✅ Image sitemap: ${images.length} images`);
  }

  async generateVideoSitemap() {
    // Video content for rich snippets
    const videos = [
      {
        loc: '/resources/water-damage-guide',
        title: 'Water Damage Restoration Process',
        description: 'Complete guide to professional water damage restoration',
        contentLoc: 'https://www.youtube.com/watch?v=example1',
        duration: 420
      },
      {
        loc: '/resources/mould-remediation-guide',
        title: 'Mould Remediation Best Practices',
        description: 'Professional mould removal and prevention techniques',
        contentLoc: 'https://www.youtube.com/watch?v=example2',
        duration: 360
      }
    ];

    const videoEntries = videos.map(video => `
    <url>
      <loc>${this.baseUrl}${video.loc}</loc>
      <video:video>
        <video:title>${this.escapeXml(video.title)}</video:title>
        <video:description>${this.escapeXml(video.description)}</video:description>
        <video:content_loc>${video.contentLoc}</video:content_loc>
        <video:duration>${video.duration}</video:duration>
        <video:family_friendly>yes</video:family_friendly>
        <video:live>no</video:live>
      </video:video>
    </url>`);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${videoEntries.join('\n')}
</urlset>`;

    await fs.writeFile(
      path.join(process.cwd(), 'public', 'sitemap-videos.xml'),
      sitemap
    );

    this.sitemaps.push('sitemap-videos.xml');
    console.log(`✅ Video sitemap: ${videos.length} videos`);
  }

  async generateNewsSitemap() {
    // News content for Google News
    const newsArticles = [
      {
        loc: '/news/brisbane-flood-recovery-update',
        title: 'Brisbane Flood Recovery Services Now Available 24/7',
        publicationDate: new Date().toISOString()
      },
      {
        loc: '/news/new-mould-remediation-technology',
        title: 'Revolutionary Mould Remediation Technology Deployed Across Australia',
        publicationDate: new Date().toISOString()
      }
    ];

    const newsEntries = newsArticles.map(article => `
    <url>
      <loc>${this.baseUrl}${article.loc}</loc>
      <news:news>
        <news:publication>
          <news:name>Disaster Recovery Australia News</news:name>
          <news:language>en</news:language>
        </news:publication>
        <news:publication_date>${article.publicationDate}</news:publication_date>
        <news:title>${this.escapeXml(article.title)}</news:title>
      </news:news>
    </url>`);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${newsEntries.join('\n')}
</urlset>`;

    await fs.writeFile(
      path.join(process.cwd(), 'public', 'sitemap-news.xml'),
      sitemap
    );

    this.sitemaps.push('sitemap-news.xml');
    console.log(`✅ News sitemap: ${newsArticles.length} articles`);
  }

  async generateSitemapIndex() {
    const sitemapEntries = this.sitemaps.map(filename => `
    <sitemap>
      <loc>${this.baseUrl}/${filename}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>`);

    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapEntries.join('\n')}
</sitemapindex>`;

    await fs.writeFile(
      path.join(process.cwd(), 'public', 'sitemap-index.xml'),
      sitemapIndex
    );

    console.log(`\n✅ Sitemap index created with ${this.sitemaps.length} sitemaps`);
  }

  createUrlEntry({ loc, priority = 0.5, changefreq = 'weekly' }) {
    return `
    <url>
      <loc>${this.baseUrl}${loc}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>`;
  }

  createSitemap(urls) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${urls.join('\n')}
</urlset>`;
  }

  slugify(text) {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .trim();
  }

  escapeXml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}

// Run the generator
async function main() {
  const generator = new AdvancedSitemapGenerator();
  await generator.generate();

  console.log('\n📌 Next steps:');
  console.log('   1. Submit sitemap-index.xml to Google Search Console');
  console.log('   2. Submit to Bing Webmaster Tools');
  console.log('   3. Add sitemap URLs to robots.txt');
  console.log('   4. Monitor indexing status regularly');
}

main().catch(console.error);