import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Rochedale Fire Damage Restoration | 24/7 Emergency Service | Master Restorer`,
  description: `Expert fire damage restoration in Rochedale, Logan. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'Rochedale fire damage',
    'Fire Damage Restoration Rochedale',
    'emergency fire damage Rochedale',
    '24 hour fire damage Rochedale',
    'Rochedale Logan fire damage'
  ]
};

const RochedalefiredamagePage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Fire Damage Restoration in Rochedale
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional fire damage restoration services for Rochedale properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default RochedalefiredamagePage;