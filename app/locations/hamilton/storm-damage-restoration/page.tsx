import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Hamilton | 24/7 Emergency Response | Master Restorer',
  description: 'Professional storm damage restoration in Hamilton. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'storm damage restoration Hamilton, emergency restoration Hamilton, Hamilton disaster recovery, IICRC master restorer Hamilton, water damage Hamilton',
  openGraph: {
    title: 'Storm Damage Restoration Hamilton | Emergency Response',
    description: 'Professional storm damage restoration serving Hamilton. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function HamiltonStormDamageRestorationPage() {
  const data = getLocationServiceData('hamilton', 'stormDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
