import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Logan | 24/7 Emergency Response | Master Restorer',
  description: 'Professional storm damage restoration in Logan. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'storm damage restoration Logan, emergency restoration Logan, Logan disaster recovery, IICRC master restorer Logan, water damage Logan',
  openGraph: {
    title: 'Storm Damage Restoration Logan | Emergency Response',
    description: 'Professional storm damage restoration serving Logan. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function LoganStormDamageRestorationPage() {
  const data = getLocationServiceData('logan', 'stormDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
