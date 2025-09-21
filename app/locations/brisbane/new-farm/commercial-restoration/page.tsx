import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `New Farm Commercial Restoration | 24/7 Emergency Service | Master Restorer`,
  description: `Expert commercial restoration in New Farm, Brisbane. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'New Farm commercial restoration',
    'Commercial Restoration New Farm',
    'emergency commercial restoration New Farm',
    '24 hour commercial restoration New Farm',
    'New Farm Brisbane commercial restoration'
  ]
};

const NewFarmcommercialrestorationPage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Commercial Restoration in New Farm
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional commercial restoration services for New Farm properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default NewFarmcommercialrestorationPage;