import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EMERGENCY Restoration Brisbane | 60-Min Response | Call 1300 309 361',
  description: 'URGENT disaster recovery Brisbane. IICRC Master Restorer on-site in 60 minutes. Water, fire, storm damage. 24/7/365. Call 1300 309 361 NOW.',
  keywords: 'emergency restoration Brisbane, 24/7 disaster recovery, urgent water damage, emergency fire damage, after hours restoration Brisbane, immediate emergency response, weekend emergency service, public holiday emergency, emergency restoration Ipswich, emergency restoration Logan',
  openGraph: {
    title: 'EMERGENCY Restoration Brisbane | 60-Min Response | Call 1300 309 361',
    description: 'URGENT disaster recovery Brisbane. IICRC Master Restorer on-site in 60 minutes. Water, fire, storm damage. 24/7/365. Call 1300 309 361 NOW.',
    url: 'https://disasterrecovery.com.au/emergency',
    type: 'website',
    images: [{
      url: '/logos/3D-Disaster-Recovery-Logo.png',
      width: 1200,
      height: 630,
      alt: 'EMERGENCY Restoration Brisbane - IICRC Master Restorer - 24/7 Response'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EMERGENCY Restoration Brisbane | 60-Min Response | Call 1300 309 361',
    description: 'URGENT disaster recovery Brisbane. IICRC Master Restorer on-site in 60 minutes. 24/7/365. Call NOW.',
    images: ['/logos/3D-Disaster-Recovery-Logo.png']
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/emergency'
  }
};

export default function EmergencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
