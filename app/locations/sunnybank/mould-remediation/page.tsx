import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Mould Remediation Sunnybank | 24/7 Emergency Response | Master Restorer',
  description: 'Professional mould remediation in Sunnybank. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'mould remediation Sunnybank, emergency restoration Sunnybank, Sunnybank disaster recovery, IICRC master restorer Sunnybank, water damage Sunnybank',
  openGraph: {
    title: 'Mould Remediation Sunnybank | Emergency Response',
    description: 'Professional mould remediation serving Sunnybank. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function SunnybankMouldRemediationPage() {
  const data = getLocationServiceData('sunnybank', 'mouldRemediation');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
