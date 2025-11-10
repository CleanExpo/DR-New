import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Mount Cotton | 24/7 Emergency Response | Master Restorer',
  description: 'Professional storm damage restoration in Mount Cotton. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'storm damage restoration Mount Cotton, emergency restoration Mount Cotton, Mount Cotton disaster recovery, IICRC master restorer Mount Cotton, water damage Mount Cotton',
  openGraph: {
    title: 'Storm Damage Restoration Mount Cotton | Emergency Response',
    description: 'Professional storm damage restoration serving Mount Cotton. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function MountCottonStormDamageRestorationPage() {
  const data = getLocationServiceData('mountCotton', 'stormDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
