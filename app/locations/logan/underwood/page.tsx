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
  title: `Underwood Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Trusted emergency restoration services for Underwood residents and businesses. Phill McGurk - Master Restorer serving Underwood, Logan. Insurance approved. Call 24/7.`,
  keywords: [
    'Underwood water damage restoration',
    'Underwood fire damage repair',
    'Underwood mould remediation',
    'Underwood storm damage',
    'Underwood emergency restoration',
    'Underwood Master Restorer',
    'Phill McGurk Underwood',
    'Underwood insurance restoration',
    '24 hour emergency Underwood',
    'Logan disaster recovery'
  ],
  openGraph: {
    title: 'Underwood Disaster Recovery - Master Restorer Services',
    description: 'Trusted emergency restoration services for Underwood residents and businesses',
    images: ['/images/logan-underwood-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/logan/underwood`
  }
};

const UnderwoodPage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Underwood?",
      answer: "Our Underwood emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Logan, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Underwood properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Underwood property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Underwood?",
      answer: "We service all property types in Underwood including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Underwood?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Underwood properties."
    },
    {
      question: "What certifications does your Underwood team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Underwood"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Underwood",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/logan/underwood`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Underwood", "Logan", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Logan', url: '/locations/logan' },
          { name: 'Underwood', url: '/locations/logan/underwood' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Underwood"
        city="Logan"
        title="Master Restorer Services in Underwood"
        subtitle="Trusted emergency restoration services for Underwood residents and businesses"
        image="/images/logan-underwood-hero.webp"
        tier="established"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Underwood
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Underwood property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Underwood
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Underwood Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Logan Team:</strong> Fast response times to Underwood</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Underwood Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Underwood, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Underwood Property Types</h3>
              <p>
                We service all residential homes, strata properties, commercial buildings, and retail spaces in Underwood.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Underwood"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Underwood"
        city="Logan"
      />

      <EmergencyCTA
        suburb="Underwood"
        message="Emergency in Underwood? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default UnderwoodPage;