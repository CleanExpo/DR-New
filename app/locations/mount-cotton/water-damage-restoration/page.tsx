import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Mount Cotton | 24/7 Emergency Response | Master Restorer',
  description: 'Professional water damage restoration in Mount Cotton. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'water damage restoration Mount Cotton, emergency restoration Mount Cotton, Mount Cotton disaster recovery, IICRC master restorer Mount Cotton, water damage Mount Cotton',
  openGraph: {
    title: 'Water Damage Restoration Mount Cotton | Emergency Response',
    description: 'Professional water damage restoration serving Mount Cotton. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function MountCottonWaterDamageRestorationPage() {
  const data = getLocationServiceData('mountCotton', 'waterDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
