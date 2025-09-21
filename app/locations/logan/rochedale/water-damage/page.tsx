import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Rochedale Water Damage Restoration | 24/7 Emergency Service | Master Restorer`,
  description: `Expert water damage restoration in Rochedale, Logan. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'Rochedale water damage',
    'Water Damage Restoration Rochedale',
    'emergency water damage Rochedale',
    '24 hour water damage Rochedale',
    'Rochedale Logan water damage'
  ]
};

const RochedalewaterdamagePage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Water Damage Restoration in Rochedale
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional water damage restoration services for Rochedale properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default RochedalewaterdamagePage;