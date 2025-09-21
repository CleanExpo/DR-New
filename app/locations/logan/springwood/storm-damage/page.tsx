import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Springwood Storm Damage Repair | 24/7 Emergency Service | Master Restorer`,
  description: `Expert storm damage repair in Springwood, Logan. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'Springwood storm damage',
    'Storm Damage Repair Springwood',
    'emergency storm damage Springwood',
    '24 hour storm damage Springwood',
    'Springwood Logan storm damage'
  ]
};

const SpringwoodstormdamagePage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Storm Damage Repair in Springwood
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional storm damage repair services for Springwood properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SpringwoodstormdamagePage;