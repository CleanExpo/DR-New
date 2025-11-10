import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Mould Remediation Brookfield | 24/7 Emergency Response | Master Restorer',
  description: 'Professional mould remediation in Brookfield. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'mould remediation Brookfield, emergency restoration Brookfield, Brookfield disaster recovery, IICRC master restorer Brookfield, water damage Brookfield',
  openGraph: {
    title: 'Mould Remediation Brookfield | Emergency Response',
    description: 'Professional mould remediation serving Brookfield. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function BrookfieldMouldRemediationPage() {
  const data = getLocationServiceData('brookfield', 'mouldRemediation');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
