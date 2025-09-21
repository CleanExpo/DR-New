import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Karalee Commercial Restoration | 24/7 Emergency Service | Master Restorer`,
  description: `Expert commercial restoration in Karalee, Ipswich. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'Karalee commercial restoration',
    'Commercial Restoration Karalee',
    'emergency commercial restoration Karalee',
    '24 hour commercial restoration Karalee',
    'Karalee Ipswich commercial restoration'
  ]
};

const KaraleecommercialrestorationPage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Commercial Restoration in Karalee
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional commercial restoration services for Karalee properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default KaraleecommercialrestorationPage;