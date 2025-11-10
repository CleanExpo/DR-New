import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Ipswich | 24/7 Emergency Response | Master Restorer',
  description: 'Professional fire damage restoration in Ipswich. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: 'fire damage restoration Ipswich, emergency restoration Ipswich, Ipswich disaster recovery, IICRC master restorer Ipswich, water damage Ipswich',
  openGraph: {
    title: 'Fire Damage Restoration Ipswich | Emergency Response',
    description: 'Professional fire damage restoration serving Ipswich. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function IpswichFireDamageRestorationPage() {
  const data = getLocationServiceData('ipswich', 'fireDamage');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
