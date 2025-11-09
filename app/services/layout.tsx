import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | IICRC Master Restorer Brisbane | Water Fire Mould Storm',
  description: 'Complete disaster recovery services by IICRC Master Restorer Phill McGurk. Water damage, fire damage, mould remediation, storm damage restoration. Brisbane, Ipswich, Logan. 24/7 emergency. Call 1300 309 361.',
  keywords: 'disaster recovery services Brisbane, water damage restoration, fire damage restoration, mould remediation, storm damage restoration, emergency restoration services, IICRC master restorer services, insurance restoration, 24/7 emergency services Brisbane',
  openGraph: {
    title: 'Services | IICRC Master Restorer Brisbane | Water Fire Mould Storm',
    description: 'Complete disaster recovery services by IICRC Master Restorer Phill McGurk. Water damage, fire damage, mould remediation, storm damage restoration. Brisbane, Ipswich, Logan. 24/7 emergency.',
    url: 'https://disasterrecovery.com.au/services',
    type: 'website',
    images: [{
      url: '/logos/3D-Disaster-Recovery-Logo.png',
      width: 1200,
      height: 630,
      alt: 'Disaster Recovery Services Brisbane - IICRC Master Restorer'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | IICRC Master Restorer Brisbane',
    description: 'Complete disaster recovery services. Water, fire, mould, storm damage. IICRC Master Restorer. Call 1300 309 361.',
    images: ['/logos/3D-Disaster-Recovery-Logo.png']
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services'
  }
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
