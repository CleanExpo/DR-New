import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Mould Remediation Algester | 24/7 Emergency Response | Master Restorer',
  description: 'Professional mould remediation in Algester. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'mould remediation Algester, emergency restoration Algester, Algester disaster recovery, IICRC master restorer Algester, water damage Algester',
  openGraph: {
    title: 'Mould Remediation Algester | Emergency Response',
    description: 'Professional mould remediation serving Algester. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function AlgesterMouldRemediationPage() {
  const data = getLocationServiceData('algester', 'mouldRemediation');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
