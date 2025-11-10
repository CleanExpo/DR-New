import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Capalaba | 24/7 Emergency Response | Master Restorer',
  description: 'Professional water damage restoration in Capalaba. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'water damage restoration Capalaba, emergency restoration Capalaba, Capalaba disaster recovery, IICRC master restorer Capalaba, water damage Capalaba',
  openGraph: {
    title: 'Water Damage Restoration Capalaba | Emergency Response',
    description: 'Professional water damage restoration serving Capalaba. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function CapalabaWaterDamageRestorationPage() {
  const data = getLocationServiceData('capalaba', 'waterDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
