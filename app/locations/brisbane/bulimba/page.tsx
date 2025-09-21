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
  title: `Bulimba Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Premium 24/7 disaster recovery services for Bulimba's prestigious properties. Phill McGurk - Master Restorer serving Bulimba, Brisbane. Insurance approved. Call 24/7.`,
  keywords: [
    'Bulimba water damage restoration',
    'Bulimba fire damage repair',
    'Bulimba mould remediation',
    'Bulimba storm damage',
    'Bulimba emergency restoration',
    'Bulimba Master Restorer',
    'Phill McGurk Bulimba',
    'Bulimba insurance restoration',
    '24 hour emergency Bulimba',
    'Brisbane disaster recovery'
  ],
  openGraph: {
    title: 'Bulimba Disaster Recovery - Master Restorer Services',
    description: 'Premium 24/7 disaster recovery services for Bulimba's prestigious properties',
    images: ['/images/brisbane-bulimba-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/brisbane/bulimba`
  }
};

const BulimbaPage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Bulimba?",
      answer: "Our Bulimba emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Brisbane, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Bulimba properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Bulimba property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Bulimba?",
      answer: "We service all property types in Bulimba including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Bulimba?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Bulimba properties."
    },
    {
      question: "What certifications does your Bulimba team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Bulimba"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Bulimba",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/brisbane/bulimba`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Bulimba", "Brisbane", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Brisbane', url: '/locations/brisbane' },
          { name: 'Bulimba', url: '/locations/brisbane/bulimba' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Bulimba"
        city="Brisbane"
        title="Master Restorer Services in Bulimba"
        subtitle="Premium 24/7 disaster recovery services for Bulimba's prestigious properties"
        image="/images/brisbane-bulimba-hero.webp"
        tier="premium"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Bulimba
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Bulimba property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Bulimba
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Bulimba Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Brisbane Team:</strong> Fast response times to Bulimba</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Bulimba Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Bulimba, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Bulimba Property Types</h3>
              <p>
                Our team specializes in high-value residential properties, luxury homes, and prestigious commercial buildings throughout Bulimba.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Bulimba"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Bulimba"
        city="Brisbane"
      />

      <EmergencyCTA
        suburb="Bulimba"
        message="Emergency in Bulimba? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default BulimbaPage;