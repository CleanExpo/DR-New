import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Springfield Lakes | 24/7 Emergency Response | Master Restorer',
  description: 'Professional fire damage restoration in Springfield Lakes. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'fire damage restoration Springfield Lakes, emergency restoration Springfield Lakes, Springfield Lakes disaster recovery, IICRC master restorer Springfield Lakes, water damage Springfield Lakes',
  openGraph: {
    title: 'Fire Damage Restoration Springfield Lakes | Emergency Response',
    description: 'Professional fire damage restoration serving Springfield Lakes. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function SpringfieldLakesFireDamageRestorationPage() {
  const data = getLocationServiceData('springfieldLakes', 'fireDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
