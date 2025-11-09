import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EMERGENCY Fire Damage Brisbane | 60-Min Response | Call 1300 309 361',
  description: 'URGENT fire & smoke damage Brisbane. IICRC Master Restorer on-site in 60 minutes. 24/7/365. Call 1300 309 361 NOW.',
  keywords: 'emergency fire damage Brisbane, 24/7 fire restoration Brisbane, urgent smoke damage, after hours fire damage Brisbane, emergency soot removal, immediate fire damage help, kitchen fire emergency Brisbane, electrical fire emergency, weekend fire damage, fire emergency response',
  openGraph: {
    title: 'EMERGENCY Fire Damage Brisbane | 60-Min Response | Call 1300 309 361',
    description: 'URGENT fire & smoke damage Brisbane. IICRC Master Restorer on-site in 60 minutes. 24/7/365. Call 1300 309 361 NOW.',
    url: 'https://disasterrecovery.com.au/emergency/fire-damage-brisbane',
    type: 'website',
    images: [{
      url: '/logos/3D-Disaster-Recovery-Logo.png',
      width: 1200,
      height: 630,
      alt: 'EMERGENCY Fire Damage Brisbane - IICRC Master Restorer - 24/7 Response'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EMERGENCY Fire Damage Brisbane | 60-Min Response | Call 1300 309 361',
    description: 'URGENT fire & smoke damage Brisbane. IICRC Master Restorer on-site in 60 minutes. 24/7/365. Call NOW.',
    images: ['/logos/3D-Disaster-Recovery-Logo.png']
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/emergency/fire-damage-brisbane'
  }
};

export default function EmergencyFireDamageBrisbaneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
