import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Brisbane CBD | 24/7 Emergency Response | Master Restorer',
  description: 'Professional fire damage restoration in Brisbane CBD. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'fire damage restoration Brisbane CBD, emergency restoration Brisbane CBD, Brisbane CBD disaster recovery, IICRC master restorer Brisbane CBD, water damage Brisbane CBD',
  openGraph: {
    title: 'Fire Damage Restoration Brisbane CBD | Emergency Response',
    description: 'Professional fire damage restoration serving Brisbane CBD. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function BrisbaneCBDFireDamageRestorationPage() {
  const data = getLocationServiceData('brisbane', 'fireDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
