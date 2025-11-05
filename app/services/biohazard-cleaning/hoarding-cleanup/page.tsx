import type { Metadata } from 'next';
import HoardingCleanupClient from './HoardingCleanupClient';

// SEO Metadata - Local Brisbane, Ipswich, Logan focus
export const metadata: Metadata = {
  title: 'Hoarding Cleanup Brisbane, Ipswich & Logan | Compassionate Service',
  description: 'Professional hoarding cleanup in Brisbane, Ipswich, Logan. Compassionate, discreet extreme cleaning. Phill McGurk - IICRC Master Restorer.',
  keywords: 'hoarding cleanup Brisbane, hoarder house cleaning Ipswich, extreme cleaning Logan, hoarding remediation Brisbane, compassionate hoarding cleanup Ipswich, professional decluttering Logan',
  openGraph: {
    title: 'Hoarding Cleanup Brisbane | Compassionate Professional Service',
    description: 'Discreet hoarding cleanup Brisbane, Ipswich, Logan. Professional extreme cleaning, odour removal, restoration. Compassionate certified service.',
    images: [{ url: '/images/hoarding-cleanup.jpg', width: 1200, height: 630, alt: 'Hoarding Cleanup Brisbane' }],
    type: 'website',
    siteName: 'Disaster Recovery Brisbane',
    locale: 'en_AU'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hoarding Cleanup Brisbane | Discreet Service',
    description: 'Professional hoarding cleanup Brisbane, Ipswich, Logan. Compassionate, certified, discreet. Phill McGurk - IICRC Master Restorer.',
    images: ['/images/hoarding-cleanup.jpg']
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/services/biohazard-cleaning/hoarding-cleanup'
  }
};

export default function HoardingCleanupServicesPage() {
  return <HoardingCleanupClient />;
}
