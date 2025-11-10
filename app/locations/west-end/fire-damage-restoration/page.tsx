import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration West End | 24/7 Emergency Response | Master Restorer',
  description: 'Professional fire damage restoration in West End. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'fire damage restoration West End, emergency restoration West End, West End disaster recovery, IICRC master restorer West End, water damage West End',
  openGraph: {
    title: 'Fire Damage Restoration West End | Emergency Response',
    description: 'Professional fire damage restoration serving West End. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function WestEndFireDamageRestorationPage() {
  const data = getLocationServiceData('westEnd', 'fireDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
