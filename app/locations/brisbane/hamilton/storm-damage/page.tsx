import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Hamilton Storm Damage Repair | 24/7 Emergency Service | Master Restorer`,
  description: `Expert storm damage repair in Hamilton, Brisbane. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'Hamilton storm damage',
    'Storm Damage Repair Hamilton',
    'emergency storm damage Hamilton',
    '24 hour storm damage Hamilton',
    'Hamilton Brisbane storm damage'
  ]
};

const HamiltonstormdamagePage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Storm Damage Repair in Hamilton
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional storm damage repair services for Hamilton properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HamiltonstormdamagePage;