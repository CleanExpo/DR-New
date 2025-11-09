import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Areas Brisbane, Ipswich, Logan | Emergency Restoration | 1300 309 361',
  description: 'IICRC Master Restorer Phill McGurk serves Brisbane, Ipswich, Logan & surrounding areas. 60-min emergency response for water, fire, mould, storm damage. 24/7 availability.',
  keywords: 'service areas Brisbane, emergency restoration Ipswich, water damage Logan, disaster recovery Brisbane suburbs, Hamilton restoration, Ascot emergency services, New Farm water damage, Toowong fire damage, Karalee mould remediation, Brookwater emergency response, Springfield Lakes disaster recovery',
  openGraph: {
    title: 'Service Areas Brisbane, Ipswich, Logan | IICRC Master Restorer',
    description: 'Phill McGurk - IICRC Master Restorer serving Brisbane, Ipswich, Logan. 60-minute emergency response time. 24/7 water, fire, mould & storm damage restoration.',
    type: 'website',
    url: 'https://dr-new-ten.vercel.app/locations',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Service Areas Brisbane, Ipswich, Logan | Emergency Restoration',
    description: 'IICRC Master Restorer Phill McGurk - 60-min response across Brisbane, Ipswich, Logan. 24/7 emergency restoration services.',
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/locations',
  },
};

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
