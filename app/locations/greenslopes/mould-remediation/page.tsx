import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Mould Remediation Greenslopes | 24/7 Emergency Response | Master Restorer',
  description: 'Professional mould remediation in Greenslopes. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'mould remediation Greenslopes, emergency restoration Greenslopes, Greenslopes disaster recovery, IICRC master restorer Greenslopes, water damage Greenslopes',
  openGraph: {
    title: 'Mould Remediation Greenslopes | Emergency Response',
    description: 'Professional mould remediation serving Greenslopes. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function GreenslopesMouldRemediationPage() {
  const data = getLocationServiceData('greenslopes', 'mouldRemediation');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
