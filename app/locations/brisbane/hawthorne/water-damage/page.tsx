import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Hawthorne Water Damage Restoration | 24/7 Emergency Service | Master Restorer`,
  description: `Expert water damage restoration in Hawthorne, Brisbane. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'Hawthorne water damage',
    'Water Damage Restoration Hawthorne',
    'emergency water damage Hawthorne',
    '24 hour water damage Hawthorne',
    'Hawthorne Brisbane water damage'
  ]
};

const HawthornewaterdamagePage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Water Damage Restoration in Hawthorne
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional water damage restoration services for Hawthorne properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HawthornewaterdamagePage;