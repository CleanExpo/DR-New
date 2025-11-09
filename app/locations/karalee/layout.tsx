import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emergency Restoration Karalee Ipswich | IICRC Master Restorer',
  description: '24/7 emergency restoration in Karalee. Phill McGurk - IICRC Master Restorer. Water, fire, mould damage. 60-min response. 1300 309 361.',
  keywords: 'emergency restoration Karalee, water damage Karalee, fire damage Karalee Ipswich, mould removal Karalee, Karalee disaster recovery, IICRC Master Restorer Karalee, 60 minute response Karalee, 24/7 emergency Karalee, insurance approved Karalee, flood damage Karalee',
  openGraph: {
    title: 'Emergency Restoration Karalee Ipswich | IICRC Master Restorer',
    description: '24/7 emergency restoration in Karalee. Phill McGurk - IICRC Master Restorer. Water, fire, mould damage. 60-min response. 1300 309 361.',
    url: 'https://disasterrecovery.com.au/locations/karalee',
    type: 'website',
    images: [{
      url: '/logos/3D-Disaster-Recovery-Logo.png',
      width: 1200,
      height: 630,
      alt: 'Emergency Restoration Karalee Ipswich - IICRC Master Restorer'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emergency Restoration Karalee Ipswich | IICRC Master Restorer',
    description: '24/7 emergency restoration Karalee. Phill McGurk - IICRC Master Restorer. 60-min response. Call 1300 309 361.',
    images: ['/logos/3D-Disaster-Recovery-Logo.png']
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/karalee'
  }
};

export default function KaraleeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
