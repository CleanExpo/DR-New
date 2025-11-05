import type { Metadata } from 'next';
import { generateServiceSEO } from '@/lib/seo';
import SewageCleanupClient from './SewageCleanupClient';

// SEO Metadata - Local Brisbane, Ipswich, Logan focus
export const metadata: Metadata = generateServiceSEO({
  serviceName: 'Sewage Cleanup',
  location: 'Brisbane, Ipswich & Logan',
  title: 'Sewage Cleanup Brisbane, Ipswich & Logan | Emergency Contamination',
  description: 'Emergency sewage cleanup in Brisbane, Ipswich, Logan. Category 3 water damage, contamination removal. Phill McGurk - IICRC Master Restorer, RAI Master Restorer, Xactimate Master, Hazmat Licensed, Asbestos Assessor.',
  keywords: [
    'sewage cleanup Brisbane',
    'sewage removal Ipswich',
    'category 3 water damage Logan',
    'contaminated water cleanup Brisbane',
    'sewage backup Ipswich',
    'blackwater cleanup Logan'
  ],
  url: 'https://dr-new-ten.vercel.app/services/biohazard-cleaning/sewage-cleanup',
  image: '/images/sewage-cleanup.jpg',
  responseTime: '1-hour',
  certified: true
});

export default function SewageCleanupPage() {
  return <SewageCleanupClient />;
}
