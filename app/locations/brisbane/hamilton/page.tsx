import React from 'react';
import { Metadata } from 'next';
import { LocationHero } from '@/components/LocationHero';
import { ServiceGrid } from '@/components/ServiceGrid';
import { LocalTestimonials } from '@/components/LocalTestimonials';
import { EmergencyCTA } from '@/components/EmergencyCTA';
import { LocalBusinessSchema } from '@/components/schema/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { FAQSchema } from '@/components/schema/FAQSchema';

export const metadata: Metadata = {
  title: `Hamilton Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Premium 24/7 disaster recovery services for Hamilton's prestigious properties. Phill McGurk - Master Restorer serving Hamilton, Brisbane. Insurance approved. Call 24/7.`,
  keywords: [
    'Hamilton water damage restoration',
    'Hamilton fire damage repair',
    'Hamilton mould remediation',
    'Hamilton storm damage',
    'Hamilton emergency restoration',
    'Hamilton Master Restorer',
    'Phill McGurk Hamilton',
    'Hamilton insurance restoration',
    '24 hour emergency Hamilton',
    'Brisbane disaster recovery'
  ],
  openGraph: {
    title: 'Hamilton Disaster Recovery - Master Restorer Services',
    description: 'Premium 24/7 disaster recovery services for Hamilton's prestigious properties',
    images: ['/images/brisbane-hamilton-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/brisbane/hamilton`
  }
};

const HamiltonPage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Hamilton?",
      answer: "Our Hamilton emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Brisbane, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Hamilton properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Hamilton property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Hamilton?",
      answer: "We service all property types in Hamilton including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Hamilton?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Hamilton properties."
    },
    {
      question: "What certifications does your Hamilton team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Hamilton"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Hamilton",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/brisbane/hamilton`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Hamilton", "Brisbane", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Brisbane', url: '/locations/brisbane' },
          { name: 'Hamilton', url: '/locations/brisbane/hamilton' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Hamilton"
        city="Brisbane"
        title="Master Restorer Services in Hamilton"
        subtitle="Premium 24/7 disaster recovery services for Hamilton's prestigious properties"
        image="/images/brisbane-hamilton-hero.webp"
        tier="premium"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Hamilton
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Hamilton property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Hamilton
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Hamilton Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Brisbane Team:</strong> Fast response times to Hamilton</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Hamilton Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Hamilton, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Hamilton Property Types</h3>
              <p>
                Our team specializes in high-value residential properties, luxury homes, and prestigious commercial buildings throughout Hamilton.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Hamilton"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Hamilton"
        city="Brisbane"
      />

      <EmergencyCTA
        suburb="Hamilton"
        message="Emergency in Hamilton? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default HamiltonPage;