import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Brookwater Mould Remediation | 24/7 Emergency Service | Master Restorer`,
  description: `Expert mould remediation in Brookwater, Ipswich. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'Brookwater mould remediation',
    'Mould Remediation Brookwater',
    'emergency mould remediation Brookwater',
    '24 hour mould remediation Brookwater',
    'Brookwater Ipswich mould remediation'
  ]
};

const BrookwatermouldremediationPage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Mould Remediation in Brookwater
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional mould remediation services for Brookwater properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BrookwatermouldremediationPage;