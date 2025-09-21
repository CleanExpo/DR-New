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
  title: `Redbank Plains Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Fast, reliable disaster recovery services for the Redbank Plains community. Phill McGurk - Master Restorer serving Redbank Plains, Ipswich. Insurance approved. Call 24/7.`,
  keywords: [
    'Redbank Plains water damage restoration',
    'Redbank Plains fire damage repair',
    'Redbank Plains mould remediation',
    'Redbank Plains storm damage',
    'Redbank Plains emergency restoration',
    'Redbank Plains Master Restorer',
    'Phill McGurk Redbank Plains',
    'Redbank Plains insurance restoration',
    '24 hour emergency Redbank Plains',
    'Ipswich disaster recovery'
  ],
  openGraph: {
    title: 'Redbank Plains Disaster Recovery - Master Restorer Services',
    description: 'Fast, reliable disaster recovery services for the Redbank Plains community',
    images: ['/images/ipswich-redbank-plains-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/ipswich/redbank-plains`
  }
};

const RedbankPlainsPage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Redbank Plains?",
      answer: "Our Redbank Plains emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Ipswich, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Redbank Plains properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Redbank Plains property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Redbank Plains?",
      answer: "We service all property types in Redbank Plains including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Redbank Plains?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Redbank Plains properties."
    },
    {
      question: "What certifications does your Redbank Plains team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Redbank Plains"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Redbank Plains",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/ipswich/redbank-plains`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Redbank Plains", "Ipswich", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Ipswich', url: '/locations/ipswich' },
          { name: 'Redbank Plains', url: '/locations/ipswich/redbank-plains' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Redbank Plains"
        city="Ipswich"
        title="Master Restorer Services in Redbank Plains"
        subtitle="Fast, reliable disaster recovery services for the Redbank Plains community"
        image="/images/ipswich-redbank-plains-hero.webp"
        tier="growing"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Redbank Plains
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Redbank Plains property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Redbank Plains
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Redbank Plains Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Ipswich Team:</strong> Fast response times to Redbank Plains</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Redbank Plains Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Redbank Plains, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Redbank Plains Property Types</h3>
              <p>
                From family homes to commercial properties, we provide professional restoration services to all Redbank Plains residents and businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Redbank Plains"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Redbank Plains"
        city="Ipswich"
      />

      <EmergencyCTA
        suburb="Redbank Plains"
        message="Emergency in Redbank Plains? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default RedbankPlainsPage;