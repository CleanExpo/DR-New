import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Mould Remediation Burbank | 24/7 Emergency Response | Master Restorer',
  description: 'Professional mould remediation in Burbank. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'mould remediation Burbank, emergency restoration Burbank, Burbank disaster recovery, IICRC master restorer Burbank, water damage Burbank',
  openGraph: {
    title: 'Mould Remediation Burbank | Emergency Response',
    description: 'Professional mould remediation serving Burbank. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function BurbankMouldRemediationPage() {
  const data = getLocationServiceData('burbank', 'mouldRemediation');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
