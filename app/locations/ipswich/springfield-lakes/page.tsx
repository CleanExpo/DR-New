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
  title: `Springfield Lakes Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Premium 24/7 disaster recovery services for Springfield Lakes's prestigious properties. Phill McGurk - Master Restorer serving Springfield Lakes, Ipswich. Insurance approved. Call 24/7.`,
  keywords: [
    'Springfield Lakes water damage restoration',
    'Springfield Lakes fire damage repair',
    'Springfield Lakes mould remediation',
    'Springfield Lakes storm damage',
    'Springfield Lakes emergency restoration',
    'Springfield Lakes Master Restorer',
    'Phill McGurk Springfield Lakes',
    'Springfield Lakes insurance restoration',
    '24 hour emergency Springfield Lakes',
    'Ipswich disaster recovery'
  ],
  openGraph: {
    title: 'Springfield Lakes Disaster Recovery - Master Restorer Services',
    description: 'Premium 24/7 disaster recovery services for Springfield Lakes's prestigious properties',
    images: ['/images/ipswich-springfield-lakes-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/ipswich/springfield-lakes`
  }
};

const SpringfieldLakesPage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Springfield Lakes?",
      answer: "Our Springfield Lakes emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Ipswich, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Springfield Lakes properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Springfield Lakes property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Springfield Lakes?",
      answer: "We service all property types in Springfield Lakes including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Springfield Lakes?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Springfield Lakes properties."
    },
    {
      question: "What certifications does your Springfield Lakes team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Springfield Lakes"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Springfield Lakes",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/ipswich/springfield-lakes`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Springfield Lakes", "Ipswich", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Ipswich', url: '/locations/ipswich' },
          { name: 'Springfield Lakes', url: '/locations/ipswich/springfield-lakes' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Springfield Lakes"
        city="Ipswich"
        title="Master Restorer Services in Springfield Lakes"
        subtitle="Premium 24/7 disaster recovery services for Springfield Lakes's prestigious properties"
        image="/images/ipswich-springfield-lakes-hero.webp"
        tier="premium"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Springfield Lakes
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Springfield Lakes property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Springfield Lakes
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Springfield Lakes Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Ipswich Team:</strong> Fast response times to Springfield Lakes</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Springfield Lakes Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Springfield Lakes, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Springfield Lakes Property Types</h3>
              <p>
                Our team specializes in high-value residential properties, luxury homes, and prestigious commercial buildings throughout Springfield Lakes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Springfield Lakes"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Springfield Lakes"
        city="Ipswich"
      />

      <EmergencyCTA
        suburb="Springfield Lakes"
        message="Emergency in Springfield Lakes? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default SpringfieldLakesPage;