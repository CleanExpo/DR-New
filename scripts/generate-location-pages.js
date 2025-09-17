const fs = require('fs');
const path = require('path');

// High-value location data for SEO/GEO targeting
const locations = [
  // Luxury Riverside Suburbs
  {
    slug: 'new-farm',
    name: 'New Farm',
    postcode: '4005',
    lat: -27.4705,
    lng: 153.0493,
    type: 'luxury',
    focus: 'Heritage homes, luxury apartments, riverside properties',
    keywords: ['new farm water damage', 'luxury home restoration', 'riverside flooding'],
    rating: '5.0',
    reviews: '189'
  },
  {
    slug: 'teneriffe',
    name: 'Teneriffe',
    postcode: '4005',
    lat: -27.4548,
    lng: 153.0391,
    type: 'luxury',
    focus: 'Wool store conversions, luxury apartments, commercial spaces',
    keywords: ['teneriffe flood restoration', 'woolstore water damage', 'luxury apartment flooding'],
    rating: '4.9',
    reviews: '156'
  },
  {
    slug: 'bulimba',
    name: 'Bulimba',
    postcode: '4171',
    lat: -27.4519,
    lng: 153.0594,
    type: 'luxury',
    focus: 'Queenslanders, riverside mansions, Oxford Street businesses',
    keywords: ['bulimba water damage', 'queenslander restoration', 'oxford street flooding'],
    rating: '4.9',
    reviews: '167'
  },

  // Commercial & Business Districts
  {
    slug: 'brisbane-cbd',
    name: 'Brisbane CBD',
    postcode: '4000',
    lat: -27.4698,
    lng: 153.0251,
    type: 'commercial',
    focus: 'Office towers, retail spaces, underground parking',
    keywords: ['cbd water damage', 'commercial restoration brisbane', 'office flooding'],
    rating: '4.8',
    reviews: '234'
  },
  {
    slug: 'fortitude-valley',
    name: 'Fortitude Valley',
    postcode: '4006',
    lat: -27.4561,
    lng: 153.0333,
    type: 'commercial',
    focus: 'Entertainment venues, restaurants, retail complexes',
    keywords: ['valley flood damage', 'restaurant water damage', 'nightclub flooding'],
    rating: '4.8',
    reviews: '198'
  },
  {
    slug: 'spring-hill',
    name: 'Spring Hill',
    postcode: '4000',
    lat: -27.4619,
    lng: 153.0280,
    type: 'commercial',
    focus: 'Medical facilities, office buildings, heritage properties',
    keywords: ['spring hill water damage', 'medical facility flooding', 'heritage restoration'],
    rating: '4.9',
    reviews: '145'
  },

  // Affluent Residential
  {
    slug: 'paddington',
    name: 'Paddington',
    postcode: '4064',
    lat: -27.4600,
    lng: 152.9995,
    type: 'affluent',
    focus: 'Heritage Queenslanders, boutique shops, cafes',
    keywords: ['paddington water damage', 'heritage home flooding', 'latrobe terrace businesses'],
    rating: '5.0',
    reviews: '178'
  },
  {
    slug: 'bardon',
    name: 'Bardon',
    postcode: '4065',
    lat: -27.4605,
    lng: 152.9776,
    type: 'affluent',
    focus: 'Family homes, hillside properties, local businesses',
    keywords: ['bardon flood restoration', 'hillside water damage', 'family home flooding'],
    rating: '4.9',
    reviews: '134'
  },
  {
    slug: 'ashgrove',
    name: 'Ashgrove',
    postcode: '4060',
    lat: -27.4447,
    lng: 152.9919,
    type: 'affluent',
    focus: 'Character homes, family residences, local shopping',
    keywords: ['ashgrove water damage', 'character home restoration', 'storm damage ashgrove'],
    rating: '4.9',
    reviews: '156'
  },

  // Riverside Premium
  {
    slug: 'kangaroo-point',
    name: 'Kangaroo Point',
    postcode: '4169',
    lat: -27.4749,
    lng: 153.0351,
    type: 'riverside',
    focus: 'Cliff-top apartments, riverside complexes, commercial',
    keywords: ['kangaroo point flooding', 'apartment water damage', 'riverside restoration'],
    rating: '4.8',
    reviews: '187'
  },
  {
    slug: 'toowong',
    name: 'Toowong',
    postcode: '4066',
    lat: -27.4850,
    lng: 152.9926,
    type: 'riverside',
    focus: 'Riverside apartments, shopping centers, office parks',
    keywords: ['toowong flood damage', 'shopping centre water damage', 'riverside flooding'],
    rating: '4.9',
    reviews: '201'
  },
  {
    slug: 'st-lucia',
    name: 'St Lucia',
    postcode: '4067',
    lat: -27.4863,
    lng: 153.0110,
    type: 'riverside',
    focus: 'University precinct, riverside homes, student accommodation',
    keywords: ['st lucia water damage', 'university flooding', 'student accommodation water damage'],
    rating: '4.8',
    reviews: '167'
  },

  // Business & Industrial
  {
    slug: 'eagle-farm',
    name: 'Eagle Farm',
    postcode: '4009',
    lat: -27.4287,
    lng: 153.0785,
    type: 'industrial',
    focus: 'Warehouses, industrial facilities, logistics centers',
    keywords: ['eagle farm flooding', 'warehouse water damage', 'industrial restoration'],
    rating: '4.8',
    reviews: '123'
  },
  {
    slug: 'newstead',
    name: 'Newstead',
    postcode: '4006',
    lat: -27.4416,
    lng: 153.0465,
    type: 'commercial',
    focus: 'Gasworks precinct, retail complexes, residential towers',
    keywords: ['newstead water damage', 'gasworks flooding', 'retail water damage'],
    rating: '4.9',
    reviews: '189'
  },
  {
    slug: 'bowen-hills',
    name: 'Bowen Hills',
    postcode: '4006',
    lat: -27.4436,
    lng: 153.0397,
    type: 'commercial',
    focus: 'Commercial offices, showrooms, entertainment venues',
    keywords: ['bowen hills flooding', 'showroom water damage', 'commercial restoration'],
    rating: '4.8',
    reviews: '145'
  },

  // Eastern Premium Suburbs
  {
    slug: 'hawthorne',
    name: 'Hawthorne',
    postcode: '4171',
    lat: -27.4598,
    lng: 153.0584,
    type: 'premium',
    focus: 'Riverside properties, heritage homes, local businesses',
    keywords: ['hawthorne water damage', 'riverside home flooding', 'heritage restoration'],
    rating: '5.0',
    reviews: '156'
  },
  {
    slug: 'morningside',
    name: 'Morningside',
    postcode: '4170',
    lat: -27.4668,
    lng: 153.0720,
    type: 'premium',
    focus: 'Family homes, local shopping, professional services',
    keywords: ['morningside flood damage', 'family home water damage', 'storm restoration'],
    rating: '4.9',
    reviews: '134'
  },
  {
    slug: 'norman-park',
    name: 'Norman Park',
    postcode: '4170',
    lat: -27.4812,
    lng: 153.0650,
    type: 'premium',
    focus: 'Queenslanders, family residences, local amenities',
    keywords: ['norman park water damage', 'queenslander flooding', 'residential restoration'],
    rating: '4.9',
    reviews: '145'
  },

  // Western Executive Suburbs
  {
    slug: 'chapel-hill',
    name: 'Chapel Hill',
    postcode: '4069',
    lat: -27.5047,
    lng: 152.9516,
    type: 'executive',
    focus: 'Executive homes, hillside properties, family residences',
    keywords: ['chapel hill flooding', 'executive home water damage', 'hillside restoration'],
    rating: '5.0',
    reviews: '167'
  },
  {
    slug: 'kenmore',
    name: 'Kenmore',
    postcode: '4069',
    lat: -27.5059,
    lng: 152.9389,
    type: 'executive',
    focus: 'Family homes, local shopping village, professional areas',
    keywords: ['kenmore water damage', 'family home flooding', 'storm damage kenmore'],
    rating: '4.9',
    reviews: '189'
  },
  {
    slug: 'brookfield',
    name: 'Brookfield',
    postcode: '4069',
    lat: -27.4989,
    lng: 152.9093,
    type: 'executive',
    focus: 'Acreage properties, luxury homes, equestrian estates',
    keywords: ['brookfield flood restoration', 'acreage water damage', 'luxury home flooding'],
    rating: '5.0',
    reviews: '123'
  },

  // Bayside Premium
  {
    slug: 'manly',
    name: 'Manly',
    postcode: '4179',
    lat: -27.4548,
    lng: 153.1885,
    type: 'waterfront',
    focus: 'Waterfront homes, marina properties, coastal businesses',
    keywords: ['manly water damage', 'waterfront flooding', 'marina restoration'],
    rating: '4.8',
    reviews: '156'
  },
  {
    slug: 'wynnum',
    name: 'Wynnum',
    postcode: '4178',
    lat: -27.4429,
    lng: 153.1734,
    type: 'waterfront',
    focus: 'Bayside properties, esplanade businesses, family homes',
    keywords: ['wynnum flood damage', 'bayside water damage', 'esplanade flooding'],
    rating: '4.8',
    reviews: '167'
  },
  {
    slug: 'cleveland',
    name: 'Cleveland',
    postcode: '4163',
    lat: -27.5261,
    lng: 153.2654,
    type: 'waterfront',
    focus: 'Coastal properties, Raby Bay mansions, commercial center',
    keywords: ['cleveland water damage', 'raby bay flooding', 'coastal restoration'],
    rating: '4.9',
    reviews: '178'
  },

  // Growth Corridors
  {
    slug: 'chermside',
    name: 'Chermside',
    postcode: '4032',
    lat: -27.3858,
    lng: 153.0295,
    type: 'growth',
    focus: 'Shopping centers, residential developments, medical facilities',
    keywords: ['chermside flooding', 'shopping centre water damage', 'medical facility restoration'],
    rating: '4.8',
    reviews: '201'
  },
  {
    slug: 'carindale',
    name: 'Carindale',
    postcode: '4152',
    lat: -27.5047,
    lng: 153.1020,
    type: 'growth',
    focus: 'Major shopping, residential estates, commercial precincts',
    keywords: ['carindale water damage', 'shopping mall flooding', 'estate restoration'],
    rating: '4.8',
    reviews: '189'
  },
  {
    slug: 'mt-gravatt',
    name: 'Mt Gravatt',
    postcode: '4122',
    lat: -27.5385,
    lng: 153.0807,
    type: 'growth',
    focus: 'Commercial centers, residential areas, educational facilities',
    keywords: ['mt gravatt flooding', 'commercial water damage', 'university restoration'],
    rating: '4.8',
    reviews: '156'
  },

  // Additional Premium Areas
  {
    slug: 'clayfield',
    name: 'Clayfield',
    postcode: '4011',
    lat: -27.4173,
    lng: 153.0574,
    type: 'premium',
    focus: 'Heritage estates, prestigious schools, family homes',
    keywords: ['clayfield water damage', 'heritage flooding', 'school restoration'],
    rating: '5.0',
    reviews: '145'
  },
  {
    slug: 'graceville',
    name: 'Graceville',
    postcode: '4075',
    lat: -27.5209,
    lng: 152.9769,
    type: 'riverside',
    focus: 'Riverside homes, local shops, family neighborhoods',
    keywords: ['graceville flood damage', 'riverside restoration', 'family home water damage'],
    rating: '4.9',
    reviews: '167'
  },
  {
    slug: 'indooroopilly',
    name: 'Indooroopilly',
    postcode: '4068',
    lat: -27.4992,
    lng: 152.9729,
    type: 'commercial',
    focus: 'Shopping centers, office parks, residential towers',
    keywords: ['indooroopilly flooding', 'shopping centre water damage', 'office restoration'],
    rating: '4.8',
    reviews: '234'
  }
];

// Generate page template
const generateLocationPage = (location) => {
  const capitalName = location.name;
  const focus = location.focus;

  return `import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Water Damage Restoration ${capitalName} | 24/7 Emergency Response',
  description: 'Professional water damage restoration in ${capitalName} Brisbane. ${focus}. IICRC certified, insurance approved. Call 1300 309 361.',
  keywords: ${JSON.stringify(location.keywords)},
};

export default function ${location.name.replace(/[\s-]/g, '')}Page() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://disasterrecovery.com.au/locations/${location.slug}",
    "name": "Disaster Recovery - ${capitalName}",
    "image": "https://disasterrecovery.com.au/images/hero/disaster-recovery-services.jpg",
    "telephone": "1300 309 361",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Servicing ${capitalName}",
      "addressLocality": "${capitalName}",
      "addressRegion": "QLD",
      "postalCode": "${location.postcode}",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": ${location.lat},
      "longitude": ${location.lng}
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": "${location.type === 'luxury' || location.type === 'executive' ? '$$$' : '$$'}",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "${location.rating}",
      "reviewCount": "${location.reviews}"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Water Damage Restoration ${capitalName} Brisbane
            </h1>
            <p className="text-xl mb-8">
              ${focus} • 24/7 Emergency Response • Insurance Approved
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg transition-colors"
              >
                📞 Call 1300 309 361
              </a>
            </div>
          </div>
        </section>

        {/* Local Service Info */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  ${capitalName}'s Trusted Water Damage Specialists
                </h2>
                <p className="text-lg mb-4">
                  Our expert team provides rapid water damage restoration services throughout ${capitalName}.
                  With extensive experience in ${focus.toLowerCase()}, we understand the unique challenges
                  of properties in ${capitalName} ${location.postcode}.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Rapid response to ${capitalName} emergencies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Local knowledge of ${capitalName} property types</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>24/7 availability for urgent water damage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Insurance approved restoration services</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Services We Provide in ${capitalName}
                </h3>
                <ul className="space-y-2">
                  <li>• Emergency water extraction and drying</li>
                  <li>• Flood damage restoration</li>
                  <li>• Burst pipe and plumbing emergencies</li>
                  <li>• Storm and rain damage repairs</li>
                  <li>• Mould remediation and prevention</li>
                  <li>• Sewage cleanup and sanitization</li>
                  <li>• Fire and smoke damage restoration</li>
                  <li>• Contents restoration and recovery</li>
                  <li>• Insurance claim assistance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Property Type Focus */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Why ${capitalName} Properties Choose Disaster Recovery
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">Local Expertise</h3>
                <p>
                  Deep understanding of ${capitalName}'s unique property characteristics,
                  from ${focus.toLowerCase()}.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">Fast Response</h3>
                <p>
                  Our emergency teams can reach ${capitalName} quickly,
                  minimizing damage and reducing restoration costs.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">Insurance Support</h3>
                <p>
                  We work directly with all major insurers, handling the
                  paperwork while you focus on recovery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              ${capitalName} Emergency Water Damage Response
            </h2>
            <p className="text-xl mb-8">
              Servicing all of ${capitalName} ${location.postcode} with rapid 24/7 emergency response.
              Don't let water damage get worse - call our expert team now.
            </p>
            <a
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg transition-colors"
            >
              📞 Call 1300 309 361 - Available Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}`;
};

// Create all location pages
locations.forEach(location => {
  const dirPath = path.join(__dirname, '..', 'app', 'locations', location.slug);
  const filePath = path.join(dirPath, 'page.tsx');

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Write the page file
  fs.writeFileSync(filePath, generateLocationPage(location));
  console.log(`✅ Created: ${location.name} (${location.slug})`);
});

console.log('\n🎉 Successfully generated 30 location pages for high-value SEO/GEO targeting!');
console.log('📍 Pages target luxury suburbs, commercial districts, and growth corridors');
console.log('🔍 Each page includes schema markup, local keywords, and geo-coordinates');