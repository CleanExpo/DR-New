import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Camp Hill | 24/7 Emergency Response | Master Restorer',
  description: 'Professional storm damage restoration in Camp Hill. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'storm damage restoration Camp Hill, emergency restoration Camp Hill, Camp Hill disaster recovery, IICRC master restorer Camp Hill, water damage Camp Hill',
  openGraph: {
    title: 'Storm Damage Restoration Camp Hill | Emergency Response',
    description: 'Professional storm damage restoration serving Camp Hill. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function CampHillStormDamageRestorationPage() {
  const data = getLocationServiceData('campHill', 'stormDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
