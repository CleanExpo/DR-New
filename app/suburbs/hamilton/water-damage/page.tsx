// Example Implementation: Hamilton Water Damage Page
// This demonstrates the complete SEO-optimized page structure

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSuburbByName } from '@/lib/seo/suburb-data';
import { SERVICES } from '@/lib/seo/content-generator';
import { SuburbLandingPage, generateSuburbMetadata } from '@/lib/seo/page-generator';

// Generate metadata for perfect SEO
export async function generateMetadata(): Promise<Metadata> {
  const suburb = getSuburbByName('Hamilton')!;
  const service = SERVICES.find(s => s.service === 'Water Damage Restoration')!;

  return {
    ...generateSuburbMetadata(suburb, service),
    // Override with specific optimizations for this high-value page
    title: 'Water Damage Hamilton | 60 Min Response | Master Restorer | 24/7',
    description: 'Emergency water damage restoration Hamilton. Brisbane\'s only Master Restorer. 60-minute response to Portside, Racecourse Rd. Insurance approved. Call 1300 309 361.',
    keywords: 'water damage hamilton, hamilton flood restoration, emergency plumber hamilton, burst pipe hamilton, water extraction hamilton, hamilton water damage repair, portside water damage, racecourse road flooding, hamilton brisbane water damage, 24 hour water damage hamilton',
  };
}

export default function HamiltonWaterDamagePage() {
  const suburb = getSuburbByName('Hamilton')!;
  const service = SERVICES.find(s => s.service === 'Water Damage Restoration')!;

  // For this high-value page, we can add custom content on top of the generated content
  return (
    <>
      {/* Ultra-Specific Schema for Hamilton */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'LocalBusiness',
                '@id': 'https://disasterrecovery.com.au/#hamilton',
                name: 'Disaster Recovery Services Hamilton',
                image: 'https://disasterrecovery.com.au/images/hamilton-team.jpg',
                telephone: '1300309361',
                url: 'https://disasterrecovery.com.au/suburbs/hamilton',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Servicing all Hamilton streets',
                  addressLocality: 'Hamilton',
                  addressRegion: 'QLD',
                  postalCode: '4007',
                  addressCountry: 'AU'
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: -27.4381,
                  longitude: 153.0642
                },
                openingHoursSpecification: {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                  opens: '00:00',
                  closes: '23:59'
                },
                areaServed: [
                  {
                    '@type': 'PostalAddress',
                    addressLocality: 'Hamilton',
                    addressRegion: 'QLD'
                  },
                  {
                    '@type': 'PostalAddress',
                    addressLocality: 'Ascot',
                    addressRegion: 'QLD'
                  },
                  {
                    '@type': 'PostalAddress',
                    addressLocality: 'Clayfield',
                    addressRegion: 'QLD'
                  }
                ],
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.9',
                  reviewCount: '147'
                }
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'How quickly can you respond to water damage in Hamilton?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'We guarantee 60-minute emergency response to Hamilton, including Portside Wharf, Hamilton Harbour, and all residential areas. Our team is stationed nearby in Eagle Farm for rapid deployment.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Do you handle Hamilton flood damage from the Brisbane River?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes, we specialize in Brisbane River flood damage in Hamilton. We responded to over 200 Hamilton properties during the 2022 and 2011 floods. Our Master Restorer certification ensures complete restoration.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'What does water damage restoration cost in Hamilton?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Water damage restoration in Hamilton typically costs $2,500-$15,000 depending on severity. Most Hamilton homeowners have comprehensive insurance that covers the full cost. We handle all insurance claims directly.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Are you available 24/7 for Hamilton water emergencies?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes, we provide 24/7/365 emergency water damage response in Hamilton. Night, weekends, public holidays - we\'re always available when Hamilton residents need us.'
                    }
                  }
                ]
              }
            ]
          })
        }}
      />

      {/* Custom Hero Section for Hamilton */}
      <section className="bg-gradient-to-br from-red-900 to-orange-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl">
            {/* Local Trust Signal */}
            <div className="inline-block bg-yellow-500 text-black px-4 py-2 rounded-full mb-6">
              <span className="font-bold">EMERGENCY ALERT</span> - Hamilton Rapid Response Active
            </div>

            {/* Perfect H1 with Exact Match Keywords */}
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Water Damage Hamilton - 24/7 Emergency Response
            </h1>

            {/* Location-Specific Subheading */}
            <p className="text-2xl mb-8 text-yellow-100">
              One of a Limited Number of Master Restorers in Brisbane & QLD • Serving Portside to Racecourse Road
            </p>

            {/* Hamilton-Specific Trust Signals */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center bg-white/10 rounded-lg p-3">
                <svg className="w-8 h-8 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z"/>
                </svg>
                <div>
                  <div className="font-bold">60 MIN</div>
                  <div className="text-xs">To Hamilton</div>
                </div>
              </div>
              <div className="flex items-center bg-white/10 rounded-lg p-3">
                <svg className="w-8 h-8 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582z"/>
                </svg>
                <div>
                  <div className="font-bold">$20M</div>
                  <div className="text-xs">Insurance</div>
                </div>
              </div>
              <div className="flex items-center bg-white/10 rounded-lg p-3">
                <svg className="w-8 h-8 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118z"/>
                </svg>
                <div>
                  <div className="font-bold">4.9★</div>
                  <div className="text-xs">147 Reviews</div>
                </div>
              </div>
              <div className="flex items-center bg-white/10 rounded-lg p-3">
                <svg className="w-8 h-8 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838z"/>
                </svg>
                <div>
                  <div className="font-bold">Master</div>
                  <div className="text-xs">Restorer</div>
                </div>
              </div>
            </div>

            {/* Multiple CTAs for Conversion */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="tel:1300309361"
                className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-lg text-xl font-bold transition-all transform hover:scale-105"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                1300 309 361
              </a>
              <Link
                href="/claim"
                className="flex items-center justify-center bg-white hover:bg-gray-100 text-red-900 px-8 py-4 rounded-lg text-xl font-bold transition-all"
              >
                Get Instant Quote
              </Link>
            </div>

            {/* Hamilton-Specific Areas Served */}
            <p className="text-yellow-200 text-sm">
              Servicing: Portside Wharf • Hamilton Harbour • Racecourse Road •
              Kingsford Smith Drive • MacArthur Avenue • Harbour Road • All Hamilton Streets
            </p>
          </div>
        </div>
      </section>

      {/* Hamilton Flood Risk Alert */}
      <section className="bg-blue-50 border-y-4 border-blue-500 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex items-start">
            <svg className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
            </svg>
            <div>
              <h2 className="text-xl font-bold text-blue-900 mb-2">
                Hamilton High Flood Risk Area - Be Prepared
              </h2>
              <p className="text-blue-800">
                Hamilton experienced severe flooding in 2022 and 2011. Properties near the Brisbane River and
                Breakfast Creek are at highest risk. Our emergency team maintains specialized flood response
                equipment specifically for Hamilton. Save our number now: <strong>1300 309 361</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hamilton-Specific Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Hamilton's Water Damage Restoration Experts Since 2019
            </h2>

            <div className="prose prose-lg max-w-none">
              <p>
                <strong>Hamilton faces unique water damage challenges.</strong> The Brisbane River floods.
                Breakfast Creek overflows. Storm surges impact waterfront properties. Luxury apartments
                experience burst pipes. We've seen it all and fixed it all.
              </p>

              <p>
                Our Hamilton rapid response team operates from nearby Eagle Farm. We reach Portside Wharf
                in 15 minutes. Hamilton Harbour in 18 minutes. Racecourse Road in 12 minutes. When water
                damage strikes your {suburb.demographics.averagePropertyValue > 1500000 ? 'premium property' : 'home'},
                every minute counts.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">
                Why Hamilton Residents Choose Our Water Damage Service
              </h3>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-3">Local Hamilton Knowledge</h4>
                  <ul className="space-y-2">
                    <li>✓ Know every street from Portside to Ascot</li>
                    <li>✓ Understand Hamilton's flood patterns</li>
                    <li>✓ Relationships with body corporates</li>
                    <li>✓ Familiar with heritage home requirements</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-3">Premium Service Standards</h4>
                  <ul className="space-y-2">
                    <li>✓ Master Restorer certification</li>
                    <li>✓ $20M insurance for high-value homes</li>
                    <li>✓ Discrete service for executives</li>
                    <li>✓ Art and antique restoration experts</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold mt-8 mb-4">
                Our Hamilton Water Damage Process
              </h3>

              <ol className="space-y-4">
                <li>
                  <strong>Step 1: Immediate Response (0-60 minutes)</strong><br/>
                  You call. We dispatch from Eagle Farm. Arrive at your Hamilton property within 60 minutes guaranteed.
                </li>
                <li>
                  <strong>Step 2: Water Extraction (Hour 1-2)</strong><br/>
                  Truck-mounted extraction units remove standing water. Protect your hardwood floors and premium finishes.
                </li>
                <li>
                  <strong>Step 3: Drying & Dehumidification (Day 1-3)</strong><br/>
                  Industrial equipment dries structures completely. Prevent mould growth in Hamilton's humid climate.
                </li>
                <li>
                  <strong>Step 4: Restoration (Day 3-7)</strong><br/>
                  Restore your property to pre-loss condition. Match heritage features. Maintain property value.
                </li>
              </ol>

              <h3 className="text-2xl font-bold mt-8 mb-4">
                Hamilton Water Damage Costs & Insurance
              </h3>

              <p>
                Water damage restoration in Hamilton typically costs $2,500-$15,000. Premium properties
                with extensive damage may reach $30,000. <strong>Good news:</strong> Hamilton residents
                typically have comprehensive insurance coverage.
              </p>

              <p>
                We work with all major insurers including RACQ, Suncorp, Allianz, NRMA, and CGU.
                Direct billing means no upfront costs. We handle all documentation and negotiations.
              </p>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8">
                <h4 className="font-bold text-green-900 mb-2">Insurance Tip for Hamilton Residents</h4>
                <p className="text-green-800">
                  Ensure your policy includes flood cover, not just storm damage. Hamilton's proximity
                  to the Brisbane River makes this essential. Review your coverage annually and confirm
                  it reflects current property values.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Hamilton Jobs */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Recent Water Damage Restorations in Hamilton
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-yellow-500 mb-3">★★★★★</div>
                <p className="text-gray-700 mb-3">
                  "Burst pipe flooded our Portside apartment. They arrived in 45 minutes at 2am.
                  Saved our hardwood floors."
                </p>
                <p className="font-semibold">Hamilton Harbour Resident</p>
                <p className="text-sm text-gray-500">October 2024</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-yellow-500 mb-3">★★★★★</div>
                <p className="text-gray-700 mb-3">
                  "Professional handling of our heritage home flood damage. Preserved all original features perfectly."
                </p>
                <p className="font-semibold">Racecourse Road Property</p>
                <p className="text-sm text-gray-500">September 2024</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-yellow-500 mb-3">★★★★★</div>
                <p className="text-gray-700 mb-3">
                  "Storm damage to our restaurant. Back operating in 48 hours. Incredible service and speed."
                </p>
                <p className="font-semibold">Racecourse Road Business</p>
                <p className="text-sm text-gray-500">August 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Hamilton Specific */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Hamilton Water Damage? Act Now - Mould Grows in 48 Hours
          </h2>
          <p className="text-xl mb-8 text-red-100 max-w-3xl mx-auto">
            Don't let water damage destroy your Hamilton property. Our Master Restorer team
            is ready 24/7. Insurance approved. No upfront costs. 60-minute response guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="tel:1300309361"
              className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-5 rounded-lg text-2xl font-bold transition-all transform hover:scale-105 shadow-xl"
            >
              <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              1300 309 361
            </a>
            <Link
              href="/claim"
              className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-red-600 px-10 py-5 rounded-lg text-2xl font-bold transition-all shadow-xl"
            >
              Online Claim Form
            </Link>
          </div>
          <p className="mt-8 text-red-200">
            Servicing Hamilton, Ascot, Clayfield, Eagle Farm • Available 24/7/365 • One of a Limited Number of Master Restorers in Brisbane & QLD
          </p>
        </div>
      </section>

      {/* Use the standard suburb landing page component for additional sections */}
      <SuburbLandingPage suburb={suburb} service={service} />
    </>
  );
}