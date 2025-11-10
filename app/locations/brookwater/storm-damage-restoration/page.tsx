import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Brookwater | 24/7 Emergency Response | Master Restorer',
  description: 'Professional storm damage restoration in Brookwater. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'storm damage restoration Brookwater, emergency restoration Brookwater, Brookwater disaster recovery, IICRC master restorer Brookwater, water damage Brookwater',
  openGraph: {
    title: 'Storm Damage Restoration Brookwater | Emergency Response',
    description: 'Professional storm damage restoration serving Brookwater. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function BrookwaterStormDamageRestorationPage() {
  const data = getLocationServiceData('brookwater', 'stormDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
