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
  title: `Loganholme Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Trusted emergency restoration services for Loganholme residents and businesses. Phill McGurk - Master Restorer serving Loganholme, Logan. Insurance approved. Call 24/7.`,
  keywords: [
    'Loganholme water damage restoration',
    'Loganholme fire damage repair',
    'Loganholme mould remediation',
    'Loganholme storm damage',
    'Loganholme emergency restoration',
    'Loganholme Master Restorer',
    'Phill McGurk Loganholme',
    'Loganholme insurance restoration',
    '24 hour emergency Loganholme',
    'Logan disaster recovery'
  ],
  openGraph: {
    title: 'Loganholme Disaster Recovery - Master Restorer Services',
    description: 'Trusted emergency restoration services for Loganholme residents and businesses',
    images: ['/images/logan-loganholme-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/logan/loganholme`
  }
};

const LoganholmePage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Loganholme?",
      answer: "Our Loganholme emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Logan, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Loganholme properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Loganholme property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Loganholme?",
      answer: "We service all property types in Loganholme including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Loganholme?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Loganholme properties."
    },
    {
      question: "What certifications does your Loganholme team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Loganholme"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Loganholme",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/logan/loganholme`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Loganholme", "Logan", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Logan', url: '/locations/logan' },
          { name: 'Loganholme', url: '/locations/logan/loganholme' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Loganholme"
        city="Logan"
        title="Master Restorer Services in Loganholme"
        subtitle="Trusted emergency restoration services for Loganholme residents and businesses"
        image="/images/logan-loganholme-hero.webp"
        tier="established"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Loganholme
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Loganholme property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Loganholme
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Loganholme Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Logan Team:</strong> Fast response times to Loganholme</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Loganholme Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Loganholme, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Loganholme Property Types</h3>
              <p>
                We service all residential homes, strata properties, commercial buildings, and retail spaces in Loganholme.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Loganholme"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Loganholme"
        city="Logan"
      />

      <EmergencyCTA
        suburb="Loganholme"
        message="Emergency in Loganholme? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default LoganholmePage;