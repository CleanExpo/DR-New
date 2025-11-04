import { Metadata } from 'next';
import LocationPageTemplate from '@/components/location/LocationPageTemplate';
import { suburbData } from '@/lib/location-data';

const suburb = suburbData['manly'];

export const metadata: Metadata = {
  title: `${suburb.name} Disaster Recovery | Bayside Storm Surge & Coastal Flood Experts`,
  description: `Expert bayside disaster recovery in ${suburb.name}. Storm surge, coastal flooding, salt corrosion, king tide damage. 40-50 min response. Master Restorer certified. Call 1300 309 361.`,
  keywords: [
    `disaster recovery ${suburb.name}`,
    `storm surge ${suburb.name}`,
    `coastal flooding ${suburb.name}`,
    `water damage ${suburb.name}`,
    `salt corrosion remediation ${suburb.name}`,
    `${suburb.name} bayside restoration`,
    `king tide damage ${suburb.name}`,
    `Manly Harbour restoration`,
    'Master Restorer Brisbane',
    'bayside property specialists',
    'marina restoration'
  ],
  alternates: {
    canonical: `https://dr-new-ten.vercel.app/locations/${suburb.slug}`,
    languages: {
      'en-AU': `https://dr-new-ten.vercel.app/locations/${suburb.slug}`,
    },
  },
  openGraph: {
    title: `${suburb.name} Disaster Recovery | Bayside Property Specialists`,
    description: `Expert bayside property restoration in ${suburb.name}. Storm surge, coastal flooding, salt corrosion. 40-50 minute response time. Call 1300 309 361.`,
    url: `https://dr-new-ten.vercel.app/locations/${suburb.slug}`,
    siteName: 'Disaster Recovery Brisbane',
    images: [
      {
        url: 'https://dr-new-ten.vercel.app/images/hero/disaster-recovery-services.jpg',
        width: 1200,
        height: 630,
        alt: `Bayside Disaster Recovery Services in ${suburb.name}`,
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${suburb.name} Disaster Recovery | 24/7 Storm Surge Response`,
    description: `Professional bayside property restoration in ${suburb.name}. Storm surge, coastal floods, salt damage. Master Restorer. Call 1300 309 361.`,
    images: ['https://dr-new-ten.vercel.app/images/hero/disaster-recovery-services.jpg'],
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

export default function ManlyDisasterRecoveryPage() {
  return <LocationPageTemplate suburb={suburb} />;
}
