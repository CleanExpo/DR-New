import type { Metadata } from 'next';
import { generateServiceSEO } from '@/lib/seo';
import CrimeSceneCleanupClient from './CrimeSceneCleanupClient';

// SEO Metadata - Local Brisbane, Ipswich, Logan focus
export const metadata: Metadata = generateServiceSEO({
  serviceName: 'Crime Scene Cleanup',
  location: 'Brisbane, Ipswich & Logan',
  title: 'Crime Scene Cleanup Brisbane, Ipswich & Logan | Discreet Biohazard Removal',
  description: 'Professional crime scene cleanup in Brisbane, Ipswich, Logan. Discreet, trauma-informed biohazard removal. Phill McGurk - IICRC Master Restorer, Hazmat Licensed, Asbestos Assessor.',
  keywords: [
    'crime scene cleanup Brisbane',
    'trauma cleaning Ipswich',
    'biohazard removal Logan',
    'crime scene cleaning Brisbane',
    'trauma scene cleanup Ipswich',
    'discreet biohazard cleanup Logan'
  ],
  url: 'https://dr-new-ten.vercel.app/services/biohazard-cleaning/crime-scene-cleanup',
  image: '/images/crime-scene-cleanup.jpg',
  responseTime: '2-hour',
  certified: true
});

export default function CrimeSceneCleanupPage() {
  return <CrimeSceneCleanupClient />;
}
