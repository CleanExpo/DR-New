import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Augustine Heights Commercial Restoration | 24/7 Emergency Service | Master Restorer`,
  description: `Expert commercial restoration in Augustine Heights, Ipswich. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'Augustine Heights commercial restoration',
    'Commercial Restoration Augustine Heights',
    'emergency commercial restoration Augustine Heights',
    '24 hour commercial restoration Augustine Heights',
    'Augustine Heights Ipswich commercial restoration'
  ]
};

const AugustineHeightscommercialrestorationPage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Commercial Restoration in Augustine Heights
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional commercial restoration services for Augustine Heights properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AugustineHeightscommercialrestorationPage;