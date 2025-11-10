import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Paddington | 24/7 Emergency Response | Master Restorer',
  description: 'Professional storm damage restoration in Paddington. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'storm damage restoration Paddington, emergency restoration Paddington, Paddington disaster recovery, IICRC master restorer Paddington, water damage Paddington',
  openGraph: {
    title: 'Storm Damage Restoration Paddington | Emergency Response',
    description: 'Professional storm damage restoration serving Paddington. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function PaddingtonStormDamageRestorationPage() {
  const data = getLocationServiceData('paddington', 'stormDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
