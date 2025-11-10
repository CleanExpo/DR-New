import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Westlake | 24/7 Emergency Response | Master Restorer',
  description: 'Professional storm damage restoration in Westlake. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'storm damage restoration Westlake, emergency restoration Westlake, Westlake disaster recovery, IICRC master restorer Westlake, water damage Westlake',
  openGraph: {
    title: 'Storm Damage Restoration Westlake | Emergency Response',
    description: 'Professional storm damage restoration serving Westlake. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function WestlakeStormDamageRestorationPage() {
  const data = getLocationServiceData('westlake', 'stormDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
