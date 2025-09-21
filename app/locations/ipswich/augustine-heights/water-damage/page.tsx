import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Augustine Heights Water Damage Restoration | 24/7 Emergency Service | Master Restorer`,
  description: `Expert water damage restoration in Augustine Heights, Ipswich. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'Augustine Heights water damage',
    'Water Damage Restoration Augustine Heights',
    'emergency water damage Augustine Heights',
    '24 hour water damage Augustine Heights',
    'Augustine Heights Ipswich water damage'
  ]
};

const AugustineHeightswaterdamagePage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Water Damage Restoration in Augustine Heights
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional water damage restoration services for Augustine Heights properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AugustineHeightswaterdamagePage;