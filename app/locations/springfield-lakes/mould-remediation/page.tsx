import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Mould Remediation Springfield Lakes | 24/7 Emergency Response | Master Restorer',
  description: 'Professional mould remediation in Springfield Lakes. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'mould remediation Springfield Lakes, emergency restoration Springfield Lakes, Springfield Lakes disaster recovery, IICRC master restorer Springfield Lakes, water damage Springfield Lakes',
  openGraph: {
    title: 'Mould Remediation Springfield Lakes | Emergency Response',
    description: 'Professional mould remediation serving Springfield Lakes. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function SpringfieldLakesMouldRemediationPage() {
  const data = getLocationServiceData('springfieldLakes', 'mouldRemediation');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
