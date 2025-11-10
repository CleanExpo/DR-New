import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Brookfield | 24/7 Emergency Response | Master Restorer',
  description: 'Professional water damage restoration in Brookfield. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'water damage restoration Brookfield, emergency restoration Brookfield, Brookfield disaster recovery, IICRC master restorer Brookfield, water damage Brookfield',
  openGraph: {
    title: 'Water Damage Restoration Brookfield | Emergency Response',
    description: 'Professional water damage restoration serving Brookfield. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function BrookfieldWaterDamageRestorationPage() {
  const data = getLocationServiceData('brookfield', 'waterDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
