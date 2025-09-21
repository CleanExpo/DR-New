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
  title: `Springfield Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Trusted emergency restoration services for Springfield residents and businesses. Phill McGurk - Master Restorer serving Springfield, Ipswich. Insurance approved. Call 24/7.`,
  keywords: [
    'Springfield water damage restoration',
    'Springfield fire damage repair',
    'Springfield mould remediation',
    'Springfield storm damage',
    'Springfield emergency restoration',
    'Springfield Master Restorer',
    'Phill McGurk Springfield',
    'Springfield insurance restoration',
    '24 hour emergency Springfield',
    'Ipswich disaster recovery'
  ],
  openGraph: {
    title: 'Springfield Disaster Recovery - Master Restorer Services',
    description: 'Trusted emergency restoration services for Springfield residents and businesses',
    images: ['/images/ipswich-springfield-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/ipswich/springfield`
  }
};

const SpringfieldPage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Springfield?",
      answer: "Our Springfield emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Ipswich, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Springfield properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Springfield property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Springfield?",
      answer: "We service all property types in Springfield including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Springfield?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Springfield properties."
    },
    {
      question: "What certifications does your Springfield team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Springfield"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Springfield",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/ipswich/springfield`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Springfield", "Ipswich", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Ipswich', url: '/locations/ipswich' },
          { name: 'Springfield', url: '/locations/ipswich/springfield' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Springfield"
        city="Ipswich"
        title="Master Restorer Services in Springfield"
        subtitle="Trusted emergency restoration services for Springfield residents and businesses"
        image="/images/ipswich-springfield-hero.webp"
        tier="established"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Springfield
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Springfield property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Springfield
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Springfield Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Ipswich Team:</strong> Fast response times to Springfield</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Springfield Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Springfield, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Springfield Property Types</h3>
              <p>
                We service all residential homes, strata properties, commercial buildings, and retail spaces in Springfield.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Springfield"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Springfield"
        city="Ipswich"
      />

      <EmergencyCTA
        suburb="Springfield"
        message="Emergency in Springfield? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default SpringfieldPage;