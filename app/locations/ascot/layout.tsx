import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emergency Restoration Ascot Brisbane | IICRC Master Restorer',
  description: '24/7 emergency restoration in Ascot. Phill McGurk - IICRC Master Restorer. Water, fire, mould damage. 60-min response. 1300 309 361.',
  keywords: 'emergency restoration Ascot, water damage Ascot, fire damage Ascot Brisbane, mould removal Ascot, Ascot disaster recovery, IICRC Master Restorer Ascot, 60 minute response Ascot, 24/7 emergency Ascot, insurance approved Ascot, flood damage Ascot',
  openGraph: {
    title: 'Emergency Restoration Ascot Brisbane | IICRC Master Restorer',
    description: '24/7 emergency restoration in Ascot. Phill McGurk - IICRC Master Restorer. Water, fire, mould damage. 60-min response. 1300 309 361.',
    url: 'https://disasterrecovery.com.au/locations/ascot',
    type: 'website',
    images: [{
      url: '/logos/3D-Disaster-Recovery-Logo.png',
      width: 1200,
      height: 630,
      alt: 'Emergency Restoration Ascot Brisbane - IICRC Master Restorer'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emergency Restoration Ascot Brisbane | IICRC Master Restorer',
    description: '24/7 emergency restoration Ascot. Phill McGurk - IICRC Master Restorer. 60-min response. Call 1300 309 361.',
    images: ['/logos/3D-Disaster-Recovery-Logo.png']
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/ascot'
  }
};

export default function AscotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
