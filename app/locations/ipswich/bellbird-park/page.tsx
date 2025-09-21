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
  title: `Bellbird Park Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Trusted emergency restoration services for Bellbird Park residents and businesses. Phill McGurk - Master Restorer serving Bellbird Park, Ipswich. Insurance approved. Call 24/7.`,
  keywords: [
    'Bellbird Park water damage restoration',
    'Bellbird Park fire damage repair',
    'Bellbird Park mould remediation',
    'Bellbird Park storm damage',
    'Bellbird Park emergency restoration',
    'Bellbird Park Master Restorer',
    'Phill McGurk Bellbird Park',
    'Bellbird Park insurance restoration',
    '24 hour emergency Bellbird Park',
    'Ipswich disaster recovery'
  ],
  openGraph: {
    title: 'Bellbird Park Disaster Recovery - Master Restorer Services',
    description: 'Trusted emergency restoration services for Bellbird Park residents and businesses',
    images: ['/images/ipswich-bellbird-park-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/ipswich/bellbird-park`
  }
};

const BellbirdParkPage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Bellbird Park?",
      answer: "Our Bellbird Park emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Ipswich, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Bellbird Park properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Bellbird Park property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Bellbird Park?",
      answer: "We service all property types in Bellbird Park including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Bellbird Park?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Bellbird Park properties."
    },
    {
      question: "What certifications does your Bellbird Park team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Bellbird Park"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Bellbird Park",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/ipswich/bellbird-park`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Bellbird Park", "Ipswich", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Ipswich', url: '/locations/ipswich' },
          { name: 'Bellbird Park', url: '/locations/ipswich/bellbird-park' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Bellbird Park"
        city="Ipswich"
        title="Master Restorer Services in Bellbird Park"
        subtitle="Trusted emergency restoration services for Bellbird Park residents and businesses"
        image="/images/ipswich-bellbird-park-hero.webp"
        tier="established"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Bellbird Park
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Bellbird Park property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Bellbird Park
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Bellbird Park Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Ipswich Team:</strong> Fast response times to Bellbird Park</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Bellbird Park Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Bellbird Park, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Bellbird Park Property Types</h3>
              <p>
                We service all residential homes, strata properties, commercial buildings, and retail spaces in Bellbird Park.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Bellbird Park"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Bellbird Park"
        city="Ipswich"
      />

      <EmergencyCTA
        suburb="Bellbird Park"
        message="Emergency in Bellbird Park? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default BellbirdParkPage;