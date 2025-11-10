import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Pullenvale | 24/7 Emergency Response | Master Restorer',
  description: 'Professional storm damage restoration in Pullenvale. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'storm damage restoration Pullenvale, emergency restoration Pullenvale, Pullenvale disaster recovery, IICRC master restorer Pullenvale, water damage Pullenvale',
  openGraph: {
    title: 'Storm Damage Restoration Pullenvale | Emergency Response',
    description: 'Professional storm damage restoration serving Pullenvale. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function PullenvaleStormDamageRestorationPage() {
  const data = getLocationServiceData('pullenvale', 'stormDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
