import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Mould Remediation Chapel Hill | 24/7 Emergency Response | Master Restorer',
  description: 'Professional mould remediation in Chapel Hill. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'mould remediation Chapel Hill, emergency restoration Chapel Hill, Chapel Hill disaster recovery, IICRC master restorer Chapel Hill, water damage Chapel Hill',
  openGraph: {
    title: 'Mould Remediation Chapel Hill | Emergency Response',
    description: 'Professional mould remediation serving Chapel Hill. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function ChapelHillMouldRemediationPage() {
  const data = getLocationServiceData('chapelHill', 'mouldRemediation');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
