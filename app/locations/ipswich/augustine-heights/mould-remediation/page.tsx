import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Augustine Heights Mould Remediation | 24/7 Emergency Service | Master Restorer`,
  description: `Expert mould remediation in Augustine Heights, Ipswich. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'Augustine Heights mould remediation',
    'Mould Remediation Augustine Heights',
    'emergency mould remediation Augustine Heights',
    '24 hour mould remediation Augustine Heights',
    'Augustine Heights Ipswich mould remediation'
  ]
};

const AugustineHeightsmouldremediationPage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Mould Remediation in Augustine Heights
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional mould remediation services for Augustine Heights properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AugustineHeightsmouldremediationPage;