import { Metadata } from 'next';
import LocationPageTemplate from '@/components/location/LocationPageTemplate';
import { suburbData } from '@/lib/location-data';

const suburb = suburbData['mt-gravatt'];

export const metadata: Metadata = {
  title: `${suburb.name} Disaster Recovery | Elevated Property Storm Damage Experts`,
  description: `Expert disaster recovery for ${suburb.name}'s elevated properties. Storm damage, wind damage, hillside drainage. 22-30 min response. Master Restorer certified. Call 1300 309 361.`,
  keywords: [
    `disaster recovery ${suburb.name}`,
    `storm damage ${suburb.name}`,
    `water damage ${suburb.name}`,
    `elevated property restoration ${suburb.name}`,
    `wind damage ${suburb.name}`,
    `${suburb.name} emergency restoration`,
    `Mt Gravatt bushfire smoke damage`,
    'Master Restorer Brisbane',
    'elevated home specialists',
    'Griffith University restoration'
  ],
  alternates: {
    canonical: `https://dr-new-ten.vercel.app/locations/${suburb.slug}`,
    languages: {
      'en-AU': `https://dr-new-ten.vercel.app/locations/${suburb.slug}`,
    },
  },
  openGraph: {
    title: `${suburb.name} Disaster Recovery | Elevated Property Specialists`,
    description: `Expert elevated property restoration in ${suburb.name}. Storm damage, wind damage, hillside drainage. 22-30 minute response time. Call 1300 309 361.`,
    url: `https://dr-new-ten.vercel.app/locations/${suburb.slug}`,
    siteName: 'Disaster Recovery Brisbane',
    images: [
      {
        url: 'https://dr-new-ten.vercel.app/images/hero/disaster-recovery-services.jpg',
        width: 1200,
        height: 630,
        alt: `Elevated Property Disaster Recovery Services in ${suburb.name}`,
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${suburb.name} Disaster Recovery | 24/7 Storm Damage Response`,
    description: `Professional elevated property restoration in ${suburb.name}. Storm damage, wind damage, bushfire smoke. Master Restorer. Call 1300 309 361.`,
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

export default function MtGravattDisasterRecoveryPage() {
  return <LocationPageTemplate suburb={suburb} />;
}
