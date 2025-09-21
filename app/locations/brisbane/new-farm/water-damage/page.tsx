import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `New Farm Water Damage Restoration | 24/7 Emergency Service | Master Restorer`,
  description: `Expert water damage restoration in New Farm, Brisbane. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'New Farm water damage',
    'Water Damage Restoration New Farm',
    'emergency water damage New Farm',
    '24 hour water damage New Farm',
    'New Farm Brisbane water damage'
  ]
};

const NewFarmwaterdamagePage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Water Damage Restoration in New Farm
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional water damage restoration services for New Farm properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default NewFarmwaterdamagePage;