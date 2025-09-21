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
  title: `Eight Mile Plains Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Trusted emergency restoration services for Eight Mile Plains residents and businesses. Phill McGurk - Master Restorer serving Eight Mile Plains, Logan. Insurance approved. Call 24/7.`,
  keywords: [
    'Eight Mile Plains water damage restoration',
    'Eight Mile Plains fire damage repair',
    'Eight Mile Plains mould remediation',
    'Eight Mile Plains storm damage',
    'Eight Mile Plains emergency restoration',
    'Eight Mile Plains Master Restorer',
    'Phill McGurk Eight Mile Plains',
    'Eight Mile Plains insurance restoration',
    '24 hour emergency Eight Mile Plains',
    'Logan disaster recovery'
  ],
  openGraph: {
    title: 'Eight Mile Plains Disaster Recovery - Master Restorer Services',
    description: 'Trusted emergency restoration services for Eight Mile Plains residents and businesses',
    images: ['/images/logan-eight-mile-plains-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/logan/eight-mile-plains`
  }
};

const EightMilePlainsPage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Eight Mile Plains?",
      answer: "Our Eight Mile Plains emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Logan, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Eight Mile Plains properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Eight Mile Plains property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Eight Mile Plains?",
      answer: "We service all property types in Eight Mile Plains including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Eight Mile Plains?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Eight Mile Plains properties."
    },
    {
      question: "What certifications does your Eight Mile Plains team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Eight Mile Plains"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Eight Mile Plains",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/logan/eight-mile-plains`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Eight Mile Plains", "Logan", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Logan', url: '/locations/logan' },
          { name: 'Eight Mile Plains', url: '/locations/logan/eight-mile-plains' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Eight Mile Plains"
        city="Logan"
        title="Master Restorer Services in Eight Mile Plains"
        subtitle="Trusted emergency restoration services for Eight Mile Plains residents and businesses"
        image="/images/logan-eight-mile-plains-hero.webp"
        tier="established"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Eight Mile Plains
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Eight Mile Plains property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Eight Mile Plains
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Eight Mile Plains Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Logan Team:</strong> Fast response times to Eight Mile Plains</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Eight Mile Plains Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Eight Mile Plains, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Eight Mile Plains Property Types</h3>
              <p>
                We service all residential homes, strata properties, commercial buildings, and retail spaces in Eight Mile Plains.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Eight Mile Plains"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Eight Mile Plains"
        city="Logan"
      />

      <EmergencyCTA
        suburb="Eight Mile Plains"
        message="Emergency in Eight Mile Plains? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default EightMilePlainsPage;