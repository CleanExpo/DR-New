import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Pullenvale | 24/7 Emergency Response | Master Restorer',
  description: 'Professional fire damage restoration in Pullenvale. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'fire damage restoration Pullenvale, emergency restoration Pullenvale, Pullenvale disaster recovery, IICRC master restorer Pullenvale, water damage Pullenvale',
  openGraph: {
    title: 'Fire Damage Restoration Pullenvale | Emergency Response',
    description: 'Professional fire damage restoration serving Pullenvale. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function PullenvaleFireDamageRestorationPage() {
  const data = getLocationServiceData('pullenvale', 'fireDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
