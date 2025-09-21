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
  title: `Morningside Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Trusted emergency restoration services for Morningside residents and businesses. Phill McGurk - Master Restorer serving Morningside, Brisbane. Insurance approved. Call 24/7.`,
  keywords: [
    'Morningside water damage restoration',
    'Morningside fire damage repair',
    'Morningside mould remediation',
    'Morningside storm damage',
    'Morningside emergency restoration',
    'Morningside Master Restorer',
    'Phill McGurk Morningside',
    'Morningside insurance restoration',
    '24 hour emergency Morningside',
    'Brisbane disaster recovery'
  ],
  openGraph: {
    title: 'Morningside Disaster Recovery - Master Restorer Services',
    description: 'Trusted emergency restoration services for Morningside residents and businesses',
    images: ['/images/brisbane-morningside-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/brisbane/morningside`
  }
};

const MorningsidePage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Morningside?",
      answer: "Our Morningside emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Brisbane, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Morningside properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Morningside property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Morningside?",
      answer: "We service all property types in Morningside including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Morningside?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Morningside properties."
    },
    {
      question: "What certifications does your Morningside team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Morningside"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Morningside",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/brisbane/morningside`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Morningside", "Brisbane", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Brisbane', url: '/locations/brisbane' },
          { name: 'Morningside', url: '/locations/brisbane/morningside' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Morningside"
        city="Brisbane"
        title="Master Restorer Services in Morningside"
        subtitle="Trusted emergency restoration services for Morningside residents and businesses"
        image="/images/brisbane-morningside-hero.webp"
        tier="established"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Morningside
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Morningside property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Morningside
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Morningside Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Brisbane Team:</strong> Fast response times to Morningside</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Morningside Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Morningside, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Morningside Property Types</h3>
              <p>
                We service all residential homes, strata properties, commercial buildings, and retail spaces in Morningside.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Morningside"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Morningside"
        city="Brisbane"
      />

      <EmergencyCTA
        suburb="Morningside"
        message="Emergency in Morningside? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default MorningsidePage;