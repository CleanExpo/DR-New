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
  title: `Raceview Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Fast, reliable disaster recovery services for the Raceview community. Phill McGurk - Master Restorer serving Raceview, Ipswich. Insurance approved. Call 24/7.`,
  keywords: [
    'Raceview water damage restoration',
    'Raceview fire damage repair',
    'Raceview mould remediation',
    'Raceview storm damage',
    'Raceview emergency restoration',
    'Raceview Master Restorer',
    'Phill McGurk Raceview',
    'Raceview insurance restoration',
    '24 hour emergency Raceview',
    'Ipswich disaster recovery'
  ],
  openGraph: {
    title: 'Raceview Disaster Recovery - Master Restorer Services',
    description: 'Fast, reliable disaster recovery services for the Raceview community',
    images: ['/images/ipswich-raceview-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/ipswich/raceview`
  }
};

const RaceviewPage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Raceview?",
      answer: "Our Raceview emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Ipswich, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Raceview properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Raceview property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Raceview?",
      answer: "We service all property types in Raceview including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Raceview?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Raceview properties."
    },
    {
      question: "What certifications does your Raceview team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Raceview"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Raceview",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/ipswich/raceview`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Raceview", "Ipswich", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Ipswich', url: '/locations/ipswich' },
          { name: 'Raceview', url: '/locations/ipswich/raceview' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Raceview"
        city="Ipswich"
        title="Master Restorer Services in Raceview"
        subtitle="Fast, reliable disaster recovery services for the Raceview community"
        image="/images/ipswich-raceview-hero.webp"
        tier="growing"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Raceview
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Raceview property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Raceview
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Raceview Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Ipswich Team:</strong> Fast response times to Raceview</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Raceview Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Raceview, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Raceview Property Types</h3>
              <p>
                From family homes to commercial properties, we provide professional restoration services to all Raceview residents and businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Raceview"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Raceview"
        city="Ipswich"
      />

      <EmergencyCTA
        suburb="Raceview"
        message="Emergency in Raceview? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default RaceviewPage;