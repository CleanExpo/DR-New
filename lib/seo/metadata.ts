import type { Metadata } from 'next';

// Core SEO configuration for Brisbane, Ipswich, Logan targeting
export const siteConfig = {
  name: 'Disaster Recovery Brisbane',
  url: 'https://disasterrecovery.com.au',
  phone: '1300 309 361',
  address: '4/17 Tile St, Wacol, QLD 4076',
  businessHours: '24/7 Emergency Service',
  masterRestorer: 'Phill McGurk',
  certifications: ['IICRC Master Restorer'],
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
  const title = `${serviceText} ${location} Brisbane | IICRC Master Restorer`;
  const description = `24/7 emergency restoration in ${location}. Phill McGurk - IICRC Master Restorer. Water, fire, mould damage. 60-min response. ${siteConfig.phone}.`;

  return generatePageMetadata(
    title,
    description,
    [
      `${serviceText.toLowerCase()} ${location}`,
      `emergency restoration ${location}`,
      `water damage ${location}`,
      `fire damage ${location}`,
      `mould removal ${location}`,
      `${location} disaster recovery`,
      'IICRC Master Restorer Brisbane',
      'Phill McGurk restoration',
      '60 minute response',
      '24/7 emergency ${location}',
      'insurance approved ${location}'
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
  const title = `${service} Brisbane | IICRC Master Restorer | 60-Min Response`;
  const description = `IICRC Master Restorer Phill McGurk provides 24/7 ${service.toLowerCase()} in ${locations}. Insurance approved. 60-minute response. Call ${siteConfig.phone}.`;

  return generatePageMetadata(
    title,
    description,
    [
      ...keywords,
      ...siteConfig.serviceAreas.primary.map(area => `${service} ${area}`),
      'IICRC Master Restorer Brisbane',
      'Phill McGurk master restorer',
      '60 minute emergency response',
      '24/7 emergency service',
      'insurance approved restoration'
    ]
  );
}

// Emergency page metadata generator
export function generateEmergencyMetadata(
  service: string,
  location: string = 'Brisbane'
): Metadata {
  const title = `EMERGENCY ${service} ${location} | 60-Min Response | Call ${siteConfig.phone}`;
  const description = `URGENT ${service.toLowerCase()} ${location}. IICRC Master Restorer on-site in 60 minutes. 24/7/365. Call ${siteConfig.phone} NOW.`;

  return generatePageMetadata(
    title,
    description,
    [
      `emergency ${service.toLowerCase()} ${location}`,
      `24/7 ${service.toLowerCase()} ${location}`,
      `urgent ${service.toLowerCase()} ${location}`,
      `immediate ${service.toLowerCase()} response`,
      'IICRC Master Restorer emergency',
      '60 minute response time',
      'emergency restoration Brisbane',
      'after hours emergency service'
    ]
  );
}