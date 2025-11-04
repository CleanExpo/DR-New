import type { Metadata } from 'next';
import { generateServiceSEO } from '@/lib/seo';
import MedicalWasteClient from './MedicalWasteClient';

// SEO Metadata - Local Brisbane, Ipswich, Logan focus
export const metadata: Metadata = generateServiceSEO({
  serviceName: 'Medical Waste Cleanup',
  location: 'Brisbane, Ipswich & Logan',
  title: 'Medical Waste Cleanup Brisbane, Ipswich & Logan | Safe Disposal',
  description: 'Professional medical waste cleanup in Brisbane, Ipswich, Logan. Safe disposal, sharps removal, infectious materials. IICRC certified.',
  keywords: [
    'medical waste cleanup Brisbane',
    'sharps disposal Ipswich',
    'infectious waste Logan',
    'biohazard medical waste Brisbane',
    'clinical waste removal Ipswich',
    'medical waste disposal Logan'
  ],
  url: 'https://dr-new-ten.vercel.app/services/biohazard-cleaning/medical-waste',
  image: '/images/medical-waste.jpg',
  responseTime: '2-hour',
  certified: true
});

export default function MedicalWastePage() {
  return <MedicalWasteClient />;
}
