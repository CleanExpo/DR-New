import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Greenslopes | 24/7 Emergency Response | Master Restorer',
  description: 'Professional storm damage restoration in Greenslopes. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'storm damage restoration Greenslopes, emergency restoration Greenslopes, Greenslopes disaster recovery, IICRC master restorer Greenslopes, water damage Greenslopes',
  openGraph: {
    title: 'Storm Damage Restoration Greenslopes | Emergency Response',
    description: 'Professional storm damage restoration serving Greenslopes. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function GreenslopesStormDamageRestorationPage() {
  const data = getLocationServiceData('greenslopes', 'stormDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
