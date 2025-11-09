import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Brisbane | IICRC Master Restorer | 60-Min Response',
  description: 'IICRC Master Restorer Phill McGurk provides 24/7 fire & smoke damage restoration in Brisbane, Ipswich, Logan. Insurance approved. 60-minute response. Call 1300 309 361.',
  keywords: 'fire damage restoration Brisbane, smoke damage cleanup Brisbane, fire restoration Ipswich, soot removal Brisbane, fire damage Logan, IICRC fire restoration, smoke odour removal, fire damage insurance claims, emergency fire restoration, thermal fogging Brisbane',
  openGraph: {
    title: 'Fire Damage Restoration Brisbane | IICRC Master Restorer | 60-Min Response',
    description: 'IICRC Master Restorer Phill McGurk provides 24/7 fire & smoke damage restoration in Brisbane, Ipswich, Logan. Insurance approved. 60-minute response. Call 1300 309 361.',
    url: 'https://disasterrecovery.com.au/services/fire-damage-restoration',
    type: 'website',
    images: [{
      url: '/logos/3D-Disaster-Recovery-Logo.png',
      width: 1200,
      height: 630,
      alt: 'Fire Damage Restoration Brisbane - IICRC Master Restorer'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fire Damage Restoration Brisbane | IICRC Master Restorer | 60-Min Response',
    description: 'IICRC Master Restorer. 24/7 fire & smoke damage restoration Brisbane. 60-min response. Insurance approved. Call 1300 309 361.',
    images: ['/logos/3D-Disaster-Recovery-Logo.png']
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/fire-damage-restoration'
  }
};

export default function FireDamageRestorationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
