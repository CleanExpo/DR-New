import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Algester | 24/7 Emergency Response | Master Restorer',
  description: 'Professional fire damage restoration in Algester. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'fire damage restoration Algester, emergency restoration Algester, Algester disaster recovery, IICRC master restorer Algester, water damage Algester',
  openGraph: {
    title: 'Fire Damage Restoration Algester | Emergency Response',
    description: 'Professional fire damage restoration serving Algester. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function AlgesterFireDamageRestorationPage() {
  const data = getLocationServiceData('algester', 'fireDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
