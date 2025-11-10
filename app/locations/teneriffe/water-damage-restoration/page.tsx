import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Teneriffe | 24/7 Emergency Response | Master Restorer',
  description: 'Professional water damage restoration in Teneriffe. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'water damage restoration Teneriffe, emergency restoration Teneriffe, Teneriffe disaster recovery, IICRC master restorer Teneriffe, water damage Teneriffe',
  openGraph: {
    title: 'Water Damage Restoration Teneriffe | Emergency Response',
    description: 'Professional water damage restoration serving Teneriffe. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function TeneriffeWaterDamageRestorationPage() {
  const data = getLocationServiceData('teneriffe', 'waterDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
