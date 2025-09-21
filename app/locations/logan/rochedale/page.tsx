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
  title: `Rochedale Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Premium 24/7 disaster recovery services for Rochedale's prestigious properties. Phill McGurk - Master Restorer serving Rochedale, Logan. Insurance approved. Call 24/7.`,
  keywords: [
    'Rochedale water damage restoration',
    'Rochedale fire damage repair',
    'Rochedale mould remediation',
    'Rochedale storm damage',
    'Rochedale emergency restoration',
    'Rochedale Master Restorer',
    'Phill McGurk Rochedale',
    'Rochedale insurance restoration',
    '24 hour emergency Rochedale',
    'Logan disaster recovery'
  ],
  openGraph: {
    title: 'Rochedale Disaster Recovery - Master Restorer Services',
    description: 'Premium 24/7 disaster recovery services for Rochedale's prestigious properties',
    images: ['/images/logan-rochedale-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/logan/rochedale`
  }
};

const RochedalePage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Rochedale?",
      answer: "Our Rochedale emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Logan, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Rochedale properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Rochedale property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Rochedale?",
      answer: "We service all property types in Rochedale including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Rochedale?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Rochedale properties."
    },
    {
      question: "What certifications does your Rochedale team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Rochedale"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Rochedale",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/logan/rochedale`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Rochedale", "Logan", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Logan', url: '/locations/logan' },
          { name: 'Rochedale', url: '/locations/logan/rochedale' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Rochedale"
        city="Logan"
        title="Master Restorer Services in Rochedale"
        subtitle="Premium 24/7 disaster recovery services for Rochedale's prestigious properties"
        image="/images/logan-rochedale-hero.webp"
        tier="premium"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Rochedale
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Rochedale property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Rochedale
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Rochedale Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Logan Team:</strong> Fast response times to Rochedale</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Rochedale Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Rochedale, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Rochedale Property Types</h3>
              <p>
                Our team specializes in high-value residential properties, luxury homes, and prestigious commercial buildings throughout Rochedale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Rochedale"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Rochedale"
        city="Logan"
      />

      <EmergencyCTA
        suburb="Rochedale"
        message="Emergency in Rochedale? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default RochedalePage;