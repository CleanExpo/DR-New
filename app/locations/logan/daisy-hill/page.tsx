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
  title: `Daisy Hill Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Premium 24/7 disaster recovery services for Daisy Hill's prestigious properties. Phill McGurk - Master Restorer serving Daisy Hill, Logan. Insurance approved. Call 24/7.`,
  keywords: [
    'Daisy Hill water damage restoration',
    'Daisy Hill fire damage repair',
    'Daisy Hill mould remediation',
    'Daisy Hill storm damage',
    'Daisy Hill emergency restoration',
    'Daisy Hill Master Restorer',
    'Phill McGurk Daisy Hill',
    'Daisy Hill insurance restoration',
    '24 hour emergency Daisy Hill',
    'Logan disaster recovery'
  ],
  openGraph: {
    title: 'Daisy Hill Disaster Recovery - Master Restorer Services',
    description: 'Premium 24/7 disaster recovery services for Daisy Hill's prestigious properties',
    images: ['/images/logan-daisy-hill-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/logan/daisy-hill`
  }
};

const DaisyHillPage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Daisy Hill?",
      answer: "Our Daisy Hill emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Logan, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Daisy Hill properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Daisy Hill property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Daisy Hill?",
      answer: "We service all property types in Daisy Hill including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Daisy Hill?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Daisy Hill properties."
    },
    {
      question: "What certifications does your Daisy Hill team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Daisy Hill"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Daisy Hill",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/logan/daisy-hill`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Daisy Hill", "Logan", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Logan', url: '/locations/logan' },
          { name: 'Daisy Hill', url: '/locations/logan/daisy-hill' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Daisy Hill"
        city="Logan"
        title="Master Restorer Services in Daisy Hill"
        subtitle="Premium 24/7 disaster recovery services for Daisy Hill's prestigious properties"
        image="/images/logan-daisy-hill-hero.webp"
        tier="premium"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Daisy Hill
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Daisy Hill property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Daisy Hill
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Daisy Hill Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Logan Team:</strong> Fast response times to Daisy Hill</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Daisy Hill Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Daisy Hill, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Daisy Hill Property Types</h3>
              <p>
                Our team specializes in high-value residential properties, luxury homes, and prestigious commercial buildings throughout Daisy Hill.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Daisy Hill"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Daisy Hill"
        city="Logan"
      />

      <EmergencyCTA
        suburb="Daisy Hill"
        message="Emergency in Daisy Hill? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default DaisyHillPage;