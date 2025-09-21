import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Hamilton Commercial Restoration | 24/7 Emergency Service | Master Restorer`,
  description: `Expert commercial restoration in Hamilton, Brisbane. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'Hamilton commercial restoration',
    'Commercial Restoration Hamilton',
    'emergency commercial restoration Hamilton',
    '24 hour commercial restoration Hamilton',
    'Hamilton Brisbane commercial restoration'
  ]
};

const HamiltoncommercialrestorationPage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Commercial Restoration in Hamilton
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional commercial restoration services for Hamilton properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HamiltoncommercialrestorationPage;