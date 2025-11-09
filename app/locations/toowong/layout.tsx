import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emergency Restoration Toowong Brisbane | IICRC Master Restorer',
  description: '24/7 emergency restoration in Toowong. Phill McGurk - IICRC Master Restorer. Water, fire, mould damage. 60-min response. 1300 309 361.',
  keywords: 'emergency restoration Toowong, water damage Toowong, fire damage Toowong Brisbane, mould removal Toowong, Toowong disaster recovery, IICRC Master Restorer Toowong, 60 minute response Toowong, 24/7 emergency Toowong, insurance approved Toowong, flood damage Toowong',
  openGraph: {
    title: 'Emergency Restoration Toowong Brisbane | IICRC Master Restorer',
    description: '24/7 emergency restoration in Toowong. Phill McGurk - IICRC Master Restorer. Water, fire, mould damage. 60-min response. 1300 309 361.',
    url: 'https://disasterrecovery.com.au/locations/toowong',
    type: 'website',
    images: [{
      url: '/logos/3D-Disaster-Recovery-Logo.png',
      width: 1200,
      height: 630,
      alt: 'Emergency Restoration Toowong Brisbane - IICRC Master Restorer'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emergency Restoration Toowong Brisbane | IICRC Master Restorer',
    description: '24/7 emergency restoration Toowong. Phill McGurk - IICRC Master Restorer. 60-min response. Call 1300 309 361.',
    images: ['/logos/3D-Disaster-Recovery-Logo.png']
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/toowong'
  }
};

export default function ToowongLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
