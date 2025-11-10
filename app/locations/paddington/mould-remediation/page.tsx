import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Mould Remediation Paddington | 24/7 Emergency Response | Master Restorer',
  description: 'Professional mould remediation in Paddington. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'mould remediation Paddington, emergency restoration Paddington, Paddington disaster recovery, IICRC master restorer Paddington, water damage Paddington',
  openGraph: {
    title: 'Mould Remediation Paddington | Emergency Response',
    description: 'Professional mould remediation serving Paddington. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function PaddingtonMouldRemediationPage() {
  const data = getLocationServiceData('paddington', 'mouldRemediation');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
