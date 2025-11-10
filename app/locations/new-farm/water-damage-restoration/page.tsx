import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Water Damage Restoration New Farm | 24/7 Emergency Response | Master Restorer',
  description: 'Professional water damage restoration in New Farm. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'water damage restoration New Farm, emergency restoration New Farm, New Farm disaster recovery, IICRC master restorer New Farm, water damage New Farm',
  openGraph: {
    title: 'Water Damage Restoration New Farm | Emergency Response',
    description: 'Professional water damage restoration serving New Farm. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function NewFarmWaterDamageRestorationPage() {
  const data = getLocationServiceData('newFarm', 'waterDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
