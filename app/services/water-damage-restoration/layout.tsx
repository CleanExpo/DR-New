import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Brisbane | IICRC Master Restorer | 60-Min Response',
  description: 'IICRC Master Restorer Phill McGurk provides 24/7 water damage restoration in Brisbane, Ipswich, Logan. Insurance approved. 60-minute response. Call 1300 309 361.',
  keywords: 'water damage restoration Brisbane, emergency water extraction Brisbane, flood damage restoration, burst pipe repair Brisbane, water damage Ipswich, water damage Logan, IICRC water restoration, structural drying Brisbane, 24/7 water damage, insurance water damage claims',
  openGraph: {
    title: 'Water Damage Restoration Brisbane | IICRC Master Restorer | 60-Min Response',
    description: 'IICRC Master Restorer Phill McGurk provides 24/7 water damage restoration in Brisbane, Ipswich, Logan. Insurance approved. 60-minute response. Call 1300 309 361.',
    url: 'https://disasterrecovery.com.au/services/water-damage-restoration',
    type: 'website',
    images: [{
      url: '/logos/3D-Disaster-Recovery-Logo.png',
      width: 1200,
      height: 630,
      alt: 'Water Damage Restoration Brisbane - IICRC Master Restorer'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Water Damage Restoration Brisbane | IICRC Master Restorer | 60-Min Response',
    description: 'IICRC Master Restorer. 24/7 water damage restoration Brisbane. 60-min response. Insurance approved. Call 1300 309 361.',
    images: ['/logos/3D-Disaster-Recovery-Logo.png']
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage-restoration'
  }
};

export default function WaterDamageRestorationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
