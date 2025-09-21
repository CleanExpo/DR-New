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
  title: `Karalee Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Premium 24/7 disaster recovery services for Karalee's prestigious properties. Phill McGurk - Master Restorer serving Karalee, Ipswich. Insurance approved. Call 24/7.`,
  keywords: [
    'Karalee water damage restoration',
    'Karalee fire damage repair',
    'Karalee mould remediation',
    'Karalee storm damage',
    'Karalee emergency restoration',
    'Karalee Master Restorer',
    'Phill McGurk Karalee',
    'Karalee insurance restoration',
    '24 hour emergency Karalee',
    'Ipswich disaster recovery'
  ],
  openGraph: {
    title: 'Karalee Disaster Recovery - Master Restorer Services',
    description: 'Premium 24/7 disaster recovery services for Karalee's prestigious properties',
    images: ['/images/ipswich-karalee-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/ipswich/karalee`
  }
};

const KaraleePage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Karalee?",
      answer: "Our Karalee emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Ipswich, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Karalee properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Karalee property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Karalee?",
      answer: "We service all property types in Karalee including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Karalee?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Karalee properties."
    },
    {
      question: "What certifications does your Karalee team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Karalee"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Karalee",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/ipswich/karalee`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Karalee", "Ipswich", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Ipswich', url: '/locations/ipswich' },
          { name: 'Karalee', url: '/locations/ipswich/karalee' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Karalee"
        city="Ipswich"
        title="Master Restorer Services in Karalee"
        subtitle="Premium 24/7 disaster recovery services for Karalee's prestigious properties"
        image="/images/ipswich-karalee-hero.webp"
        tier="premium"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Karalee
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Karalee property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Karalee
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Karalee Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Ipswich Team:</strong> Fast response times to Karalee</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Karalee Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Karalee, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Karalee Property Types</h3>
              <p>
                Our team specializes in high-value residential properties, luxury homes, and prestigious commercial buildings throughout Karalee.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Karalee"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Karalee"
        city="Ipswich"
      />

      <EmergencyCTA
        suburb="Karalee"
        message="Emergency in Karalee? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default KaraleePage;