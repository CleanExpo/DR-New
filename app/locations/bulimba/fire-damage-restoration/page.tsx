import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Bulimba | 24/7 Emergency Response | Master Restorer',
  description: 'Professional fire damage restoration in Bulimba. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'fire damage restoration Bulimba, emergency restoration Bulimba, Bulimba disaster recovery, IICRC master restorer Bulimba, water damage Bulimba',
  openGraph: {
    title: 'Fire Damage Restoration Bulimba | Emergency Response',
    description: 'Professional fire damage restoration serving Bulimba. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function BulimbaFireDamageRestorationPage() {
  const data = getLocationServiceData('bulimba', 'fireDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
