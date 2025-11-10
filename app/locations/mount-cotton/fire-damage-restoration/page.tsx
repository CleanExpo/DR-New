import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Mount Cotton | 24/7 Emergency Response | Master Restorer',
  description: 'Professional fire damage restoration in Mount Cotton. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'fire damage restoration Mount Cotton, emergency restoration Mount Cotton, Mount Cotton disaster recovery, IICRC master restorer Mount Cotton, water damage Mount Cotton',
  openGraph: {
    title: 'Fire Damage Restoration Mount Cotton | Emergency Response',
    description: 'Professional fire damage restoration serving Mount Cotton. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function MountCottonFireDamageRestorationPage() {
  const data = getLocationServiceData('mountCotton', 'fireDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
