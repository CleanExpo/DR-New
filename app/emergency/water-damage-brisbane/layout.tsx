import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EMERGENCY Water Damage Brisbane | 60-Min Response | Call 1300 309 361',
  description: 'URGENT water damage Brisbane. IICRC Master Restorer on-site in 60 minutes. 24/7/365. Call 1300 309 361 NOW.',
  keywords: 'emergency water damage Brisbane, 24/7 water extraction Brisbane, urgent water damage, after hours water damage Brisbane, emergency flood response, immediate water damage help, burst pipe emergency Brisbane, flooding emergency Brisbane, weekend water damage, public holiday water damage',
  openGraph: {
    title: 'EMERGENCY Water Damage Brisbane | 60-Min Response | Call 1300 309 361',
    description: 'URGENT water damage Brisbane. IICRC Master Restorer on-site in 60 minutes. 24/7/365. Call 1300 309 361 NOW.',
    url: 'https://disasterrecovery.com.au/emergency/water-damage-brisbane',
    type: 'website',
    images: [{
      url: '/logos/3D-Disaster-Recovery-Logo.png',
      width: 1200,
      height: 630,
      alt: 'EMERGENCY Water Damage Brisbane - IICRC Master Restorer - 24/7 Response'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EMERGENCY Water Damage Brisbane | 60-Min Response | Call 1300 309 361',
    description: 'URGENT water damage Brisbane. IICRC Master Restorer on-site in 60 minutes. 24/7/365. Call NOW.',
    images: ['/logos/3D-Disaster-Recovery-Logo.png']
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/emergency/water-damage-brisbane'
  }
};

export default function EmergencyWaterDamageBrisbaneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
