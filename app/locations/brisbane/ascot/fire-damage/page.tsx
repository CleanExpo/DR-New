import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Ascot Fire Damage Restoration | 24/7 Emergency Service | Master Restorer`,
  description: `Expert fire damage restoration in Ascot, Brisbane. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'Ascot fire damage',
    'Fire Damage Restoration Ascot',
    'emergency fire damage Ascot',
    '24 hour fire damage Ascot',
    'Ascot Brisbane fire damage'
  ]
};

const AscotfiredamagePage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Fire Damage Restoration in Ascot
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional fire damage restoration services for Ascot properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AscotfiredamagePage;