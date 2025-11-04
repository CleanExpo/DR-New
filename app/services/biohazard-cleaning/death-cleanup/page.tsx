import type { Metadata } from 'next';
import { generateServiceSEO } from '@/lib/seo';
import DeathCleanupClient from './DeathCleanupClient';

// SEO Metadata - Local Brisbane, Ipswich, Logan focus
export const metadata: Metadata = generateServiceSEO({
  serviceName: 'Death & Decomposition Cleanup',
  location: 'Brisbane, Ipswich & Logan',
  title: 'Death & Decomposition Cleanup Brisbane, Ipswich & Logan | 24/7 Service',
  description: 'Compassionate death cleanup in Brisbane, Ipswich, Logan. Unattended death, decomposition removal. IICRC certified. Master Restorer Phill McGurk.',
  keywords: [
    'death cleanup Brisbane',
    'decomposition cleanup Ipswich',
    'unattended death Logan',
    'deceased cleanup Brisbane',
    'body decomposition cleaning Ipswich',
    'compassionate death cleaning Logan'
  ],
  url: 'https://dr-new-ten.vercel.app/services/biohazard-cleaning/death-cleanup',
  image: '/images/death-cleanup.jpg',
  responseTime: '2-hour',
  certified: true
});

export default function DeathCleanupPage() {
  return <DeathCleanupClient />;
}
