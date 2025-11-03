import { Metadata } from 'next';
import LocationPageTemplate from '@/components/location/LocationPageTemplate';
import { suburbData } from '@/lib/location-data';

const suburb = suburbData['kangaroo-point'];

export const metadata: Metadata = {
  title: `${suburb.name} Disaster Recovery | Water Damage | Fire Restoration`,
  description: `24/7 emergency disaster recovery in ${suburb.name}. 1-hour response guarantee. IICRC certified. Insurance approved. Call 1300 309 361 now.`,
  keywords: [
    `disaster recovery ${suburb.name}`,
    `water damage ${suburb.name}`,
    `fire restoration ${suburb.name}`,
    `mould removal ${suburb.name}`,
    `emergency restoration ${suburb.name}`,
    `flood damage ${suburb.name}`,
    `${suburb.name} restoration services`,
    'IICRC certified',
    'insurance approved'
  ],
  alternates: {
    canonical: `https://disasterrecovery.com.au/locations/${suburb.slug}`,
    languages: {
      'en-AU': `https://disasterrecovery.com.au/locations/${suburb.slug}`,
    },
  },
  openGraph: {
    title: `${suburb.name} Disaster Recovery | Water Damage | Fire Restoration`,
    description: `24/7 emergency disaster recovery in ${suburb.name}. 1-hour response guarantee. IICRC certified. Insurance approved. Call 1300 309 361 now.`,
    url: `https://disasterrecovery.com.au/locations/${suburb.slug}`,
    siteName: 'Disaster Recovery',
    images: [
      {
        url: 'https://disasterrecovery.com.au/images/hero/disaster-recovery-services.jpg',
        width: 1200,
        height: 630,
        alt: `Disaster Recovery Services in ${suburb.name}`,
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${suburb.name} Disaster Recovery | 24/7 Emergency Response`,
    description: `Professional disaster recovery services in ${suburb.name}. Water damage, fire restoration, mould remediation. Call 1300 309 361.`,
    images: ['https://disasterrecovery.com.au/images/hero/disaster-recovery-services.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function KangarooPointDisasterRecoveryPage() {
  return <LocationPageTemplate suburb={suburb} />;
}