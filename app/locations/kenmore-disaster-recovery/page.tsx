import { Metadata } from 'next';
import LocationPageTemplate from '@/components/location/LocationPageTemplate';
import { suburbData } from '@/lib/location-data';

const suburb = suburbData['kenmore'];

export const metadata: Metadata = {
  title: `${suburb.name} Disaster Recovery | Hillside Water Damage Specialists`,
  description: `Expert disaster recovery for ${suburb.name}'s hillside properties. Retaining wall failures, slope drainage, storm damage. 12-18 min response. Master Restorer certified. Call 1300 309 361.`,
  keywords: [
    `disaster recovery ${suburb.name}`,
    `water damage ${suburb.name}`,
    `hillside property restoration ${suburb.name}`,
    `retaining wall water damage ${suburb.name}`,
    `storm damage ${suburb.name}`,
    `${suburb.name} slope drainage`,
    `emergency restoration ${suburb.name}`,
    'Master Restorer Brisbane',
    'hillside water management',
    'slope subsidence repair'
  ],
  alternates: {
    canonical: `https://dr-new-ten.vercel.app/locations/${suburb.slug}`,
    languages: {
      'en-AU': `https://dr-new-ten.vercel.app/locations/${suburb.slug}`,
    },
  },
  openGraph: {
    title: `${suburb.name} Disaster Recovery | Hillside Property Specialists`,
    description: `Expert hillside property restoration in ${suburb.name}. Retaining wall failures, water runoff, storm damage. 12-18 minute response time. Call 1300 309 361.`,
    url: `https://dr-new-ten.vercel.app/locations/${suburb.slug}`,
    siteName: 'Disaster Recovery Brisbane',
    images: [
      {
        url: 'https://dr-new-ten.vercel.app/images/hero/disaster-recovery-services.jpg',
        width: 1200,
        height: 630,
        alt: `Hillside Disaster Recovery Services in ${suburb.name}`,
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${suburb.name} Disaster Recovery | 24/7 Hillside Specialists`,
    description: `Professional hillside property restoration in ${suburb.name}. Retaining walls, slope drainage, storm damage. Master Restorer. Call 1300 309 361.`,
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

export default function KenmoreDisasterRecoveryPage() {
  return <LocationPageTemplate suburb={suburb} />;
}
