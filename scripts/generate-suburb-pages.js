const fs = require('fs');
const path = require('path');

// High-value suburbs for Brisbane, Ipswich, and Logan
const SUBURBS = {
  brisbane: {
    premium: ['Hamilton', 'Ascot', 'New Farm', 'Bulimba', 'Hawthorne'],
    established: ['Morningside', 'Norman Park', 'Seven Hills', 'Camp Hill', 'Carina'],
    growing: ['Cannon Hill', 'Murarrie', 'Balmoral', 'Tingalpa', 'Wynnum']
  },
  ipswich: {
    premium: ['Karalee', 'Brookwater', 'Springfield Lakes', 'Augustine Heights'],
    established: ['Bellbird Park', 'Camira', 'Springfield', 'Forest Lake'],
    growing: ['Redbank Plains', 'Goodna', 'Booval', 'Bundamba', 'Raceview']
  },
  logan: {
    premium: ['Springwood', 'Rochedale', 'Shailer Park', 'Daisy Hill'],
    established: ['Loganholme', 'Tanah Merah', 'Underwood', 'Eight Mile Plains'],
    growing: ['Slacks Creek', 'Meadowbrook', 'Waterford', 'Beenleigh', 'Eagleby']
  }
};

// Service types for each location
const SERVICES = [
  { slug: 'water-damage', name: 'Water Damage Restoration' },
  { slug: 'fire-damage', name: 'Fire Damage Restoration' },
  { slug: 'mould-remediation', name: 'Mould Remediation' },
  { slug: 'storm-damage', name: 'Storm Damage Repair' },
  { slug: 'commercial-restoration', name: 'Commercial Restoration' }
];

// Template for suburb landing pages
function generateSuburbPage(city, suburb, tier) {
  const suburbName = suburb;
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  const description = tier === 'premium'
    ? `Premium 24/7 disaster recovery services for ${suburbName}'s prestigious properties`
    : tier === 'established'
    ? `Trusted emergency restoration services for ${suburbName} residents and businesses`
    : `Fast, reliable disaster recovery services for the ${suburbName} community`;

  return `import React from 'react';
import { Metadata } from 'next';
import { LocationHero } from '@/components/LocationHero';
import { ServiceGrid } from '@/components/ServiceGrid';
import { LocalTestimonials } from '@/components/LocalTestimonials';
import { EmergencyCTA } from '@/components/EmergencyCTA';
import { LocalBusinessSchema } from '@/components/schema/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { FAQSchema } from '@/components/schema/FAQSchema';

export const metadata: Metadata = {
  title: \`${suburbName} Disaster Recovery | Emergency Restoration | Master Restorer\`,
  description: \`${description}. Phill McGurk - Master Restorer serving ${suburbName}, ${cityName}. Insurance approved. Call 24/7.\`,
  keywords: [
    '${suburbName} water damage restoration',
    '${suburbName} fire damage repair',
    '${suburbName} mould remediation',
    '${suburbName} storm damage',
    '${suburbName} emergency restoration',
    '${suburbName} Master Restorer',
    'Phill McGurk ${suburbName}',
    '${suburbName} insurance restoration',
    '24 hour emergency ${suburbName}',
    '${cityName} disaster recovery'
  ],
  openGraph: {
    title: '${suburbName} Disaster Recovery - Master Restorer Services',
    description: '${description}',
    images: ['/images/${city}-${suburb.toLowerCase().replace(/\s+/g, '-')}-restoration.webp'],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: \`https://disaster-recovery-seven.vercel.app/locations/${city}/${suburb.toLowerCase().replace(/\s+/g, '-')}\`
  }
};

const ${suburb.replace(/\s+/g, '')}Page = () => {
  const localFAQs = [
    {
      question: "How quickly can you respond to emergencies in ${suburbName}?",
      answer: "Our ${suburbName} emergency response team is available 24/7 with typical arrival times of 45-60 minutes. As a Master Restorer based in ${cityName}, Phill McGurk ensures rapid response to minimize damage."
    },
    {
      question: "Are you approved by insurance companies for ${suburbName} properties?",
      answer: "Yes, we work with all major insurance companies and are a preferred provider for ${suburbName} property restoration. We handle all documentation and direct billing."
    },
    {
      question: "What types of properties do you service in ${suburbName}?",
      answer: "We service all property types in ${suburbName} including residential homes, apartments, commercial buildings, strata properties, and industrial facilities."
    },
    {
      question: "Do you offer emergency tarping and board-up in ${suburbName}?",
      answer: "Yes, we provide immediate emergency services including tarping, board-up, and water extraction to prevent further damage to ${suburbName} properties."
    },
    {
      question: "What certifications does your ${suburbName} team hold?",
      answer: "Phill McGurk is one of the limited Master Restorers in Queensland, with IICRC certifications in water damage, fire restoration, and mould remediation."
    }
  ];

  return (
    <>
      <LocalBusinessSchema
        name="Disaster Recovery ${suburbName}"
        address={{
          streetAddress: "Service Area",
          addressLocality: "${suburbName}",
          addressRegion: "QLD",
          postalCode: "4000",
          addressCountry: "AU"
        }}
        phone="1300 [NUMBER]"
        url={\`https://disaster-recovery-seven.vercel.app/locations/${city}/${suburb.toLowerCase().replace(/\s+/g, '-')}\`}
        image="/images/disaster-recovery-logo.png"
        priceRange="$$"
        serviceArea={["${suburbName}", "${cityName}", "Queensland"]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: '${cityName}', url: '/locations/${city}' },
          { name: '${suburbName}', url: '/locations/${city}/${suburb.toLowerCase().replace(/\s+/g, '-')}' }
        ]}
      />

      <FAQSchema questions={localFAQs} />

      <LocationHero
        suburb="${suburbName}"
        city="${cityName}"
        title="Master Restorer Services in ${suburbName}"
        subtitle="${description}"
        image="/images/${city}-${suburb.toLowerCase().replace(/\s+/g, '-')}-hero.webp"
        tier="${tier}"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              24/7 Emergency Disaster Recovery in ${suburbName}
            </h2>

            <div className="prose prose-lg">
              <p>
                When disaster strikes your ${suburbName} property, you need immediate expert assistance.
                Phill McGurk, one of Queensland's limited Master Restorers, leads our ${suburbName}
                emergency response team with over 20 years of experience in disaster recovery.
              </p>

              <h3>Why ${suburbName} Properties Choose Our Services</h3>
              <ul>
                <li><strong>Master Restorer Certification:</strong> Highest level of industry expertise</li>
                <li><strong>24/7 Emergency Response:</strong> Always ready when you need us</li>
                <li><strong>Local ${cityName} Team:</strong> Fast response times to ${suburbName}</li>
                <li><strong>Insurance Approved:</strong> Preferred provider for major insurers</li>
                <li><strong>Complete Restoration:</strong> From emergency response to final repairs</li>
              </ul>

              <h3>Our ${suburbName} Services Include</h3>
              <p>
                We provide comprehensive disaster recovery services throughout ${suburbName}, including
                water damage restoration, fire and smoke damage repair, mould remediation, storm damage
                recovery, and commercial property restoration.
              </p>

              <h3>Serving All ${suburbName} Property Types</h3>
              <p>
                ${tier === 'premium'
                  ? `Our team specializes in high-value residential properties, luxury homes, and prestigious commercial buildings throughout ${suburbName}.`
                  : tier === 'established'
                  ? `We service all residential homes, strata properties, commercial buildings, and retail spaces in ${suburbName}.`
                  : `From family homes to commercial properties, we provide professional restoration services to all ${suburbName} residents and businesses.`
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        location="${suburbName}"
        services={[
          'Water Damage Restoration',
          'Fire & Smoke Damage',
          'Mould Remediation',
          'Storm Damage Repair',
          'Commercial Restoration'
        ]}
      />

      <LocalTestimonials
        suburb="${suburbName}"
        city="${cityName}"
      />

      <EmergencyCTA
        suburb="${suburbName}"
        message="Emergency in ${suburbName}? Our Master Restorer team is ready 24/7"
      />
    </>
  );
};

export default ${suburb.replace(/\s+/g, '')}Page;`;
}

// Generate service-specific suburb pages
function generateSuburbServicePage(city, suburb, service) {
  const suburbName = suburb;
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  const serviceName = service.name;

  return `import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: \`${suburbName} ${serviceName} | 24/7 Emergency Service | Master Restorer\`,
  description: \`Expert ${serviceName.toLowerCase()} in ${suburbName}, ${cityName}. Master Restorer Phill McGurk. Insurance approved. 24/7 emergency response.\`,
  keywords: [
    '${suburbName} ${service.slug.replace('-', ' ')}',
    '${serviceName} ${suburbName}',
    'emergency ${service.slug.replace('-', ' ')} ${suburbName}',
    '24 hour ${service.slug.replace('-', ' ')} ${suburbName}',
    '${suburbName} ${cityName} ${service.slug.replace('-', ' ')}'
  ]
};

const ${suburb.replace(/\s+/g, '')}${service.slug.replace(/-/g, '')}Page = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            ${serviceName} in ${suburbName}
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Professional ${serviceName.toLowerCase()} services for ${suburbName} properties.
            24/7 emergency response by Master Restorer Phill McGurk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ${suburb.replace(/\s+/g, '')}${service.slug.replace(/-/g, '')}Page;`;
}

// Main execution
console.log('🏘️ Generating suburb landing pages for Brisbane, Ipswich, and Logan...\n');

let pagesCreated = 0;
let errors = [];

// Create suburb pages
Object.entries(SUBURBS).forEach(([city, tiers]) => {
  Object.entries(tiers).forEach(([tier, suburbs]) => {
    suburbs.forEach(suburb => {
      const suburbSlug = suburb.toLowerCase().replace(/\s+/g, '-');
      const suburbDir = path.join(process.cwd(), 'app', 'locations', city, suburbSlug);

      // Create main suburb page
      try {
        if (!fs.existsSync(suburbDir)) {
          fs.mkdirSync(suburbDir, { recursive: true });
        }

        const pageContent = generateSuburbPage(city, suburb, tier);
        const pagePath = path.join(suburbDir, 'page.tsx');

        fs.writeFileSync(pagePath, pageContent, 'utf8');
        pagesCreated++;
        console.log(`✅ Created: /locations/${city}/${suburbSlug}`);

        // Create service-specific pages for premium suburbs
        if (tier === 'premium') {
          SERVICES.forEach(service => {
            const serviceDir = path.join(suburbDir, service.slug);

            if (!fs.existsSync(serviceDir)) {
              fs.mkdirSync(serviceDir, { recursive: true });
            }

            const servicePageContent = generateSuburbServicePage(city, suburb, service);
            const servicePagePath = path.join(serviceDir, 'page.tsx');

            fs.writeFileSync(servicePagePath, servicePageContent, 'utf8');
            pagesCreated++;
            console.log(`✅ Created: /locations/${city}/${suburbSlug}/${service.slug}`);
          });
        }
      } catch (error) {
        errors.push(`Error creating ${city}/${suburbSlug}: ${error.message}`);
      }
    });
  });
});

// Create Ipswich and Logan main pages if they don't exist
['ipswich', 'logan'].forEach(city => {
  const cityDir = path.join(process.cwd(), 'app', 'locations', city);

  if (!fs.existsSync(cityDir)) {
    fs.mkdirSync(cityDir, { recursive: true });

    const cityPageContent = `import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: \`${city.charAt(0).toUpperCase() + city.slice(1)} Disaster Recovery | Master Restorer Services\`,
  description: \`24/7 emergency disaster recovery in ${city.charAt(0).toUpperCase() + city.slice(1)}. Master Restorer Phill McGurk. Water damage, fire damage, mould remediation.\`
};

const ${city.charAt(0).toUpperCase() + city.slice(1)}Page = () => {
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold p-8">
        ${city.charAt(0).toUpperCase() + city.slice(1)} Disaster Recovery Services
      </h1>
    </div>
  );
};

export default ${city.charAt(0).toUpperCase() + city.slice(1)}Page;`;

    fs.writeFileSync(path.join(cityDir, 'page.tsx'), cityPageContent, 'utf8');
    pagesCreated++;
    console.log(`✅ Created: /locations/${city}`);
  }
});

// Summary
console.log('\n📊 Generation Summary:');
console.log(`   Total pages created: ${pagesCreated}`);
console.log(`   Brisbane suburbs: ${SUBURBS.brisbane.premium.length + SUBURBS.brisbane.established.length + SUBURBS.brisbane.growing.length}`);
console.log(`   Ipswich suburbs: ${SUBURBS.ipswich.premium.length + SUBURBS.ipswich.established.length + SUBURBS.ipswich.growing.length}`);
console.log(`   Logan suburbs: ${SUBURBS.logan.premium.length + SUBURBS.logan.established.length + SUBURBS.logan.growing.length}`);

if (errors.length > 0) {
  console.log('\n⚠️ Errors encountered:');
  errors.forEach(error => console.log(`   - ${error}`));
}

console.log('\n✅ Suburb page generation complete!');