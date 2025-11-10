import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Pullenvale | 24/7 Emergency Response | Master Restorer',
  description: 'Professional water damage restoration in Pullenvale. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'water damage restoration Pullenvale, emergency restoration Pullenvale, Pullenvale disaster recovery, IICRC master restorer Pullenvale, water damage Pullenvale',
  openGraph: {
    title: 'Water Damage Restoration Pullenvale | Emergency Response',
    description: 'Professional water damage restoration serving Pullenvale. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function PullenvaleWaterDamageRestorationPage() {
  const data = getLocationServiceData('pullenvale', 'waterDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
