import { NextResponse } from 'next/server';

interface SitemapUrl {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export async function GET() {
  const baseUrl = 'https://disasterrecovery.com.au';
  const currentDate = new Date().toISOString();

  // Core pages with high priority
  const staticPages: SitemapUrl[] = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9
    }
  ];

  // Service pages - High priority for SEO
  const servicePages: SitemapUrl[] = [
    {
      url: `${baseUrl}/services/water-damage-restoration`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95
    },
    {
      url: `${baseUrl}/services/fire-damage-restoration`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95
    },
    {
      url: `${baseUrl}/services/mould-remediation`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95
    },
    {
      url: `${baseUrl}/services/storm-damage`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/services/biohazard-cleaning`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85
    }
  ];

  // Location pages - Essential for local SEO
  const locationPages: SitemapUrl[] = [
    {
      url: `${baseUrl}/locations/brisbane`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95
    },
    {
      url: `${baseUrl}/locations/ipswich`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95
    },
    {
      url: `${baseUrl}/locations/logan`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95
    },
    {
      url: `${baseUrl}/locations/wacol`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/locations/gold-coast`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ];

  // Combine all pages
  const allPages = [...staticPages, ...servicePages, ...locationPages];

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
    },
  });
}