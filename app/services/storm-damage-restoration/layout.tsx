import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Brisbane | IICRC Master Restorer | 60-Min Response',
  description: 'IICRC Master Restorer Phill McGurk provides 24/7 storm damage restoration in Brisbane, Ipswich, Logan. Insurance approved. 60-minute response. Call 1300 309 361.',
  keywords: 'storm damage restoration Brisbane, emergency storm repairs Brisbane, roof tarping Brisbane, wind damage repair, hail damage Brisbane, storm damage Ipswich, cyclone damage restoration, tree damage cleanup Brisbane, storm emergency response, insurance storm claims',
  openGraph: {
    title: 'Storm Damage Restoration Brisbane | IICRC Master Restorer | 60-Min Response',
    description: 'IICRC Master Restorer Phill McGurk provides 24/7 storm damage restoration in Brisbane, Ipswich, Logan. Insurance approved. 60-minute response. Call 1300 309 361.',
    url: 'https://disasterrecovery.com.au/services/storm-damage-restoration',
    type: 'website',
    images: [{
      url: '/logos/3D-Disaster-Recovery-Logo.png',
      width: 1200,
      height: 630,
      alt: 'Storm Damage Restoration Brisbane - IICRC Master Restorer'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Storm Damage Restoration Brisbane | IICRC Master Restorer | 60-Min Response',
    description: 'IICRC Master Restorer. 24/7 storm damage restoration Brisbane. 60-min response. Insurance approved. Call 1300 309 361.',
    images: ['/logos/3D-Disaster-Recovery-Logo.png']
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage-restoration'
  }
};

export default function StormDamageRestorationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
