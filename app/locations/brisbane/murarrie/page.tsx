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
  title: `Murarrie Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Fast, reliable disaster recovery services for the Murarrie community. Phill McGurk - Master Restorer serving Murarrie, Brisbane. Insurance approved. Call 24/7.`,
  keywords: [
    'Murarrie water damage restoration',
    'Murarrie fire damage repair',
    'Murarrie mould remediation',
    'Murarrie storm damage',
    'Murarrie emergency restoration',
    'Murarrie Master Restorer',
    'Phill McGurk Murarrie',
    'Murarrie insurance restoration',
    '24 hour emergency Murarrie',
    'Brisbane disaster recovery'
  ],
  openGraph: {
    title: 'Murarrie Disaster Recovery - Master Restorer Services',
    description: 'Fast, reliable disaster recovery services for the Murarrie community',
    images: ['/images/brisbane-murarrie-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/brisbane/murarrie`
  }
};

const MurarriePage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Murarrie?",
      answer: "Our Murarrie emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Brisbane, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Murarrie properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Murarrie property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Murarrie?",
      answer: "We service all property types in Murarrie including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Murarrie?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Murarrie properties."
    },
    {
      question: "What certifications does your Murarrie team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Murarrie"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Murarrie",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/brisbane/murarrie`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Murarrie", "Brisbane", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Brisbane', url: '/locations/brisbane' },
          { name: 'Murarrie', url: '/locations/brisbane/murarrie' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Murarrie"
        city="Brisbane"
        title="Master Restorer Services in Murarrie"
        subtitle="Fast, reliable disaster recovery services for the Murarrie community"
        image="/images/brisbane-murarrie-hero.webp"
        tier="growing"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Murarrie
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Murarrie property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Murarrie
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Murarrie Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Brisbane Team:</strong> Fast response times to Murarrie</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Murarrie Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Murarrie, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Murarrie Property Types</h3>
              <p>
                From family homes to commercial properties, we provide professional restoration services to all Murarrie residents and businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Murarrie"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Murarrie"
        city="Brisbane"
      />

      <EmergencyCTA
        suburb="Murarrie"
        message="Emergency in Murarrie? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default MurarriePage;