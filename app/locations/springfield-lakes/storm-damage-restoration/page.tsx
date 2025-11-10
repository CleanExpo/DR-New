import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Springfield Lakes | 24/7 Emergency Response | Master Restorer',
  description: 'Professional storm damage restoration in Springfield Lakes. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'storm damage restoration Springfield Lakes, emergency restoration Springfield Lakes, Springfield Lakes disaster recovery, IICRC master restorer Springfield Lakes, water damage Springfield Lakes',
  openGraph: {
    title: 'Storm Damage Restoration Springfield Lakes | Emergency Response',
    description: 'Professional storm damage restoration serving Springfield Lakes. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function SpringfieldLakesStormDamageRestorationPage() {
  const data = getLocationServiceData('springfieldLakes', 'stormDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
