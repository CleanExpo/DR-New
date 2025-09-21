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
  title: `Goodna Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Fast, reliable disaster recovery services for the Goodna community. Phill McGurk - Master Restorer serving Goodna, Ipswich. Insurance approved. Call 24/7.`,
  keywords: [
    'Goodna water damage restoration',
    'Goodna fire damage repair',
    'Goodna mould remediation',
    'Goodna storm damage',
    'Goodna emergency restoration',
    'Goodna Master Restorer',
    'Phill McGurk Goodna',
    'Goodna insurance restoration',
    '24 hour emergency Goodna',
    'Ipswich disaster recovery'
  ],
  openGraph: {
    title: 'Goodna Disaster Recovery - Master Restorer Services',
    description: 'Fast, reliable disaster recovery services for the Goodna community',
    images: ['/images/ipswich-goodna-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/ipswich/goodna`
  }
};

const GoodnaPage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Goodna?",
      answer: "Our Goodna emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Ipswich, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Goodna properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Goodna property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Goodna?",
      answer: "We service all property types in Goodna including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Goodna?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Goodna properties."
    },
    {
      question: "What certifications does your Goodna team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Goodna"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Goodna",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/ipswich/goodna`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Goodna", "Ipswich", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Ipswich', url: '/locations/ipswich' },
          { name: 'Goodna', url: '/locations/ipswich/goodna' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Goodna"
        city="Ipswich"
        title="Master Restorer Services in Goodna"
        subtitle="Fast, reliable disaster recovery services for the Goodna community"
        image="/images/ipswich-goodna-hero.webp"
        tier="growing"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Goodna
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Goodna property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Goodna
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Goodna Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Ipswich Team:</strong> Fast response times to Goodna</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Goodna Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Goodna, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Goodna Property Types</h3>
              <p>
                From family homes to commercial properties, we provide professional restoration services to all Goodna residents and businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Goodna"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Goodna"
        city="Ipswich"
      />

      <EmergencyCTA
        suburb="Goodna"
        message="Emergency in Goodna? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default GoodnaPage;