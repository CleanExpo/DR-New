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
  title: `New Farm Disaster Recovery | Emergency Restoration | Master Restorer`,
  description: `Premium 24/7 disaster recovery services for New Farm's prestigious properties. Phill McGurk - Master Restorer serving New Farm, Brisbane. Insurance approved. Call 24/7.`,
  keywords: [
    'New Farm water damage restoration',
    'New Farm fire damage repair',
    'New Farm mould remediation',
    'New Farm storm damage',
    'New Farm emergency restoration',
    'New Farm Master Restorer',
    'Phill McGurk New Farm',
    'New Farm insurance restoration',
    '24 hour emergency New Farm',
    'Brisbane disaster recovery'
  ],
  openGraph: {
    title: 'New Farm Disaster Recovery - Master Restorer Services',
    description: 'Premium 24/7 disaster recovery services for New Farm's prestigious properties',
    images: ['/images/brisbane-new-farm-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: `https://disaster-recovery-seven.vercel.app/locations/brisbane/new-farm`
  }
};

const NewFarmPage = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in New Farm?",
      answer: "Our New Farm emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in Brisbane, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for New Farm properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for New Farm property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in New Farm?",
      answer: "We service all property types in New Farm including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in New Farm?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to New Farm properties."
    },
    {
      question: "What certifications does your New Farm team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery New Farm"
        address={{
          streetAddress: "Service Area",
          addressLocality: "New Farm",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={`https://disaster-recovery-seven.vercel.app/locations/brisbane/new-farm`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["New Farm", "Brisbane", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: 'Brisbane', url: '/locations/brisbane' },
          { name: 'New Farm', url: '/locations/brisbane/new-farm' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="New Farm"
        city="Brisbane"
        title="Master Restorer Services in New Farm"
        subtitle="Premium 24/7 disaster recovery services for New Farm's prestigious properties"
        image="/images/brisbane-new-farm-hero.webp"
        tier="premium"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in New Farm
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your New Farm property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our New Farm
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why New Farm Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local Brisbane Team:</strong> Fast response times to New Farm</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our New Farm Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout New Farm, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All New Farm Property Types</h3>
              <p>
                Our team specializes in high-value residential properties, luxury homes, and prestigious commercial buildings throughout New Farm.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="New Farm"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="New Farm"
        city="Brisbane"
      />

      <EmergencyCTA
        suburb="New Farm"
        message="Emergency in New Farm? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default NewFarmPage;