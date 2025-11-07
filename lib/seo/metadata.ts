import type { Metadata } from 'next';

// Core SEO configuration for Brisbane, Ipswich, Logan targeting
export const siteConfig = {
  name: 'Disaster Recovery Brisbane',
  url: 'https://disasterrecovery.com.au',
  phone: '1300 309 361',
  address: '4/17 Tile St, Wacol, QLD 4076',
  businessHours: '24/7 Emergency Service',
  masterRestorer: 'Phill McGurk',
  certifications: ['IICRC Master Restorer', 'RAI Certified'],
  serviceAreas: {
    primary: ['Brisbane', 'Ipswich', 'Logan'],
    suburbs: {
      brisbane: ['Hamilton', 'Ascot', 'New Farm', 'Toowong', 'CBD', 'Fortitude Valley', 'Milton', 'West End', 'Paddington', 'Bulimba'],
      ipswich: ['Karalee', 'Brookwater', 'Springfield Lakes', 'Ipswich CBD', 'Redbank Plains', 'Goodna', 'Booval'],
      logan: ['Logan Central', 'Springwood', 'Shailer Park', 'Meadowbrook', 'Beenleigh', 'Waterford']
    }
  }
};

// SEO-optimized page metadata generator
export function generatePageMetadata(
  title: string,
  description: string,
  keywords?: string[],
  path?: string
): Metadata {
  const fullTitle = `${title} | ${siteConfig.name} | Master Restorer`;
  const url = path ? `${siteConfig.url}${path}` : siteConfig.url;

  return {
    title: fullTitle,
    description,
    keywords: keywords?.join(', '),
    alternates: {
      canonical: url
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
      locale: 'en_AU',
      images: [{
        url: '/images/disaster-recovery-og.jpg',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Emergency Restoration Services`
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/images/disaster-recovery-twitter.jpg']
    }
  };
}

// Location-specific metadata generator
export function generateLocationMetadata(location: string, service?: string): Metadata {
  const serviceText = service || 'Emergency Restoration';
  const title = `${serviceText} ${location} | 24/7 Response`;
  const description = `Professional ${serviceText.toLowerCase()} services in ${location}. ${siteConfig.masterRestorer}, Master Restorer. 60-minute emergency response. Insurance approved. Call ${siteConfig.phone}`;

  return generatePageMetadata(
    title,
    description,
    [
      `${serviceText} ${location}`,
      `emergency restoration ${location}`,
      `water damage ${location}`,
      `fire damage ${location}`,
      `mould removal ${location}`,
      `disaster recovery ${location}`,
      'Master Restorer',
      'IICRC certified',
      '24/7 emergency',
      'insurance approved'
    ]
  );
}

// Service-specific metadata generator
export function generateServiceMetadata(
  service: string,
  shortDescription: string,
  keywords: string[]
): Metadata {
  const locations = siteConfig.serviceAreas.primary.join(', ');
  const title = `${service} | Brisbane, Ipswich & Logan`;
  const description = `${shortDescription} Master Restorer ${siteConfig.masterRestorer} provides 24/7 ${service.toLowerCase()} across ${locations}. Insurance approved. Call ${siteConfig.phone}`;

  return generatePageMetadata(
    title,
    description,
    [
      ...keywords,
      ...siteConfig.serviceAreas.primary.map(area => `${service} ${area}`),
      'Master Restorer Brisbane',
      'IICRC certified Queensland',
      '24 hour emergency service',
      'insurance restoration specialist'
    ]
  );
}