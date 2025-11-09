import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emergency Restoration Springfield Lakes | IICRC Master Restorer',
  description: '24/7 emergency restoration in Springfield Lakes. Phill McGurk - IICRC Master Restorer. Water, fire, mould damage. 60-min response. 1300 309 361.',
  keywords: 'emergency restoration Springfield Lakes, water damage Springfield Lakes, fire damage Springfield Lakes, mould removal Springfield Lakes, Springfield Lakes disaster recovery, IICRC Master Restorer Springfield Lakes, 60 minute response Springfield Lakes, 24/7 emergency Springfield Lakes, insurance approved Springfield Lakes, flood damage Springfield Lakes',
  openGraph: {
    title: 'Emergency Restoration Springfield Lakes | IICRC Master Restorer',
    description: '24/7 emergency restoration in Springfield Lakes. Phill McGurk - IICRC Master Restorer. Water, fire, mould damage. 60-min response. 1300 309 361.',
    url: 'https://disasterrecovery.com.au/locations/springfield-lakes',
    type: 'website',
    images: [{
      url: '/logos/3D-Disaster-Recovery-Logo.png',
      width: 1200,
      height: 630,
      alt: 'Emergency Restoration Springfield Lakes - IICRC Master Restorer'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emergency Restoration Springfield Lakes | IICRC Master Restorer',
    description: '24/7 emergency restoration Springfield Lakes. Phill McGurk - IICRC Master Restorer. 60-min response. Call 1300 309 361.',
    images: ['/logos/3D-Disaster-Recovery-Logo.png']
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/springfield-lakes'
  }
};

export default function SpringfieldLakesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
