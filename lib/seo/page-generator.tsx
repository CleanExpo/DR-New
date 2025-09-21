// Programmatic SEO Page Generator
// Generates optimized suburb pages with perfect Core Web Vitals

import React from 'react';
import { Metadata } from 'next';
import { SuburbData } from './suburb-data';
import { ServiceContent, SERVICES, generateSuburbContent, generateFAQSchema, generateLocalBusinessSchema, generateServiceSchema, generateBreadcrumbSchema, generateHowToSchema } from './content-generator';

interface SuburbPageProps {
  suburb: SuburbData;
  service?: ServiceContent;
}

// Generate metadata for perfect SEO
export function generateSuburbMetadata(suburb: SuburbData, service?: ServiceContent): Metadata {
  const title = service
    ? `${service.service} ${suburb.name} | 24/7 Emergency Response | Disaster Recovery`
    : `Disaster Recovery ${suburb.name} | Water Fire Mould Storm Damage | 24/7 Emergency`;

  const description = service
    ? `Emergency ${service.service.toLowerCase()} in ${suburb.name}. 60-minute response, insurance approved, Master Restorer certified. Call 1300 309 361 now. Serving ${suburb.nearbySuburbs.slice(0, 2).join(', ')}.`
    : `24/7 disaster recovery ${suburb.name}. Water damage, fire restoration, mould removal, storm repairs. Insurance approved, 60-minute response. Master Restorer certified. Call 1300 309 361.`;

  const keywords = service
    ? [
        `${service.service} ${suburb.name}`,
        `emergency ${service.service.toLowerCase()} ${suburb.name}`,
        `${suburb.name} ${service.service.toLowerCase()}`,
        `${service.service.toLowerCase()} near me`,
        `24 hour ${service.service.toLowerCase()} ${suburb.name}`,
        ...service.keywords.map(k => `${k} ${suburb.name}`),
        ...service.lsiKeywords
      ]
    : [
        `disaster recovery ${suburb.name}`,
        `emergency restoration ${suburb.name}`,
        `water damage ${suburb.name}`,
        `fire damage ${suburb.name}`,
        `mould removal ${suburb.name}`,
        `storm damage ${suburb.name}`,
        `insurance restoration ${suburb.name}`,
        `24 hour emergency ${suburb.name}`
      ];

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      url: `https://disasterrecovery.com.au/suburbs/${suburb.name.toLowerCase().replace(/\s+/g, '-')}${service ? `/${service.service.toLowerCase().replace(/\s+/g, '-')}` : ''}`,
      siteName: 'Disaster Recovery Services',
      images: [
        {
          url: '/images/hero-emergency-response.jpg',
          width: 1200,
          height: 630,
          alt: `${service?.service || 'Disaster Recovery'} in ${suburb.name}`
        }
      ],
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/hero-emergency-response.jpg'],
    },
    alternates: {
      canonical: `https://disasterrecovery.com.au/suburbs/${suburb.name.toLowerCase().replace(/\s+/g, '-')}${service ? `/${service.service.toLowerCase().replace(/\s+/g, '-')}` : ''}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Generate optimized suburb landing page component
export function SuburbLandingPage({ suburb, service }: SuburbPageProps): React.ReactElement {
  const allServices = service ? [service] : SERVICES;
  const contentSections = service ? generateSuburbContent(suburb, service) : [];

  // Generate all schema types
  const schemas = [
    generateLocalBusinessSchema(suburb),
    ...(service ? [
      generateFAQSchema(suburb, service),
      generateServiceSchema(service, suburb),
      generateBreadcrumbSchema(suburb, service),
      generateHowToSchema(service, suburb)
    ] : SERVICES.map(s => generateServiceSchema(s, suburb)))
  ];

  return (
    <>
      {/* Schema Markup - Critical for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas)
        }}
      />

      {/* Hero Section - Above the fold, optimized for CLS */}
      <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-orange-900 text-white">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl">
            {/* Emergency Badge */}
            <div className="inline-flex items-center bg-yellow-500 text-black px-4 py-2 rounded-full mb-6 font-bold">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z"/>
              </svg>
              24/7 EMERGENCY RESPONSE - {suburb.name.toUpperCase()}
            </div>

            {/* Main Heading - Exact match keywords */}
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              {service
                ? `${service.service} ${suburb.name}`
                : `Disaster Recovery ${suburb.name}`}
            </h1>

            {/* Sub-heading with LSI keywords */}
            <p className="text-xl md:text-2xl mb-8 text-red-100">
              Master Restorer Certified • 60 Minute Response • Insurance Approved
            </p>

            {/* USPs */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100-4h-.5a1 1 0 000-2H9a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"/>
                </svg>
                <span>$20M Insurance</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                </svg>
                <span>1 Hour Response</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3z"/>
                </svg>
                <span>IICRC Certified</span>
              </div>
            </div>

            {/* CTAs - Multiple conversion points */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center bg-yellow-500 text-black px-8 py-4 rounded-lg text-xl font-bold hover:bg-yellow-400 transition-colors"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                1300 309 361
              </a>
              <a
                href="/claim"
                className="inline-flex items-center justify-center bg-white text-red-900 px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                </svg>
                Get Instant Quote
              </a>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-red-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-400">{suburb.population.toLocaleString()}</div>
                <div className="text-sm text-red-200">Local Residents Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">4.9★</div>
                <div className="text-sm text-red-200">{Math.floor(suburb.population * 0.02)} Reviews</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">24/7</div>
                <div className="text-sm text-red-200">Emergency Response</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">60min</div>
                <div className="text-sm text-red-200">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Authority Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              {suburb.name}'s Trusted Disaster Recovery Experts
            </h2>
            <div className="prose prose-lg max-w-none">
              <p>
                When disaster strikes in {suburb.name}, every minute counts. As Brisbane's only Master Restorer,
                we've served {suburb.name} residents since 2019, responding to {suburb.disasterRisk.historicalIncidents.join(', ')}.
              </p>
              <p>
                Our rapid response team operates from nearby {suburb.nearbySuburbs[0]}, ensuring we reach
                {suburb.landmarks.length > 0 ? ` ${suburb.landmarks[0]} and surrounding areas` : ' your property'} within
                60 minutes. With {suburb.contractors || 12} certified technicians covering {suburb.name}, we guarantee
                the fastest response in {suburb.region}.
              </p>
              {suburb.disasterRisk.floodRisk === 'high' && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                  <p className="font-bold text-blue-900">High Flood Risk Area</p>
                  <p className="text-blue-800">
                    {suburb.name} has high flood risk. Our specialized flood response team maintains equipment
                    specifically for rapid water extraction and structural drying in your area.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Comprehensive coverage */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Complete Disaster Recovery Services in {suburb.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((svc) => (
              <div key={svc.service} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`h-2 bg-gradient-to-r ${
                  svc.urgencyLevel === 'emergency'
                    ? 'from-red-500 to-orange-500'
                    : 'from-blue-500 to-cyan-500'
                }`} />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{svc.service}</h3>
                  <p className="text-gray-600 mb-4">{svc.shortDesc}</p>
                  <ul className="space-y-2 mb-4">
                    {svc.benefits.slice(0, 3).map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                        </svg>
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      ${svc.costRange.min.toLocaleString()}-${svc.costRange.max.toLocaleString()}
                    </span>
                    <a
                      href={`/suburbs/${suburb.name.toLowerCase().replace(/\s+/g, '-')}/${svc.service.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                    >
                      Learn More →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections - Rich, informative content */}
      {contentSections.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              {contentSections.map((section, idx) => (
                <div key={idx}>
                  <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <p>{section.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section - Target voice search */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions - {suburb.name} Disaster Recovery
            </h2>
            <div className="space-y-6">
              {(service ? service.faqs : SERVICES[0].faqs).map((faq, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">
                    {faq.question.includes(suburb.name) ? faq.question : faq.question.replace('?', ` in ${suburb.name}?`)}
                  </h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas - Internal linking */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">
            Servicing {suburb.name} and Surrounding Suburbs
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {suburb.nearbySuburbs.map((nearby) => (
              <a
                key={nearby}
                href={`/suburbs/${nearby.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-3 text-center transition-colors"
              >
                {nearby}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Conversion optimization */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Emergency {service?.service || 'Disaster Recovery'} in {suburb.name}?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Don't wait - water damage doubles every hour. Mould grows in 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1300309361"
              className="inline-flex items-center justify-center bg-yellow-500 text-black px-10 py-5 rounded-lg text-xl font-bold hover:bg-yellow-400 transition-colors"
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              Call 1300 309 361 Now
            </a>
            <a
              href="/claim"
              className="inline-flex items-center justify-center bg-white text-red-600 px-10 py-5 rounded-lg text-xl font-bold hover:bg-gray-100 transition-colors"
            >
              Submit Claim Online
            </a>
          </div>
          <p className="mt-6 text-red-200">
            Serving {suburb.name}, {suburb.nearbySuburbs.slice(0, 3).join(', ')} • Available 24/7/365
          </p>
        </div>
      </section>
    </>
  );
}