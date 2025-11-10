import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Mould Remediation Westlake | 24/7 Emergency Response | Master Restorer',
  description: 'Professional mould remediation in Westlake. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'mould remediation Westlake, emergency restoration Westlake, Westlake disaster recovery, IICRC master restorer Westlake, water damage Westlake',
  openGraph: {
    title: 'Mould Remediation Westlake | Emergency Response',
    description: 'Professional mould remediation serving Westlake. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function WestlakeMouldRemediationPage() {
  const data = getLocationServiceData('westlake', 'mouldRemediation');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
