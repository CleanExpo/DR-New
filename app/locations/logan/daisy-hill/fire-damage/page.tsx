import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Daisy Hill Fire Damage Restoration | 24/7 Emergency Service | Master Restorer`,
  description: `Expert fire damage restoration in Daisy Hill, Logan. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'Daisy Hill fire damage',
    'Fire Damage Restoration Daisy Hill',
    'emergency fire damage Daisy Hill',
    '24 hour fire damage Daisy Hill',
    'Daisy Hill Logan fire damage'
  ]
};

const DaisyHillfiredamagePage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Fire Damage Restoration in Daisy Hill
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional fire damage restoration services for Daisy Hill properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default DaisyHillfiredamagePage;