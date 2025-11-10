import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Mould Remediation Brisbane CBD | 24/7 Emergency Response | Master Restorer',
  description: 'Professional mould remediation in Brisbane CBD. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'mould remediation Brisbane CBD, emergency restoration Brisbane CBD, Brisbane CBD disaster recovery, IICRC master restorer Brisbane CBD, water damage Brisbane CBD',
  openGraph: {
    title: 'Mould Remediation Brisbane CBD | Emergency Response',
    description: 'Professional mould remediation serving Brisbane CBD. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function BrisbaneCBDMouldRemediationPage() {
  const data = getLocationServiceData('brisbane', 'mouldRemediation');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
