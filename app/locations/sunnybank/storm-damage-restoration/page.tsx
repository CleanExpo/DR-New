import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Sunnybank | 24/7 Emergency Response | Master Restorer',
  description: 'Professional storm damage restoration in Sunnybank. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'storm damage restoration Sunnybank, emergency restoration Sunnybank, Sunnybank disaster recovery, IICRC master restorer Sunnybank, water damage Sunnybank',
  openGraph: {
    title: 'Storm Damage Restoration Sunnybank | Emergency Response',
    description: 'Professional storm damage restoration serving Sunnybank. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function SunnybankStormDamageRestorationPage() {
  const data = getLocationServiceData('sunnybank', 'stormDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
