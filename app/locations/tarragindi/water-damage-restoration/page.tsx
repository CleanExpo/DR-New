import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Tarragindi | 24/7 Emergency Response | Master Restorer',
  description: 'Professional water damage restoration in Tarragindi. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'water damage restoration Tarragindi, emergency restoration Tarragindi, Tarragindi disaster recovery, IICRC master restorer Tarragindi, water damage Tarragindi',
  openGraph: {
    title: 'Water Damage Restoration Tarragindi | Emergency Response',
    description: 'Professional water damage restoration serving Tarragindi. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function TarragindiWaterDamageRestorationPage() {
  const data = getLocationServiceData('tarragindi', 'waterDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
