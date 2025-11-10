import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Karalee | 24/7 Emergency Response | Master Restorer',
  description: 'Professional storm damage restoration in Karalee. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'storm damage restoration Karalee, emergency restoration Karalee, Karalee disaster recovery, IICRC master restorer Karalee, water damage Karalee',
  openGraph: {
    title: 'Storm Damage Restoration Karalee | Emergency Response',
    description: 'Professional storm damage restoration serving Karalee. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function KaraleeStormDamageRestorationPage() {
  const data = getLocationServiceData('karalee', 'stormDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
