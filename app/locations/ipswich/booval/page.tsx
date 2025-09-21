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
  title: `Booval Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Fast, reliable disaster recovery services for the Booval community. Phill McGurk - Master Restorer serving Booval, Ipswich. Insurance approved. Call 24/7.`,
  keywords: [
    'Booval water damage restoration',
    'Booval fire damage repair',
    'Booval mould remediation',
    'Booval storm damage',
    'Booval emergency restoration',
    'Booval Master Restorer',
    'Phill McGurk Booval',
    'Booval insurance restoration',
    '24 hour emergency Booval',
    'Ipswich disaster recovery'
  ],
  openGraph: {
    title: 'Booval Disaster Recovery - Master Restorer Services',
    description: 'Fast, reliable disaster recovery services for the Booval community',
    images: ['/images/ipswich-booval-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/ipswich/booval`
  }
};

const BoovalPage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Booval?",
      answer: "Our Booval emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Ipswich, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Booval properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Booval property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Booval?",
      answer: "We service all property types in Booval including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Booval?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Booval properties."
    },
    {
      question: "What certifications does your Booval team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Booval"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Booval",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/ipswich/booval`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Booval", "Ipswich", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Ipswich', url: '/locations/ipswich' },
          { name: 'Booval', url: '/locations/ipswich/booval' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Booval"
        city="Ipswich"
        title="Master Restorer Services in Booval"
        subtitle="Fast, reliable disaster recovery services for the Booval community"
        image="/images/ipswich-booval-hero.webp"
        tier="growing"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Booval
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Booval property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Booval
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Booval Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Ipswich Team:</strong> Fast response times to Booval</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Booval Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Booval, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Booval Property Types</h3>
              <p>
                From family homes to commercial properties, we provide professional restoration services to all Booval residents and businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Booval"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Booval"
        city="Ipswich"
      />

      <EmergencyCTA
        suburb="Booval"
        message="Emergency in Booval? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default BoovalPage;