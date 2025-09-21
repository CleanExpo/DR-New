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
  title: `Forest Lake Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Trusted emergency restoration services for Forest Lake residents and businesses. Phill McGurk - Master Restorer serving Forest Lake, Ipswich. Insurance approved. Call 24/7.`,
  keywords: [
    'Forest Lake water damage restoration',
    'Forest Lake fire damage repair',
    'Forest Lake mould remediation',
    'Forest Lake storm damage',
    'Forest Lake emergency restoration',
    'Forest Lake Master Restorer',
    'Phill McGurk Forest Lake',
    'Forest Lake insurance restoration',
    '24 hour emergency Forest Lake',
    'Ipswich disaster recovery'
  ],
  openGraph: {
    title: 'Forest Lake Disaster Recovery - Master Restorer Services',
    description: 'Trusted emergency restoration services for Forest Lake residents and businesses',
    images: ['/images/ipswich-forest-lake-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/ipswich/forest-lake`
  }
};

const ForestLakePage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Forest Lake?",
      answer: "Our Forest Lake emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Ipswich, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Forest Lake properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Forest Lake property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Forest Lake?",
      answer: "We service all property types in Forest Lake including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Forest Lake?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Forest Lake properties."
    },
    {
      question: "What certifications does your Forest Lake team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Forest Lake"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Forest Lake",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/ipswich/forest-lake`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Forest Lake", "Ipswich", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Ipswich', url: '/locations/ipswich' },
          { name: 'Forest Lake', url: '/locations/ipswich/forest-lake' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Forest Lake"
        city="Ipswich"
        title="Master Restorer Services in Forest Lake"
        subtitle="Trusted emergency restoration services for Forest Lake residents and businesses"
        image="/images/ipswich-forest-lake-hero.webp"
        tier="established"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Forest Lake
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Forest Lake property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Forest Lake
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Forest Lake Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Ipswich Team:</strong> Fast response times to Forest Lake</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Forest Lake Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Forest Lake, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Forest Lake Property Types</h3>
              <p>
                We service all residential homes, strata properties, commercial buildings, and retail spaces in Forest Lake.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Forest Lake"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Forest Lake"
        city="Ipswich"
      />

      <EmergencyCTA
        suburb="Forest Lake"
        message="Emergency in Forest Lake? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default ForestLakePage;