import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Mould Remediation Logan | 24/7 Emergency Response | Master Restorer',
  description: 'Professional mould remediation in Logan. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'mould remediation Logan, emergency restoration Logan, Logan disaster recovery, IICRC master restorer Logan, water damage Logan',
  openGraph: {
    title: 'Mould Remediation Logan | Emergency Response',
    description: 'Professional mould remediation serving Logan. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function LoganMouldRemediationPage() {
  const data = getLocationServiceData('logan', 'mouldRemediation');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
