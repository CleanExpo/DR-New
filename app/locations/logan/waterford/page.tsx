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
  title: `Waterford Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Fast, reliable disaster recovery services for the Waterford community. Phill McGurk - Master Restorer serving Waterford, Logan. Insurance approved. Call 24/7.`,
  keywords: [
    'Waterford water damage restoration',
    'Waterford fire damage repair',
    'Waterford mould remediation',
    'Waterford storm damage',
    'Waterford emergency restoration',
    'Waterford Master Restorer',
    'Phill McGurk Waterford',
    'Waterford insurance restoration',
    '24 hour emergency Waterford',
    'Logan disaster recovery'
  ],
  openGraph: {
    title: 'Waterford Disaster Recovery - Master Restorer Services',
    description: 'Fast, reliable disaster recovery services for the Waterford community',
    images: ['/images/logan-waterford-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/logan/waterford`
  }
};

const WaterfordPage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Waterford?",
      answer: "Our Waterford emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Logan, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Waterford properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Waterford property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Waterford?",
      answer: "We service all property types in Waterford including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Waterford?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Waterford properties."
    },
    {
      question: "What certifications does your Waterford team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Waterford"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Waterford",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/logan/waterford`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Waterford", "Logan", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Logan', url: '/locations/logan' },
          { name: 'Waterford', url: '/locations/logan/waterford' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Waterford"
        city="Logan"
        title="Master Restorer Services in Waterford"
        subtitle="Fast, reliable disaster recovery services for the Waterford community"
        image="/images/logan-waterford-hero.webp"
        tier="growing"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Waterford
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Waterford property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Waterford
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Waterford Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Logan Team:</strong> Fast response times to Waterford</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Waterford Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Waterford, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Waterford Property Types</h3>
              <p>
                From family homes to commercial properties, we provide professional restoration services to all Waterford residents and businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Waterford"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Waterford"
        city="Logan"
      />

      <EmergencyCTA
        suburb="Waterford"
        message="Emergency in Waterford? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default WaterfordPage;