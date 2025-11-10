#!/usr/bin/env ts-node
/**
 * LOCATION-SERVICE PAGE GENERATOR
 * Generates all 40 location × service combination pages
 * Plus 3 regional hub pages (Brisbane, Ipswich, Logan)
 */

import * as fs from 'fs';
import * as path from 'path';

// Location mappings
const LOCATION_MAPPINGS = {
  brisbane: { name: 'Brisbane CBD', slug: 'brisbane' },
  hamilton: { name: 'Hamilton', slug: 'hamilton' },
  ascot: { name: 'Ascot', slug: 'ascot' },
  newFarm: { name: 'New Farm', slug: 'new-farm' },
  toowong: { name: 'Toowong', slug: 'toowong' },
  ipswich: { name: 'Ipswich', slug: 'ipswich' },
  karalee: { name: 'Karalee', slug: 'karalee' },
  brookwater: { name: 'Brookwater', slug: 'brookwater' },
  springfieldLakes: { name: 'Springfield Lakes', slug: 'springfield-lakes' },
  logan: { name: 'Logan', slug: 'logan' },
};

const SERVICES = {
  waterDamage: { name: 'Water Damage Restoration', slug: 'water-damage-restoration', icon: 'Droplets' },
  fireDamage: { name: 'Fire Damage Restoration', slug: 'fire-damage-restoration', icon: 'Flame' },
  mouldRemediation: { name: 'Mould Remediation', slug: 'mould-remediation', icon: 'AlertTriangle' },
  stormDamage: { name: 'Storm Damage Restoration', slug: 'storm-damage-restoration', icon: 'Wind' },
};

// Template for location-service page
function generateLocationServicePage(locationKey: string, serviceKey: string): string {
  const location = LOCATION_MAPPINGS[locationKey as keyof typeof LOCATION_MAPPINGS];
  const service = SERVICES[serviceKey as keyof typeof SERVICES];

  return `import { Metadata } from 'next';
import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceData } from '@/lib/data/location-service-data';

export const metadata: Metadata = {
  title: '${service.name} ${location.name} | 24/7 Emergency Response | Master Restorer',
  description: 'Professional ${service.name.toLowerCase()} in ${location.name}. IICRC Master Restorer Phill McGurk. 60-min emergency response. Insurance approved. Call 1300 309 361 now for immediate help.',
  keywords: '${service.name.toLowerCase()} ${location.name}, emergency restoration ${location.name}, ${location.name} disaster recovery, IICRC master restorer ${location.name}, water damage ${location.name}',
  openGraph: {
    title: '${service.name} ${location.name} | Emergency Response',
    description: 'Professional ${service.name.toLowerCase()} serving ${location.name}. Master Restorer certified. 24/7 emergency service.',
    type: 'website',
  },
};

export default function ${location.name.replace(/\s+/g, '')}${service.name.replace(/\s+/g, '')}Page() {
  const data = getLocationServiceData('${locationKey}', '${serviceKey}');

  if (!data) {
    return <div>Page not found</div>;
  }

  return <LocationServiceTemplate data={data} />;
}
`;
}

// Template for regional hub page
function generateRegionalHubPage(region: string, locations: string[]): string {
  const locationNames = locations.map(loc => LOCATION_MAPPINGS[loc as keyof typeof LOCATION_MAPPINGS].name).join(', ');

  return `import { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Award, Droplets, Flame, AlertTriangle, Wind } from 'lucide-react';
import { FluidCTA, FluidCTAGroup, FluidEmergencyBanner } from '@/components/fluid-cta';

export const metadata: Metadata = {
  title: '${region} Emergency Restoration Services | Master Restorer | 24/7 Response',
  description: 'Professional emergency restoration services throughout ${region}. IICRC Master Restorer Phill McGurk. Water damage, fire damage, mould remediation, storm damage. Call 1300 309 361.',
  keywords: '${region} emergency restoration, ${region} disaster recovery, ${region} water damage, ${region} fire damage, IICRC master restorer ${region}',
};

export default function ${region}RegionalPage() {
  const locations = ${JSON.stringify(locations.map(loc => ({
    name: LOCATION_MAPPINGS[loc as keyof typeof LOCATION_MAPPINGS].name,
    slug: LOCATION_MAPPINGS[loc as keyof typeof LOCATION_MAPPINGS].slug,
  })), null, 2)};

  const services = [
    { name: 'Water Damage Restoration', slug: 'water-damage-restoration', icon: Droplets, color: 'blue' },
    { name: 'Fire Damage Restoration', slug: 'fire-damage-restoration', icon: Flame, color: 'red' },
    { name: 'Mould Remediation', slug: 'mould-remediation', icon: AlertTriangle, color: 'green' },
    { name: 'Storm Damage Restoration', slug: 'storm-damage-restoration', icon: Wind, color: 'cyan' },
  ];

  return (
    <div className="min-h-screen">
      <FluidEmergencyBanner
        phone="1300 309 361"
        message="24/7 Emergency Restoration ${region} - Master Restorer Response"
        sticky
      />

      {/* Hero Section */}
      <section className="relative min-h-[400px] bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ${region} Emergency Restoration Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-200">
              Professional disaster recovery serving ${locationNames}
            </p>
            <FluidCTAGroup layout="horizontal" spacing="lg" align="center">
              <FluidCTA
                text="Call 1300 309 361 Now"
                href="tel:1300309361"
                variant="emergency"
                size="xl"
                icon="phone"
                magnetic
                ripple
                pulse
              />
              <FluidCTA
                text="Get Emergency Help"
                href="/get-help"
                variant="secondary"
                size="xl"
                icon="arrow"
                magnetic
                ripple
              />
            </FluidCTAGroup>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Emergency Services Across ${region}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={\`/services/\${service.slug}\`}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <service.icon className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600">24/7 Emergency Service</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Serving All ${region} Areas
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {locations.map((location) => (
              <Link
                key={location.slug}
                href={\`/locations/\${location.slug}\`}
                className="bg-gray-50 rounded-lg p-6 hover:bg-blue-50 hover:shadow-lg transition-all duration-300 group text-center"
              >
                <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-gray-900">{location.name}</h3>
                <p className="text-sm text-gray-600 mt-2">View Services</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-red-700 to-red-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Emergency Restoration in ${region}?
            </h2>
            <p className="text-xl mb-8">
              Available 24/7 for immediate assistance throughout all ${region} areas
            </p>
            <FluidCTA
              text="Call 1300 309 361 Now"
              href="tel:1300309361"
              variant="emergency"
              size="xl"
              icon="phone"
              magnetic
              ripple
              pulse
              className="bg-white text-red-600 hover:bg-gray-100"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
`;
}

// Main generation function
function generateAllPages() {
  const baseDir = path.join(process.cwd(), 'app', 'locations');
  let pagesCreated = 0;
  let errors: string[] = [];

  console.log('🚀 Starting page generation...\n');

  // 1. Generate all location-service pages (40 pages)
  console.log('📝 Generating location-service pages...');
  Object.keys(LOCATION_MAPPINGS).forEach(locationKey => {
    const location = LOCATION_MAPPINGS[locationKey as keyof typeof LOCATION_MAPPINGS];

    // Create location directory if it doesn't exist
    const locationDir = path.join(baseDir, location.slug);
    if (!fs.existsSync(locationDir)) {
      fs.mkdirSync(locationDir, { recursive: true });
      console.log(`  ✅ Created directory: ${location.slug}/`);
    }

    // Generate pages for all services
    Object.keys(SERVICES).forEach(serviceKey => {
      const service = SERVICES[serviceKey as keyof typeof SERVICES];
      const serviceDir = path.join(locationDir, service.slug);
      const pageFile = path.join(serviceDir, 'page.tsx');

      try {
        // Create service directory
        if (!fs.existsSync(serviceDir)) {
          fs.mkdirSync(serviceDir, { recursive: true });
        }

        // Generate and write page content
        const pageContent = generateLocationServicePage(locationKey, serviceKey);
        fs.writeFileSync(pageFile, pageContent, 'utf-8');

        pagesCreated++;
        console.log(`  ✅ ${location.slug}/${service.slug}/page.tsx`);
      } catch (error) {
        const errorMsg = `Failed to create ${location.slug}/${service.slug}: ${error}`;
        errors.push(errorMsg);
        console.error(`  ❌ ${errorMsg}`);
      }
    });
  });

  // 2. Generate regional hub pages (3 pages)
  console.log('\n📝 Generating regional hub pages...');

  const regionalPages = [
    {
      region: 'Brisbane',
      locations: ['brisbane', 'hamilton', 'ascot', 'newFarm', 'toowong'],
    },
    {
      region: 'Ipswich',
      locations: ['ipswich', 'karalee', 'brookwater', 'springfieldLakes'],
    },
    {
      region: 'Logan',
      locations: ['logan'],
    },
  ];

  regionalPages.forEach(({ region, locations }) => {
    const regionDir = path.join(baseDir, region.toLowerCase());
    const pageFile = path.join(regionDir, 'page.tsx');

    try {
      if (!fs.existsSync(regionDir)) {
        fs.mkdirSync(regionDir, { recursive: true });
      }

      const pageContent = generateRegionalHubPage(region, locations);
      fs.writeFileSync(pageFile, pageContent, 'utf-8');

      pagesCreated++;
      console.log(`  ✅ ${region.toLowerCase()}/page.tsx`);
    } catch (error) {
      const errorMsg = `Failed to create regional page ${region}: ${error}`;
      errors.push(errorMsg);
      console.error(`  ❌ ${errorMsg}`);
    }
  });

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log(`✅ Generation complete!`);
  console.log(`📊 Pages created: ${pagesCreated}`);

  if (errors.length > 0) {
    console.log(`❌ Errors: ${errors.length}`);
    errors.forEach(err => console.log(`   - ${err}`));
  } else {
    console.log(`✨ No errors!`);
  }

  console.log('='.repeat(60));
  console.log('\n📁 Pages created at: app/locations/');
  console.log('\n🎯 Next steps:');
  console.log('   1. Run: npm run build');
  console.log('   2. Test pages in development: npm run dev');
  console.log('   3. Verify SEO metadata and schema markup');
  console.log('   4. Test responsive design on mobile/tablet/desktop');
}

// Run generation
try {
  generateAllPages();
} catch (error) {
  console.error('❌ Fatal error during generation:', error);
  process.exit(1);
}
