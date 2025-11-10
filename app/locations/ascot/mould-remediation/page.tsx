import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Mould Remediation Ascot | 24/7 Emergency Response | Master Restorer',
  description: 'Professional mould remediation in Ascot. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'mould remediation Ascot, emergency restoration Ascot, Ascot disaster recovery, IICRC master restorer Ascot, water damage Ascot',
  openGraph: {
    title: 'Mould Remediation Ascot | Emergency Response',
    description: 'Professional mould remediation serving Ascot. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function AscotMouldRemediationPage() {
  const data = getLocationServiceData('ascot', 'mouldRemediation');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
