import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Ascot Water Damage Restoration | 24/7 Emergency Service | Master Restorer`,
  description: `Expert water damage restoration in Ascot, Brisbane. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'Ascot water damage',
    'Water Damage Restoration Ascot',
    'emergency water damage Ascot',
    '24 hour water damage Ascot',
    'Ascot Brisbane water damage'
  ]
};

const AscotwaterdamagePage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Water Damage Restoration in Ascot
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional water damage restoration services for Ascot properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AscotwaterdamagePage;