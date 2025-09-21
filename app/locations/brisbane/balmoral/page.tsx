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
  title: `Balmoral Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Fast, reliable disaster recovery services for the Balmoral community. Phill McGurk - Master Restorer serving Balmoral, Brisbane. Insurance approved. Call 24/7.`,
  keywords: [
    'Balmoral water damage restoration',
    'Balmoral fire damage repair',
    'Balmoral mould remediation',
    'Balmoral storm damage',
    'Balmoral emergency restoration',
    'Balmoral Master Restorer',
    'Phill McGurk Balmoral',
    'Balmoral insurance restoration',
    '24 hour emergency Balmoral',
    'Brisbane disaster recovery'
  ],
  openGraph: {
    title: 'Balmoral Disaster Recovery - Master Restorer Services',
    description: 'Fast, reliable disaster recovery services for the Balmoral community',
    images: ['/images/brisbane-balmoral-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/brisbane/balmoral`
  }
};

const BalmoralPage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Balmoral?",
      answer: "Our Balmoral emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Brisbane, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Balmoral properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Balmoral property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Balmoral?",
      answer: "We service all property types in Balmoral including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Balmoral?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Balmoral properties."
    },
    {
      question: "What certifications does your Balmoral team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Balmoral"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Balmoral",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/brisbane/balmoral`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Balmoral", "Brisbane", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Brisbane', url: '/locations/brisbane' },
          { name: 'Balmoral', url: '/locations/brisbane/balmoral' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Balmoral"
        city="Brisbane"
        title="Master Restorer Services in Balmoral"
        subtitle="Fast, reliable disaster recovery services for the Balmoral community"
        image="/images/brisbane-balmoral-hero.webp"
        tier="growing"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Balmoral
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Balmoral property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Balmoral
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Balmoral Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Brisbane Team:</strong> Fast response times to Balmoral</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Balmoral Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Balmoral, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Balmoral Property Types</h3>
              <p>
                From family homes to commercial properties, we provide professional restoration services to all Balmoral residents and businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Balmoral"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Balmoral"
        city="Brisbane"
      />

      <EmergencyCTA
        suburb="Balmoral"
        message="Emergency in Balmoral? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default BalmoralPage;