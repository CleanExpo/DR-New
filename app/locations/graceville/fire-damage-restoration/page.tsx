import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Graceville | 24/7 Emergency Response | Master Restorer',
  description: 'Professional fire damage restoration in Graceville. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'fire damage restoration Graceville, emergency restoration Graceville, Graceville disaster recovery, IICRC master restorer Graceville, water damage Graceville',
  openGraph: {
    title: 'Fire Damage Restoration Graceville | Emergency Response',
    description: 'Professional fire damage restoration serving Graceville. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function GracevilleFireDamageRestorationPage() {
  const data = getLocationServiceData('graceville', 'fireDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
