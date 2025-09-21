import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Shailer Park Commercial Restoration | 24/7 Emergency Service | Master Restorer`,
  description: `Expert commercial restoration in Shailer Park, Logan. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'Shailer Park commercial restoration',
    'Commercial Restoration Shailer Park',
    'emergency commercial restoration Shailer Park',
    '24 hour commercial restoration Shailer Park',
    'Shailer Park Logan commercial restoration'
  ]
};

const ShailerParkcommercialrestorationPage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Commercial Restoration in Shailer Park
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional commercial restoration services for Shailer Park properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ShailerParkcommercialrestorationPage;