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
  title: `Tanah Merah Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Trusted emergency restoration services for Tanah Merah residents and businesses. Phill McGurk - Master Restorer serving Tanah Merah, Logan. Insurance approved. Call 24/7.`,
  keywords: [
    'Tanah Merah water damage restoration',
    'Tanah Merah fire damage repair',
    'Tanah Merah mould remediation',
    'Tanah Merah storm damage',
    'Tanah Merah emergency restoration',
    'Tanah Merah Master Restorer',
    'Phill McGurk Tanah Merah',
    'Tanah Merah insurance restoration',
    '24 hour emergency Tanah Merah',
    'Logan disaster recovery'
  ],
  openGraph: {
    title: 'Tanah Merah Disaster Recovery - Master Restorer Services',
    description: 'Trusted emergency restoration services for Tanah Merah residents and businesses',
    images: ['/images/logan-tanah-merah-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/logan/tanah-merah`
  }
};

const TanahMerahPage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in Tanah Merah?",
      answer: "Our Tanah Merah emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Logan, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for Tanah Merah properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for Tanah Merah property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in Tanah Merah?",
      answer: "We service all property types in Tanah Merah including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in Tanah Merah?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to Tanah Merah properties."
    },
    {
      question: "What certifications does your Tanah Merah team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery Tanah Merah"
        address={{
          streetAddress: "Service Area",
          addressLocality: "Tanah Merah",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/logan/tanah-merah`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["Tanah Merah", "Logan", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Logan', url: '/locations/logan' },
          { name: 'Tanah Merah', url: '/locations/logan/tanah-merah' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="Tanah Merah"
        city="Logan"
        title="Master Restorer Services in Tanah Merah"
        subtitle="Trusted emergency restoration services for Tanah Merah residents and businesses"
        image="/images/logan-tanah-merah-hero.webp"
        tier="established"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in Tanah Merah
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your Tanah Merah property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our Tanah Merah
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why Tanah Merah Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Logan Team:</strong> Fast response times to Tanah Merah</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our Tanah Merah Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout Tanah Merah, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All Tanah Merah Property Types</h3>
              <p>
                We service all residential homes, strata properties, commercial buildings, and retail spaces in Tanah Merah.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="Tanah Merah"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="Tanah Merah"
        city="Logan"
      />

      <EmergencyCTA
        suburb="Tanah Merah"
        message="Emergency in Tanah Merah? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default TanahMerahPage;