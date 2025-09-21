import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Springfield Lakes Mould Remediation | 24/7 Emergency Service | Master Restorer`,
  description: `Expert mould remediation in Springfield Lakes, Ipswich. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'Springfield Lakes mould remediation',
    'Mould Remediation Springfield Lakes',
    'emergency mould remediation Springfield Lakes',
    '24 hour mould remediation Springfield Lakes',
    'Springfield Lakes Ipswich mould remediation'
  ]
};

const SpringfieldLakesmouldremediationPage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Mould Remediation in Springfield Lakes
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional mould remediation services for Springfield Lakes properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SpringfieldLakesmouldremediationPage;