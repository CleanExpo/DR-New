import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Burbank | 24/7 Emergency Response | Master Restorer',
  description: 'Professional water damage restoration in Burbank. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'water damage restoration Burbank, emergency restoration Burbank, Burbank disaster recovery, IICRC master restorer Burbank, water damage Burbank',
  openGraph: {
    title: 'Water Damage Restoration Burbank | Emergency Response',
    description: 'Professional water damage restoration serving Burbank. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function BurbankWaterDamageRestorationPage() {
  const data = getLocationServiceData('burbank', 'waterDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
