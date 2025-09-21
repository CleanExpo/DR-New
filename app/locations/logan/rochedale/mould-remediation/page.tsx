import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Rochedale Mould Remediation | 24/7 Emergency Service | Master Restorer`,
  description: `Expert mould remediation in Rochedale, Logan. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.`,
  keywords: [
    'Rochedale mould remediation',
    'Mould Remediation Rochedale',
    'emergency mould remediation Rochedale',
    '24 hour mould remediation Rochedale',
    'Rochedale Logan mould remediation'
  ]
};

const RochedalemouldremediationPage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Mould Remediation in Rochedale
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional mould remediation services for Rochedale properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default RochedalemouldremediationPage;