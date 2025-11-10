import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Ascot | 24/7 Emergency Response | Master Restorer',
  description: 'Professional storm damage restoration in Ascot. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'storm damage restoration Ascot, emergency restoration Ascot, Ascot disaster recovery, IICRC master restorer Ascot, water damage Ascot',
  openGraph: {
    title: 'Storm Damage Restoration Ascot | Emergency Response',
    description: 'Professional storm damage restoration serving Ascot. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function AscotStormDamageRestorationPage() {
  const data = getLocationServiceData('ascot', 'stormDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
