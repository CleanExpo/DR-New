import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Mould Remediation Sheldon | 24/7 Emergency Response | Master Restorer',
  description: 'Professional mould remediation in Sheldon. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'mould remediation Sheldon, emergency restoration Sheldon, Sheldon disaster recovery, IICRC master restorer Sheldon, water damage Sheldon',
  openGraph: {
    title: 'Mould Remediation Sheldon | Emergency Response',
    description: 'Professional mould remediation serving Sheldon. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function SheldonMouldRemediationPage() {
  const data = getLocationServiceData('sheldon', 'mouldRemediation');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
