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
  title: `Carina Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Trusted emergency restoration services for Carina residents and businesses. Phill McGurk - Master Restorer serving Carina, Brisbane. Insurance approved. Call 24/7.`,
  keywords: [
    'Carina water damage restoration',
    'Carina fire damage repair',
    'Carina mould remediation',
    'Carina storm damage',
    'Carina emergency restoration',
    'Carina Master Restorer',
    'Phill McGurk Carina',
    'Carina insurance restoration',
    '24 hour emergency Carina',
    'Brisbane disaster recovery'
  ],
  openGraph: {
    title: 'Carina Disaster Recovery - Master Restorer Services',
    description: 'Trusted emergency restoration services for Carina residents and businesses',
    images: ['/images/brisbane-carina-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/brisbane/carina`
  }
};

const CarinaPage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Carina?",
      answer: "Our Carina emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Brisbane, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Carina properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Carina property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Carina?",
      answer: "We service all property types in Carina including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Carina?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Carina properties."
    },
    {
      question: "What certifications does your Carina team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Carina"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Carina",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/brisbane/carina`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Carina", "Brisbane", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Brisbane', url: '/locations/brisbane' },
          { name: 'Carina', url: '/locations/brisbane/carina' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Carina"
        city="Brisbane"
        title="Master Restorer Services in Carina"
        subtitle="Trusted emergency restoration services for Carina residents and businesses"
        image="/images/brisbane-carina-hero.webp"
        tier="established"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Carina
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Carina property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Carina
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Carina Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Brisbane Team:</strong> Fast response times to Carina</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Carina Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Carina, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Carina Property Types</h3>
              <p>
                We service all residential homes, strata properties, commercial buildings, and retail spaces in Carina.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Carina"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Carina"
        city="Brisbane"
      />

      <EmergencyCTA
        suburb="Carina"
        message="Emergency in Carina? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default CarinaPage;