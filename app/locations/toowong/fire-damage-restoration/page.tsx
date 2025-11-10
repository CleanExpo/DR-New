import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Toowong | 24/7 Emergency Response | Master Restorer',
  description: 'Professional fire damage restoration in Toowong. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'fire damage restoration Toowong, emergency restoration Toowong, Toowong disaster recovery, IICRC master restorer Toowong, water damage Toowong',
  openGraph: {
    title: 'Fire Damage Restoration Toowong | Emergency Response',
    description: 'Professional fire damage restoration serving Toowong. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function ToowongFireDamageRestorationPage() {
  const data = getLocationServiceData('toowong', 'fireDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
