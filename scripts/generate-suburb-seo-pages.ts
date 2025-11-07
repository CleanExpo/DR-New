/**
 * Suburb-Specific Landing Page Generator for SEO Domination
 * Creates optimized pages for all high-value suburbs in Brisbane/Ipswich/Logan
 */

import fs from 'fs';
import path from 'path';

interface SuburbData {
  name: string;
  city: string;
  postcode: string;
  avgPropertyValue?: number;
  population?: number;
  keyFeatures: string[];
  nearbySuburbs: string[];
  coordinates: { lat: number; lng: number };
  priority: 'high' | 'medium' | 'low';
}

// High-value suburbs data
const suburbs: SuburbData[] = [
  // BRISBANE HIGH-VALUE SUBURBS
  {
    name: 'Hamilton',
    city: 'Brisbane',
    postcode: '4007',
    avgPropertyValue: 1850000,
    population: 7200,
    keyFeatures: ['Riverside mansions', 'Brisbane River views', 'Portside Wharf', 'High-end residential'],
    nearbySuburbs: ['Ascot', 'Clayfield', 'Eagle Farm', 'Albion'],
    coordinates: { lat: -27.4378, lng: 153.0640 },
    priority: 'high'
  },
  {
    name: 'Ascot',
    city: 'Brisbane',
    postcode: '4007',
    avgPropertyValue: 2200000,
    population: 5800,
    keyFeatures: ['Heritage homes', 'Eagle Farm Racecourse', 'Prestigious suburb', 'Character Queenslanders'],
    nearbySuburbs: ['Hamilton', 'Clayfield', 'Hendra', 'Eagle Farm'],
    coordinates: { lat: -27.4284, lng: 153.0576 },
    priority: 'high'
  },
  {
    name: 'New Farm',
    city: 'Brisbane',
    postcode: '4005',
    avgPropertyValue: 1650000,
    population: 12500,
    keyFeatures: ['Brisbane Powerhouse', 'New Farm Park', 'River lifestyle', 'Trendy cafes'],
    nearbySuburbs: ['Teneriffe', 'Newstead', 'Fortitude Valley', 'Kangaroo Point'],
    coordinates: { lat: -27.4674, lng: 153.0494 },
    priority: 'high'
  },
  {
    name: 'Toowong',
    city: 'Brisbane',
    postcode: '4066',
    avgPropertyValue: 1450000,
    population: 10900,
    keyFeatures: ['Toowong Village', 'University proximity', 'Mt Coot-tha views', 'Premium schools'],
    nearbySuburbs: ['St Lucia', 'Taringa', 'Auchenflower', 'Milton'],
    coordinates: { lat: -27.4850, lng: 152.9925 },
    priority: 'high'
  },
  {
    name: 'Paddington',
    city: 'Brisbane',
    postcode: '4064',
    avgPropertyValue: 1380000,
    population: 8300,
    keyFeatures: ['Heritage Queenslanders', 'Latrobe Terrace', 'Suncorp Stadium', 'Antique shops'],
    nearbySuburbs: ['Red Hill', 'Milton', 'Petrie Terrace', 'Bardon'],
    coordinates: { lat: -27.4600, lng: 152.9989 },
    priority: 'high'
  },
  {
    name: 'Bulimba',
    city: 'Brisbane',
    postcode: '4171',
    avgPropertyValue: 1520000,
    population: 6850,
    keyFeatures: ['Oxford Street dining', 'River parklands', 'CityCat ferry', 'Village atmosphere'],
    nearbySuburbs: ['Hawthorne', 'Balmoral', 'Morningside', 'East Brisbane'],
    coordinates: { lat: -27.4520, lng: 153.0575 },
    priority: 'high'
  },

  // BRISBANE MEDIUM-VALUE SUBURBS
  {
    name: 'West End',
    city: 'Brisbane',
    postcode: '4101',
    avgPropertyValue: 980000,
    population: 9200,
    keyFeatures: ['Cultural precinct', 'Boundary Street', 'Davies Park Markets', 'Riverside parks'],
    nearbySuburbs: ['South Brisbane', 'Highgate Hill', 'Hill End', 'Woolloongabba'],
    coordinates: { lat: -27.4800, lng: 153.0030 },
    priority: 'medium'
  },
  {
    name: 'Clayfield',
    city: 'Brisbane',
    postcode: '4011',
    avgPropertyValue: 1280000,
    population: 10200,
    keyFeatures: ['Eagle Junction station', 'Prestigious schools', 'Tree-lined streets', 'Family suburb'],
    nearbySuburbs: ['Ascot', 'Hendra', 'Albion', 'Wooloowin'],
    coordinates: { lat: -27.4173, lng: 153.0521 },
    priority: 'medium'
  },

  // IPSWICH HIGH-VALUE SUBURBS
  {
    name: 'Karalee',
    city: 'Ipswich',
    postcode: '4306',
    avgPropertyValue: 850000,
    population: 4200,
    keyFeatures: ['River frontage', 'Acreage properties', 'Colleges Crossing', 'Bushland setting'],
    nearbySuburbs: ['Barellan Point', 'Chuwar', 'Moggill', 'Mount Crosby'],
    coordinates: { lat: -27.5600, lng: 152.8200 },
    priority: 'high'
  },
  {
    name: 'Brookwater',
    city: 'Ipswich',
    postcode: '4300',
    avgPropertyValue: 920000,
    population: 2800,
    keyFeatures: ['Golf course estate', 'Master-planned community', 'Premium housing', 'Brookwater Village'],
    nearbySuburbs: ['Springfield Lakes', 'Springfield Central', 'Augustine Heights', 'Bellbird Park'],
    coordinates: { lat: -27.6529, lng: 152.8924 },
    priority: 'high'
  },
  {
    name: 'Springfield Lakes',
    city: 'Ipswich',
    postcode: '4300',
    avgPropertyValue: 680000,
    population: 15800,
    keyFeatures: ['Orion Shopping Centre', 'Springfield Central station', 'Lakes and parklands', 'USQ campus'],
    nearbySuburbs: ['Springfield', 'Springfield Central', 'Brookwater', 'Spring Mountain'],
    coordinates: { lat: -27.6782, lng: 152.9156 },
    priority: 'high'
  },

  // LOGAN SUBURBS
  {
    name: 'Springwood',
    city: 'Logan',
    postcode: '4127',
    avgPropertyValue: 650000,
    population: 9400,
    keyFeatures: ['Bus interchange', 'Springwood Mall', 'IKEA', 'Major retail hub'],
    nearbySuburbs: ['Rochedale South', 'Daisy Hill', 'Shailer Park', 'Underwood'],
    coordinates: { lat: -27.6125, lng: 153.1272 },
    priority: 'medium'
  },
  {
    name: 'Shailer Park',
    city: 'Logan',
    postcode: '4128',
    avgPropertyValue: 720000,
    population: 11200,
    keyFeatures: ['Hyperdome shopping', 'Family-friendly', 'Parks and reserves', 'Quiet streets'],
    nearbySuburbs: ['Cornubia', 'Loganholme', 'Tanah Merah', 'Daisy Hill'],
    coordinates: { lat: -27.6500, lng: 153.1600 },
    priority: 'medium'
  },
  {
    name: 'Logan Central',
    city: 'Logan',
    postcode: '4114',
    avgPropertyValue: 420000,
    population: 6200,
    keyFeatures: ['Logan Central Plaza', 'Transport hub', 'Logan Hospital', 'Multicultural area'],
    nearbySuburbs: ['Woodridge', 'Kingston', 'Marsden', 'Chambers Flat'],
    coordinates: { lat: -27.6393, lng: 153.1094 },
    priority: 'medium'
  }
];

/**
 * Generate suburb landing page content
 */
function generateSuburbPageContent(suburb: SuburbData): string {
  return `import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MapPin, Clock, Shield, Star, CheckCircle, AlertTriangle, Droplets, Flame, Wind } from 'lucide-react';
import { generateSuburbPageMetadata } from '@/lib/seo/enhanced-metadata';
import { generatePageSchema } from '@/lib/seo/enhanced-schema';

export const metadata: Metadata = generateSuburbPageMetadata('${suburb.name}', '${suburb.city}');

// Generate comprehensive schema markup
const schemaData = generatePageSchema('location', {
  location: '${suburb.name}',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/service-areas' },
    { name: '${suburb.city}', url: '/locations/${suburb.city.toLowerCase()}' },
    { name: '${suburb.name}', url: '/locations/${suburb.name.toLowerCase().replace(/\s+/g, '-')}' }
  ],
  faqs: [
    {
      question: 'How quickly can you respond to water damage in ${suburb.name}?',
      answer: 'Our Master Restorer team guarantees a 60-minute emergency response time to ${suburb.name}. We have rapid response vehicles stationed throughout ${suburb.city} to ensure we reach your property quickly, minimizing damage and starting restoration immediately.'
    },
    {
      question: 'Do you handle insurance claims for ${suburb.name} residents?',
      answer: 'Yes, we work directly with all major insurance companies and handle the entire claims process for ${suburb.name} property owners. Our team documents all damage, provides detailed reports, and manages communication with your insurer.'
    },
    {
      question: 'What types of properties do you service in ${suburb.name}?',
      answer: 'We service all property types in ${suburb.name} including residential homes, apartments, commercial buildings, and strata properties. Our Master Restorer certification ensures we can handle any scale of disaster recovery.'
    }
  ]
});

export default function ${suburb.name.replace(/\s+/g, '')}Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/suburbs/${suburb.name.toLowerCase().replace(/\s+/g, '-')}-hero.jpg"
            alt="${suburb.name} Water Damage Restoration Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            ${suburb.name} Water Damage & Fire Restoration Specialists
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Master Restorer Phill McGurk serves ${suburb.name} with 60-minute emergency response.
            Available 24/7 for water damage, fire damage, and mould remediation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold text-lg rounded-lg hover:bg-red-700 transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Emergency: 1300 309 361
            </Link>

            <Link
              href="/book-service"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book Free Assessment
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center text-white">
              <Clock className="w-5 h-5 mr-2" />
              <span>60-Min Response</span>
            </div>
            <div className="flex items-center text-white">
              <Shield className="w-5 h-5 mr-2" />
              <span>Insurance Approved</span>
            </div>
            <div className="flex items-center text-white">
              <Star className="w-5 h-5 mr-2" />
              <span>Master Restorer</span>
            </div>
          </div>
        </div>
      </section>

      {/* Local Service Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Why ${suburb.name} Residents Choose Master Restorer
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <MapPin className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Local ${suburb.name} Knowledge</h3>
              <p className="text-gray-700">
                We know ${suburb.name}'s unique property characteristics, from ${suburb.keyFeatures[0]} to
                ${suburb.keyFeatures[1]}. Our local expertise ensures targeted, effective restoration.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <Clock className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Rapid ${suburb.city} Response</h3>
              <p className="text-gray-700">
                Strategic positioning across ${suburb.city} means we reach ${suburb.name} properties
                faster than any competitor. Every minute counts in disaster recovery.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <Shield className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Insurance Expertise</h3>
              <p className="text-gray-700">
                Direct relationships with insurers serving ${suburb.name}. We handle claims,
                documentation, and negotiations - you focus on recovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services for Suburb */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Emergency Services Available in ${suburb.name}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Droplets className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="font-bold mb-2">Water Damage</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Burst pipes</li>
                <li>• Ceiling leaks</li>
                <li>• Flood damage</li>
                <li>• Storm water ingress</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Flame className="w-10 h-10 text-orange-600 mb-3" />
              <h3 className="font-bold mb-2">Fire Damage</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Smoke removal</li>
                <li>• Soot cleaning</li>
                <li>• Structural repairs</li>
                <li>• Odor elimination</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <AlertTriangle className="w-10 h-10 text-yellow-600 mb-3" />
              <h3 className="font-bold mb-2">Mould Remediation</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Black mould removal</li>
                <li>• Air quality testing</li>
                <li>• Prevention treatment</li>
                <li>• Health-safe protocols</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Wind className="w-10 h-10 text-purple-600 mb-3" />
              <h3 className="font-bold mb-2">Storm Damage</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Roof tarping</li>
                <li>• Tree removal</li>
                <li>• Emergency repairs</li>
                <li>• Debris cleanup</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Local Area Coverage */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Also Servicing Nearby ${suburb.city} Suburbs
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            ${suburb.nearbySuburbs.map(nearby => `
            <Link
              href="/locations/${nearby.toLowerCase().replace(/\s+/g, '-')}"
              className="text-center p-4 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors"
            >
              <MapPin className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <span className="font-semibold">${nearby}</span>
            </Link>`).join('')}
          </div>

          <div className="bg-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              ${suburb.name} Emergency Response Coverage
            </h3>
            <p className="mb-4">
              Our rapid response team covers all of ${suburb.name} (${suburb.postcode}) and surrounding areas.
              With strategic positioning throughout ${suburb.city}, we guarantee:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>60-minute emergency response to ${suburb.name} properties</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>24/7 availability including weekends and public holidays</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Direct insurance billing for all ${suburb.name} claims</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Master Restorer certification - the highest industry standard</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ${suburb.name} Property Emergency?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't let damage escalate. Master Restorer Phill McGurk is ready to respond
            immediately to your ${suburb.name} property emergency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 font-bold text-lg rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now: 1300 309 361
            </Link>
            <Link
              href="/emergency"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-700 text-white font-bold text-lg rounded-lg hover:bg-red-800 transition-colors shadow-lg"
            >
              Emergency Guide
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}`;
}

/**
 * Generate all suburb pages
 */
export function generateAllSuburbPages() {
  suburbs.forEach(suburb => {
    const fileName = `${suburb.name.toLowerCase().replace(/\s+/g, '-')}.tsx`;
    const filePath = path.join(process.cwd(), 'app', 'locations', fileName);

    // Create directory if it doesn't exist
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Generate and write the page
    const content = generateSuburbPageContent(suburb);
    fs.writeFileSync(filePath, content);

    console.log(`✅ Generated: ${fileName}`);
  });

  // Generate index page for all locations
  generateLocationsIndexPage();
}

/**
 * Generate main locations index page
 */
function generateLocationsIndexPage() {
  const content = `import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Phone, Clock, Shield } from 'lucide-react';
import { generateLocationPageMetadata } from '@/lib/seo/enhanced-metadata';

export const metadata: Metadata = generateLocationPageMetadata('Brisbane, Ipswich & Logan');

const locations = {
  Brisbane: [
    ${suburbs.filter(s => s.city === 'Brisbane').map(s =>
      `{ name: '${s.name}', postcode: '${s.postcode}', priority: '${s.priority}' }`
    ).join(',\n    ')}
  ],
  Ipswich: [
    ${suburbs.filter(s => s.city === 'Ipswich').map(s =>
      `{ name: '${s.name}', postcode: '${s.postcode}', priority: '${s.priority}' }`
    ).join(',\n    ')}
  ],
  Logan: [
    ${suburbs.filter(s => s.city === 'Logan').map(s =>
      `{ name: '${s.name}', postcode: '${s.postcode}', priority: '${s.priority}' }`
    ).join(',\n    ')}
  ]
};

export default function LocationsPage() {
  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Service Areas - Brisbane, Ipswich & Logan
        </h1>

        <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
          Master Restorer Phill McGurk provides 24/7 emergency restoration services
          across Greater Brisbane. Select your suburb for local information.
        </p>

        {Object.entries(locations).map(([city, suburbs]) => (
          <div key={city} className="mb-12">
            <h2 className="text-3xl font-bold mb-6">{city} Suburbs</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {suburbs.map(suburb => (
                <Link
                  key={suburb.name}
                  href={\`/locations/\${suburb.name.toLowerCase().replace(/\\s+/g, '-')}\`}
                  className={\`p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow \${
                    suburb.priority === 'high' ? 'border-2 border-red-500' : ''
                  }\`}
                >
                  <MapPin className="w-6 h-6 text-red-600 mb-2" />
                  <h3 className="font-bold">{suburb.name}</h3>
                  <p className="text-sm text-gray-600">{suburb.postcode}</p>
                  {suburb.priority === 'high' && (
                    <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                      Priority Area
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-16 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Don't See Your Suburb?
          </h2>
          <p className="text-center mb-6">
            We service all suburbs within 50km of Brisbane CBD. Call us for immediate assistance.
          </p>
          <div className="text-center">
            <Link
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold text-lg rounded-lg hover:bg-red-700 transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call 1300 309 361
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}`;

  const filePath = path.join(process.cwd(), 'app', 'locations', 'page.tsx');
  fs.writeFileSync(filePath, content);
  console.log('✅ Generated: locations/page.tsx');
}

// Export for use in other scripts
export { suburbs, generateSuburbPageContent };

// Run if called directly
if (require.main === module) {
  generateAllSuburbPages();
  console.log(`\n✅ Successfully generated ${suburbs.length} suburb landing pages!`);
}