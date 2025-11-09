import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mould Remediation Brisbane | IICRC Master Restorer | 60-Min Response',
  description: 'IICRC Master Restorer Phill McGurk provides 24/7 mould removal & remediation in Brisbane, Ipswich, Logan. Insurance approved. 60-minute response. Call 1300 309 361.',
  keywords: 'mould remediation Brisbane, black mould removal Brisbane, mould removal Ipswich, mould inspection Brisbane, IICRC mould remediation, bathroom mould removal, mould testing Brisbane, mould cleanup Logan, toxic mould removal, professional mould remediation',
  openGraph: {
    title: 'Mould Remediation Brisbane | IICRC Master Restorer | 60-Min Response',
    description: 'IICRC Master Restorer Phill McGurk provides 24/7 mould removal & remediation in Brisbane, Ipswich, Logan. Insurance approved. 60-minute response. Call 1300 309 361.',
    url: 'https://disasterrecovery.com.au/services/mould-remediation',
    type: 'website',
    images: [{
      url: '/logos/3D-Disaster-Recovery-Logo.png',
      width: 1200,
      height: 630,
      alt: 'Mould Remediation Brisbane - IICRC Master Restorer'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mould Remediation Brisbane | IICRC Master Restorer | 60-Min Response',
    description: 'IICRC Master Restorer. 24/7 mould removal & remediation Brisbane. 60-min response. Insurance approved. Call 1300 309 361.',
    images: ['/logos/3D-Disaster-Recovery-Logo.png']
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation'
  }
};

export default function MouldRemediationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
