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
  title: `Slacks Creek Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Fast, reliable disaster recovery services for the Slacks Creek community. Phill McGurk - Master Restorer serving Slacks Creek, Logan. Insurance approved. Call 24/7.`,
  keywords: [
    'Slacks Creek water damage restoration',
    'Slacks Creek fire damage repair',
    'Slacks Creek mould remediation',
    'Slacks Creek storm damage',
    'Slacks Creek emergency restoration',
    'Slacks Creek Master Restorer',
    'Phill McGurk Slacks Creek',
    'Slacks Creek insurance restoration',
    '24 hour emergency Slacks Creek',
    'Logan disaster recovery'
  ],
  openGraph: {
    title: 'Slacks Creek Disaster Recovery - Master Restorer Services',
    description: 'Fast, reliable disaster recovery services for the Slacks Creek community',
    images: ['/images/logan-slacks-creek-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/logan/slacks-creek`
  }
};

const SlacksCreekPage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Slacks Creek?",
      answer: "Our Slacks Creek emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Logan, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Slacks Creek properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Slacks Creek property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Slacks Creek?",
      answer: "We service all property types in Slacks Creek including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Slacks Creek?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Slacks Creek properties."
    },
    {
      question: "What certifications does your Slacks Creek team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Slacks Creek"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Slacks Creek",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/logan/slacks-creek`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Slacks Creek", "Logan", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Logan', url: '/locations/logan' },
          { name: 'Slacks Creek', url: '/locations/logan/slacks-creek' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Slacks Creek"
        city="Logan"
        title="Master Restorer Services in Slacks Creek"
        subtitle="Fast, reliable disaster recovery services for the Slacks Creek community"
        image="/images/logan-slacks-creek-hero.webp"
        tier="growing"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Slacks Creek
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Slacks Creek property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Slacks Creek
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Slacks Creek Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Logan Team:</strong> Fast response times to Slacks Creek</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Slacks Creek Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Slacks Creek, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Slacks Creek Property Types</h3>
              <p>
                From family homes to commercial properties, we provide professional restoration services to all Slacks Creek residents and businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Slacks Creek"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Slacks Creek"
        city="Logan"
      />

      <EmergencyCTA
        suburb="Slacks Creek"
        message="Emergency in Slacks Creek? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default SlacksCreekPage;