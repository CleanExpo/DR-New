import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://disasterrecovery.com.au';

  // Define key images for sitemap
  const images = [
    {
      loc: `${baseUrl}/images/hero/landing-page-hero.png`,
      title: 'Disaster Recovery Brisbane - 24/7 Emergency Restoration Services',
      caption: 'Professional IICRC certified water damage, fire damage, and mould remediation services',
      geoLocation: 'Brisbane, Queensland, Australia'
    },
    {
      loc: `${baseUrl}/images/optimized/damage/3d-water-damage.webp`,
      title: 'Water Damage Restoration Equipment Brisbane',
      caption: 'Industrial water extraction and structural drying equipment',
      geoLocation: 'Brisbane, Queensland, Australia'
    },
    {
      loc: `${baseUrl}/images/optimized/damage/3d-fire-damage.webp`,
      title: 'Fire Damage Restoration Services',
      caption: 'Complete fire and smoke damage cleanup and restoration',
      geoLocation: 'Brisbane, Queensland, Australia'
    },
    {
      loc: `${baseUrl}/images/optimized/damage/3d-mould-damage.webp`,
      title: 'Mould Remediation IICRC S520 Certified',
      caption: 'Professional mould inspection, testing, and removal services',
      geoLocation: 'Brisbane, Queensland, Australia'
    },
    {
      loc: `${baseUrl}/images/optimized/equipment/3d-thermal-camera.webp`,
      title: 'FLIR Thermal Imaging Camera for Water Detection',
      caption: 'Advanced moisture detection and hidden water damage identification',
      geoLocation: 'Brisbane, Queensland, Australia'
    },
    {
      loc: `${baseUrl}/images/optimized/equipment/3d-dehumidifier.webp`,
      title: 'Industrial LGR Dehumidifier',
      caption: 'Professional structural drying equipment - 185 PPD capacity',
      geoLocation: 'Brisbane, Queensland, Australia'
    },
    {
      loc: `${baseUrl}/images/optimized/equipment/3d-extraction-unit.webp`,
      title: 'Truck-Mounted Water Extraction Unit',
      caption: 'High-powered water removal system - 40,000 gallons per day',
      geoLocation: 'Brisbane, Queensland, Australia'
    },
    {
      loc: `${baseUrl}/images/optimized/process/3d-assessment.webp`,
      title: 'Emergency Damage Assessment',
      caption: 'Rapid on-site evaluation and damage scope determination',
      geoLocation: 'Brisbane, Queensland, Australia'
    },
    {
      loc: `${baseUrl}/images/optimized/process/3d-drying-process.webp`,
      title: 'Structural Drying Process IICRC S500',
      caption: 'Scientific drying methodology with daily monitoring',
      geoLocation: 'Brisbane, Queensland, Australia'
    },
    {
      loc: `${baseUrl}/images/optimized/process/3d-restoration.webp`,
      title: 'Complete Property Restoration',
      caption: 'Full reconstruction to pre-loss condition',
      geoLocation: 'Brisbane, Queensland, Australia'
    }
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${images.map(image => `
  <url>
    <loc>${baseUrl}/</loc>
    <image:image>
      <image:loc>${image.loc}</image:loc>
      <image:title>${image.title}</image:title>
      <image:caption>${image.caption}</image:caption>
      <image:geo_location>${image.geoLocation}</image:geo_location>
    </image:image>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
}
