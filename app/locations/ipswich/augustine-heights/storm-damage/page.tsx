import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Augustine Heights Storm Damage Repair | 24/7 Emergency Service | Master Restorer`,
  description: `Expert storm damage repair in Augustine Heights, Ipswich. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'Augustine Heights storm damage',
    'Storm Damage Repair Augustine Heights',
    'emergency storm damage Augustine Heights',
    '24 hour storm damage Augustine Heights',
    'Augustine Heights Ipswich storm damage'
  ]
};

const AugustineHeightsstormdamagePage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Storm Damage Repair in Augustine Heights
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional storm damage repair services for Augustine Heights properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AugustineHeightsstormdamagePage;