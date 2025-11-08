import { Metadata } from 'next';
import Link from 'next/link';
import { PhoneIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Karalee Water Damage Restoration | IICRC Master Restorer Ipswich | 24/7',
  description: 'Emergency water, fire & flood restoration in Karalee, Ipswich. IICRC Master Restorer Phill McGurk. 40-min response. Insurance approved. Luxury home specialists. Call 1300 309 361.',
  keywords: 'water damage restoration karalee, emergency restoration karalee ipswich, flood damage karalee, fire damage karalee, master restorer karalee, luxury home restoration karalee',
  alternates: { canonical: 'https://disasterrecovery.com.au/locations/karalee' }
};

export default function KaraleePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-red-700 to-slate-900 text-white py-24 text-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-6xl font-bold mb-6">Karalee Emergency Restoration</h1>
          <p className="text-2xl mb-8">24/7 Master Restorer • Luxury Home Specialists</p>
          <a href="tel:1300309361" className="inline-flex items-center gap-2 bg-white text-red-600 px-12 py-6 rounded-lg font-bold text-2xl hover:scale-105 transition"><PhoneIcon className="w-8 h-8" />1300 309 361</a>
        </div>
      </section>
    </div>
  );
}
