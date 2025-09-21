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
  title: `Augustine Heights Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Premium 24/7 disaster recovery services for Augustine Heights's prestigious properties. Phill McGurk - Master Restorer serving Augustine Heights, Ipswich. Insurance approved. Call 24/7.`,
  keywords: [
    'Augustine Heights water damage restoration',
    'Augustine Heights fire damage repair',
    'Augustine Heights mould remediation',
    'Augustine Heights storm damage',
    'Augustine Heights emergency restoration',
    'Augustine Heights Master Restorer',
    'Phill McGurk Augustine Heights',
    'Augustine Heights insurance restoration',
    '24 hour emergency Augustine Heights',
    'Ipswich disaster recovery'
  ],
  openGraph: {
    title: 'Augustine Heights Disaster Recovery - Master Restorer Services',
    description: 'Premium 24/7 disaster recovery services for Augustine Heights's prestigious properties',
    images: ['/images/ipswich-augustine-heights-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/ipswich/augustine-heights`
  }
};

const AugustineHeightsPage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Augustine Heights?",
      answer: "Our Augustine Heights emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Ipswich, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Augustine Heights properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Augustine Heights property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Augustine Heights?",
      answer: "We service all property types in Augustine Heights including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Augustine Heights?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Augustine Heights properties."
    },
    {
      question: "What certifications does your Augustine Heights team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Augustine Heights"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Augustine Heights",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/ipswich/augustine-heights`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Augustine Heights", "Ipswich", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Ipswich', url: '/locations/ipswich' },
          { name: 'Augustine Heights', url: '/locations/ipswich/augustine-heights' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Augustine Heights"
        city="Ipswich"
        title="Master Restorer Services in Augustine Heights"
        subtitle="Premium 24/7 disaster recovery services for Augustine Heights's prestigious properties"
        image="/images/ipswich-augustine-heights-hero.webp"
        tier="premium"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Augustine Heights
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Augustine Heights property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Augustine Heights
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Augustine Heights Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Ipswich Team:</strong> Fast response times to Augustine Heights</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Augustine Heights Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Augustine Heights, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Augustine Heights Property Types</h3>
              <p>
                Our team specializes in high-value residential properties, luxury homes, and prestigious commercial buildings throughout Augustine Heights.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Augustine Heights"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Augustine Heights"
        city="Ipswich"
      />

      <EmergencyCTA
        suburb="Augustine Heights"
        message="Emergency in Augustine Heights? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default AugustineHeightsPage;