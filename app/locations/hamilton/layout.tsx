import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emergency Restoration Hamilton Brisbane | IICRC Master Restorer',
  description: '24/7 emergency restoration in Hamilton. Phill McGurk - IICRC Master Restorer. Water, fire, mould damage. 60-min response. 1300 309 361.',
  keywords: 'emergency restoration Hamilton, water damage Hamilton, fire damage Hamilton Brisbane, mould removal Hamilton, Hamilton disaster recovery, IICRC Master Restorer Hamilton, 60 minute response Hamilton, 24/7 emergency Hamilton, insurance approved Hamilton, flood damage Hamilton',
  openGraph: {
    title: 'Emergency Restoration Hamilton Brisbane | IICRC Master Restorer',
    description: '24/7 emergency restoration in Hamilton. Phill McGurk - IICRC Master Restorer. Water, fire, mould damage. 60-min response. 1300 309 361.',
    url: 'https://disasterrecovery.com.au/locations/hamilton',
    type: 'website',
    images: [{
      url: '/logos/3D-Disaster-Recovery-Logo.png',
      width: 1200,
      height: 630,
      alt: 'Emergency Restoration Hamilton Brisbane - IICRC Master Restorer'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emergency Restoration Hamilton Brisbane | IICRC Master Restorer',
    description: '24/7 emergency restoration Hamilton. Phill McGurk - IICRC Master Restorer. 60-min response. Call 1300 309 361.',
    images: ['/logos/3D-Disaster-Recovery-Logo.png']
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/hamilton'
  }
};

export default function HamiltonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
