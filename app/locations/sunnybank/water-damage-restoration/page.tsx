import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Sunnybank | 24/7 Emergency Response | Master Restorer',
  description: 'Professional water damage restoration in Sunnybank. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'water damage restoration Sunnybank, emergency restoration Sunnybank, Sunnybank disaster recovery, IICRC master restorer Sunnybank, water damage Sunnybank',
  openGraph: {
    title: 'Water Damage Restoration Sunnybank | Emergency Response',
    description: 'Professional water damage restoration serving Sunnybank. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function SunnybankWaterDamageRestorationPage() {
  const data = getLocationServiceData('sunnybank', 'waterDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
