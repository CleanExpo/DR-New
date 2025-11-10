import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Sheldon | 24/7 Emergency Response | Master Restorer',
  description: 'Professional water damage restoration in Sheldon. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'water damage restoration Sheldon, emergency restoration Sheldon, Sheldon disaster recovery, IICRC master restorer Sheldon, water damage Sheldon',
  openGraph: {
    title: 'Water Damage Restoration Sheldon | Emergency Response',
    description: 'Professional water damage restoration serving Sheldon. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function SheldonWaterDamageRestorationPage() {
  const data = getLocationServiceData('sheldon', 'waterDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
