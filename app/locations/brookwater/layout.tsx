import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emergency Restoration Brookwater Ipswich | IICRC Master Restorer',
  description: '24/7 emergency restoration in Brookwater. Phill McGurk - IICRC Master Restorer. Water, fire, mould damage. 60-min response. 1300 309 361.',
  keywords: 'emergency restoration Brookwater, water damage Brookwater, fire damage Brookwater Ipswich, mould removal Brookwater, Brookwater disaster recovery, IICRC Master Restorer Brookwater, 60 minute response Brookwater, 24/7 emergency Brookwater, insurance approved Brookwater, flood damage Brookwater',
  openGraph: {
    title: 'Emergency Restoration Brookwater Ipswich | IICRC Master Restorer',
    description: '24/7 emergency restoration in Brookwater. Phill McGurk - IICRC Master Restorer. Water, fire, mould damage. 60-min response. 1300 309 361.',
    url: 'https://disasterrecovery.com.au/locations/brookwater',
    type: 'website',
    images: [{
      url: '/logos/3D-Disaster-Recovery-Logo.png',
      width: 1200,
      height: 630,
      alt: 'Emergency Restoration Brookwater Ipswich - IICRC Master Restorer'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emergency Restoration Brookwater Ipswich | IICRC Master Restorer',
    description: '24/7 emergency restoration Brookwater. Phill McGurk - IICRC Master Restorer. 60-min response. Call 1300 309 361.',
    images: ['/logos/3D-Disaster-Recovery-Logo.png']
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/brookwater'
  }
};

export default function BrookwaterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
