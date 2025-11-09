import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emergency Restoration New Farm Brisbane | IICRC Master Restorer',
  description: '24/7 emergency restoration in New Farm. Phill McGurk - IICRC Master Restorer. Water, fire, mould damage. 60-min response. 1300 309 361.',
  keywords: 'emergency restoration New Farm, water damage New Farm, fire damage New Farm Brisbane, mould removal New Farm, New Farm disaster recovery, IICRC Master Restorer New Farm, 60 minute response New Farm, 24/7 emergency New Farm, insurance approved New Farm, flood damage New Farm',
  openGraph: {
    title: 'Emergency Restoration New Farm Brisbane | IICRC Master Restorer',
    description: '24/7 emergency restoration in New Farm. Phill McGurk - IICRC Master Restorer. Water, fire, mould damage. 60-min response. 1300 309 361.',
    url: 'https://disasterrecovery.com.au/locations/new-farm',
    type: 'website',
    images: [{
      url: '/logos/3D-Disaster-Recovery-Logo.png',
      width: 1200,
      height: 630,
      alt: 'Emergency Restoration New Farm Brisbane - IICRC Master Restorer'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emergency Restoration New Farm Brisbane | IICRC Master Restorer',
    description: '24/7 emergency restoration New Farm. Phill McGurk - IICRC Master Restorer. 60-min response. Call 1300 309 361.',
    images: ['/logos/3D-Disaster-Recovery-Logo.png']
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/new-farm'
  }
};

export default function NewFarmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
