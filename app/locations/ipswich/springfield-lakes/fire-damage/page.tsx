import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Springfield Lakes Fire Damage Restoration | 24/7 Emergency Service | Master Restorer`,
  description: `Expert fire damage restoration in Springfield Lakes, Ipswich. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'Springfield Lakes fire damage',
    'Fire Damage Restoration Springfield Lakes',
    'emergency fire damage Springfield Lakes',
    '24 hour fire damage Springfield Lakes',
    'Springfield Lakes Ipswich fire damage'
  ]
};

const SpringfieldLakesfiredamagePage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Fire Damage Restoration in Springfield Lakes
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional fire damage restoration services for Springfield Lakes properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SpringfieldLakesfiredamagePage;